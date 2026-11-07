"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Palette,
  Layers,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

export default function ServicesPage() {
  const serviceLines = [
    {
      id: "brand-strategy",
      number: "01",
      title: "Brand Strategy & Market Positioning",
      icon: Compass,
      tagline: "Clarifying what you do, who it's for, and why anyone should care.",
      description:
        "Before touching colors or typography, we dissect your market reality, competitive moat, customer psychology, and foundational value proposition. We build the strategic bedrock that makes subsequent marketing effortless.",
      deliverables: [
        "Core Brand Positioning Statement & Tagline Architecture",
        "Target Audience Archetypes & Buyer Persona Friction Maps",
        "Competitor Differentiation Grid & Strategic Moat",
        "Brand Personality, Tone of Voice & Narrative Guidelines",
        "Commercial Value Proposition & Elevator Pitch Formats",
      ],
      idealFor: "Early-stage founders, pivoting companies, and organizations seeking razor-sharp market authority.",
      timeline: "2 to 3 weeks",
    },
    {
      id: "visual-identity",
      number: "02",
      title: "Visual Communications & Identity Systems",
      icon: Palette,
      tagline: "Engineering iconic, high-trust visual language that turns first impressions into lasting trust.",
      description:
        "We build complete, coherent design systems that project institutional maturity. From distinctive logo marks and bespoke typography pairings to environmental graphics and editorial publications.",
      deliverables: [
        "Primary, Secondary & Monogram Logo Suites (Vector & Web formats)",
        "Curated Color Palette (Pantone, CMYK, RGB & Hex specs)",
        "Typography Hierarchy, Font Licensing & Pairing System",
        "30+ Page Master Brand Guidelines Document (PDF & Figma)",
        "Stationery, Presentation Decks & Social Media Design Kit",
      ],
      idealFor: "Startups launching to market, established brands rebranding, and high-stakes summits.",
      timeline: "3 to 4 weeks",
    },
    {
      id: "ui-ux-design",
      number: "03",
      title: "UI/UX & Digital Product Design",
      icon: Layers,
      tagline: "Human-centric digital interfaces that convert curiosity into transactions.",
      description:
        "Inspired by our groundbreaking work on apps like BuyOne, we design sleek, intuitive mobile and web applications optimized for speed, low bandwidth, and zero checkout anxiety.",
      deliverables: [
        "User Journey Mapping & Information Architecture",
        "Interactive Wireframes & High-Fidelity Prototypes (Figma)",
        "Comprehensive UI Component Design System & Design Tokens",
        "Micro-Interactions, Animation Directives & Empty States",
        "Developer Hand-off Documentation & Design QA Support",
      ],
      idealFor: "Fintech, e-commerce, consumer mobile apps, and SaaS platforms.",
      timeline: "4 to 6 weeks",
    },
    {
      id: "advocacy-mentorship",
      number: "04",
      title: "Keynotes, Workshops & Creative Advocacy",
      icon: Users,
      tagline: "Empowering the next generation of African designers and changemakers.",
      description:
        "Drawing from years of youth advocacy and creative leadership, Chibuike Godwin Marvellous delivers high-octane keynotes and hands-on masterclasses at major tech conferences and institutions.",
      deliverables: [
        "Keynote Presentations on Designpreneurship & Brand Building",
        "Interactive Executive Strategy Alignment Workshops",
        "Youth Skill Acquisition Cohorts & Design Masterclasses",
        "Post-Event Action Blueprints & Attendee Framework Handouts",
        "Panel Moderation & High-Level Cultural Roundtables",
      ],
      idealFor: "Conference organizers, university bodies, youth forums, and corporate offsites.",
      timeline: "Single day or multi-week residency",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
              <Zap className="w-4 h-4 text-[#012A69]" />
              <span>Commercial Capabilities &bull; Engagement Models</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
              Services Tailored for <br />
              <span className="italic">Measurable Commercial Lift.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Every engagement is architected to eliminate marketing ambiguity, command premium pricing power, and install lasting visual equity.
            </p>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {serviceLines.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="p-8 sm:p-10 rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] transition-all shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold font-mono text-[#012A69] bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                        {svc.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#012A69] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#012A69] font-serif-luxury tracking-tight">
                      {svc.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold text-[#012A69] italic font-serif">
                      &ldquo;{svc.tagline}&rdquo;
                    </p>

                    <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="pt-2 flex flex-col gap-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-[#012A69]" />
                        <span>Timeline: <strong>{svc.timeline}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-3.5 h-3.5 text-[#012A69]" />
                        <span>Best for: <strong>{svc.idealFor}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-[#F8F9FA] p-6 sm:p-8 rounded-xl border border-[#DDDDDD] space-y-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] block font-proxima">
                      Guaranteed Deliverables &bull; Scope Included
                    </span>

                    <div className="space-y-3">
                      {svc.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3E3E42]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-gray-500">
                        Custom scopes tailored upon consultation
                      </span>
                      <Link
                        href="/contact"
                        className="px-5 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Process */}
      <section className="py-20 bg-white border-t border-[#DDDDDD]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#012A69] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-proxima">
              The Methodology
            </span>
            <h2 className="text-3xl font-bold text-[#012A69] font-serif-luxury mt-3">
              How We Work Together
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              A collaborative, predictable framework that guarantees clarity from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
              <span className="text-2xl font-black text-[#012A69] font-serif-luxury">01</span>
              <h3 className="text-base font-bold text-[#012A69] mt-2 font-poppins">Discovery &amp; Audit</h3>
              <p className="text-xs text-[#3E3E42] mt-2 leading-relaxed">
                Deep dive into your market landscape, competitor vulnerabilities, and target customer mindset.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
              <span className="text-2xl font-black text-[#012A69] font-serif-luxury">02</span>
              <h3 className="text-base font-bold text-[#012A69] mt-2 font-poppins">Strategic Architecture</h3>
              <p className="text-xs text-[#3E3E42] mt-2 leading-relaxed">
                Defining the narrative pillars, positioning statements, and core value hierarchy.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
              <span className="text-2xl font-black text-[#012A69] font-serif-luxury">03</span>
              <h3 className="text-base font-bold text-[#012A69] mt-2 font-poppins">Visual Engineering</h3>
              <p className="text-xs text-[#3E3E42] mt-2 leading-relaxed">
                Crafting the identity system, digital interfaces, typography rules, and collateral assets.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD]">
              <span className="text-2xl font-black text-[#012A69] font-serif-luxury">04</span>
              <h3 className="text-base font-bold text-[#012A69] mt-2 font-poppins">Deployment &amp; QA</h3>
              <p className="text-xs text-[#3E3E42] mt-2 leading-relaxed">
                Full handover of source assets, production guidelines, and launch-day technical support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
