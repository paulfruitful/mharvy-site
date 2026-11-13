import { supabase } from "@/lib/supabase";
import { posts as staticPosts } from "@/data/posts";
import { BlogPost } from "@/types";

export interface DBBlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  key_takeaways: string[];
  tags: string[];
  cover_image: string | null;
  read_time: string;
  publish_date: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminPostPayload {
  id?: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  key_takeaways: string[];
  tags: string[];
  cover_image: string | null;
  read_time: string;
  publish_date: string;
  status: "draft" | "published";
  published_at?: string | null;
}

export function slugifyTitle(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export function formatDisplayDate(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function dbRowToBlogPost(row: DBBlogPost): BlogPost {
  const paragraphs = row.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category || "Brand Strategy",
    excerpt: row.excerpt || "",
    content: paragraphs,
    rawContent: row.content,
    coverImage: row.cover_image,
    keyTakeaways: Array.isArray(row.key_takeaways) ? row.key_takeaways : [],
    publishDate: row.publish_date || formatDisplayDate(),
    readTime: row.read_time || estimateReadTime(row.content),
    tags: Array.isArray(row.tags) ? row.tags : [],
    status: row.status,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

/**
 * Fetches published articles from Supabase and merges them cleanly with fallback static posts
 * (Supabase records override static entries with the same slug).
 */
export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return staticPosts;
    }

    const dbPosts = (data as DBBlogPost[]).map(dbRowToBlogPost);
    const dbSlugs = new Set(dbPosts.map((p) => p.slug));
    const remainingStatic = staticPosts.filter((p) => !dbSlugs.has(p.slug));
    return [...dbPosts, ...remainingStatic];
  } catch {
    return staticPosts;
  }
}

export async function fetchAllAdminPosts(): Promise<{
  posts: DBBlogPost[];
  missingTable: boolean;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    const missingTable =
      error.message.includes("schema cache") ||
      error.message.includes("does not exist");
    return { posts: [], missingTable, error: error.message };
  }

  return {
    posts: (data as DBBlogPost[]) || [],
    missingTable: false,
    error: null,
  };
}

export async function upsertAdminPost(
  payload: AdminPostPayload
): Promise<{ data: DBBlogPost | null; error: string | null }> {
  const record = {
    ...(payload.id ? { id: payload.id } : {}),
    slug: payload.slug,
    title: payload.title,
    category: payload.category,
    excerpt: payload.excerpt,
    content: payload.content,
    key_takeaways: payload.key_takeaways,
    tags: payload.tags,
    cover_image: payload.cover_image || null,
    read_time: payload.read_time,
    publish_date: payload.publish_date,
    status: payload.status,
    published_at:
      payload.status === "published"
        ? payload.published_at || new Date().toISOString()
        : null,
  };

  if (payload.id) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(record)
      .eq("id", payload.id)
      .select()
      .single();

    return {
      data: (data as DBBlogPost) || null,
      error: error ? error.message : null,
    };
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(record)
    .select()
    .single();

  return {
    data: (data as DBBlogPost) || null,
    error: error ? error.message : null,
  };
}

export async function deleteAdminPost(
  id: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  return { error: error ? error.message : null };
}

export async function seedStaticPostsToSupabase(): Promise<{
  inserted: number;
  error: string | null;
}> {
  const rows = staticPosts.map((p, index) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    content: p.content.join("\n\n"),
    key_takeaways: p.keyTakeaways || [],
    tags: p.tags || [],
    cover_image: null,
    read_time: p.readTime,
    publish_date: p.publishDate,
    status: "published" as const,
    published_at: new Date(Date.now() - index * 86400000).toISOString(),
  }));

  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" })
    .select();

  return {
    inserted: data ? data.length : 0,
    error: error ? error.message : null,
  };
}
