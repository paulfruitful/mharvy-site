"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import {
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  CreativeScribbleLoop,
} from "@/components/ArtisticVisuals";

const competencies = [
  {
    title: "Brand Strategy & Positioning",
    desc: "Market moat formulation, value proposition architecture, and narrative design for high-growth tech ventures and enterprises.",
  },
  {
    title: "Corporate Communications",
    desc: "Structuring cross-border institutional messaging, stakeholder alignment, press releases, and multi-channel public presence.",
  },
  {
    title: "Stakeholder Engagement & Partnerships",
    desc: "Convening coalitions, institutional sponsors, ministries, and ecosystem partners across major summits and award platforms.",
  },
  {
    title: "Cross-Functional Team Leadership",
    desc: "Directing multi-disciplinary engineering, spatial, and creative teams to deliver complex tech deployments under tight deadlines.",
  },
  {
    title: "Content Strategy & Storytelling",
    desc: "Transforming dry technical and operational frameworks into compelling, high-trust human narratives and investor decks.",
  },
  {
    title: "Operational Oversight",
    desc: "Rebuilding organizational processes, visual standardization, brand audit frameworks, and cross-platform governance.",
  },
  {
    title: "Budget Management & Resource Allocation",
    desc: "Disciplined allocation of creative and technical production capital for summits reaching thousands of delegates.",
  },
  {
    title: "Digital Literacy & Capacity Building",
    desc: "Designing and leading grassroots bootcamp curriculums, mentoring over 200 young innovators in software and digital skills.",
  },
];

