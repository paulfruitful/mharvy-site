"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { EditorialCornerCrosshairs } from "@/components/ArtisticVisuals";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("mharvy_cookie_consent");
      if (!consent) {
        setShow(true);
      }
    } catch {
      setShow(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("mharvy_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    setShow(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem("mharvy_cookie_consent", "dismissed");
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:left-8 sm:right-auto sm:max-w-md z-40">
      <div className="relative bg-black/95 backdrop-blur-md border border-white/15 p-5 text-white shadow-2xl space-y-3.5">
        <EditorialCornerCrosshairs className="opacity-25" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A880]">
              Privacy &bull; Storage Preferences
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-zinc-500 hover:text-white transition-colors p-0.5"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-zinc-300 font-light leading-relaxed">
          We use functional client-side storage to preserve your cart acquisitions, currency preferences (NGN / USD), and maintain session integrity across the digital experience.
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-4 bg-white text-black hover:bg-zinc-200 text-[11px] uppercase tracking-widest font-normal transition-colors text-center"
          >
            Acknowledge
          </button>
          <button
            onClick={handleDismiss}
            className="py-2 px-4 border border-white/20 text-zinc-400 hover:text-white hover:border-white text-[11px] uppercase tracking-widest transition-colors font-normal text-center"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
