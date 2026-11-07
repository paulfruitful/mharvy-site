"use client";

import React from "react";
import { X, CheckCircle2, ArrowRight, Sparkles, Layers, Award } from "lucide-react";
import { Project } from "@/types";
import Link from "next/link";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-poppins">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white border border-[#DDDDDD] text-left shadow-2xl relative my-8">
          {/* Header Banner */}
          <div
            className={`w-full h-48 sm:h-56 bg-gradient-to-br ${project.coverGradient} p-6 sm:p-8 flex flex-col justify-between relative border-b border-gray-200`}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 text-[#012A69] shadow-sm">
                {project.category}
              </span>
              <span className="text-xs font-mono font-bold text-white bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                {project.year}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-white/90 uppercase tracking-widest font-proxima">
                Client: {project.client}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-serif-luxury drop-shadow-sm">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                Executive Overview
              </h3>
              <p className="text-sm text-[#3E3E42] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* The Challenge & The Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] block mb-2 font-proxima">
                  The Strategic Challenge
                </span>
                <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] block mb-2 font-proxima">
                  The Creative Solution
                </span>
                <p className="text-xs sm:text-sm text-[#012A69] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Results & Key Metrics */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                Measurable Impact &amp; Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.impactMetrics.map((res: string, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-[#DDDDDD] flex items-center gap-2.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#012A69]">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables tags */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                Key Deliverables
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial if present */}
            {project.testimonial && (
              <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD] relative">
                <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] block mb-2 font-proxima">
                  Stakeholder Quote
                </span>
                <blockquote className="italic text-xs sm:text-sm text-[#3E3E42] leading-relaxed font-serif">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-3 text-xs text-[#012A69] font-semibold">
                  {project.testimonial.author} &bull; {project.testimonial.role}
                </div>
              </div>
            )}

            {/* CTA action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Need a similar high-trust identity system for your brand?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
                >
                  <span>Book Marvellous</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
