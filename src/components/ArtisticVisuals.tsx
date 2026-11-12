"use client";

import React, { useId } from "react";

interface PipeLightPathProps {
  d: string;
  glowFilterId: string;
  baseStroke: string;
  baseWidth?: number;
  baseOpacity?: number;
  baseDasharray?: string;
  duration?: string;
  delay?: string;
  haloOpacity?: number;
  coreOpacity?: number;
}

/**
 * PipeLightPath
 * Renders a hairline architectural "pipe" curve together with a luminous white
 * droplet + outer glow halo flowing smoothly from one end of the path to the other.
 */
function PipeLightPath({
  d,
  glowFilterId,
  baseStroke,
  baseWidth = 1,
  baseOpacity,
  baseDasharray,
  duration = "5.2s",
  delay = "0s",
  haloOpacity = 0.42,
  coreOpacity = 0.95,
}: PipeLightPathProps) {
  const animStyle = {
    "--flow-duration": duration,
    "--flow-delay": delay,
  } as React.CSSProperties;

  return (
    <g>
      {/* Static translucent pipe track */}
      <path
        d={d}
        stroke={baseStroke}
        strokeWidth={baseWidth}
        strokeOpacity={baseOpacity}
        strokeDasharray={baseDasharray}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Luminous liquid glow halo */}
      <path
        d={d}
        pathLength={100}
        stroke="#FFFFFF"
        strokeWidth={Math.max(2.6, baseWidth * 2.8)}
        strokeOpacity={haloOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowFilterId})`}
        className="animate-pipe-flow"
        style={animStyle}
      />

      {/* Crisp bright droplet core */}
      <path
        d={d}
        pathLength={100}
        stroke="#FFFFFF"
        strokeWidth={Math.max(1.35, baseWidth * 1.3)}
        strokeOpacity={coreOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pipe-flow"
        style={animStyle}
      />
    </g>
  );
}

/**
 * HeroFluidRibbon
 * Multi-strand hairline fluid ribbon paths that weave gracefully across
 * the wide negative space of the hero section, carrying flowing droplets of white light.
 */
export function HeroFluidRibbon({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const grad1 = `heroGrad1_${uid}`;
  const grad2 = `heroGrad2_${uid}`;
  const glowId = `heroGlow_${uid}`;

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
        className="w-full h-full opacity-75"
      >
        <defs>
          <linearGradient id={grad1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id={grad2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary flowing ribbon strand */}
        <PipeLightPath
          d="M -120 480 C 240 280, 520 680, 940 360 C 1220 150, 1460 480, 1720 300"
          glowFilterId={glowId}
          baseStroke={`url(#${grad1})`}
          baseWidth={1.2}
          duration="5.6s"
          delay="0s"
        />

        {/* Secondary echo ribbon strand */}
        <PipeLightPath
          d="M -100 510 C 260 310, 540 710, 960 390 C 1240 180, 1480 510, 1740 330"
          glowFilterId={glowId}
          baseStroke={`url(#${grad1})`}
          baseWidth={1}
          baseOpacity={0.7}
          duration="6.4s"
          delay="1.9s"
          haloOpacity={0.3}
          coreOpacity={0.78}
        />

        {/* Tertiary counter-curve ribbon strand */}
        <PipeLightPath
          d="M 100 120 C 480 320, 780 140, 1140 420 C 1380 610, 1620 440, 1750 560"
          glowFilterId={glowId}
          baseStroke={`url(#${grad2})`}
          baseWidth={1}
          duration="6.0s"
          delay="3.1s"
          haloOpacity={0.35}
          coreOpacity={0.85}
        />

        {/* Fourth subtle contour thread */}
        <PipeLightPath
          d="M 80 145 C 460 345, 760 165, 1120 445 C 1360 635, 1600 465, 1730 585"
          glowFilterId={glowId}
          baseStroke={`url(#${grad2})`}
          baseWidth={0.8}
          baseOpacity={0.5}
          baseDasharray="4 6"
          duration="7.2s"
          delay="0.8s"
          haloOpacity={0.22}
          coreOpacity={0.55}
        />
      </svg>
    </div>
  );
}

/**
 * CreativeScribbleLoop
 * An organic, hand-drawn continuous single-line scribble loop / flourish
 * with a crisp bead of white light circulating through its curves.
 */
export function CreativeScribbleLoop({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glowId = `scribbleGlow_${uid}`;

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
        className="opacity-70 transition-opacity duration-500"
      >
        <defs>
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <PipeLightPath
          d="M 15 75 C 35 45, 65 20, 105 25 C 145 30, 165 65, 135 95 C 105 115, 65 95, 50 65 C 35 35, 60 10, 95 15 C 130 20, 165 45, 170 80 C 172 95, 155 105, 130 100 C 105 95, 85 75, 90 55 C 95 35, 120 30, 140 45"
          glowFilterId={glowId}
          baseStroke="white"
          baseWidth={1.2}
          baseOpacity={0.32}
          duration="4.6s"
          delay="0.4s"
          haloOpacity={0.5}
          coreOpacity={1}
        />
      </svg>
    </div>
  );
}

