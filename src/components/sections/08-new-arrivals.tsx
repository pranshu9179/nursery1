"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export function NewArrivalsSection() {
  const [displayCount, setDisplayCount] = React.useState(8);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const visibleProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 4, products.length));
      setIsLoadingMore(false);
    }, 400);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Fresh From The Nursery</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              New Plant Arrivals
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="text-xs font-bold text-[var(--primary-green)] hover:underline inline-flex items-center gap-1 group"
          >
            <span>View All New Releases</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Col Desktop / 2-Col Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Client-side Pagination: Load More */}
        {hasMore && (
          <div className="text-center pt-6">
            <Button
              variant="secondary"
              size="default"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 font-bold text-xs rounded-full border border-[var(--border-warm)] shadow-xs hover:border-[var(--primary-green)] hover:text-[var(--primary-green)]"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading Fresh Releases...</span>
                </>
              ) : (
                <span>Load More Plants ({products.length - displayCount} remaining)</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
