import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopContent } from "@/components/shop/shop-content";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Shop All Plants, Planters & Care",
  description:
    "Explore our complete nursery catalog: air purifying houseplants, low-light succulents, self-watering planters, organic fertilizers, and heirloom seeds.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-[var(--primary-green)] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