/**
 * ArtisticUnderline
 * A delicate, hand-drawn organic scribble underline accent carrying a subtle white light pulse.
 */
export function ArtisticUnderline({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glowId = `underlineGlow_${uid}`;

  return (
    <svg
      width="160"
      height="18"
      viewBox="0 0 160 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-65 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={glowId} x="-20%" y="-250%" width="140%" height="600%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <PipeLightPath
        d="M 3 11 C 35 5, 80 14, 115 8 C 132 5, 148 9, 157 7"
        glowFilterId={glowId}
        baseStroke="white"
        baseWidth={1.2}
        baseOpacity={0.45}
        duration="3.8s"
        delay="0s"
        haloOpacity={0.5}
        coreOpacity={1}
      />

      <PipeLightPath
        d="M 22 14 C 55 9, 95 15, 138 11"
        glowFilterId={glowId}
        baseStroke="white"
        baseWidth={1}
        baseOpacity={0.3}
        duration="3.8s"
        delay="0.9s"
        haloOpacity={0.35}
        coreOpacity={0.85}
      />
    </svg>
  );
}

/**
 * SectionRibbonWave
 * A flowing horizontal hairline ribbon that stretches across wide sections
 * with white light droplets flowing like water through parallel conduits.
 */
export function SectionRibbonWave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `sectionGrad_${uid}`;
  const glowId = `sectionGlow_${uid}`;

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
        className={`w-full h-full opacity-55 ${flip ? "scale-y-[-1]" : ""}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <filter id={glowId} x="-15%" y="-120%" width="130%" height="340%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Ribbon Curve */}
        <PipeLightPath
          d="M -80 130 C 260 20, 620 240, 980 80 C 1220 -20, 1380 180, 1520 120"
          glowFilterId={glowId}
          baseStroke={`url(#${gradId})`}
          baseWidth={1}
          duration="5.4s"
          delay="0.2s"
          haloOpacity={0.42}
          coreOpacity={0.95}
        />

        {/* Twin parallel echo strand */}
        <PipeLightPath
          d="M -60 150 C 280 40, 640 260, 1000 100 C 1240 0, 1400 200, 1540 140"
          glowFilterId={glowId}
          baseStroke={`url(#${gradId})`}
          baseWidth={0.8}
          baseOpacity={0.6}
          duration="6.2s"
          delay="2.1s"
          haloOpacity={0.28}
          coreOpacity={0.75}
        />

        {/* Hairline dashed guide curve */}
        <PipeLightPath
          d="M -100 110 C 240 0, 600 220, 960 60 C 1200 -40, 1360 160, 1500 100"
          glowFilterId={glowId}
          baseStroke={`url(#${gradId})`}
          baseWidth={0.7}
          baseOpacity={0.4}
          baseDasharray="3 5"
          duration="6.8s"
          delay="3.5s"
          haloOpacity={0.2}
          coreOpacity={0.55}
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
      <div className="absolute top-4 left-6 flex items-center gap-1.5 opacity-30">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.4" fill="white" className="animate-pulse" />
        </svg>
        <span className="text-[8px] font-mono tracking-[0.25em] text-white/50 hidden sm:inline">
          SYS.01 // GRID
        </span>
      </div>

      {/* Top Right Crosshair */}
      <div className="absolute top-4 right-6 flex items-center gap-1.5 opacity-30">
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
 * A delicate organic continuous ribbon ring framing the CTA area with orbiting pipe light pulses.
 */
export function EngagementRibbonLoop({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `ctaGrad_${uid}`;
  const glowId = `ctaGlow_${uid}`;

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
        className="opacity-45"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <filter id={glowId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <PipeLightPath
          d="M 60 160 C 90 60, 240 30, 380 45 C 520 60, 590 120, 570 190 C 550 260, 420 290, 280 280 C 150 270, 70 210, 90 140 C 110 70, 270 50, 430 75"
          glowFilterId={glowId}
          baseStroke={`url(#${gradId})`}
          baseWidth={1.2}
          duration="5.0s"
          delay="0s"
          haloOpacity={0.48}
          coreOpacity={1}
        />

        <PipeLightPath
          d="M 80 175 C 110 80, 255 50, 395 65 C 530 80, 595 135, 575 200 C 555 265, 430 295, 295 285"
          glowFilterId={glowId}
          baseStroke={`url(#${gradId})`}
          baseWidth={0.8}
          baseOpacity={0.5}
          baseDasharray="4 6"
          duration="5.8s"
          delay="2.2s"
          haloOpacity={0.28}
          coreOpacity={0.7}
        />
      </svg>
    </div>
  );
}
