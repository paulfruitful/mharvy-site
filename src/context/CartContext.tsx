"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalNGN: number;
  subtotalUSD: number;
  currency: "NGN" | "USD";
  setCurrency: (currency: "NGN" | "USD") => void;
  formatPrice: (priceNGN: number, priceUSD: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isTribeModalOpen: boolean;
  setIsTribeModalOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  discountPercentage: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTribeModalOpen, setIsTribeModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mharvy_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCurrency = localStorage.getItem("mharvy_currency");
      if (savedCurrency === "USD" || savedCurrency === "NGN") {
        setCurrency(savedCurrency);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("mharvy_cart", JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("mharvy_currency", currency);
    } catch {
      // Ignore storage errors
    }
  }, [currency]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title}" to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "MHARVY10" || clean === "TRIBE10") {
      setAppliedCoupon(clean);
      setDiscountPercentage(10);
      showToast("Coupon applied: 10% discount!");
      return { success: true, message: "10% discount applied successfully!" };
    }
    if (clean === "LAUNCH20") {
      setAppliedCoupon(clean);
      setDiscountPercentage(20);
      showToast("Coupon applied: 20% discount!");
      return { success: true, message: "20% special launch discount applied!" };
    }
    return { success: false, message: "Invalid coupon code. Try 'MHARVY10'" };
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const rawSubtotalNGN = cart.reduce(
    (total, item) => total + item.product.priceNGN * item.quantity,
    0
  );
  const rawSubtotalUSD = cart.reduce(
    (total, item) => total + item.product.priceUSD * item.quantity,
    0
  );

  const subtotalNGN = Math.round(rawSubtotalNGN * (1 - discountPercentage / 100));
  const subtotalUSD = Math.round(rawSubtotalUSD * (1 - discountPercentage / 100));

  const formatPrice = (priceNGN: number, priceUSD: number) => {
    if (currency === "USD") {
      return `$${priceUSD.toLocaleString()}`;
    }
    return `₦${priceNGN.toLocaleString()}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotalNGN,
        subtotalUSD,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isTribeModalOpen,
        setIsTribeModalOpen,
        appliedCoupon,
        discountPercentage,
        applyCoupon,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
