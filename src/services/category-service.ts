import { categories, PlantCategory } from "@/data/categories";

export async function getCategories(): Promise<PlantCategory[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<PlantCategory | null> {
  const cat = categories.find((c) => c.slug === slug);
  return cat || null;
}
