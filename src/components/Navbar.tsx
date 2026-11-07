"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsTribeModalOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Work", href: "/work" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Watch", href: "/watch" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all font-poppins border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Interlocking Monogram Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
          aria-label="theCreative Mharvy Home"
        >
          <div className="relative w-12 h-8 flex items-center justify-center">
            <Image
              src="/mharvy-monogram.png"
              alt="Mharvy Logo"
              width={48}
              height={30}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center: Main Navigation Links matching UI mockup */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-tight transition-colors relative ${
                  active
                    ? "font-bold text-[#012A69]"
                    : "font-semibold text-[#012A69]/85 hover:text-[#012A69]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, User, Cart, and 'Join My Tribe' Button */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 text-[#012A69] hover:text-[#060526] hover:scale-110 transition-transform"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* User Profile Icon */}
          <button
            onClick={() => setIsTribeModalOpen(true)}
            className="p-1.5 text-[#012A69] hover:text-[#060526] hover:scale-110 transition-transform"
            aria-label="User Account"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Shopping Bag Icon with Cart Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1.5 text-[#012A69] hover:text-[#060526] hover:scale-110 transition-transform relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FC576B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA: Join My Tribe */}
          <button
            onClick={() => setIsTribeModalOpen(true)}
            className="ml-2 px-5 py-2.5 rounded-lg bg-[#012A69] hover:bg-[#060526] text-white font-bold text-xs sm:text-sm tracking-normal transition-all shadow-sm hover:shadow-md hover:scale-105"
          >
            Join My Tribe
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-[#012A69] relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#FC576B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#012A69] hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Input Bar (Dropdown) */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white py-3 px-4 shadow-sm animate-in slide-in-from-top-2 duration-150">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-[1320px] mx-auto flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, articles, case studies & toolkits..."
              className="flex-1 text-xs sm:text-sm text-[#012A69] placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-md bg-[#012A69] text-white text-xs font-bold"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xs font-semibold"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-[#012A69]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Services
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTribeModalOpen(true);
              }}
              className="w-full py-3 rounded-lg bg-[#012A69] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
            >
              <span>Join My Tribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
