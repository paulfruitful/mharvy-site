"use client";

import React from "react";
import Image from "next/image";

interface SealBadgeProps {
  className?: string;
  size?: number;
}

export function SealBadge({ className = "", size = 130 }: SealBadgeProps) {
  return (
    <div
      className={`relative rounded-full shadow-2xl flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full animate-[spin_25s_linear_infinite]"
        style={{ transformOrigin: "center" }}
      >
        <defs>
          {/* Circular path for rotating text */}
          <path
            id="textPathCircle"
            d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          />
        </defs>

        {/* Outer navy base circle */}
        <circle cx="80" cy="80" r="76" fill="#012A69" stroke="#FFFFFF" strokeWidth="2.5" />
        
        {/* Outer decorative ring */}
        <circle cx="80" cy="80" r="70" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

        {/* Circular curved text */}
        <text
          fill="#FFFFFF"
          fontSize="9.5"
          fontWeight="bold"
          letterSpacing="2.2"
          fontFamily="poppins, sans-serif"
          className="uppercase tracking-widest"
        >
          <textPath href="#textPathCircle" startOffset="0%">
            VISUAL COMMUNICATIONS DESIGN &bull; STRATEGIC EXECUTION &bull;
          </textPath>
        </text>

        {/* Inner concentric ring */}
        <circle cx="80" cy="80" r="46" fill="#012A69" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="43" fill="#012A69" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Center White Monogram Emblem */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-7 relative flex items-center justify-center">
          <svg viewBox="0 0 54 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-6 drop-shadow-sm">
            {/* Stylized interconnected monogram matching mharvy badge */}
            <rect x="2" y="4" width="22" height="28" rx="11" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <rect x="30" y="4" width="22" height="28" rx="11" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <path d="M 18 18 H 36" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <path d="M 27 10 V 26" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
