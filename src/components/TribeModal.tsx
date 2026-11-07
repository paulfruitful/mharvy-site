"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function TribeModal() {
  const { isTribeModalOpen, setIsTribeModalOpen, showToast } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([
    "Brand Strategy & Positioning",
    "Design & UI/UX Systems",
  ]);
  const [submitted, setSubmitted] = useState(false);

  if (!isTribeModalOpen) return null;

  const toggleInterest = (topic: string) => {
    if (interests.includes(topic)) {
      setInterests(interests.filter((i) => i !== topic));
    } else {
      setInterests([...interests, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      showToast("Please provide both name and email");
      return;
    }
    setSubmitted(true);
    showToast("Welcome to the Tribe! A welcome gift is on its way to your inbox.");
  };

  const handleClose = () => {
    setIsTribeModalOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  const topics = [
    "Brand Strategy & Positioning",
    "Design & UI/UX Systems",
    "Startup Growth & Advisory",
    "Youth Empowerment & Advocacy",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-poppins">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white border border-[#DDDDDD] p-6 sm:p-8 text-left shadow-2xl relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#012A69] hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#012A69] font-serif-luxury">
                Welcome to the Tribe!
              </h3>
              <p className="text-xs sm:text-sm text-[#3E3E42] max-w-xs mx-auto leading-relaxed">
                Thank you for connecting, <strong className="text-[#012A69]">{name}</strong>. Your starter toolkit and private community link are landing in <strong className="text-[#012A69]">{email}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold shadow-sm"
                >
                  Close &amp; Continue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#012A69] border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inner Circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#012A69] font-serif-luxury tracking-tight mt-2">
                  Join theCreative Mharvy Tribe
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-poppins">
                  A high-conviction network of creative entrepreneurs, founders, and designers receiving exclusive playbooks, early discounts, and closed sessions.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chibuike Godwin"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="godwin@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012A69] mb-1.5 font-proxima uppercase tracking-wider">
                    Topics You Care Most About
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topics.map((t) => {
                      const active = interests.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleInterest(t)}
                          className={`px-3 py-2 rounded-lg text-left text-xs transition-all border ${
                            active
                              ? "bg-blue-50 text-[#012A69] font-bold border-[#012A69]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Claim Free Starter Kit &amp; Join</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero spam. One-click unsubscribe anytime.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
