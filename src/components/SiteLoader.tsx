"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth progress counter up to 100
    const duration = 1100; // 1.1s total duration
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
      const currentVal = Math.round(easeProgress * 100);

      setProgress(currentVal);

      if (progressRatio < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 700); // match fade duration
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animId);
  }, []);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Site preloader"
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isLoaded ? "opacity-0 pointer-events-none scale-105" : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Background ambient light */}
      <div className="absolute w-72 h-72 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      {/* Center Container */}
      <div className="relative flex flex-col items-center justify-center text-center z-10 px-6">
        
        {/* Logo at the center */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-white/20 mb-6 bg-stone-900 shadow-[0_0_24px_rgba(255,255,255,0.25)] flex items-center justify-center">
          <Image
            src="/favicon.png"
            alt="theCreative Mharvy Logo"
            fill
            priority
            className="object-contain p-1 animate-pulse"
          />
        </div>

        {/* Hairline Progress Bar */}
        <div className="w-36 sm:w-44 h-[1px] bg-white/15 overflow-hidden relative rounded-full">
          <div
            className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Minimal Percentage and Monospace Status */}
        <div className="flex items-center justify-between w-36 sm:w-44 mt-3 text-[10px] font-mono tracking-[0.25em] text-white/40">
          <span>INITIALIZING</span>
          <span className="text-white/80 font-semibold">{progress}%</span>
        </div>

      </div>
    </aside>
  );
}
