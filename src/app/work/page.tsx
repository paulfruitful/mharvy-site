"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "@/components/ProjectModal";
import {
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  CreativeScribbleLoop,
} from "@/components/ArtisticVisuals";
import { Reveal } from "@/components/Reveal";

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F2EB] font-poppins selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO / HEADER — Minimalist, Small Text, Classic Premium
          ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Guide Line */}
        <div className="absolute top-0 left-[35%] w-[1px] h-10 bg-white/20 hidden md:block pointer-events-none" />

        {/* Minimal Corner Crosshairs */}
        <EditorialCornerCrosshairs />

        {/* Floating Creative Scribble Flourish in Whitespace */}
        <div className="absolute top-24 right-16 hidden lg:block z-0 pointer-events-none opacity-20">
          <CreativeScribbleLoop />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <span className="animate-hero-rise text-[10px] font-mono tracking-[0.28em] text-white/40 uppercase block mb-3">
            PORTFOLIO &amp; ENGAGEMENTS
          </span>

          <h1
            style={{ animationDelay: "100ms" }}
            className="animate-hero-rise text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.12em] text-white uppercase leading-[1.3] font-sans max-w-2xl"
          >
            Selected Work &amp; <br />
            <span className="font-semibold text-white/95">Strategic Architecture.</span>
          </h1>

          <p
            style={{ animationDelay: "200ms" }}
            className="animate-hero-rise text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed max-w-xl mt-4"
          >
            A curated record of large-scale technology summits, pan-African conferences, mobile applications, and mission-driven venture rebuilds.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SELECTED PROJECTS GRID — Solid Black, Minimalist, Zero Numbering/Tags
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black flex-1 overflow-hidden">
        
        {/* Section Ribbon Wave */}
        <SectionRibbonWave className="top-1/3" />
        <SectionRibbonWave className="bottom-10" flip={true} />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, idx) => (
              <Reveal key={project.id} delay={(idx % 2) * 90}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="h-full group cursor-pointer p-6 sm:p-8 bg-black/80 backdrop-blur-xs border border-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                        Client: {project.client}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {project.year}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-medium text-white tracking-normal font-sans group-hover:text-white transition-colors mb-3">
                      {project.title}
                    </h2>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.slice(0, 2).map((d) => (
                        <span
                          key={d}
                          className="text-[10px] font-mono text-zinc-500"
                        >
                          {d} &bull;
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] font-mono tracking-wider text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA — Direct Inquiry
          ========================================================================= */}
      <section className="relative py-20 bg-black border-t border-white/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-2">
            ENGAGEMENT
          </span>
          <h2 className="text-base sm:text-lg font-normal tracking-wide text-white uppercase font-sans mb-3">
            Have a project or conference in mind?
          </h2>
          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            Available for end-to-end creative direction, communications strategy, and tech ecosystem architecture worldwide.
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

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
