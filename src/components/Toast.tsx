"use client";

import React from "react";
import { CheckCircle, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Toast() {
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-in">
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <p className="text-xs sm:text-sm font-medium text-zinc-200 flex-1">{toastMessage}</p>
        <button
          onClick={hideToast}
          className="text-zinc-500 hover:text-white p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