const careerRoles = [
  {
    period: "2026",
    role: "Communications Strategist & Creative Design Lead",
    org: "International Youth Day Conference (IYD26) & The Future Awards Africa Independent (TFAAi)",
    location: "Abia, Nigeria",
    points: [
      "Led the end-to-end creative direction and communications strategy for 1,200+ attendees.",
      "Engineered the core tech deployments and official website infrastructure for event positioning.",
      "Developed comprehensive visual identity assets, print collateral, and partner communications.",
    ],
  },
  {
    period: "2025",
    role: "Lead Designer & Communications Strategist",
    org: "Download Tech Event 2025",
    location: "Nnewi, Nigeria",
    points: [
      "Spearheaded creative direction and communications strategy attracting 1,500+ tech builders and engineers.",
      "Designed and deployed the summit visual identity across digital, print, and on-site spatial touchpoints.",
      "Aligned corporate sponsors, manufacturing partners, and software developer communities.",
    ],
  },
  {
    period: "2025",
    role: "Creative Design Lead",
    org: "International Road Crash Victims Africa Conference (IRCVAC)",
    location: "Abuja, Nigeria",
    points: [
      "Delivered master visual communications, official conference brochures, and spatial branding for pan-African delegates.",
      "Coordinated with ministries, policy coalitions, and safety organizations across the African continent.",
    ],
  },
  {
    period: "2025",
    role: "Lead Designer",
    org: "The Pivot Conference 3.0",
    location: "Awka, Nigeria",
    points: [
      "Executed complete creative direction across all touchpoints, recording 3,000+ in verified attendance.",
      "Delivered 25+ print and digital assets within tight production timelines while maintaining premium standards.",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Brand Manager",
    org: "Vision Incubation Hub",
    location: "Nigeria",
    points: [
      "Led the strategic repositioning and brand rebuild during operational restructuring, restoring stakeholder confidence.",
      "Developed brand frameworks, messaging architecture, and brand audit workshops for portfolio startups.",
      "Managed integrated campaigns that strengthened partnerships and directly supported venture funding outcomes.",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Business Relationship Manager",
    org: "Syticks Nigeria",
    location: "Nigeria",
    points: [
      "Managed strategic client relationships, aligning service delivery with business objectives and long-term partnership growth.",
    ],
  },
  {
    period: "2022 – 2023",
    role: "Communications Lead",
    org: "Vision Incubation Hub",
    location: "Nigeria",
    points: [
      "Supported organizational communications strategy across digital and offline platforms.",
      "Engineered marketing collateral, investor pitch decks, and campaign assets for fundraising.",
    ],
  },
  {
    period: "2022 – 2023",
    role: "Creative Designer & Communications Strategist",
    org: "Vision Alive Foundation",
    location: "Nigeria",
    points: [
      "Developed visual identity assets and structured communications to elevate community engagement and digital reach.",
    ],
  },
  {
    period: "2017 – 2019",
    role: "Digital Literacy & Computer Science Instructor",
    org: "Fr. Basil Seminary School",
    location: "Abia State, Nigeria",
    points: [
      "Taught foundational computer science and digital literacy across primary and secondary levels.",
      "Initiated weekend and summer bootcamps to introduce emerging digital software tools to youth.",
    ],
  },
];

const technicalStack = [
  {
    category: "Design & Creative Systems",
    items: ["Figma", "Adobe Creative Cloud Suite", "CorelDRAW", "Affinity by Canva", "Canva", "Capcut"],
  },
  {
    category: "Marketing, Growth & Analytics",
    items: ["Meta Ads Manager", "Google Analytics", "Google Search Console", "Content Architecture"],
  },
  {
    category: "Collaboration & Workflow",
    items: ["Slack", "Google Workspace", "Notion", "Asana"],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F2EB] font-poppins selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO / HEADER — Executive Dossier
          ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Guide Line */}
        <div className="absolute top-0 left-[45%] w-[1px] h-10 bg-white/20 hidden md:block pointer-events-none" />

        <EditorialCornerCrosshairs />

        {/* Floating Creative Scribble Flourish */}
        <div className="absolute top-20 right-16 hidden lg:block z-0 pointer-events-none opacity-20">
          <CreativeScribbleLoop />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <span className="animate-hero-rise text-[10px] font-mono tracking-[0.28em] text-white/40 uppercase block mb-3">
            EXECUTIVE PROFILE &amp; COMPETENCIES
          </span>

          <h1
            style={{ animationDelay: "100ms" }}
            className="animate-hero-rise text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.12em] text-white uppercase leading-[1.3] font-sans max-w-2xl"
          >
            Strategic Architecture, <br />
            <span className="font-semibold text-white/95">Leadership &amp; Governance.</span>
          </h1>

          <p
            style={{ animationDelay: "200ms" }}
            className="animate-hero-rise text-xs sm:text-[13px] text-zinc-300 font-light leading-relaxed max-w-2xl mt-4"
          >
            Creative Director | Brand Strategist | Special Adviser to the President on Media, Technology &amp; Innovation, IHRPS Nigeria | Digital Literacy &amp; Youth Development Advocate
          </p>

          <p
            style={{ animationDelay: "260ms" }}
            className="animate-hero-rise text-xs text-zinc-500 font-light leading-relaxed max-w-2xl mt-2.5"
          >
            Track record of rebuilding and scaling mission-driven organizations, tech summits, and digital platforms through strategic branding and operational leadership.
          </p>
        </div>
      </section>

      {/* =========================================================================
          CORE COMPETENCIES — 8-Pillar Minimalist Grid
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        <SectionRibbonWave className="top-1/2 -translate-y-1/2" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                CAPABILITIES
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                Core Competencies
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-light max-w-md">
              Disciplined frameworks deployed across corporate communications, ecosystem building, and product strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 backdrop-blur-xs">
            {competencies.map((comp) => (
              <div
                key={comp.title}
                className="p-6 sm:p-7 flex flex-col justify-between bg-black/80 hover:bg-zinc-950 transition-colors"
              >
                <div>
                  <h3 className="text-sm font-medium text-white tracking-normal font-sans mb-3">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CAREER & INSTITUTIONAL LEADERSHIP HISTORY — Chronological Record
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                RECORD OF LEADERSHIP
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                Professional Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              2017 – Present // Verified Track Record
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {careerRoles.map((role) => (
              <div
                key={`${role.period}-${role.org}`}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 hover:bg-zinc-950/60 px-4 -mx-4 transition-colors"
              >
                {/* Left: Period & Location */}
                <div className="lg:col-span-3">
                  <span className="text-xs font-mono text-white/90 font-medium block">
                    {role.period}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                    {role.location}
                  </span>
                </div>

                {/* Center: Role & Organization */}
                <div className="lg:col-span-4">
                  <h3 className="text-sm sm:text-base font-medium text-white font-sans">
                    {role.role}
                  </h3>
                  <span className="text-xs text-zinc-400 font-light block mt-1">
                    {role.org}
                  </span>
                </div>

                {/* Right: Key Milestones */}
                <div className="lg:col-span-5 space-y-2">
                  {role.points.map((pt, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-xs text-zinc-400 font-light leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-white/30 text-xs mt-0.5">&bull;</span>
                      <span>{pt}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          EDUCATION, CERTIFICATIONS & TOOLS GRID
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Education & Academic Rigor */}
            <div className="p-7 bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-2">
                  ACADEMIC FOUNDATION
                </span>
                <h3 className="text-base font-medium text-white font-sans uppercase mb-6">
                  Education
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-medium text-white">
                      Ogbonnaya Onu Polytechnic | Aba, Nigeria
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      H.ND in Office Technology &amp; Management (In view)
                    </p>
                    <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                      Expected Completion: 2030
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-medium text-white">
                      Boys Technical College, Osusu | Abia State, Nigeria
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      Senior Secondary Certificate Examination (SSCE)
                    </p>
                    <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                      Graduated: 2011
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Specialized Certifications */}
            <div className="p-7 bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-2">
                  VERIFIED TRAINING
                </span>
                <h3 className="text-base font-medium text-white font-sans uppercase mb-6">
                  Certifications
                </h3>

                <div className="space-y-4 divide-y divide-white/5">
                  <div className="first:pt-0 pt-3">
                    <span className="text-xs text-white block">
                      Advanced Graphic Design &amp; Internship
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Vision Incubation Hub (2022, 2023)
                    </span>
                  </div>

                  <div className="pt-3">
                    <span className="text-xs text-white block">
                      Graphics Training (Intermediate)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Connak Foundation (2024)
                    </span>
                  </div>

                  <div className="pt-3">
                    <span className="text-xs text-white block">
                      Open Art Design &amp; Enterprise Development
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Open Art (2022)
                    </span>
                  </div>

                  <div className="pt-3">
                    <span className="text-xs text-white block">
                      Web Design &amp; Digital Marketing
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      19Hub (2017, 2018) &bull; Sololearn HTML/CSS (2018)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Leadership & Civic Recognition */}
            <div className="p-7 bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-2">
                  CIVIC IMPACT
                </span>
                <h3 className="text-base font-medium text-white font-sans uppercase mb-6">
                  Recognition &amp; Stack
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-zinc-950 border border-white/10">
                    <span className="text-[10px] font-mono text-white/50 uppercase block mb-1">
                      Civic Recognition
                    </span>
                    <h4 className="text-xs font-semibold text-white">
                      CivicConnect Hackathon Mentor
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light mt-1">
                      Ministry of Science, Technology and Innovation | Abia State, Nigeria.
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-2">
                      Primary Tools
                    </span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Figma, Adobe Creative Suite, CorelDRAW, Meta Ads, Google Analytics, Slack, Google Workspace.
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 block pt-4 border-t border-white/5">
                    References available upon executive request.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA
          ========================================================================= */}
      <section className="relative py-24 bg-black text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-2">
            ENGAGEMENT
          </span>
          <h2 className="text-base sm:text-lg font-normal tracking-wide text-white uppercase font-sans mb-3">
            Partner on Strategic Advisory
          </h2>
          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            Available for executive advisory, tech summit creative direction, and venture brand positioning.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
