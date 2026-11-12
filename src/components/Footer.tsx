"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  YoutubeIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { EditorialCornerCrosshairs } from "@/components/ArtisticVisuals";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Dossier Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logo/My%20Creative%20Mharvy%20Sub%20Secondary%20Logo.svg"
                  alt="theCreative Mharvy Logo"
                  width={32}
                  height={32}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-normal text-white uppercase tracking-wider group-hover:text-[#C5A880] transition-colors">
                  theCreative Mharvy
                </span>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                  Chibuike Godwin Marvellous
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Brand strategist and visual communications designer driving growth through structured
              storytelling, sustainable brand systems, and digital literacy across Africa.
            </p>

            <blockquote className="border-l border-[#C5A880] pl-3 py-0.5 text-xs text-zinc-400 italic font-light">
              &ldquo;Design is not judged by how it looks, but by what it does.&rdquo;
            </blockquote>

            {/* Verified Public Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/thecreativemharvy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.behance.net/thecreativemharvy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors text-[10px] font-mono font-bold"
                aria-label="Behance Portfolio"
              >
                Bē
              </a>
              <a
                href="https://www.youtube.com/@thecreativemharvy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="http://wa.me/+2347072118506"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
              Index
            </span>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">Selected Work</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Capabilities</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Field Notes</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">The Store</Link>
              </li>
              <li>
                <Link href="/watch" className="hover:text-white transition-colors">Broadcasts</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Direct Coordinate Details */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
              Direct Contact
            </span>
            <div className="flex flex-col gap-2.5 text-xs text-zinc-400 font-light">
              <a
                href="mailto:talktochibuikemarvellous@gmail.com"
                className="hover:text-white transition-colors break-all"
              >
                talktochibuikemarvellous@gmail.com
              </a>
              <a
                href="tel:+2347072118506"
                className="hover:text-white transition-colors font-mono"
              >
                +234 707 211 8506
              </a>
              <div className="text-zinc-500 pt-1">
                Aba, Abia State, Nigeria
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                Based in Nigeria &bull; Building for Africa &amp; Beyond
              </div>
            </div>
          </div>

          {/* Editorial Dispatch */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
              Dispatch
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Curated perspectives on visual communication, brand infrastructure, and technological innovation.
            </p>

            {subscribed ? (
              <div className="p-3 border border-white/20 bg-white/[0.02] text-xs text-zinc-300">
                Subscription recorded. Archival dispatches will arrive directly to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full bg-white/[0.03] border border-white/15 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-normal transition-colors"
                >
                  Join the List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Studio Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>
            &copy; 2026 Chibuike Godwin Marvellous &bull; theCreative Mharvy
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://mharvy.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>mharvy.com.ng</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <span className="text-zinc-500">
              Strategy &bull; Communication &bull; Execution
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
