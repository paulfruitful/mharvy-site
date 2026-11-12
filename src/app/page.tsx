"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { projects } from "@/data/projects";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { Project, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProjectModal } from "@/components/ProjectModal";
import { ProductModal } from "@/components/ProductModal";
import {
  HeroFluidRibbon,
  CreativeScribbleLoop,
  ArtisticUnderline,
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  EngagementRibbonLoop,
} from "@/components/ArtisticVisuals";
import { PartnerLogos } from "@/components/PartnerLogos";
import { Reveal } from "@/components/Reveal";

const pillars = [
  {
    title: "Digital Products & App Systems",
    desc: "Human-centered UX architecture, low-latency mobile flows, and checkout ergonomics for high-scale platforms (e.g. BuyOne).",
  },
  {
    title: "Venture Brand Architecture",
    desc: "Authoritative brand identities, design systems, and commercial positioning for high-growth technology startups.",
  },
  {
    title: "Tech Summits & Ecosystems",
    desc: "Curating premier developer gatherings, innovation summits, and community platforms across Africa (Download Tech, YALCON).",
  },
  {
    title: "Executive Advisory for Founders",
    desc: "High-stakes strategic counsel aligning market positioning, product clarity, and institutional authority for global scale.",
  },
];

export default function HomePage() {
  const { formatPrice, addToCart } = useCart();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProjects = projects.slice(0, 4);
  const featuredProducts = products.slice(0, 3);
  const featuredPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F2EB] font-poppins selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO SECTION — Minimalist, Small Text, Classic Premium
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center overflow-hidden bg-black text-[#F5F2EB] border-b border-white/10">
        
        {/* Artistic Fluid Ribbon in Background Negative Space */}
        <HeroFluidRibbon />

        {/* Minimal Drafting Crosshairs & Coordinate Accents */}
        <EditorialCornerCrosshairs />

        {/* Floating Creative Scribble Flourish in Center Whitespace */}
        <div className="absolute top-[30%] left-[46%] hidden xl:block z-0 pointer-events-none">
          <CreativeScribbleLoop />
        </div>

        {/* Architectural Guide Ticks (Matching Wireframe at 44%, 58%, 70%) */}
        <div className="absolute top-0 left-[44%] w-[1px] h-8 sm:h-10 bg-white/25 hidden md:block z-20 pointer-events-none animate-hairline-breathe" />
        <div className="absolute top-0 left-[58%] w-[1px] h-8 sm:h-10 bg-white/25 hidden md:block z-20 pointer-events-none animate-hairline-breathe [animation-delay:1.2s]" />
        <div className="absolute top-0 left-[70%] w-[1px] h-8 sm:h-10 bg-white/25 hidden md:block z-20 pointer-events-none animate-hairline-breathe [animation-delay:2.4s]" />

        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-between relative z-10 pt-20 pb-16">
          
          {/* Left Column: Small, Restrained, Classic Premium Typography */}
          <div className="w-full lg:w-[52%] flex flex-col items-start justify-center h-full text-left py-6 z-20">
            
            <h1
              style={{ animationDelay: "120ms" }}
              className="animate-hero-rise text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.14em] text-white uppercase leading-[1.3] font-sans"
            >
              Building Brands <br />
              <span className="font-semibold text-white/95">That Shape Technology &amp; Innovation.</span>
            </h1>

            {/* Subtle Artistic Underline Accent */}
            <div style={{ animationDelay: "260ms" }} className="animate-hero-rise">
              <ArtisticUnderline className="mt-2.5 opacity-60" />
            </div>

            <div style={{ animationDelay: "380ms" }} className="animate-hero-rise mt-8 sm:mt-10">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 group shadow-lg"
                aria-label="Explore My Work"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Column: Blended Portrait (Image B) */}
          <div
            style={{ animationDelay: "220ms" }}
            className="animate-hero-rise absolute lg:relative right-0 bottom-0 h-[65vh] sm:h-[75vh] lg:h-[86vh] xl:h-[90vh] max-h-[880px] w-full lg:w-[48%] flex items-end justify-center lg:justify-end pointer-events-none z-10 opacity-30 lg:opacity-100 transition-opacity"
          >
            <div className="relative h-full w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[620px] flex items-end">
              <Image
                src="/mharvy-portrait-b.png"
                alt="Chibuike Godwin Marvellous — theCreative Mharvy"
                fill
                priority
                className="object-contain object-bottom filter contrast-[1.05] brightness-[0.98]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              />
              {/* Smooth Bottom Blend into Solid Black */}
              <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />
              {/* Soft Left Blend into Solid Black */}
              <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-black via-black/40 to-transparent z-10 hidden lg:block" />
            </div>
          </div>

        </div>

        {/* Minimal Scroll Indicator */}
        <a
          href="#partners"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/35 hover:text-white transition-colors duration-300 group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-[9px] tracking-[0.28em] uppercase font-mono text-white/30 group-hover:text-white/70 transition-colors">Scroll</span>
          <ChevronDown className="w-4 h-4 stroke-[1.5] animate-bounce" />
        </a>

      </section>

      {/* =========================================================================
          SELECTED VENTURES & PARTNERS (Brands from /public/brands)
          ========================================================================= */}
      <section id="partners" className="relative py-14 sm:py-16 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Tick */}
        <div className="absolute top-0 left-[20%] w-[1px] h-6 bg-white/20 hidden md:block pointer-events-none" />

        {/* Minimal Drafting Crosshairs */}
        <EditorialCornerCrosshairs className="opacity-15" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                SELECTED VENTURES &amp; PARTNERS
              </span>
              <span className="text-[11px] font-sans text-zinc-500 font-light">
                Collaborations across technology, media &amp; enterprise
              </span>
            </div>
          </Reveal>

          <PartnerLogos />

        </div>
      </section>

      {/* =========================================================================
          CAPABILITIES — Strategic Pillars in Technology & Innovation
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Flowing Section Ribbon Wave */}
        <SectionRibbonWave className="top-1/2 -translate-y-1/2" />

        {/* Floating Creative Scribble Accent in Top Right Whitespace */}
        <div className="absolute top-8 right-12 hidden lg:block z-0 pointer-events-none opacity-25 scale-75">
          <CreativeScribbleLoop />
        </div>

        {/* Subtle Architectural Tick */}
        <div className="absolute top-0 left-[50%] w-[1px] h-8 bg-white/20 hidden md:block pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Header */}
          <Reveal>
            <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                  CAPABILITIES
                </span>
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                  Technology, Architecture &amp; Scale
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-light max-w-md">
                Bridging digital platform engineering with high-trust commercial brand positioning.
              </p>
            </div>
          </Reveal>

          {/* Minimal 4-Grid: Zero Numbering, Zero Categorization Tags */}
          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 backdrop-blur-xs">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 sm:p-8 flex flex-col justify-between bg-black/80 hover:bg-zinc-950 transition-colors duration-300 group"
                >
                  <div>
                    <h3 className="text-sm font-medium text-white tracking-normal mb-3 font-sans group-hover:translate-x-0.5 transition-transform duration-300">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================================================================
          SELECTED WORK — Technology & Innovation Case Studies
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Tick */}
        <div className="absolute top-0 left-[35%] w-[1px] h-8 bg-white/20 hidden md:block pointer-events-none" />

        {/* Section Ribbon Wave along bottom */}
        <SectionRibbonWave className="bottom-4" flip={true} />

        {/* Corner Crosshairs */}
        <EditorialCornerCrosshairs className="opacity-15" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Header */}
          <Reveal>
            <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                  SELECTED WORK
                </span>
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                  Systems &amp; Case Studies
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-white/70 hover:text-white transition-colors group"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Minimalist 2-Column Grid: Zero Numbering, Zero Category Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 80}>
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

                    <h3 className="text-base sm:text-lg font-medium text-white tracking-normal font-sans group-hover:text-white transition-colors mb-3">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-2">
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
          FIELD NOTES — Insights & Experiences
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Tick */}
        <div className="absolute top-0 left-[65%] w-[1px] h-8 bg-white/20 hidden md:block pointer-events-none" />

        {/* Floating Creative Scribble Flourish in Right Margin */}
        <div className="absolute top-20 right-10 hidden xl:block z-0 pointer-events-none opacity-20">
          <CreativeScribbleLoop />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Header */}
          <Reveal>
            <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                  FIELD NOTES
                </span>
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                  Dispatches on Tech, Design &amp; Leadership
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-white/70 hover:text-white transition-colors group"
              >
                <span>Explore All Articles</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Minimalist Editorial Row List: Zero Categorization Labels, Just Date & Title */}
          <Reveal delay={90}>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog#${post.slug}`}
                  className="py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-zinc-950 px-3 sm:px-4 -mx-3 sm:-mx-4 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                      {post.publishDate}
                    </span>
                    <h3 className="text-sm sm:text-base font-normal text-white group-hover:translate-x-1 transition-transform duration-300">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                    <span>{post.readTime}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================================================================
          PUBLICATIONS — Minimalist Store
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Tick */}
        <div className="absolute top-0 left-[75%] w-[1px] h-8 bg-white/20 hidden md:block pointer-events-none" />

        {/* Section Ribbon Wave */}
        <SectionRibbonWave className="top-1/3" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Header */}
          <Reveal>
            <div className="mb-14 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-1.5">
                  PUBLICATIONS &amp; EDITIONS
                </span>
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white uppercase font-sans">
                  Frameworks for Builders
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-white/70 hover:text-white transition-colors group"
              >
                <span>View Full Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Clean 3-Item Grid: Zero Categorization Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 90}>
                <div className="h-full group bg-black/80 backdrop-blur-xs border border-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  <div>
                    {/* Blended Visual Plate */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-black cursor-pointer"
                    >
                      {product.image ? (
                        <>
                          {product.isPhysical && (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.09),transparent_68%)] pointer-events-none" />
                          )}
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className={`${
                              product.isPhysical ? "object-contain p-2" : "object-cover"
                            } object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-zinc-950/80">
                          <div className="relative w-16 h-16 opacity-60 group-hover:opacity-90 transition-opacity">
                            <Image
                              src="/logo/My%20Creative%20Mharvy%20Sub%20Main%20Logo.svg"
                              alt={product.title}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          </div>
                          <span className="text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase">
                            Archival Signature Piece
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 sm:p-7 pb-0">
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm font-medium text-white hover:underline cursor-pointer font-sans mb-2"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-white">
                      {formatPrice(product.priceNGN, product.priceUSD)}
                    </span>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2 border border-white/30 hover:border-white text-white hover:bg-white hover:text-black text-[10px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          ENGAGEMENT & ADVISORY — Clean Minimal CTA
          ========================================================================= */}
      <section className="relative py-24 sm:py-32 bg-black text-center overflow-hidden">
        
        {/* Organic Ribbon Loop framing the CTA area */}
        <EngagementRibbonLoop />

        {/* Subtle Architectural Guide Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white/20 pointer-events-none" />

        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <Reveal>
            <span className="text-[10px] font-mono tracking-[0.28em] text-white/40 uppercase block mb-3">
              ENGAGEMENT
            </span>

            <h2 className="text-lg sm:text-xl md:text-2xl font-normal tracking-wide text-white uppercase font-sans mb-4">
              Start a Conversation
            </h2>

            <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed max-w-lg mx-auto mb-8">
              Available for venture architecture, high-growth tech advisory, and keynote leadership worldwide.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 group shadow-lg"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
