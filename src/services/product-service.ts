import { products } from "@/data/products";
import { Product } from "@/types/product";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  light?: string;
  petFriendly?: boolean;
  difficulty?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  search?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  let result = [...products];

  if (!filters) return result;

  if (filters.category && filters.category !== "all") {
    result = result.filter(
      (p) =>
        p.category === filters.category ||
        p.tags.some((t) => t.toLowerCase().includes(filters.category!.toLowerCase()))
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.petFriendly) {
    result = result.filter((p) => p.care.petFriendly === true);
  }

  if (filters.difficulty) {
    result = result.filter(
      (p) => p.care.difficulty.toLowerCase() === filters.difficulty!.toLowerCase()
    );
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getNewArrivalProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.isNew || p.tags.includes("New Arrival")).slice(0, limit);
}

export async function getRelatedProducts(currentId: string, category: string, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== currentId && (p.category === category || p.isFeatured))
    .slice(0, limit);
}
