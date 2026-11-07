"use client";

import React from "react";

export function PartnerLogos() {
  return (
    <div className="w-full flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto py-2 scrollbar-none opacity-85 hover:opacity-100 transition-opacity">
      {/* 1. Mindset Masterclass */}
      <div className="flex items-center gap-1.5 flex-shrink-0 group cursor-default">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#012A69]">
          <path d="M12 3L2 21H22L12 3Z" fill="currentColor" />
          <path d="M12 9L7 19H17L12 9Z" fill="#FFFFFF" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tight text-[#012A69] font-poppins">
            Mindset
          </span>
          <span className="text-[8px] font-black tracking-[0.2em] text-[#012A69] uppercase">
            MASTERCLASS
          </span>
        </div>
      </div>

      {/* 2. HAUS9 */}
      <div className="flex items-center flex-shrink-0 group cursor-default">
        <span className="text-lg font-black tracking-tighter text-[#012A69] font-serif-luxury border-b-2 border-[#012A69] pb-0.5">
          HAUS<span className="font-sans text-xl">9</span>
        </span>
      </div>

      {/* 3. SWILL CREATIVE */}
      <div className="flex items-center gap-1.5 flex-shrink-0 group cursor-default">
        <div className="flex flex-col gap-0.5">
          <span className="w-4 h-0.5 bg-[#012A69] rotate-[-25deg] transform origin-left" />
          <span className="w-4 h-0.5 bg-[#012A69] rotate-[-25deg] transform origin-left" />
          <span className="w-4 h-0.5 bg-[#012A69] rotate-[-25deg] transform origin-left" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-wider text-[#012A69] font-poppins">
            SWILL
          </span>
          <span className="text-[7.5px] font-bold tracking-[0.25em] text-[#012A69] uppercase">
            CREATIVE
          </span>
        </div>
      </div>

      {/* 4. FIESTA MEDIA */}
      <div className="flex items-center gap-1 flex-shrink-0 group cursor-default">
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tight text-[#012A69] italic font-serif">
            FIESTA
          </span>
          <span className="text-[7.5px] font-black tracking-[0.3em] text-[#012A69] uppercase">
            MEDIA
          </span>
        </div>
      </div>

      {/* 5. AJMAX */}
      <div className="flex items-center flex-shrink-0 group cursor-default">
        <span className="text-base font-black tracking-[0.2em] text-[#012A69] uppercase font-proxima">
          AJMAX
        </span>
      </div>

      {/* 6. Mindset Masterclass (Repeated as in mockup) */}
      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 group cursor-default">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#012A69]">
          <path d="M12 3L2 21H22L12 3Z" fill="currentColor" />
          <path d="M12 9L7 19H17L12 9Z" fill="#FFFFFF" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tight text-[#012A69] font-poppins">
            Mindset
          </span>
          <span className="text-[8px] font-black tracking-[0.2em] text-[#012A69] uppercase">
            MASTERCLASS
          </span>
        </div>
      </div>
    </div>
  );
}
