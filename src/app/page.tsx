"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Compass,
  Palette,
  Users,
  Star,
  Play,
  ShoppingBag,
  CheckCircle2,
  Phone,
  BookOpen,
  Award,
  ShieldCheck,
  TrendingUp,
  MessageSquareQuote,
  Eye,
} from "lucide-react";
import { projects } from "@/data/projects";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { videos, testimonials } from "@/data/videos";
import { Project, Product, VideoItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProjectModal } from "@/components/ProjectModal";
import { ProductModal } from "@/components/ProductModal";
import { VideoModal } from "@/components/VideoModal";

export default function HomePage() {
  const { formatPrice, addToCart, setIsTribeModalOpen } = useCart();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const featuredProjects = projects.slice(0, 4);
  const featuredProducts = products.slice(0, 4);
  const featuredPosts = posts.slice(0, 3);
  const heroVideo = videos[0];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42]">
      {/* =========================================================================
          HERO SECTION - Payhip Tusk whitePrimary Design
          ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-gray-200">
        {/* Soft Royal Navy Ambient Gradient Circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#012A69]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-blue-500/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            {/* Status Moniker Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm transition-all hover:border-[#012A69]/30">
              <span className="w-2.5 h-2.5 rounded-full bg-[#012A69] animate-pulse" />
              <span className="text-xs font-bold text-[#012A69] tracking-wider uppercase font-proxima">
                Chibuike Godwin Marvellous • Top 1% of the world&apos;s 1% — theCreative Mharvy
              </span>
            </div>

            {/* Main Title in Fournier Serif */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#012A69] font-serif-luxury leading-[1.08]">
              Building Brands <br />
              <span className="text-[#012A69] italic">That Actually Matter.</span>
            </h1>

            {/* Subtitle / Philosophy */}
            <p className="text-base sm:text-xl text-[#3E3E42] max-w-2xl leading-relaxed font-normal font-poppins">
              Helping founders, startups, and changemakers clarify ideas, structure messaging,
              and design high-trust visual identity systems that drive measurable commercial results.
            </p>

            {/* Quote Pill */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FA] border border-[#DDDDDD] max-w-xl text-xs sm:text-sm text-[#3E3E42] font-serif italic shadow-sm">
              &ldquo;Design is not just how it looks. It is what it does.&rdquo;
              <span className="block text-[11px] font-sans not-italic text-[#012A69] font-semibold mt-1">
                — Chibuike Godwin Marvellous (theCreative Mharvy)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/work"
                className="px-8 py-3.5 rounded-lg btn-mharvy-primary font-bold text-sm flex items-center gap-2 shadow-md"
              >
                <span>Explore Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-lg btn-mharvy-secondary font-semibold text-sm flex items-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#012A69]" />
                <span>Shop Digital Resources</span>
              </Link>

              <button
                onClick={() => setIsTribeModalOpen(true)}
                className="px-6 py-3.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#012A69] font-semibold text-sm border border-blue-200 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#012A69]" />
                <span>Join The Tribe</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-10 border-t border-gray-200 w-full max-w-3xl">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#012A69] font-serif-luxury">100+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">Brands Designed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#012A69] font-serif-luxury">10k+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">Community Learners</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#012A69] font-serif-luxury">7+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">Years Experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#012A69] font-serif-luxury">Top 1%</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">Global Positioning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOUR PILLARS / STRATEGIC CAPABILITIES
          ========================================================================= */}
      <section className="py-20 bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#012A69] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-proxima">
              Core Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012A69] font-serif-luxury mt-3">
              Strategic Design. Measurable Influence.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 font-poppins">
              Bridging the gap between world-class visual aesthetics and high-conversion commercial positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#012A69] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#012A69] mb-2 font-poppins">Brand Identity Systems</h3>
              <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                Logotypes, comprehensive brand guides, typography hierarchies, and asset ecosystems built for lasting authority.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#012A69] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#012A69] mb-2 font-poppins">Digital Products &amp; UI/UX</h3>
              <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                Modern interfaces, mobile experiences, and product architectures optimized for retention and frictionless adoption.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#012A69] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#012A69] mb-2 font-poppins">Designpreneurship Advisory</h3>
              <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                Consulting early-stage founders on product-market positioning, narrative architecture, and value proposition clarity.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] hover:border-[#012A69] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#012A69] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#012A69] mb-2 font-poppins">Youth Advocacy &amp; Speaking</h3>
              <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                Keynote presentations, conference panels, and masterclasses equipping the next generation with high-income digital skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DIGITAL STORE / RESOURCES SECTION (Payhip Tusk Collection Layout)
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#012A69] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-proxima">
                Store &amp; Resources
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012A69] font-serif-luxury mt-3">
                Featured Toolkits &amp; Merchandise
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 font-poppins">
                Direct access to actionable frameworks, books, templates, and signature CGM apparel.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#012A69] hover:underline"
            >
              <span>View All Store Items</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white border border-[#DDDDDD] overflow-hidden hover:border-[#012A69] hover:shadow-lg transition-all"
              >
                {/* Product Cover Visual */}
                <div
                  className={`w-full h-52 bg-gradient-to-br ${product.coverGradient} p-5 flex flex-col justify-between relative cursor-pointer`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-[#012A69] shadow-sm">
                      {product.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#55BC75] text-white">
                      Sale
                    </span>
                  </div>

                  <div className="z-10">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/80">
                      {product.category}
                    </span>
                    <h3 className="text-white font-bold text-base line-clamp-2 mt-1 drop-shadow-sm font-poppins">
                      {product.title}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1"
                  >
                    <Eye className="w-4 h-4" /> Quick View
                  </button>
                </div>

                {/* Product Meta */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#FFB828] text-[#FFB828]"
                        />
                      ))}
                      <span className="text-[11px] text-gray-500 font-semibold ml-1">
                        5.0 ({product.reviewCount})
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(product)}
                      className="text-base font-bold text-[#012A69] hover:underline cursor-pointer font-poppins line-clamp-1"
                    >
                      {product.title}
                    </h4>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-1.5">
                        {formatPrice(
                          product.originalPriceNGN ?? Math.round(product.priceNGN * 1.5),
                          product.originalPriceUSD ?? Math.round(product.priceUSD * 1.5)
                        )}
                      </span>
                      <span className="text-base font-extrabold text-[#012A69]">
                        {formatPrice(product.priceNGN, product.priceUSD)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-lg btn-mharvy-primary text-xs font-bold flex items-center gap-1 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SELECTED CREATIVE WORK / CASE STUDIES
          ========================================================================= */}
      <section className="py-24 bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#012A69] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-proxima">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012A69] font-serif-luxury mt-3">
                Selected Commercial Case Studies
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 font-poppins">
                Transformational branding, digital design, and strategic campaigns created for industry leaders.
              </p>
            </div>
            <Link
              href="/work"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#012A69] hover:underline"
            >
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group rounded-2xl bg-white border border-[#DDDDDD] overflow-hidden hover:border-[#012A69] hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                {/* Visual Banner */}
                <div
                  className={`w-full h-60 sm:h-72 bg-gradient-to-br ${project.coverGradient} p-6 flex flex-col justify-between relative`}
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
                    <span className="text-xs uppercase font-bold tracking-widest text-white/90">
                      Client: {project.client}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-serif-luxury drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold text-sm gap-2">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[#3E3E42] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-5 mt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.deliverables.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-[#012A69] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Full Story &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAYHIP VERIFIED CUSTOMER REVIEWS (Matching Payhip Tusk customer-reviews)
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Buyer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012A69] font-serif-luxury">
              Loved by Founders &amp; Creatives
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-poppins">
              Authentic reviews from clients and digital product buyers across Nigeria and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] shadow-sm flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB828] text-[#FFB828]" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#012A69]" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#012A69] mb-2 font-poppins">
                  &ldquo;A transformative brand identity&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                  Working with Chibuike Godwin Marvellous repositioned our tech startup. His strategic clarity and execution speed are unmatched. We closed our pre-seed round with absolute brand confidence!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="block text-sm font-bold text-[#012A69]">David Okonkwo</span>
                  <span className="text-[11px] text-gray-500">Founder, FinTech Ventures</span>
                </div>
                <span className="text-[11px] text-gray-400">Lagos, Nigeria</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] shadow-sm flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB828] text-[#FFB828]" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#012A69]" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#012A69] mb-2 font-poppins">
                  &ldquo;The Digital Launchpad is gold&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                  I downloaded the Digital Launchpad Guide and Success Engineered. The pricing templates and client negotiation scripts alone made me 5x my design project retainers in the first 30 days!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="block text-sm font-bold text-[#012A69]">Blessing Adeleke</span>
                  <span className="text-[11px] text-gray-500">Lead Product Designer</span>
                </div>
                <span className="text-[11px] text-gray-400">Abuja, Nigeria</span>
              </div>
            </div>

            {/* Review 3 with Creator Reply */}
            <div className="p-7 rounded-2xl bg-white border border-[#DDDDDD] shadow-sm flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB828] text-[#FFB828]" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#012A69]" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#012A69] mb-2 font-poppins">
                  &ldquo;Top 1% execution, truly!&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed">
                  Mharvy delivered the HAUS9 SWILL sports identity on an impossible deadline. Clean assets, perfect vectors, and an inspiring work ethic that energized our entire steering committee.
                </p>

                {/* Payhip Creator Reply Box */}
                <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs">
                  <span className="font-bold text-[#012A69] block mb-0.5">
                    Reply from Chibuike Godwin Marvellous:
                  </span>
                  <span className="text-gray-600">
                    &ldquo;Thank you! It was an absolute honor delivering that sporting milestone. Keep championing excellence!&rdquo;
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="block text-sm font-bold text-[#012A69]">Tunde Williams</span>
                  <span className="text-[11px] text-gray-500">Convener, Sports Fiesta</span>
                </div>
                <span className="text-[11px] text-gray-400">Port Harcourt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED VIDEO & MEDIA SECTION
          ========================================================================= */}
      <section className="py-24 bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#012A69] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-proxima">
                Media &amp; Masterclasses
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012A69] font-serif-luxury leading-tight">
                Watch High-Yield Insights on Brand Building
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins">
                Explore deep dives into brand positioning, pricing power, design entrepreneurship, and creative leadership recorded live at major summits.
              </p>
              <div className="pt-2">
                <Link
                  href="/watch"
                  className="px-6 py-3.5 rounded-lg btn-mharvy-primary font-bold text-sm inline-flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Browse Media Library</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                onClick={() => setSelectedVideo(heroVideo)}
                className="group relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 cursor-pointer aspect-video bg-slate-900 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#012A69]/80 via-slate-900/60 to-transparent z-10" />
                <div className="relative z-20 text-center p-8 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#012A69] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
                    <Play className="w-8 h-8 fill-[#012A69] translate-x-0.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                    Featured Masterclass • {heroVideo?.duration || "24:18"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 max-w-lg font-serif-luxury">
                    {heroVideo?.title || "Brand Positioning in the New Creative Economy"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRIBE CTA BANNER
          ========================================================================= */}
      <section className="py-20 bg-[#012A69] text-white relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury text-white">
              Elevate Your Creative Impact Today
            </h2>
            <p className="text-sm sm:text-base text-blue-100 font-poppins leading-relaxed">
              Receive exclusive insights, discount drops on digital toolkits, and private invites to Chibuike Godwin Marvellous&apos;s closed masterclasses.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsTribeModalOpen(true)}
                className="px-8 py-3.5 rounded-lg bg-white text-[#012A69] hover:bg-gray-100 font-bold text-sm shadow-lg transition-transform hover:scale-105"
              >
                Join theCreative Mharvy Tribe
              </button>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-lg border border-white/40 hover:bg-white/10 text-white font-semibold text-sm transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
