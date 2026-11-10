"use client";

import React, { useState } from "react";
import {
  Play,
  Clock,
  ExternalLink,
  ArrowRight,
  Quote,
} from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { videos, testimonials } from "@/data/videos";
import { VideoItem } from "@/types";
import { VideoModal } from "@/components/VideoModal";
import {
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  ArtisticUnderline,
} from "@/components/ArtisticVisuals";

export default function WatchPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#C5A880] selection:text-black">
      {/* Editorial Header */}
      <section className="relative pt-32 pb-16 border-b border-white/10 overflow-hidden">
        <SectionRibbonWave className="text-white/[0.04] top-6" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-mono">
                  Broadcasts &bull; Keynotes &bull; Documentary
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal uppercase tracking-wider text-white">
                Ideas &amp; Strategy in Motion.
              </h1>
              <div className="w-16">
                <ArtisticUnderline className="text-[#C5A880]" />
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed">
                Archival recordings of keynotes, tech summit addresses, and documentary reflections
                on brand positioning, design systems, and grassroots community leadership across Africa.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@thecreativemharvy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/20 text-white hover:border-[#C5A880] hover:text-[#C5A880] text-xs uppercase tracking-widest transition-colors self-start md:self-auto"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>YouTube Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Video Archive Grid */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative border border-white/10 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.02] p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer"
              >
                <EditorialCornerCrosshairs />

                {/* Video Media Plate */}
                <div className="w-full aspect-video bg-zinc-950 border border-white/10 relative flex items-center justify-center overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Minimal Play Icon */}
                  <div className="relative z-10 w-12 h-12 border border-white/30 group-hover:border-white bg-black/80 flex items-center justify-center text-white group-hover:text-[#C5A880] transition-transform group-hover:scale-105">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>

                  <div className="absolute top-3 left-4 z-10 text-[10px] font-mono text-[#C5A880] uppercase tracking-widest">
                    {video.date}
                  </div>

                  <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="text-sm font-normal uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {video.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Archival Record</span>
                  <span className="text-white group-hover:text-[#C5A880] flex items-center gap-1 transition-colors uppercase tracking-wider text-[10px]">
                    Inspect Notes &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Testimonials */}
          <div className="mt-28 border-t border-white/10 pt-16">
            <div className="space-y-3 mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
                Stakeholder &bull; Institutional Endorsement
              </span>
              <h2 className="text-base sm:text-lg font-normal uppercase tracking-wider text-white">
                Trusted by Founders, Convenors &amp; Policy Leaders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="border border-white/10 bg-white/[0.01] p-8 relative flex flex-col justify-between"
                >
                  <EditorialCornerCrosshairs />
                  <div className="space-y-4">
                    <Quote className="w-5 h-5 text-[#C5A880]/60 stroke-[1.5]" />
                    <p className="text-xs text-zinc-300 font-light leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
                    <h4 className="text-xs font-normal uppercase tracking-wider text-white">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light">
                      {t.role} &bull; <span className="text-zinc-500">{t.company}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Detail Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
