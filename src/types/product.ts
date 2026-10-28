export type CareDifficulty = 'Easy' | 'Moderate' | 'Challenging';

export interface PlantCareGuide {
  light: string;
  water: string;
  petFriendly: boolean;
  difficulty: CareDifficulty;
  temperature: string;
  humidity: string;
  fertilizer?: string;
  repotting?: string;
}

export interface ProductVariantSize {
  name: string; // 'S' | 'M' | 'L' | 'XL'
  label: string; // e.g. "Small (6-8 inches)"
  price: number;
  originalPrice: number;
  height: string;
  potDiameter: string;
}

export interface PlanterColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  userPhoto?: string;
  plantPhoto?: string;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  botanicalName?: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: 'indoor' | 'outdoor' | 'succulents' | 'flowering' | 'pots' | 'seeds' | 'care' | 'gifting';
  categoryLabel: string;
  tags: string[];
  stock: number;
  sku: string;
  badge?: string;
  badgeType?: 'terracotta' | 'primary' | 'marigold' | 'sky' | 'sage';
  sizes: ProductVariantSize[];
  planterColors?: PlanterColor[];
  care: PlantCareGuide;
  features: string[];
  includes?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  reviews?: ProductReview[];
}
