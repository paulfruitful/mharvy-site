"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsTribeModalOpen, currency, setCurrency } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Watch", href: "/watch" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Announcement Bar matching mharvy.com.ng #header .announcement-bar */}
      <div className="bg-[#012A69] text-white text-xs py-2.5 px-4 text-center font-medium flex items-center justify-center gap-2 relative z-50">
        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider">
          Top 1% of the world&apos;s 1%
        </span>
        <span className="font-poppins">
          Discover courses, toolkits &amp; resources by Chibuike Godwin Marvellous (theCreativeMharvy).
        </span>
        <Link
          href="/shop"
          className="underline hover:text-amber-300 font-bold inline-flex items-center gap-0.5 ml-1 transition-colors"
        >
          Shop Now <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Moniker */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50 flex-shrink-0">
              <Image
                src="/favicon.png"
                alt="theCreative Mharvy Logo"
                width={40}
                height={40}
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#012A69] font-serif-luxury group-hover:text-[#060526] transition-colors leading-none">
                theCreative Mharvy
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1 font-proxima">
                Chibuike Godwin Marvellous
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors relative ${
                    active
                      ? "text-[#012A69] font-bold"
                      : "text-gray-600 hover:text-[#012A69] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#012A69] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
              title="Toggle currency"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 hover:text-[#012A69] hover:border-[#012A69] transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#012A69]" />
              <span>{currency === "NGN" ? "₦ NGN" : "$ USD"}</span>
            </button>

            {/* Join My Tribe CTA */}
            <button
              onClick={() => setIsTribeModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#012A69] hover:text-[#060526] bg-[#012A69]/5 hover:bg-[#012A69]/10 border border-[#012A69]/20 px-3.5 py-2 rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#012A69]" />
              <span>Join Tribe</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-[#012A69] transition-all focus:outline-none"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#012A69]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FC576B] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Consultation Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 btn-mharvy-primary text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm"
            >
              <span>Book Mharvy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-50 text-gray-700 hover:text-[#012A69] border border-gray-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-gray-200 bg-white px-6 py-6 transition-all duration-300 shadow-xl">
            <div className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                      active
                        ? "bg-[#012A69] text-white font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#012A69]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${active ? "text-white" : "text-gray-400"}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium">Currency</span>
                <button
                  onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700"
                >
                  <Globe className="w-3.5 h-3.5 text-[#012A69]" />
                  <span>{currency === "NGN" ? "₦ NGN" : "$ USD"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTribeModalOpen(true);
                }}
                className="w-full py-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#012A69] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#012A69]" />
                <span>Join My Tribe Community</span>
              </button>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-lg btn-mharvy-primary text-center text-sm font-bold shadow-md"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
