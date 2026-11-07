"use client";

import React, { useState } from "react";
import {
  Play,
  Calendar,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { videos } from "@/data/videos";
import { VideoItem } from "@/types";
import { VideoModal } from "@/components/VideoModal";

export default function WatchPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Story", "Speaking", "Design Breakdown", "Documentary"];

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
                <Play className="w-4 h-4 fill-[#012A69] text-[#012A69]" />
                <span>Media &bull; Talks &bull; Masterclasses</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
                Watch the Journey <br />
                <span className="italic">Unfold in Motion.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Keynote lectures, design system walkthroughs, community documentaries, and personal reflections on creative entrepreneurship.
              </p>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all self-start md:self-auto"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#012A69] text-white font-bold shadow-sm"
                    : "bg-white text-gray-600 hover:text-[#012A69] border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg"
              >
                {/* Visual Thumbnail */}
                <div className="w-full aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                  <div className="relative z-20 w-12 h-12 rounded-full bg-white/90 text-[#012A69] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-[#012A69] translate-x-0.5" />
                  </div>

                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-[#012A69] shadow-sm font-proxima">
                      {video.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 text-[11px] text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm font-mono">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#012A69] group-hover:underline font-serif-luxury leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {video.date}
                    </span>
                    <span className="font-semibold text-[#012A69] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Watch Video &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
