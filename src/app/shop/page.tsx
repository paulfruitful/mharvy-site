"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Star,
  Globe,
  Filter,
  Sparkles,
  Download,
  Package,
  ShieldCheck,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProductModal } from "@/components/ProductModal";

export default function ShopPage() {
  const { formatPrice, addToCart, currency, setCurrency } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    "All",
    "Guides & Toolkits",
    "Merchandise",
    "Courses & Templates",
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
                <ShoppingBag className="w-4 h-4 text-[#012A69]" />
                <span>The Store &bull; Official Digital Resources</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
                Playbooks, Guides &amp; <br />
                <span className="italic">CGM Originals.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Practical guides, business frameworks, and limited-run physical gear built for brand builders, designers, and modern entrepreneurs.
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 self-start md:self-auto">
              <span className="text-xs text-gray-500 pl-2 flex items-center gap-1.5 font-medium">
                <Globe className="w-3.5 h-3.5 text-[#012A69]" /> Currency:
              </span>
              <button
                onClick={() => setCurrency("NGN")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === "NGN"
                    ? "bg-[#012A69] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#012A69]"
                }`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === "USD"
                    ? "bg-[#012A69] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#012A69]"
                }`}
              >
                $ USD
              </button>
            </div>
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

      {/* Product Catalog Grid */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white border border-[#DDDDDD] overflow-hidden hover:border-[#012A69] hover:shadow-lg transition-all"
              >
                {/* Visual Cover */}
                <div
                  className={`w-full h-56 bg-gradient-to-br ${product.coverGradient} p-6 flex flex-col justify-between relative cursor-pointer`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#012A69] shadow-sm">
                      {product.badge}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#55BC75] text-white">
                      Sale
                    </span>
                  </div>

                  <div className="z-10">
                    <span className="text-xs uppercase font-bold tracking-wider text-white/80 font-proxima">
                      {product.category}
                    </span>
                    <h3 className="text-white font-bold text-lg line-clamp-2 mt-1 drop-shadow-sm font-poppins">
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

                {/* Details & Action */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#FFB828] text-[#FFB828]"
                        />
                      ))}
                      <span className="text-xs text-gray-500 font-semibold ml-1">
                        5.0 ({product.reviewCount})
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(product)}
                      className="text-base font-bold text-[#012A69] hover:underline cursor-pointer font-poppins"
                    >
                      {product.title}
                    </h4>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features snippet */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                      {product.features.slice(0, 2).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-[11px] text-gray-600"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Add to Cart button */}
                  <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-1.5">
                        {formatPrice(
                          product.originalPriceNGN ?? Math.round(product.priceNGN * 1.5),
                          product.originalPriceUSD ?? Math.round(product.priceUSD * 1.5)
                        )}
                      </span>
                      <span className="text-lg font-extrabold text-[#012A69]">
                        {formatPrice(product.priceNGN, product.priceUSD)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Assurance */}
      <section className="py-12 bg-white border-t border-[#DDDDDD]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4">
              <Download className="w-6 h-6 text-[#012A69] mb-2" />
              <h4 className="text-sm font-bold text-[#012A69]">Instant Payhip Access</h4>
              <p className="text-xs text-gray-500 mt-1">
                Direct download links dispatched automatically after checkout.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <ShieldCheck className="w-6 h-6 text-[#012A69] mb-2" />
              <h4 className="text-sm font-bold text-[#012A69]">Secure Checkout</h4>
              <p className="text-xs text-gray-500 mt-1">
                Cards, bank transfers &amp; international payments securely processed.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Package className="w-6 h-6 text-[#012A69] mb-2" />
              <h4 className="text-sm font-bold text-[#012A69]">Edition Upgrades</h4>
              <p className="text-xs text-gray-500 mt-1">
                Free updates for all digital playbook editions and bonus modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
