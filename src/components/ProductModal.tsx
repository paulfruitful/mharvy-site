"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Download,
  Package,
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
    <div className="fixed inset-0 z-50 overflow-y-auto font-poppins">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white border border-[#DDDDDD] text-left shadow-2xl relative my-8">
          {/* Header Banner */}
          <div
            className={`w-full h-44 bg-gradient-to-br ${product.coverGradient} p-6 sm:p-8 flex flex-col justify-between relative border-b border-gray-200`}
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
                {product.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#55BC75] text-white">
                Sale
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm font-serif-luxury">
              {product.title}
            </h2>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Rating & Pricing Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FFB828] text-[#FFB828]"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-semibold">
                  5.0 ({product.reviewCount})
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(
                    product.originalPriceNGN ?? Math.round(product.priceNGN * 1.5),
                    product.originalPriceUSD ?? Math.round(product.priceUSD * 1.5)
                  )}
                </span>
                <span className="text-2xl font-extrabold text-[#012A69]">
                  {formatPrice(product.priceNGN, product.priceUSD)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                Product Overview
              </h3>
              <p className="text-sm text-[#3E3E42] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
                What&apos;s Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#3E3E42] bg-[#F8F9FA] p-3 rounded-lg border border-[#DDDDDD]"
                  >
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payhip delivery guarantee note */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-[#012A69]">
              <ShieldCheck className="w-4 h-4 text-[#012A69] flex-shrink-0" />
              <span>
                Instant digital download via Payhip. Lifetime access + future edition updates included.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-gray-600 hover:text-[#012A69] hover:bg-white text-xs font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-mono font-bold text-[#012A69]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-gray-600 hover:text-[#012A69] hover:bg-white text-xs font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full py-3 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add {quantity > 1 ? `${quantity} copies` : ""} to Cart &bull;{" "}
                  {formatPrice(product.priceNGN * quantity, product.priceUSD * quantity)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
