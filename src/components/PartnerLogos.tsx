"use client";

import React from "react";
import Image from "next/image";

const brands = [
  { name: "AJMAX", src: "/brands/AJMAX.webp" },
  { name: "HAUS9", src: "/brands/HAUS9.webp" },
  { name: "MINDSET HACK CONFERENCE", src: "/brands/MINDSET HACK CONFERENCE.webp" },
  { name: "SPORTS FIESTA", src: "/brands/SPORTS FIESTA.webp" },
  { name: "SWILL", src: "/brands/SWILL.webp" },
];

/**
 * PartnerLogos
 * Continuous hardware-accelerated horizontal marquee gliding from one end to the other,
 * masked into solid black at both edges and gently pausing on hover.
 */
export function PartnerLogos() {
  // Repeat each half twice so a single half exceeds ultrawide viewport widths for seamless -50% looping
  const halfTrack = [...brands, ...brands];

  const renderGroup = (prefix: string, ariaHidden?: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex items-center gap-14 sm:gap-20 lg:gap-24 pr-14 sm:pr-20 lg:pr-24 flex-shrink-0"
    >
      {halfTrack.map((brand, idx) => (
        <div
          key={`${prefix}-${brand.name}-${idx}`}
          className="relative h-7 sm:h-8 w-28 sm:w-36 flex-shrink-0 flex items-center justify-center opacity-45 hover:opacity-100 hover:scale-105 transition-all duration-300"
        >
          <Image
            src={brand.src}
            alt={ariaHidden ? "" : brand.name}
            fill
            sizes="144px"
            className="object-contain filter brightness-0 invert"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee-pause relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-brand-marquee">
        {renderGroup("a")}
        {renderGroup("b", true)}
      </div>
    </div>
  );
}
