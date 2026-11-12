"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  EditorialCornerCrosshairs,
  EngagementRibbonLoop,
  CreativeScribbleLoop,
} from "@/components/ArtisticVisuals";

export default function ContactPage() {
  const { showToast } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const recipientEmail = "talktochuibike@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please provide your name, email, and inquiry details");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const subject = scope.trim()
        ? `Advisory Inquiry: ${scope.trim()} — ${name.trim()}`
        : `Advisory Inquiry from ${name.trim()}`;

      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _replyto: email.trim(),
          _subject: subject,
          scope: scope.trim() || "General Advisory",
          message: message.trim(),
          _template: "table",
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || (data && data.success === "false")) {
        throw new Error(data?.message || "Submission could not be delivered automatically.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setScope("");
      setMessage("");
      showToast(`Inquiry dispatched to ${recipientEmail}.`);
    } catch {
      setSubmitError(
        `Direct transmission was blocked by your network. You can send directly to ${recipientEmail}.`
      );
      showToast(`Unable to auto-send — please email ${recipientEmail} directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F2EB] font-poppins selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO / HEADER — Minimalist, Small Text, Classic Premium
          ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-black border-b border-white/10 overflow-hidden">
        
        {/* Subtle Architectural Guide Line */}
        <div className="absolute top-0 left-[40%] w-[1px] h-10 bg-white/20 hidden md:block pointer-events-none" />

        <EditorialCornerCrosshairs />

        {/* Floating Creative Scribble Flourish */}
        <div className="absolute top-24 right-20 hidden lg:block z-0 pointer-events-none opacity-20">
          <CreativeScribbleLoop />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <span className="animate-hero-rise text-[10px] font-mono tracking-[0.28em] text-white/40 uppercase block mb-3">
            DIRECT INQUIRIES &amp; ADVISORY
          </span>

          <h1
            style={{ animationDelay: "100ms" }}
            className="animate-hero-rise text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.12em] text-white uppercase leading-[1.3] font-sans max-w-2xl"
          >
            Start a Conversation. <br />
            <span className="font-semibold text-white/95">Direct Executive Line.</span>
          </h1>

          <p
            style={{ animationDelay: "200ms" }}
            className="animate-hero-rise text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed max-w-xl mt-4"
          >
            Available for brand strategy, venture architecture, tech summits, and keynote leadership worldwide.
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT & DIRECT CHANNELS GRID
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-black flex-1 overflow-hidden">
        
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Direct Channels & Dossier Contact */}
            <div className="lg:col-span-5 space-y-10">
              
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-2">
                  OFFICIAL CONTACT
                </span>
                <h2 className="text-base sm:text-lg font-medium text-white font-sans uppercase tracking-wide">
                  Chibuike Godwin Marvellous
                </h2>
                <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                  Creative Director | Brand Strategist | Special Adviser to the President on Media,
                  Technology &amp; Innovation, IHRPS Nigeria | Digital Literacy &amp; Youth Development Advocate
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-6 divide-y divide-white/10 border-y border-white/10 py-6">
                
                {/* Location */}
                <div className="pt-4 first:pt-0 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-0.5">
                      Base Location
                    </span>
                    <span className="text-xs font-sans text-white/90">
                      Aba, Abia State, Nigeria
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                      Deploying Globally across Africa, UK, US &amp; Diaspora
                    </span>
                  </div>
                </div>

                {/* Direct Phone / WhatsApp */}
                <div className="pt-6 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-0.5">
                      Direct Telephone &amp; WhatsApp
                    </span>
                    <a
                      href="http://wa.me/+2347072118506"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-white/90 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                    >
                      <span>+234 707 211 8506</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500" />
                    </a>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="pt-6 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-0.5">
                      Electronic Mail
                    </span>
                    <a
                      href="mailto:talktochibuikemarvellous@gmail.com"
                      className="text-xs font-mono text-white/90 hover:text-white hover:underline transition-colors"
                    >
                      talktochibuikemarvellous@gmail.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Verified Digital Profiles */}
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-4">
                  OFFICIAL CHANNELS
                </span>

                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/thecreativemharvy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black border border-white/10 hover:border-white/40 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                      LinkedIn // thecreativemharvy
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="https://www.behance.net/thecreativemharvy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black border border-white/10 hover:border-white/40 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                      Design Portfolio // Behance
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="https://www.mharvy.com.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black border border-white/10 hover:border-white/40 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                      Official Platform // mharvy.com.ng
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Minimalist Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 bg-black border border-white/10 relative">
                
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block mb-2">
                  TRANSMIT INQUIRY
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white font-sans uppercase mb-8">
                  Initiate Advisory Brief
                </h3>

                {submitted ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                      Inquiry Dispatched
                    </h4>
                    <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
                      Thank you. Your message has been routed directly to Chibuike Godwin Marvellous. You will receive an official response within 24 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2 border border-white/30 text-xs font-mono uppercase text-white hover:bg-white hover:text-black transition-colors"
                    >
                      Transmit Another Brief
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-2">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Vance / Horizon Technologies"
                        className="w-full bg-black border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-2">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@horizon.com"
                        className="w-full bg-black border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-2">
                        Scope of Engagement
                      </label>
                      <input
                        type="text"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        placeholder="e.g. Tech Summit Creative Direction / App UX Systems"
                        className="w-full bg-black border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-2">
                        Brief &amp; Objectives *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Outline the core challenge, timeline, and strategic outcomes you are looking to achieve..."
                        className="w-full bg-black border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 border border-white/40 hover:border-white disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-white hover:text-black font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                    >
                      <span>{isSubmitting ? "Transmitting..." : "Transmit Inquiry"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    {submitError && (
                      <div className="p-3 border border-white/20 bg-zinc-950 text-center space-y-2">
                        <p className="text-[11px] font-mono text-zinc-300">{submitError}</p>
                        <a
                          href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                            scope ? `Advisory Inquiry: ${scope}` : `Advisory Inquiry from ${name}`
                          )}&body=${encodeURIComponent(
                            `Name: ${name}\nEmail: ${email}\nScope: ${scope || "General Advisory"}\n\n${message}`
                          )}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white underline"
                        >
                          <span>Open Email Client ({recipientEmail})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <p className="text-[10px] font-mono text-zinc-500 text-center">
                      Direct executive response within 24 business hours.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
