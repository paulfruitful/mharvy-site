"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Clock,
  Globe,
  MessageSquare,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { useCart } from "@/context/CartContext";

export default function ContactPage() {
  const { showToast } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Brand Strategy & Positioning");
  const [budget, setBudget] = useState("₦1,000,000 - ₦3,000,000 ($1,000 - $3,000)");
  const [timeline, setTimeline] = useState("Within 2 to 4 weeks");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast("Please complete all required fields");
      return;
    }
    setSubmitted(true);
    showToast("Inquiry received! Marvellous will respond within 24 business hours.");
  };

  const faqs = [
    {
      q: "How does the engagement kickoff work?",
      a: "After you submit this inquiry, Chibuike Godwin Marvellous reviews your brief within 24 hours. We then schedule a 30-minute discovery consultation to align on strategic objectives, scope, timeline, and commercial fit.",
    },
    {
      q: "Do you work with startups and organizations outside Nigeria?",
      a: "Yes, absolutely. Over 40% of our consulting and branding commissions originate from diaspora founders, pan-African coalitions, and global startups across the UK, US, Canada, Kenya, and Ghana.",
    },
    {
      q: "What is your typical turnaround time for a complete brand identity?",
      a: "A foundational brand identity and visual communications system typically takes between 3 to 5 weeks from kickoff to final asset and guideline delivery.",
    },
    {
      q: "Can I book Chibuike Godwin Marvellous for a speaking engagement or workshop?",
      a: "Yes. Simply select 'Keynote, Workshop or Advocacy' in the service dropdown above and outline the event dates, venue or virtual platform, and expected audience profile.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3E3E42] font-poppins">
      {/* Header Banner */}
      <section className="pt-20 pb-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-[#DDDDDD] relative">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#012A69] uppercase tracking-widest font-proxima">
              <MessageSquare className="w-4 h-4 text-[#012A69]" />
              <span>Direct Inquiries &bull; Book Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#012A69] font-serif-luxury tracking-tight leading-tight">
              Start a Strategic <br />
              <span className="italic">Conversation.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Direct access to Chibuike Godwin Marvellous for high-stakes brand strategy, visual communications, speaking engagements, and advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Contact Info */}
      <section className="py-16 bg-[#F8F9FA] flex-1">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#DDDDDD] shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#012A69] font-serif-luxury">
                    Inquiry Successfully Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#012A69]">{name}</strong>. Your project brief has been sent directly to Chibuike Godwin Marvellous&apos;s executive desk. Expect a response within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#012A69] font-serif-luxury">
                      Tell Us About Your Project
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Complete the brief below and we will prepare tailored recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Godwin Marvellous"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Company or Project Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. NextGen Logistics"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Primary Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      >
                        <option>Brand Strategy &amp; Positioning</option>
                        <option>Visual Identity &amp; Communications System</option>
                        <option>UI/UX &amp; Digital Product Design</option>
                        <option>Keynote, Workshop or Advocacy</option>
                        <option>General Creative Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                        Budget Range
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                      >
                        <option>₦500k - ₦1,000,000 ($500 - $1,000)</option>
                        <option>₦1,000,000 - ₦3,000,000 ($1,000 - $3,000)</option>
                        <option>₦3,000,000 - ₦7,000,000 ($3,000 - $7,000)</option>
                        <option>₦7,000,000+ ($7,000+ Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#012A69] mb-1 font-proxima uppercase tracking-wider">
                      Project Goals &amp; Context *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe what you are looking to achieve, your timeline, and any key links..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channels Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white border border-[#DDDDDD] shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#012A69] font-serif-luxury">
                    Direct Contact Channels
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Connect directly through our official channels.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <a
                    href="mailto:hello@mharvy.com.ng"
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3 hover:border-[#012A69] transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#012A69] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase font-bold block">Email</span>
                      <strong className="text-xs text-[#012A69]">hello@mharvy.com.ng</strong>
                    </div>
                  </a>

                  <a
                    href="tel:+2347072118506"
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3 hover:border-[#012A69] transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#012A69] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase font-bold block">Telephone</span>
                      <strong className="text-xs text-[#012A69]">+234 707 211 8506</strong>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/2347072118506"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 hover:bg-emerald-100 transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-700 uppercase font-bold block">Instant Chat</span>
                      <strong className="text-xs text-emerald-900">WhatsApp Direct (+234 707 211 8506)</strong>
                    </div>
                  </a>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#012A69] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase font-bold block">Locations</span>
                      <span className="text-xs text-[#3E3E42]">Lagos &bull; Port Harcourt, Nigeria</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement FAQs */}
              <div className="p-8 rounded-2xl bg-white border border-[#DDDDDD] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#012A69] font-serif-luxury">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full p-3.5 text-left text-xs font-bold text-[#012A69] flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              isOpen ? "rotate-180 text-[#012A69]" : "text-gray-400"
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-3.5 text-xs text-[#3E3E42] bg-white border-t border-gray-100 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
