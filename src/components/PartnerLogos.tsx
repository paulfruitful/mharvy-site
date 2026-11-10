"use client";

import React from "react";
import Image from "next/image";

export function PartnerLogos() {
  const brands = [
    { name: "AJMAX", src: "/brands/AJMAX.webp" },
    { name: "HAUS9", src: "/brands/HAUS9.webp" },
    { name: "MINDSET HACK CONFERENCE", src: "/brands/MINDSET HACK CONFERENCE.webp" },
    { name: "SPORTS FIESTA", src: "/brands/SPORTS FIESTA.webp" },
    { name: "SWILL", src: "/brands/SWILL.webp" },
  ];

  return (
    <div className="w-full flex items-center justify-between gap-8 sm:gap-12 overflow-x-auto py-3 scrollbar-none">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="relative h-6 sm:h-7 w-28 sm:w-36 flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
        >
          <Image
            src={brand.src}
            alt={brand.name}
            fill
            className="object-contain filter brightness-0 invert"
          />
        </div>
      ))}
    </div>
  );
}
