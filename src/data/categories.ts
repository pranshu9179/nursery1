export interface PlantCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
  accentColor: string;
}

export const categories: PlantCategory[] = [
  {
    id: "cat-1",
    name: "Indoor Plants",
    slug: "indoor",
    itemCount: 48,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
    description: "Lush tropical foliage that transforms interior spaces into serene urban sanctuaries.",
    accentColor: "var(--sage-tint)",
  },
  {
    id: "cat-2",
    name: "Succulents & Cacti",
    slug: "succulents",
    itemCount: 32,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
    description: "Sculptural, drought-resilient beauties that store water in plump, fleshy leaves.",
    accentColor: "var(--sky-tint)",
  },
  {
    id: "cat-3",
    name: "Self-Watering Pots",
    slug: "pots",
    itemCount: 24,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    description: "Patented sub-irrigation architectural vessels that eliminate guesswork and root rot.",
    accentColor: "var(--cream-tint)",
  },
  {
    id: "cat-4",
    name: "Flowering Beauties",
    slug: "flowering",
    itemCount: 19,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
    description: "Fragrant blooms and colorful spathes that brighten sun-drenched balconies and sills.",
    accentColor: "var(--terracotta-tint)",
  },
  {
    id: "cat-5",
    name: "Seeds & Microgreens",
    slug: "seeds",
    itemCount: 42,
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80",
    description: "Heirloom non-GMO seed packets with guaranteed high germination rates.",
    accentColor: "var(--sage-tint)",
  },
  {
    id: "cat-6",
    name: "Living Gift Hampers",
    slug: "gifting",
    itemCount: 16,
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
    description: "Thoughtfully packaged botanical gift boxes that flourish for years, not days.",
    accentColor: "var(--marigold-tint)",
  },
];
