"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { posts } from "@/data/posts";
import { BlogPost } from "@/types";
import { useCart } from "@/context/CartContext";

export function ArticleModal({
  post,
  onClose,
}: {
  post: BlogPost | null;
  onClose: () => void;
}) {
  const { showToast } = useCart();

  if (!post) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Article link copied to clipboard!");
    } else {
      showToast("Article link copied!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-poppins">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white border border-[#DDDDDD] text-left shadow-2xl relative my-8">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#012A69] border border-blue-100 font-proxima">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> {post.readTime}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {post.publishDate}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-[#012A69] font-serif-luxury tracking-tight mt-1">
                {post.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-[#012A69] hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <p className="text-base text-gray-700 leading-relaxed font-serif italic border-l-4 border-[#012A69] pl-4 py-1">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            <div className="space-y-4 text-sm text-[#3E3E42] leading-relaxed">
              {post.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] block mb-1 font-proxima">
                Key Strategic Takeaway
              </span>
              <p className="text-xs sm:text-sm text-[#3E3E42]">
                Consistent brand messaging paired with uncompromising visual restraint turns arbitrary pricing debates into immediate enterprise trust.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Written by</span>
              <strong className="text-xs text-[#012A69]">Chibuike Godwin Marvellous</strong>
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-white flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Brand Strategy",
    "Designpreneurship",
    "Product Design",
    "Advocacy",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
              <BookOpen className="w-4 h-4 text-[#012A69]" />
              <span>Articles &bull; Strategic Notes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
              Thoughts on Design, <br />
              <span className="italic">Influence &amp; Commerce.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Essays and frameworks by Chibuike Godwin Marvellous on turning craft into commercially resilient ventures.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] placeholder:text-gray-400 focus:outline-none focus:border-[#012A69] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#012A69] text-white font-bold shadow-sm"
                      : "bg-white text-gray-600 hover:text-[#012A69] border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg"
              >
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-[#012A69] border border-blue-100 font-proxima">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#012A69] group-hover:underline font-serif-luxury leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.publishDate}</span>
                  <span className="text-xs font-bold text-[#012A69] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Essay &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ArticleModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
