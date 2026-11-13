"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import {
  Plus,
  Save,
  Eye,
  PenLine,
  Columns2,
  Trash2,
  Copy,
  Search,
  LogOut,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Minus,
  Database,
  RefreshCw,
  ArrowLeft,
  X,
  Send,
  FileText,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  DBBlogPost,
  fetchAllAdminPosts,
  upsertAdminPost,
  deleteAdminPost,
  seedStaticPostsToSupabase,
  slugifyTitle,
  estimateReadTime,
  formatDisplayDate,
} from "@/lib/blog";
import { BlogArticlePreview } from "@/components/BlogArticlePreview";
import { useCart } from "@/context/CartContext";

type ViewMode = "edit" | "split" | "preview";
type FilterTab = "all" | "draft" | "published";
type SaveState = "idle" | "saving" | "saved" | "local-only" | "error";

interface EditorDraft {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  keyTakeaways: string[];
  status: "draft" | "published";
  publishedAt: string | null;
}

const LOCAL_AUTOSAVE_KEY = "mharvy_admin_blog_autosave_v1";

const SETUP_SQL_SNIPPET = `create extension if not exists "pgcrypto";

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null default 'Untitled Draft',
  category text not null default 'Brand Strategy',
  excerpt text not null default '',
  content text not null default '',
  key_takeaways jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  cover_image text,
  read_time text not null default '3 min read',
  publish_date text not null default to_char(now(), 'Mon YYYY'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (status = 'published');

create policy "Authenticated admins manage all blog posts"
  on public.blog_posts for all to authenticated
  using (true) with check (true);`;

function createBlankDraft(displayDate = ""): EditorDraft {
  return {
    id: undefined,
    title: "",
    slug: "",
    category: "Brand Strategy",
    excerpt: "",
    content: "",
    coverImage: "",
    publishDate: displayDate,
    readTime: "1 min read",
    tags: [],
    keyTakeaways: [],
    status: "draft",
    publishedAt: null,
  };
}

function dbPostToDraft(post: DBBlogPost): EditorDraft {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category || "Brand Strategy",
    excerpt: post.excerpt || "",
    content: post.content || "",
    coverImage: post.cover_image || "",
    publishDate: post.publish_date || formatDisplayDate(),
    readTime: post.read_time || estimateReadTime(post.content || ""),
    tags: Array.isArray(post.tags) ? post.tags : [],
    keyTakeaways: Array.isArray(post.key_takeaways) ? post.key_takeaways : [],
    status: post.status,
    publishedAt: post.published_at,
  };
}

