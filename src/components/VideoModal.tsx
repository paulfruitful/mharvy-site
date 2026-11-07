"use client";

import React from "react";
import { X, Play, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { VideoItem } from "@/types";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-poppins">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white border border-[#DDDDDD] text-left shadow-2xl relative my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player Display Container */}
          <div className="w-full aspect-video bg-slate-900 relative flex items-center justify-center border-b border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-br from-[#012A69]/80 via-slate-900 to-black flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#012A69] flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-[#012A69] translate-x-0.5" />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-200 font-proxima">
                Media Stream Active &bull; {video.category}
              </div>
              <p className="text-white font-bold text-sm sm:text-base mt-1 max-w-md font-serif-luxury">
                {video.title}
              </p>
            </div>
          </div>

          {/* Video Metadata & Highlights */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[45vh] overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#012A69] border border-blue-100 text-xs font-bold font-proxima">
                  {video.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {video.duration}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {video.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 font-mono">
                  {video.views || "1.5k"} views
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#012A69] font-serif-luxury">
                {video.title}
              </h2>
              <p className="text-sm text-[#3E3E42] mt-2 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Key takeaways */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                Core Masterclass Takeaways
              </h3>
              <div className="space-y-2">
                {(video.keyTakeaways || video.highlights || []).map((point: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#3E3E42]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External watch link */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href={video.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>Watch On Official YouTube Channel</span>
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
