"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotalNGN,
    subtotalUSD,
    currency,
    formatPrice,
    appliedCoupon,
    discountPercentage,
    applyCoupon,
    showToast,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutName, setCheckoutName] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail || !checkoutName) {
      showToast("Please enter your name and email");
      return;
    }
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setCheckoutComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-black border-l border-white/10 flex flex-col shadow-2xl relative text-white">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs uppercase tracking-[0.2em] font-normal text-white">
                Selected Acquirements
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {checkoutComplete ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#C5A880] mx-auto stroke-[1.5]" />
                <h3 className="text-sm uppercase tracking-wider font-normal text-white">
                  Acquisition Confirmed
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Confirmation and dispatch dispatch instructions have been sent to{" "}
                  <span className="text-white font-mono">{checkoutEmail}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 border border-white/20 text-white hover:border-white text-xs uppercase tracking-widest transition-colors"
                  >
                    Close Drawer
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs uppercase tracking-widest text-zinc-400">
                    Direct Order Dispatch
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[11px] text-zinc-400 hover:text-white underline"
                  >
                    Back to Items
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-mono">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="Chibuike Godwin"
                      className="w-full bg-white/[0.03] border border-white/15 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="recipient@example.com"
                      className="w-full bg-white/[0.03] border border-white/15 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="pt-2 p-3 border border-white/10 bg-white/[0.02] text-[11px] text-zinc-400 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>
                      Digital items delivered instantly. Physical items dispatched within 48 hours.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-normal transition-colors"
                  >
                    Complete Acquisition &bull; {formatPrice(subtotalNGN, subtotalUSD)}
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto stroke-[1.5]" />
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Your bag is currently empty
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 border border-white/15 text-white hover:border-white text-[11px] uppercase tracking-widest transition-colors"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 border border-white/10 bg-white/[0.02] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-normal">
                          {item.product.title}
                        </h4>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {formatPrice(item.product.priceNGN, item.product.priceUSD)} each
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono text-white">
                        {formatPrice(
                          item.product.priceNGN * item.quantity,
                          item.product.priceUSD * item.quantity
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!checkoutComplete && cart.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-white/10 bg-black space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
                  Subtotal
                </span>
                <span className="text-base font-light tracking-wide text-white font-mono">
                  {formatPrice(subtotalNGN, subtotalUSD)}
                </span>
              </div>

              <button
                onClick={handleStartCheckout}
                className="w-full py-3 bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-normal flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
