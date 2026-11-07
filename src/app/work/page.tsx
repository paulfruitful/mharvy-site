"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowUpRight,
  Sparkles,
  Award,
  ArrowRight,
  Filter,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "@/components/ProjectModal";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Brand Identity",
    "UI/UX & App",
    "Event & Conference",
    "Advocacy & Social Impact",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
              <Layers className="w-4 h-4 text-[#012A69]" />
              <span>Selected Portfolio &bull; Case Studies</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
              Work Designed for <br />
              <span className="italic">Clarity, Dignity &amp; Scale.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Explore how we partner with founders, non-profits, and event convenors to build distinctive brand systems, user-centric apps, and high-impact advocacy initiatives.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2 flex-shrink-0 font-proxima">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
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

      {/* Projects Grid */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  {/* Card Visual Header */}
                  <div
                    className={`w-full h-64 bg-gradient-to-br ${project.coverGradient} p-6 flex flex-col justify-between relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#012A69] shadow-sm">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>

                    <div className="z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/90 font-proxima">
                        Client: {project.client}
                      </span>
                      <h2 className="text-2xl font-bold text-white tracking-tight mt-1 font-serif-luxury drop-shadow-sm">
                        {project.title}
                      </h2>
                    </div>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold text-xs gap-1.5">
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-6">
                    <p className="text-sm text-[#3E3E42] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Deliverables tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#012A69] group-hover:underline inline-flex items-center gap-1">
                    Read Case Study Details &rarr;
                  </span>
                  <span className="text-xs text-gray-400">
                    Results: {project.impactMetrics[0] || "Measurable Impact"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire Mharvy CTA Bar */}
      <section className="py-16 bg-white border-t border-[#DDDDDD]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#012A69] font-serif-luxury">
            Ready to Build a Brand That Matters?
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Let&apos;s collaborate on your next brand identity, digital product launch, or strategic campaign.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg btn-mharvy-primary text-xs font-bold shadow-sm"
            >
              Start a Project Conversation
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg btn-mharvy-secondary text-xs font-semibold shadow-sm"
            >
              View Service Packages
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
