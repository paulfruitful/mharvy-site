export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tagline: string;
  description: string;
  fullStory: string[];
  challenge: string;
  solution: string;
  impactMetrics: string[];
  results?: string[];
  deliverables: string[];
  tags: string[];
  coverGradient: string;
  badgeColor: string;
  accentColor: string;
  featured?: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  priceNGN: number;
  priceUSD: number;
  originalPriceNGN?: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isPhysical?: boolean;
  image?: string;
  coverGradient: string;
  badge: string;
  format: string;
  directUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  publishDate: string;
  readTime: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: "Speaking" | "Documentary" | "Design Breakdown" | "Story";
  duration: string;
  date: string;
  description: string;
  youtubeId: string;
  youtubeUrl?: string;
  views?: string;
  highlights: string[];
  keyTakeaways?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  rating: number;
}
