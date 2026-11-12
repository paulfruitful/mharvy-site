"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Selected Work", href: "/work" },
    { name: "Capabilities", href: "/services" },
    { name: "Field Notes", href: "/blog" },
    { name: "The Store", href: "/shop" },
    { name: "Broadcasts", href: "/watch" },
    { name: "Inquiries", href: "/contact" },
  ];

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-white/10"
          : "bg-black/95 backdrop-blur-md border-b border-white/15 shadow-2xl"
      }`}
    >
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Favicon Logo & Classic Editorial Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 transition-transform hover:opacity-85"
          aria-label="theCreative Mharvy — Home"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center flex-shrink-0 bg-stone-900 shadow-sm">
            <Image
              src="/favicon.png"
              alt="theCreative Mharvy Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-serif-luxury italic text-sm sm:text-base text-white tracking-wide leading-none">
              theCreative Mharvy
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/40 font-sans mt-0.5 leading-none">
              Edition 2026
            </span>
          </div>
        </Link>

        {/* Center: Classic Vintage Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] uppercase tracking-[0.24em] font-sans transition-all duration-300 relative group py-1 ${
                  isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {/* Vintage Hairline Underline Indicator */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1px] bg-white transition-all duration-300 origin-left ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Vintage Inquiries Action & Bag */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Shopping Bag Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Classic Vintage Rectangular Action Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-black text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 font-sans group shadow-sm"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white lg:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/98 backdrop-blur-2xl px-6 py-8 space-y-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center justify-between border-b border-white/5 font-sans"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </Link>
            ))}
          </div>

          <div className="pt-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 border border-white/60 hover:border-white text-white hover:bg-white hover:text-black text-xs font-semibold uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