function formatTimeStamp(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AdminBlogPage() {
  const { showToast } = useCart();

  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // Database posts & schema check
  const [posts, setPosts] = useState<DBBlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [missingTable, setMissingTable] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  // Draft management sidebar filters
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Active editor state
  const [draft, setDraft] = useState<EditorDraft>(createBlankDraft);
  const [slugLocked, setSlugLocked] = useState(false);
  const [readTimeManual, setReadTimeManual] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isDirty, setIsDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [recoverableLocal, setRecoverableLocal] = useState<EditorDraft | null>(null);

  // Metadata helpers
  const [tagInput, setTagInput] = useState("");
  const [takeawayInput, setTakeawayInput] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, []);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!isMountedRef.current) return;
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMountedRef.current) return;
      setSession(nextSession ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Set initial display date + check local backup on mount (outside SSR render)
  useEffect(() => {
    setDraft((prev) =>
      prev.publishDate ? prev : { ...prev, publishDate: formatDisplayDate() }
    );
    try {
      const raw = localStorage.getItem(LOCAL_AUTOSAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EditorDraft;
        if (parsed && (parsed.title?.trim() || parsed.content?.trim())) {
          setRecoverableLocal(parsed);
        }
      }
    } catch {
      // ignore invalid storage
    }
  }, []);

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    const res = await fetchAllAdminPosts();
    if (!isMountedRef.current) return;
    setPosts(res.posts);
    setMissingTable(res.missingTable);
    setDbError(res.error);
    setLoadingPosts(false);
  }, []);

  useEffect(() => {
    if (session) {
      loadPosts();
    }
  }, [session, loadPosts]);

  // Word count
  const wordCount = useMemo(() => {
    return draft.content.trim().split(/\s+/).filter(Boolean).length;
  }, [draft.content]);

  // Filtered sidebar posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (filterTab !== "all" && p.status !== filterTab) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [posts, filterTab, searchQuery]);

  const counts = useMemo(() => {
    const drafts = posts.filter((p) => p.status === "draft").length;
    const published = posts.filter((p) => p.status === "published").length;
    return { all: posts.length, drafts, published };
  }, [posts]);

  // Persist to Supabase helper
  const persistToDatabase = useCallback(
    async (
      targetDraft: EditorDraft,
      targetStatus: "draft" | "published",
      isAuto = false
    ) => {
      if (missingTable || !session) {
        setSaveState("local-only");
        return;
      }

      const finalTitle = targetDraft.title.trim() || "Untitled Draft";
      const baseSlug =
        slugifyTitle(targetDraft.slug || finalTitle) || `draft-${Date.now()}`;

      setSaveState("saving");

      const { data, error } = await upsertAdminPost({
        id: targetDraft.id,
        slug: baseSlug,
        title: finalTitle,
        category: targetDraft.category.trim() || "Brand Strategy",
        excerpt: targetDraft.excerpt,
        content: targetDraft.content,
        key_takeaways: targetDraft.keyTakeaways,
        tags: targetDraft.tags,
        cover_image: targetDraft.coverImage.trim() || null,
        read_time: targetDraft.readTime || estimateReadTime(targetDraft.content),
        publish_date: targetDraft.publishDate || formatDisplayDate(),
        status: targetStatus,
        published_at:
          targetStatus === "published"
            ? targetDraft.publishedAt || new Date().toISOString()
            : null,
      });

      if (!isMountedRef.current) return;

      if (error || !data) {
        setSaveState("error");
        if (!isAuto) {
          showToast(error || "Failed to save post to Supabase");
        }
        return;
      }

      setDraft((prev) => ({
        ...prev,
        id: data.id,
        slug: data.slug,
        title: data.title,
        status: data.status,
        publishedAt: data.published_at,
      }));
      setSlugLocked(true);
      setIsDirty(false);
      setSaveState("saved");
      setLastSavedAt(formatTimeStamp(new Date()));
      setRecoverableLocal(null);
      try {
        localStorage.removeItem(LOCAL_AUTOSAVE_KEY);
      } catch {
        // ignore
      }

      setPosts((prev) => {
        const idx = prev.findIndex((item) => item.id === data.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = data;
          return copy.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        return [data, ...prev];
      });

      if (!isAuto) {
        showToast(
          targetStatus === "published"
            ? "Article published live to /blog"
            : "Draft saved to Supabase"
        );
      }
    },
    [missingTable, session, showToast]
  );

  // Automatic local backup + 1.5s debounced Supabase draft autosave
  useEffect(() => {
    if (!isDirty || !session) return;

    const hasContent =
      draft.title.trim().length > 0 ||
      draft.content.trim().length > 0 ||
      draft.excerpt.trim().length > 0;

    if (!hasContent) return;

    try {
      localStorage.setItem(LOCAL_AUTOSAVE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage quota errors
    }

    // Only auto-push to DB when editing a draft (so live published edits don't push half-typed words)
    if (draft.status !== "draft" || missingTable) {
      setSaveState("local-only");
      return;
    }

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      persistToDatabase(draft, "draft", true);
    }, 1500);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [draft, isDirty, session, missingTable, persistToDatabase]);

  // Field updater
  const updateDraft = useCallback(
    (updater: (prev: EditorDraft) => EditorDraft) => {
      setDraft((prev) => {
        const next = updater(prev);
        if (!readTimeManual) {
          next.readTime = estimateReadTime(next.content);
        }
        return next;
      });
      setIsDirty(true);
    },
    [readTimeManual]
  );

  const handleTitleChange = (value: string) => {
    updateDraft((prev) => ({
      ...prev,
      title: value,
      slug: slugLocked ? prev.slug : slugifyTitle(value),
    }));
  };

  // Markdown toolbar insertion
  const insertMarkdown = (
    prefix: string,
    suffix = "",
    placeholder = "text"
  ) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = draft.content.slice(start, end) || placeholder;
    const replacement = `${prefix}${selected}${suffix}`;
    const nextValue =
      draft.content.slice(0, start) + replacement + draft.content.slice(end);

    updateDraft((prev) => ({ ...prev, content: nextValue }));

    requestAnimationFrame(() => {
      el.focus();
      const selectStart = start + prefix.length;
      const selectEnd = selectStart + selected.length;
      el.setSelectionRange(selectStart, selectEnd);
    });
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      persistToDatabase(draft, draft.status, false);
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      insertMarkdown("**", "**", "bold text");
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      insertMarkdown("*", "*", "italic text");
    }
  };

  const handleSelectPost = (post: DBBlogPost) => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    setDraft(dbPostToDraft(post));
    setSlugLocked(true);
    setReadTimeManual(true);
    setIsDirty(false);
    setSaveState("idle");
    setConfirmDeleteId(null);
  };

  const handleNewDraft = () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    setDraft(createBlankDraft(formatDisplayDate()));
    setSlugLocked(false);
    setReadTimeManual(false);
    setIsDirty(false);
    setSaveState("idle");
    setConfirmDeleteId(null);
    if (viewMode === "preview") setViewMode("split");
  };

  const handleDuplicate = async (post: DBBlogPost) => {
    const { data, error } = await upsertAdminPost({
      slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${post.title} (Copy)`,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      key_takeaways: post.key_takeaways || [],
      tags: post.tags || [],
      cover_image: post.cover_image,
      read_time: post.read_time,
      publish_date: formatDisplayDate(),
      status: "draft",
      published_at: null,
    });

    if (error || !data) {
      showToast(error || "Unable to duplicate article");
      return;
    }

    setPosts((prev) => [data, ...prev]);
    handleSelectPost(data);
    showToast("Duplicated into a new draft");
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteAdminPost(id);
    if (error) {
      showToast(error);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (draft.id === id) {
      handleNewDraft();
    }
    setConfirmDeleteId(null);
    showToast("Article deleted");
  };

  const handleSeedInitialPosts = async () => {
    setSeeding(true);
    const { inserted, error } = await seedStaticPostsToSupabase();
    setSeeding(false);
    if (error) {
      showToast(error);
      return;
    }
    await loadPosts();
    showToast(`Imported ${inserted} existing articles into Supabase`);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });
    setSigningIn(false);
    if (error) {
      setLoginError(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setPosts([]);
    setDraft(createBlankDraft());
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SETUP_SQL_SNIPPET);
      showToast("SQL setup copied to clipboard");
    } catch {
      showToast("Please copy the SQL from supabase/schema.sql");
    }
  };

  const addTag = () => {
    const clean = tagInput.trim().replace(/^#/, "");
    if (!clean) return;
    if (!draft.tags.includes(clean)) {
      updateDraft((prev) => ({ ...prev, tags: [...prev.tags, clean] }));
    }
    setTagInput("");
  };

  const addTakeaway = () => {
    const clean = takeawayInput.trim();
    if (!clean) return;
    updateDraft((prev) => ({
      ...prev,
      keyTakeaways: [...prev.keyTakeaways, clean],
    }));
    setTakeawayInput("");
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-zinc-500 animate-pulse">
          Initializing Studio...
        </span>
      </div>
    );
  }

  // Admin Sign-In Gate
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-[#F5F2EB] pt-28 pb-20 px-6 flex items-center justify-center">
        <div className="w-full max-w-md border border-white/15 bg-black p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.26em] text-white/40 uppercase block mb-1">
                EDITORIAL CONSOLE
              </span>
              <h1 className="text-base font-medium uppercase tracking-wider text-white font-sans">
                Admin Blog Studio
              </h1>
            </div>
            <Lock className="w-4 h-4 text-zinc-500" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@mharvy.com.ng"
                className="w-full bg-black border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {loginError && (
              <p className="text-[11px] font-mono text-red-400 border border-red-500/30 bg-red-950/20 px-3 py-2">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="w-full py-3 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black text-[11px] font-semibold uppercase tracking-[0.22em] transition-all disabled:opacity-50"
            >
              {signingIn ? "Authenticating..." : "Enter Blog Studio"}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-zinc-500 font-light leading-relaxed">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              First-Time Setup
            </p>
            <p>
              1. Create an admin user in your Supabase Dashboard under{" "}
              <span className="text-zinc-300">Authentication &rarr; Users &rarr; Add User</span>.
            </p>
            <p>
              2. Run <span className="font-mono text-zinc-300">supabase/schema.sql</span> once in
              your Supabase SQL Editor.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#F5F2EB] pt-20 sm:pt-24 pb-16 font-poppins selection:bg-white selection:text-black">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Top Studio Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Blog</span>
            </Link>
            <span className="text-white/15">|</span>
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block">
                ADMIN EDITORIAL STUDIO
              </span>
              <h1 className="text-sm sm:text-base font-medium uppercase tracking-wider text-white font-sans">
                {draft.id ? (draft.title || "Untitled Draft") : "New Article Draft"}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Auto-Save Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-zinc-950 text-[10px] font-mono">
              {saveState === "saving" && (
                <>
                  <RefreshCw className="w-3 h-3 text-white animate-spin" />
                  <span className="text-white">Saving draft...</span>
                </>
              )}
              {saveState === "saved" && (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-zinc-300">
                    Auto-saved · {lastSavedAt}
                  </span>
                </>
              )}
              {saveState === "local-only" && (
                <>
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300">
                    {draft.status === "published"
                      ? "Published edits cached locally"
                      : "Saved locally"}
                  </span>
                </>
              )}
              {saveState === "error" && (
                <>
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span className="text-red-300">Auto-save failed (cached locally)</span>
                </>
              )}
              {saveState === "idle" && (
                <>
                  <Database className="w-3 h-3 text-zinc-500" />
                  <span className="text-zinc-500">
                    {draft.id ? "Synced with Supabase" : "Ready · Auto-save enabled"}
                  </span>
                </>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex border border-white/15 bg-black">
              {(
                [
                  { id: "edit", label: "Edit", Icon: PenLine },
                  { id: "split", label: "Split", Icon: Columns2 },
                  { id: "preview", label: "Full Preview", Icon: Eye },
                ] as const
              ).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setViewMode(id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                    viewMode === id
                      ? "bg-white text-black font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={() => persistToDatabase(draft, "draft", false)}
              disabled={saveState === "saving" || missingTable}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-white/25 hover:border-white text-white text-[10px] font-mono uppercase tracking-wider transition-colors disabled:opacity-40"
            >
              <Save className="w-3 h-3" />
              <span>{draft.status === "published" ? "Revert to Draft" : "Save Draft"}</span>
            </button>

            <button
              type="button"
              onClick={() => persistToDatabase(draft, "published", false)}
              disabled={saveState === "saving" || missingTable}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-zinc-200 text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors disabled:opacity-40"
            >
              <Send className="w-3 h-3" />
              <span>{draft.status === "published" ? "Update Live" : "Publish"}</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out"
              className="p-2 border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Local Recovery Banner */}
        {recoverableLocal && (
          <div className="mb-6 p-4 border border-white/25 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Clock className="w-4 h-4 text-white flex-shrink-0" />
              <span>
                Unsaved local recovery draft found:{" "}
                <strong className="text-white font-medium">
                  {recoverableLocal.title || "Untitled Draft"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraft(recoverableLocal);
                  setSlugLocked(Boolean(recoverableLocal.slug));
                  setIsDirty(true);
                  setRecoverableLocal(null);
                  showToast("Recovered local draft");
                }}
                className="px-3 py-1.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider"
              >
                Restore Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(LOCAL_AUTOSAVE_KEY);
                  setRecoverableLocal(null);
                }}
                className="px-3 py-1.5 border border-white/15 text-zinc-400 hover:text-white text-[10px] font-mono uppercase tracking-wider"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Missing Supabase Table Onboarding Banner */}
        {missingTable && (
          <div className="mb-8 p-6 border border-white/25 bg-zinc-950 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-400 block mb-1">
                  DATABASE TABLE REQUIRED
                </span>
                <h2 className="text-sm font-medium text-white uppercase tracking-wide">
                  Create <code className="font-mono">public.blog_posts</code> in Supabase
                </h2>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  Run the SQL migration in{" "}
                  <code className="text-zinc-200 font-mono">supabase/schema.sql</code> inside your
                  Supabase Dashboard SQL Editor, then verify below.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-white/30 hover:border-white text-white text-[10px] font-mono uppercase tracking-wider"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy SQL</span>
                </button>
                <button
                  type="button"
                  onClick={loadPosts}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-black text-[10px] font-mono uppercase tracking-wider font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Verify Ready</span>
                </button>
              </div>
            </div>
            <pre className="p-4 bg-black border border-white/10 text-[10px] font-mono text-zinc-400 overflow-x-auto max-h-48">
              {SETUP_SQL_SNIPPET}
            </pre>
          </div>
        )}

        {dbError && !missingTable && (
          <div className="mb-6 p-3 border border-red-500/30 bg-red-950/20 text-xs font-mono text-red-300">
            Supabase notice: {dbError}
          </div>
        )}

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Draft & Published Management Sidebar */}
          <aside className="lg:col-span-3 border border-white/10 bg-black p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
                Drafts &amp; Archive
              </span>
              <button
                type="button"
                onClick={handleNewDraft}
                className="inline-flex items-center gap-1 px-2.5 py-1 border border-white/30 hover:border-white text-white hover:bg-white hover:text-black text-[10px] font-mono uppercase tracking-wider transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="grid grid-cols-3 border border-white/10 text-[10px] font-mono">
              {(
                [
                  { id: "all", label: `All (${counts.all})` },
                  { id: "draft", label: `Drafts (${counts.drafts})` },
                  { id: "published", label: `Live (${counts.published})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterTab(tab.id)}
                  className={`py-1.5 text-center transition-colors ${
                    filterTab === tab.id
                      ? "bg-white text-black font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or slug..."
                className="w-full bg-black border border-white/10 pl-8 pr-3 py-2 text-[11px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Post List */}
            <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
              {loadingPosts ? (
                <div className="py-8 text-center text-[11px] font-mono text-zinc-500">
                  Loading articles...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-6 text-center space-y-3 border border-dashed border-white/10 p-4">
                  <FileText className="w-5 h-5 text-zinc-600 mx-auto" />
                  <p className="text-[11px] text-zinc-500 font-light">
                    {posts.length === 0
                      ? "No articles saved in Supabase yet."
                      : "No matching posts."}
                  </p>
                  {posts.length === 0 && !missingTable && (
                    <button
                      type="button"
                      onClick={handleSeedInitialPosts}
                      disabled={seeding}
                      className="w-full py-2 border border-white/25 hover:border-white text-white text-[10px] font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {seeding ? "Importing..." : "Import 5 Existing Articles"}
                    </button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isActive = draft.id === post.id;
                  return (
                    <div
                      key={post.id}
                      className={`p-3 border transition-colors ${
                        isActive
                          ? "border-white/50 bg-zinc-950"
                          : "border-white/10 hover:border-white/25 bg-black"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectPost(post)}
                        className="w-full text-left space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 border ${
                              post.status === "published"
                                ? "border-white/40 text-white"
                                : "border-white/15 text-zinc-400"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">
                            {new Date(post.updated_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-xs font-normal text-white line-clamp-2 leading-snug">
                          {post.title || "Untitled Draft"}
                        </p>
                      </button>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5">
                        <span className="text-[9px] font-mono text-zinc-600 truncate max-w-[120px]">
                          /{post.slug}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDuplicate(post)}
                            title="Duplicate"
                            className="p-1 text-zinc-500 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          {confirmDeleteId === post.id ? (
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id)}
                              className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/40 text-red-300 text-[9px] font-mono uppercase"
                            >
                              Confirm
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(post.id)}
                              title="Delete"
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {posts.length > 0 && !missingTable && (
              <button
                type="button"
                onClick={handleSeedInitialPosts}
                disabled={seeding}
                className="w-full py-2 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white text-[10px] font-mono uppercase tracking-wider transition-colors"
              >
                {seeding ? "Syncing..." : "Sync Default Articles"}
              </button>
            )}
          </aside>

          {/* RIGHT: Editor / Split / Full Preview Workspace */}
          <div className="lg:col-span-9 space-y-6">
            {viewMode === "preview" ? (
              /* FULL PREVIEW SYSTEM */
              <div className="space-y-8">
                {/* Preview Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border border-white/15 bg-zinc-950">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400">
                    Full Publication Preview · Exact Reader Layout
                  </span>
                  {draft.status === "published" && draft.slug && (
                    <Link
                      href={`/blog#${draft.slug}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white hover:underline"
                    >
                      <span>Open Live Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                {/* Preview 1: How it appears in the Blog List & Homepage */}
                <div className="border border-white/10 p-6 bg-black space-y-3">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/40 block">
                    Index Row Preview (/blog)
                  </span>
                  <div className="py-5 border-y border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 pr-4">
                      <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                        {draft.publishDate}
                      </span>
                      <h3 className="text-base sm:text-lg font-normal text-white mb-1.5">
                        {draft.title || "Untitled Editorial Dispatch"}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 max-w-2xl">
                        {draft.excerpt || "Your article excerpt will appear here..."}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 flex-shrink-0">
                      {draft.readTime}
                    </span>
                  </div>
                </div>

                {/* Preview 2: Full Article Document */}
                <div className="border border-white/15 bg-black p-6 sm:p-12 max-w-3xl mx-auto shadow-2xl">
                  <BlogArticlePreview
                    isPreviewMode
                    article={{
                      title: draft.title,
                      excerpt: draft.excerpt,
                      contentMarkdown: draft.content,
                      coverImage: draft.coverImage || null,
                      category: draft.category,
                      publishDate: draft.publishDate,
                      readTime: draft.readTime,
                      keyTakeaways: draft.keyTakeaways,
                      tags: draft.tags,
                      status: draft.status,
                    }}
                  />
                </div>
              </div>
            ) : (
              /* EDIT OR SPLIT WORKSPACE */
              <div
                className={`grid gap-6 items-start ${
                  viewMode === "split" ? "grid-cols-1 xl:grid-cols-12" : "grid-cols-1"
                }`}
              >
                {/* Writing Canvas */}
                <div
                  className={`${
                    viewMode === "split" ? "xl:col-span-7" : "w-full"
                  } space-y-5`}
                >
                  <div className="border border-white/10 bg-black p-5 sm:p-6 space-y-5">
                    {/* Title */}
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-1.5">
                        Headline *
                      </label>
                      <input
                        type="text"
                        value={draft.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Designing High-Trust Digital Infrastructure Across Africa"
                        className="w-full bg-black border-b border-white/15 pb-2.5 text-base sm:text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-1.5">
                        Standfirst / Excerpt
                      </label>
                      <textarea
                        rows={2}
                        value={draft.excerpt}
                        onChange={(e) =>
                          updateDraft((prev) => ({ ...prev, excerpt: e.target.value }))
                        }
                        placeholder="A concise two-line summary shown in the blog index and article opening..."
                        className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-white/40 resize-none"
                      />
                    </div>

                    {/* Formatting Toolbar */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10 mb-3">
                        <div className="flex flex-wrap items-center gap-1">
                          <button
                            type="button"
                            onClick={() => insertMarkdown("## ", "", "Section Heading")}
                            title="Heading 2"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Heading2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("### ", "", "Subheading")}
                            title="Heading 3"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Heading3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("**", "**", "bold text")}
                            title="Bold (Ctrl+B)"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Bold className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("*", "*", "italic text")}
                            title="Italic (Ctrl+I)"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Italic className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("> ", "", "Editorial pull quote")}
                            title="Blockquote"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Quote className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("- ", "", "List item")}
                            title="Bullet List"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <List className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("1. ", "", "First step")}
                            title="Numbered List"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <ListOrdered className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              insertMarkdown("[", "](https://mharvy.com.ng)", "link text")
                            }
                            title="Link"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              insertMarkdown("![Caption](", ")", "https://...")
                            }
                            title="Image Embed"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("\n---\n", "", "")}
                            title="Horizontal Divider"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-[10px] font-mono text-zinc-500">
                          {wordCount} words &bull; {draft.readTime}
                        </span>
                      </div>

                      <textarea
                        ref={textareaRef}
                        rows={16}
                        value={draft.content}
                        onKeyDown={handleEditorKeyDown}
                        onChange={(e) =>
                          updateDraft((prev) => ({ ...prev, content: e.target.value }))
                        }
                        placeholder="Write your article in Markdown... (Supports ## Headings, > Quotes, **Bold**, - Lists, and ![Caption](url). Ctrl+S to save manually.)"
                        className="w-full bg-black border border-white/10 p-4 text-xs sm:text-[13px] text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-white/40 font-mono leading-relaxed resize-y"
                      />
                    </div>
                  </div>

                  {/* Metadata & Structured Takeaways */}
                  <div className="border border-white/10 bg-black p-5 sm:p-6 space-y-5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45 block">
                      Publication Settings &amp; Key Takeaways
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={draft.slug}
                          onChange={(e) => {
                            setSlugLocked(true);
                            updateDraft((prev) => ({
                              ...prev,
                              slug: slugifyTitle(e.target.value),
                            }));
                          }}
                          placeholder="auto-generated-from-title"
                          className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={draft.category}
                          onChange={(e) =>
                            updateDraft((prev) => ({ ...prev, category: e.target.value }))
                          }
                          placeholder="Brand Strategy"
                          className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                          Display Date
                        </label>
                        <input
                          type="text"
                          value={draft.publishDate}
                          onChange={(e) =>
                            updateDraft((prev) => ({ ...prev, publishDate: e.target.value }))
                          }
                          placeholder="Nov 2026"
                          className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={draft.readTime}
                          onChange={(e) => {
                            setReadTimeManual(true);
                            updateDraft((prev) => ({ ...prev, readTime: e.target.value }));
                          }}
                          placeholder="5 min read"
                          className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                        Optional Cover Image URL
                      </label>
                      <input
                        type="url"
                        value={draft.coverImage}
                        onChange={(e) =>
                          updateDraft((prev) => ({ ...prev, coverImage: e.target.value }))
                        }
                        placeholder="https://... or /books/success-engineered.jpg"
                        className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-white/40"
                      />
                    </div>

                    {/* Key Takeaways */}
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                        Core Insights &amp; Takeaways
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={takeawayInput}
                          onChange={(e) => setTakeawayInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTakeaway();
                            }
                          }}
                          placeholder="Add a takeaway bullet and press Enter..."
                          className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                        <button
                          type="button"
                          onClick={addTakeaway}
                          className="px-3.5 py-2 border border-white/25 hover:border-white text-[10px] font-mono uppercase text-white"
                        >
                          Add
                        </button>
                      </div>
                      {draft.keyTakeaways.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {draft.keyTakeaways.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between gap-2 px-3 py-2 border border-white/10 bg-zinc-950 text-xs text-zinc-300"
                            >
                              <span>&bull; {item}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateDraft((prev) => ({
                                    ...prev,
                                    keyTakeaways: prev.keyTakeaways.filter(
                                      (_, tIdx) => tIdx !== idx
                                    ),
                                  }))
                                }
                                className="text-zinc-500 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                        Tags
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="e.g. Brand Strategy, Design Systems"
                          className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/40"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-3.5 py-2 border border-white/25 hover:border-white text-[10px] font-mono uppercase text-white"
                        >
                          Add
                        </button>
                      </div>
                      {draft.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {draft.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-zinc-950 text-[10px] font-mono text-zinc-300"
                            >
                              <span>#{tag}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateDraft((prev) => ({
                                    ...prev,
                                    tags: prev.tags.filter((t) => t !== tag),
                                  }))
                                }
                                className="text-zinc-500 hover:text-white"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Synchronized Live Split Preview */}
                {viewMode === "split" && (
                  <div className="xl:col-span-5 border border-white/15 bg-black p-6 sm:p-8 xl:sticky xl:top-24 max-h-[82vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/45">
                        Live Reader Preview
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewMode("preview")}
                        className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white"
                      >
                        Expand &rarr;
                      </button>
                    </div>
                    <BlogArticlePreview
                      isPreviewMode
                      article={{
                        title: draft.title,
                        excerpt: draft.excerpt,
                        contentMarkdown: draft.content,
                        coverImage: draft.coverImage || null,
                        category: draft.category,
                        publishDate: draft.publishDate,
                        readTime: draft.readTime,
                        keyTakeaways: draft.keyTakeaways,
                        tags: draft.tags,
                        status: draft.status,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
