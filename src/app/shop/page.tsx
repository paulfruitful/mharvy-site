"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Check,
  Globe,
} from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProductModal } from "@/components/ProductModal";
import {
  SectionRibbonWave,
  EditorialCornerCrosshairs,
  ArtisticUnderline,
} from "@/components/ArtisticVisuals";

export default function ShopPage() {
  const { formatPrice, addToCart, currency, setCurrency } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                  Mharvy &bull; The Store
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal uppercase tracking-wider text-white">
                Ideas Worth Investing In.
              </h1>
              <div className="w-16">
                <ArtisticUnderline className="text-[#C5A880]" />
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed">
                Practical resources, guides, and creative tools for people building brands,
                businesses, and meaningful ideas. Thoughtfully made resources to help you
                move from ideas to action — and build work that matters.
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 border border-white/15 px-3 py-1.5 self-start md:self-auto bg-black">
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-mono mr-1">
                Currency:
              </span>
              <button
                onClick={() => setCurrency("NGN")}
                className={`text-[11px] px-2.5 py-1 tracking-wider uppercase font-mono transition-colors ${
                  currency === "NGN"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                NGN
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`text-[11px] px-2.5 py-1 tracking-wider uppercase font-mono transition-colors ${
                  currency === "USD"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                USD
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative border border-white/10 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between transition-all duration-300 overflow-hidden"
              >
                <EditorialCornerCrosshairs />

                {/* Top Visual Plate */}
                <div>
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

                  {/* Top Section */}
                  <div className="p-8 pb-0 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
                        {product.badge}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {formatPrice(product.priceNGN, product.priceUSD)}
                      </span>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm font-normal uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors leading-snug cursor-pointer"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 border-t border-white/5 space-y-2">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-[11px] text-zinc-400 font-light"
                        >
                          <Check className="w-3 h-3 text-[#C5A880] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-8 pt-6 mt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>Format</span>
                    <span className="text-zinc-400 text-right line-clamp-1 max-w-[180px]">
                      {product.format}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="py-2.5 px-3 border border-white/15 hover:border-white text-zinc-300 hover:text-white text-[11px] uppercase tracking-widest transition-colors text-center"
                    >
                      Details
                    </button>
                    {product.directUrl ? (
                      <a
                        href={product.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-white text-black hover:bg-zinc-200 text-[11px] uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-1.5 font-normal"
                      >
                        <span>Order</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="py-2.5 px-3 bg-white text-black hover:bg-zinc-200 text-[11px] uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-1.5 font-normal"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Bag</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Store Guarantee & Delivery Note */}
          <div className="mt-16 border border-white/10 p-8 relative overflow-hidden bg-white/[0.01]">
            <EditorialCornerCrosshairs />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-xs uppercase tracking-widest text-white">
                    Direct Distribution Guarantee
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Digital publications are fulfilled immediately via Paystack &amp; Selar secure delivery.
                  Physical signature caps ship globally in bespoke collector packaging with express tracking.
                </p>
              </div>

              <a
                href="mailto:talktochibuikemarvellous@gmail.com?subject=Custom%20Order%20Inquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white hover:border-[#C5A880] hover:text-[#C5A880] text-xs uppercase tracking-widest transition-colors whitespace-nowrap self-start md:self-auto"
              >
                <span>Bulk &amp; Institutional Orders</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
