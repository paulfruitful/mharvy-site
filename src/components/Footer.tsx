"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  Send,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { useCart } from "@/context/CartContext";

export function Footer() {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    showToast("Welcome to the Tribe! Check your inbox shortly.");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-[#F8F9FA] text-[#3E3E42] border-t border-[#DDDDDD] pt-16 pb-12 relative overflow-hidden font-poppins">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#DDDDDD]">
          {/* Brand Bio Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white flex-shrink-0">
                <Image
                  src="/favicon.png"
                  alt="theCreative Mharvy Logo"
                  width={40}
                  height={40}
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-none">
                  theCreative Mharvy
                </span>
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1 font-proxima">
                  Chibuike Godwin Marvellous
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#3E3E42] leading-relaxed max-w-md">
              Creative strategist, brandpreneur, designpreneur, techpreneur, and youth advocate based in Nigeria.
              Dedicated to building brands that matter through visual communication design, strategy, and socio-economic empowerment.
            </p>

            <blockquote className="border-l-2 border-[#012A69] pl-3.5 py-1 italic text-[#3E3E42] text-xs sm:text-sm font-serif">
              &ldquo;Design is not just how it looks. It is what it does.&rdquo;
            </blockquote>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-[#012A69] hover:shadow-sm transition-all"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center text-gray-600 hover:text-sky-500 hover:border-[#012A69] hover:shadow-sm transition-all"
                aria-label="X (Twitter)"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-[#012A69] hover:shadow-sm transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-[#012A69] hover:shadow-sm transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2347072118506"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-[#012A69] hover:shadow-sm transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
              Explore
            </span>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#012A69] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#012A69] transition-colors">Work &amp; Portfolio</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#012A69] transition-colors">Services &amp; Pricing</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#012A69] transition-colors">Digital Store</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#012A69] transition-colors">Articles &amp; Blog</Link>
              </li>
              <li>
                <Link href="/watch" className="hover:text-[#012A69] transition-colors">Watch &amp; Media</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#012A69] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
              Direct Contact
            </span>
            <div className="flex flex-col gap-3 text-xs">
              <a
                href="mailto:hello@mharvy.com.ng"
                className="flex items-center gap-2 hover:text-[#012A69] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#012A69] flex-shrink-0" />
                <span>hello@mharvy.com.ng</span>
              </a>
              <a
                href="tel:+2347072118506"
                className="flex items-center gap-2 hover:text-[#012A69] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#012A69] flex-shrink-0" />
                <span>+234 707 211 8506</span>
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-[#012A69] flex-shrink-0" />
                <span>Lagos / Port Harcourt, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available for Q2/Q3 Bookings</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#012A69] font-proxima">
              The Creative Letter
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Curated thoughts on brand engineering, design entrepreneurship, and strategy delivered bi-weekly.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>You&apos;re subscribed to the Tribe newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-3.5 py-2.5 rounded-lg bg-white border border-[#DDDDDD] text-xs text-[#3E3E42] placeholder:text-gray-400 focus:outline-none focus:border-[#012A69] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; 2026 Chibuike Godwin Marvellous (theCreative Mharvy). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#012A69]" />
              Secure Payhip Architecture
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-[11px]">Top 1% of the World&apos;s 1%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
