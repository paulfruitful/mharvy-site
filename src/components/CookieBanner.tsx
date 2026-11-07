"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

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

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 font-poppins">
      <div className="bg-white/95 backdrop-blur-xl border border-[#DDDDDD] p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col gap-3 text-[#3E3E42]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[#012A69] text-xs font-bold uppercase tracking-wider font-proxima">
            <Cookie className="w-4 h-4 text-[#012A69]" />
            <span>Store Experience &amp; Cart Storage</span>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#3E3E42] leading-relaxed">
          We use functional cookies and storage to preserve your cart items, currency preferences (NGN / USD),
          and ensure an optimal creative portfolio experience.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 rounded-lg btn-mharvy-primary font-bold text-xs shadow-sm"
          >
            Accept All
          </button>
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-xs text-gray-600 hover:bg-gray-100 font-medium transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
