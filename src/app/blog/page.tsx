"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X, Clock, Calendar } from "lucide-react";
import { posts } from "@/data/posts";
import { BlogPost } from "@/types";
import {
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  CreativeScribbleLoop,
} from "@/components/ArtisticVisuals";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F2EB] font-poppins selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO / HEADER — Field Notes & Essays
          ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Guide Line */}
        <div className="absolute top-0 left-[30%] w-[1px] h-10 bg-white/20 hidden md:block pointer-events-none" />

        <EditorialCornerCrosshairs />

        {/* Floating Creative Scribble Flourish */}
        <div className="absolute top-20 right-14 hidden lg:block z-0 pointer-events-none opacity-20">
          <CreativeScribbleLoop />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <span className="text-[10px] font-mono tracking-[0.28em] text-white/40 uppercase block mb-3">
            FIELD NOTES &amp; ARCHIVAL WRITING
          </span>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.12em] text-white uppercase leading-[1.3] font-sans max-w-2xl">
            Dispatches on Tech, <br />
            <span className="font-semibold text-white/95">Design &amp; Leadership.</span>
          </h1>

          <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed max-w-xl mt-4">
            First-hand reflections from the rooms we build, summits we direct, and systems we scale across Africa and beyond.
          </p>
        </div>
      </section>

      {/* =========================================================================
          ARTICLES LIST — Minimalist Editorial Rows (Zero Numbers, Zero Tags)
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black flex-1 overflow-hidden">
        
        <SectionRibbonWave className="top-1/2 -translate-y-1/2" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="divide-y divide-white/10 border-y border-white/10">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="py-7 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:bg-zinc-950 px-4 -mx-4 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                    {post.publishDate}
                  </span>
                  <h2 className="text-base sm:text-lg font-normal text-white group-hover:text-white transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 group-hover:text-white transition-colors flex-shrink-0 self-start md:self-auto">
                  <span>{post.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA
          ========================================================================= */}
      <section className="relative py-20 bg-black border-t border-white/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-2">
            ENGAGEMENT
          </span>
          <h2 className="text-base sm:text-lg font-normal tracking-wide text-white uppercase font-sans mb-3">
            Inquire for Keynotes &amp; Speaking
          </h2>
          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            Chibuike Godwin Marvellous speaks on designpreneurship, tech ecosystem architecture, and brand authority across continental stages.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Article Inspection Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedPost(null)}
          />

          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
            <div className="w-full max-w-2xl transform overflow-hidden bg-black border border-white/15 text-left p-6 sm:p-10 relative my-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  Published // {selectedPost.publishDate} &bull; {selectedPost.readTime}
                </span>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-normal text-white uppercase font-sans mb-4 leading-tight">
                {selectedPost.title}
              </h3>

              <p className="text-xs text-zinc-300 italic mb-6 pb-6 border-b border-white/10">
                &ldquo;{selectedPost.excerpt}&rdquo;
              </p>

              <div className="space-y-4 mb-8">
                {selectedPost.content.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-xs text-zinc-400 font-light leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {selectedPost.keyTakeaways && (
                <div className="p-5 bg-zinc-950 border border-white/10 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-3">
                    Core Insights &amp; Takeaways
                  </span>
                  <ul className="space-y-2">
                    {selectedPost.keyTakeaways.map((takeaway, tIdx) => (
                      <li
                        key={tIdx}
                        className="text-xs text-zinc-400 font-light flex items-start gap-2"
                      >
                        <span className="text-white/40 text-xs mt-0.5">&bull;</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 border border-white/30 hover:border-white text-white hover:bg-white hover:text-black text-[10px] font-mono uppercase tracking-wider transition-colors"
                >
                  Close Document
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
