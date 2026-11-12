import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "cgm-originals-1st-edition-cap",
    slug: "cgm-originals-1st-edition-cap",
    title: "CGM Originals | 1st Edition Cap",
    category: "Merchandise",
    tagline: "Limited-edition luxury signature headwear embodying discipline, craftsmanship, and creative sovereignty.",
    description: "The official physical signature piece from Chibuike Godwin Marvellous (theCreative Mharvy). Crafted from heavy-duty breathable twill cotton with 3D tonal embroidery, custom antique brass hardware, and signature satin interior tape carrying the studio ethos.",
    features: [
      "100% heavyweight structured cotton twill in archival solid black",
      "3D tonal embroidered CGM monogram on front crown",
      "Debossed metal buckle with adjustable strap for universal fit",
      "Custom woven interior label: 'Building Brands That Matter'",
      "Includes collector verification card and dust packaging"
    ],
    priceNGN: 10000,
    priceUSD: 20,
    rating: 5.0,
    reviewCount: 44,
    isBestseller: true,
    isPhysical: true,
    image: "/merch/cgm-1st-edition-cap.png",
    coverGradient: "from-zinc-900 to-black",
    badge: "Limited Edition",
    format: "Physical Item (Worldwide Express Shipping)",
    directUrl: "https://mharvy.com.ng/b/MTdGf"
  },
  {
    id: "success-engineered-guide",
    slug: "success-engineered-guide",
    title: "Success Engineered (Guide)",
    category: "Guides & Toolkits",
    tagline: "The modern designer's blueprint for moving beyond software tools to high-value strategic leadership.",
    description: "Most designers focus entirely on mastering software while overlooking the critical commercial and strategic dynamics that drive client decisions. 'Success Engineered' reveals how to transition from a pixel-pusher to an indispensable business advisor who shapes culture, policy, and revenue.",
    features: [
      "The mindset architecture of high-trust strategic advisors",
      "Deconstructing value creation vs. mere visual aesthetics",
      "How to frame client conversations around ROI and systemic growth",
      "Navigating artificial intelligence and positioning as an indispensable thinker",
      "Value-based pricing formulas and client engagement frameworks"
    ],
    priceNGN: 5000,
    priceUSD: 10,
    rating: 5.0,
    reviewCount: 52,
    isBestseller: true,
    isPhysical: false,
    image: "/books/success-engineered.jpg",
    coverGradient: "from-zinc-900 to-black",
    badge: "Official Guide",
    format: "Instant PDF Download + Audio Companion",
    directUrl: "https://mharvy.com.ng/b/success-engineered"
  },
  {
    id: "the-digital-launchpad",
    slug: "the-digital-launchpad",
    title: "The Digital Launchpad (Guide)",
    category: "Guides & Toolkits",
    tagline: "The definitive roadmap for mastering digital literacy, communication, and economic positioning.",
    description: "A comprehensive, practical playbook written by Chibuike Godwin Marvellous based on training over 200 youths across Africa. It demystifies the digital economy, teaches high-leverage communication, and provides structured frameworks to turn creative and tech skills into sustainable ventures.",
    features: [
      "Actionable frameworks for digital economy navigation and execution",
      "Strategic positioning roadmap for African and global opportunities",
      "Structured templates for client outreach, proposals, and contracting",
      "Real-world case studies from grassroots initiatives and startup incubators",
      "Lifetime updates and access to future digital literacy resources"
    ],
    priceNGN: 10000,
    priceUSD: 20,
    rating: 5.0,
    reviewCount: 68,
    isBestseller: true,
    isPhysical: false,
    image: "/books/the-digital-launchpad.jpg",
    coverGradient: "from-zinc-900 to-black",
    badge: "Essential Handbook",
    format: "Instant PDF Download + Notion Resource Kit",
    directUrl: "https://mharvy.com.ng/b/the-digital-launchpad"
  }
];
