"use client";

import React from "react";

/**
 * HeroFluidRibbon
 * Multi-strand hairline fluid ribbon paths that weave gracefully across
 * the wide negative space of the hero section.
 */
export function HeroFluidRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <svg
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-65"
      >
        <defs>
          <linearGradient id="heroRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="heroRibbonGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Primary flowing ribbon strand */}
        <path
          d="M -120 480 C 240 280, 520 680, 940 360 C 1220 150, 1460 480, 1720 300"
          stroke="url(#heroRibbonGrad1)"
          strokeWidth="1.2"
        />

        {/* Secondary echo ribbon strand */}
        <path
          d="M -100 510 C 260 310, 540 710, 960 390 C 1240 180, 1480 510, 1740 330"
          stroke="url(#heroRibbonGrad1)"
          strokeWidth="1"
          strokeOpacity="0.7"
        />

        {/* Tertiary counter-curve ribbon strand */}
        <path
          d="M 100 120 C 480 320, 780 140, 1140 420 C 1380 610, 1620 440, 1750 560"
          stroke="url(#heroRibbonGrad2)"
          strokeWidth="1"
        />

        {/* Fourth subtle contour thread */}
        <path
          d="M 80 145 C 460 345, 760 165, 1120 445 C 1360 635, 1600 465, 1730 585"
          stroke="url(#heroRibbonGrad2)"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}

/**
 * CreativeScribbleLoop
 * An organic, hand-drawn continuous single-line scribble loop / flourish
 * that adds handcrafted artistic depth to negative space.
 */
export function CreativeScribbleLoop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        width="180"
        height="120"
        viewBox="0 0 180 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-45 hover:opacity-80 transition-opacity duration-500"
      >
        <path
          d="M 15 75 C 35 45, 65 20, 105 25 C 145 30, 165 65, 135 95 C 105 115, 65 95, 50 65 C 35 35, 60 10, 95 15 C 130 20, 165 45, 170 80 C 172 95, 155 105, 130 100 C 105 95, 85 75, 90 55 C 95 35, 120 30, 140 45"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  );
}

/**
 * ArtisticUnderline
 * A delicate, hand-drawn organic scribble underline accent.
 */
export function ArtisticUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      width="160"
      height="18"
      viewBox="0 0 160 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-40 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 3 11 C 35 5, 80 14, 115 8 C 132 5, 148 9, 157 7 M 22 14 C 55 9, 95 15, 138 11"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * SectionRibbonWave
 * A flowing horizontal hairline ribbon that stretches across wide sections
 * (e.g. Capabilities, Selected Work, Publications).
 */
export function SectionRibbonWave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <svg
        viewBox="0 0 1440 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-full opacity-40 ${flip ? "scale-y-[-1]" : ""}`}
      >
        <defs>
          <linearGradient id="sectionRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Main Ribbon Curve */}
        <path
          d="M -80 130 C 260 20, 620 240, 980 80 C 1220 -20, 1380 180, 1520 120"
          stroke="url(#sectionRibbonGrad)"
          strokeWidth="1"
        />

        {/* Twin parallel echo strand */}
        <path
          d="M -60 150 C 280 40, 640 260, 1000 100 C 1240 0, 1400 200, 1540 140"
          stroke="url(#sectionRibbonGrad)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Hairline dashed guide curve */}
        <path
          d="M -100 110 C 240 0, 600 220, 960 60 C 1200 -40, 1360 160, 1500 100"
          stroke="url(#sectionRibbonGrad)"
          strokeWidth="0.7"
          strokeDasharray="3 5"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}

/**
 * EditorialCornerCrosshairs
 * Minimalist drafting crosshairs and precision coordinate marks.
 */
export function EditorialCornerCrosshairs({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
    >
      {/* Top Left Crosshair */}
      <div className="absolute top-4 left-6 flex items-center gap-1.5 opacity-25">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1" />
        </svg>
        <span className="text-[8px] font-mono tracking-[0.25em] text-white/50 hidden sm:inline">
          SYS.01 // GRID
        </span>
      </div>

      {/* Top Right Crosshair */}
      <div className="absolute top-4 right-6 flex items-center gap-1.5 opacity-25">
        <span className="text-[8px] font-mono tracking-[0.25em] text-white/50 hidden sm:inline">
          06°27&apos;N · 03°23&apos;E
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Left Crosshair */}
      <div className="absolute bottom-4 left-6 flex items-center gap-1.5 opacity-20">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="0.8" />
          <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom Right Crosshair */}
      <div className="absolute bottom-4 right-6 flex items-center gap-1.5 opacity-20">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="0.8" />
          <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}

/**
 * EngagementRibbonLoop
 * A delicate organic continuous ribbon ring that frames the CTA area.
 */
export function EngagementRibbonLoop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0 ${className}`}
    >
      <svg
        width="640"
        height="320"
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-30"
      >
        <defs>
          <linearGradient id="ctaRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path
          d="M 60 160 C 90 60, 240 30, 380 45 C 520 60, 590 120, 570 190 C 550 260, 420 290, 280 280 C 150 270, 70 210, 90 140 C 110 70, 270 50, 430 75"
          stroke="url(#ctaRibbonGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M 80 175 C 110 80, 255 50, 395 65 C 530 80, 595 135, 575 200 C 555 265, 430 295, 295 285"
          stroke="url(#ctaRibbonGrad)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}
