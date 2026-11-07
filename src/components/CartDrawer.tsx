"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Lock,
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
    <div className="fixed inset-0 z-50 overflow-hidden font-poppins">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#DDDDDD] flex flex-col shadow-2xl relative text-[#3E3E42]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#DDDDDD] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#012A69]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-[#012A69] font-serif-luxury">Your Cart</h2>
              {cart.length > 0 && (
                <span className="text-xs bg-[#FC576B] text-white px-2 py-0.5 rounded-full font-bold">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-gray-400 hover:text-[#012A69] hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#012A69]">Order Confirmed!</h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#012A69]">{checkoutName}</strong>! Your download links and access keys have been dispatched to <strong className="text-[#012A69]">{checkoutEmail}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="font-mono font-bold text-[#012A69]">MH-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery:</span>
                    <span className="text-emerald-700 font-semibold">Instant Digital Download</span>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-lg btn-mharvy-primary font-bold text-xs shadow-sm mt-4"
                >
                  Continue Browsing
                </button>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Instant Secure Checkout
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#012A69] hover:underline font-semibold"
                  >
                    &larr; Back to Cart
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#012A69] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="e.g. Godwin Marvellous"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#012A69] mb-1">
                      Email Address (for download delivery)
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] focus:outline-none focus:border-[#012A69] transition-colors"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-[#012A69] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Lock className="w-3.5 h-3.5 text-[#012A69]" />
                      <span>Encrypted SSL Payhip Checkout</span>
                    </div>
                    <p className="text-[11px] text-gray-600">
                      Supports Cards (Mastercard, Visa, Verve), Bank Transfer, Apple Pay &amp; PayPal.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md mt-4"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Pay {formatPrice(subtotalNGN, subtotalUSD)} &amp; Receive Files
                  </span>
                </button>
              </form>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#012A69]">Your cart is currently empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our digital toolkits, brand guides, and CGM apparel to get started.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 px-5 py-2.5 rounded-lg btn-mharvy-primary text-xs font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-xl bg-[#F8F9FA] border border-[#DDDDDD] flex items-center gap-3.5 relative group"
                  >
                    <div
                      className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.product.coverGradient} flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                    >
                      {item.product.category.slice(0, 3).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#012A69] truncate">
                        {item.product.title}
                      </h4>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {formatPrice(item.product.priceNGN, item.product.priceUSD)} each
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#012A69] hover:border-[#012A69] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#012A69] px-1 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#012A69] hover:border-[#012A69] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Coupon Code Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. MHARVY10)"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-xs text-[#3E3E42] placeholder:text-gray-400 uppercase font-mono focus:outline-none focus:border-[#012A69]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {couponError}
                    </span>
                  )}
                  {appliedCoupon && (
                    <span className="text-[11px] text-emerald-600 mt-1 block font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Coupon {appliedCoupon} active ({discountPercentage}% OFF)
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && !isCheckingOut && !checkoutComplete && (
            <div className="p-6 border-t border-[#DDDDDD] bg-gray-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotalNGN, subtotalUSD)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercentage}%):</span>
                    <span>- {formatPrice((subtotalNGN * discountPercentage) / 100, (subtotalUSD * discountPercentage) / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#012A69] pt-2 border-t border-gray-200">
                  <span>Total Due:</span>
                  <span>{formatPrice(subtotalNGN, subtotalUSD)}</span>
                </div>
              </div>

              <button
                onClick={handleStartCheckout}
                className="w-full py-3.5 rounded-lg btn-mharvy-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
