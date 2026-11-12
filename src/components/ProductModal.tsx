"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-xl transform overflow-hidden bg-black border border-white/15 text-left shadow-2xl relative my-8">
          {/* Optional Book Cover Banner */}
          {product.image && (
            <div className="relative h-56 sm:h-64 w-full bg-black border-b border-white/10 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
            </div>
          )}

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
              Publication &bull; Official Release
            </span>
            <h2 className="text-lg sm:text-xl font-normal text-white uppercase tracking-wider">
              {product.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* Price Row */}
            <div className="flex items-baseline justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                Investment
              </span>
              <span className="text-lg font-light tracking-wide text-white font-mono">
                {formatPrice(product.priceNGN, product.priceUSD)}
              </span>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono block">
                Overview
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Key Deliverables / Specifications */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono block">
                Included Components
              </span>
              <div className="space-y-2">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-zinc-300 font-light"
                  >
                    <Check className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics & Delivery Note */}
            <div className="p-3 border border-white/10 bg-white/[0.02] flex items-center gap-2.5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span>
                {product.isPhysical
                  ? "Archival physical item. Express global dispatch with tracked delivery."
                  : "Instant digital access via official distribution platform. Lifetime revisions."}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
              {/* Direct Purchase Link */}
              {product.directUrl && (
                <a
                  href={product.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 border border-white/20 text-white hover:border-[#C5A880] hover:text-[#C5A880] text-xs uppercase tracking-widest font-normal text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Order Directly</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center border border-white/15 bg-black">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-normal flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  Add to Bag &bull; {formatPrice(product.priceNGN * quantity, product.priceUSD * quantity)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
