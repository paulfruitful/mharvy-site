import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { TribeModal } from "@/components/TribeModal";
import { CookieBanner } from "@/components/CookieBanner";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://mharvy.com.ng"),
  title: "Chibuike Godwin Marvellous | Top 1% of the world's 1% - theCreative Mharvy",
  description:
    "Discover courses, toolkits, free resources & more from Chibuike Godwin Marvellous (theCreativeMharvy). Build, innovate & lead with creativity & strategy. Shop now!",
  keywords: [
    "Chibuike Godwin Marvellous",
    "theCreative Mharvy",
    "Top 1% of the world's 1%",
    "Visual Communications Designer",
    "Brand Strategist Nigeria",
    "Designing the BuyOne App Experience",
    "Digital Launchpad",
    "Success Engineered",
    "Brandpreneur",
    "Designpreneur",
    "Techpreneur",
    "Socialpreneur",
  ],
  authors: [{ name: "Chibuike Godwin Marvellous", url: "https://mharvy.com.ng" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Chibuike Godwin Marvellous | Top 1% of the world's 1% - theCreative Mharvy",
    description:
      "Discover courses, toolkits, free resources & more from Chibuike Godwin Marvellous (theCreativeMharvy). Build, innovate & lead with creativity & strategy. Shop now!",
    url: "https://mharvy.com.ng",
    siteName: "Chibuike Godwin Marvellous | Top 1% of the world's 1% - theCreative Mharvy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chibuike Godwin Marvellous | theCreative Mharvy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chibuike Godwin Marvellous | Top 1% of the world's 1% - theCreative Mharvy",
    description:
      "Discover courses, toolkits, free resources & more from Chibuike Godwin Marvellous (theCreativeMharvy). Build, innovate & lead with creativity & strategy. Shop now!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        {/* Authentic Adobe Typekit fonts from mharvy.com.ng */}
        <link rel="stylesheet" href="https://use.typekit.net/osp8uxt.css" />
        <link rel="stylesheet" href="https://use.typekit.net/hit1uew.css" />
        <link rel="stylesheet" href="https://use.typekit.net/nax3vxi.css" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#3E3E42] font-sans selection:bg-[#012A69] selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <TribeModal />
          <CookieBanner />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
