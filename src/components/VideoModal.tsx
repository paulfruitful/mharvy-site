"use client";

import React from "react";
import { X, Play, Clock, Calendar, Check, ExternalLink } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { VideoItem } from "@/types";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  const directUrl = video.youtubeUrl || `https://www.youtube.com/@thecreativemharvy`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden bg-black border border-white/15 text-left shadow-2xl relative my-8">
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-mono">
              Archival Recording &bull; {video.date}
            </span>
            <h2 className="text-base sm:text-lg font-normal text-white uppercase tracking-wider pr-8">
              {video.title}
            </h2>
          </div>

          {/* Visual Presentation Plate */}
          <div className="w-full aspect-video bg-zinc-950 border-b border-white/10 relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Minimal Center Play Anchor */}
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-14 h-14 border border-white/30 hover:border-white bg-black/80 flex items-center justify-center text-white hover:text-[#C5A880] transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </a>

            <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {video.duration}
              </span>
              <span>Available via YouTube Channel</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[45vh] overflow-y-auto">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono block">
                Session Overview
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {video.description}
              </p>
            </div>

            {/* Core Takeaways */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono block">
                Key Strategic Takeaways
              </span>
              <div className="space-y-2.5">
                {(video.keyTakeaways || video.highlights || []).map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-zinc-500 font-mono">
                theCreative Mharvy Broadcast Archive
              </div>

              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-normal inline-flex items-center justify-center gap-2 transition-colors"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>Watch Full Session</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
