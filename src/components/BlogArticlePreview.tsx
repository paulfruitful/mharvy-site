"use client";

import React from "react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export interface PreviewArticleData {
  title: string;
  excerpt: string;
  contentMarkdown: string;
  coverImage?: string | null;
  category?: string;
  publishDate: string;
  readTime: string;
  keyTakeaways: string[];
  tags: string[];
  status?: "draft" | "published";
}

interface BlogArticlePreviewProps {
  article: PreviewArticleData;
  isPreviewMode?: boolean;
}

/**
 * BlogArticlePreview
 * Shared editorial article layout used identically by both the public /blog reading
 * modal and the /admin live & full-preview system.
 */
export function BlogArticlePreview({
  article,
  isPreviewMode = false,
}: BlogArticlePreviewProps) {
  return (
    <article className="font-sans text-left">
      {/* Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-6">
        <span className="text-[10px] font-mono tracking-widest text-white/45 uppercase">
          {article.status === "draft" && isPreviewMode ? "Draft Preview" : "Published"} //{" "}
          {article.publishDate || "2026"} &bull; {article.readTime || "3 min read"}
        </span>

        {article.category && (
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase border border-white/10 px-2 py-0.5">
            {article.category}
          </span>
        )}
      </div>

      {/* Optional Cover Image */}
      {article.coverImage && (
        <div className="relative mb-6 border border-white/10 bg-black overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title || "Cover visual"}
            className="w-full max-h-80 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-normal text-white uppercase font-sans mb-4 leading-tight tracking-wide">
        {article.title || "Untitled Editorial Dispatch"}
      </h2>

      {/* Excerpt / Standfirst */}
      {article.excerpt && (
        <p className="text-xs sm:text-[13px] text-zinc-300 italic mb-6 pb-6 border-b border-white/10 leading-relaxed font-light">
          &ldquo;{article.excerpt}&rdquo;
        </p>
      )}

      {/* Body Markdown */}
      <div className="mb-8">
        {article.contentMarkdown.trim() ? (
          <MarkdownRenderer markdown={article.contentMarkdown} />
        ) : (
          <p className="text-xs text-zinc-600 italic font-mono">
            Start writing in the editor to preview the body copy here...
          </p>
        )}
      </div>

      {/* Key Takeaways */}
      {article.keyTakeaways.length > 0 && (
        <div className="p-5 bg-zinc-950 border border-white/10 mb-6">
          <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-3">
            Core Insights &amp; Takeaways
          </span>
          <ul className="space-y-2">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="text-xs text-zinc-400 font-light flex items-start gap-2 leading-relaxed"
              >
                <span className="text-white/40 text-xs mt-0.5">&bull;</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider text-zinc-500 border border-white/10 px-2.5 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
