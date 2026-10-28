"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";

const FILTER_TABS = [
  { id: "all", label: "All Favorites" },
  { id: "indoor", label: "Indoor Foliage" },
  { id: "outdoor", label: "Balcony & Outdoor" },
  { id: "succulents", label: "Succulents & Cacti" },
];

export function BestSellersSection() {
  const [activeTab, setActiveTab] = React.useState("all");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const filteredProducts = React.useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter(
      (p) => p.category === activeTab || p.tags.some((t) => t.toLowerCase().includes(activeTab))
    );
  }, [activeTab]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Tabs Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Customer Proven</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Best Selling Greenery
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  emblaApi?.scrollTo(0);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--primary-green)] text-white shadow-sm"
                    : "bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)] hover:border-[var(--primary-green)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="relative">
          <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" ref={emblaRef}>
            <div className="flex gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23.5%] min-w-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-between pt-6">
            {/* Pagination Snap Dots */}
            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-6 bg-[var(--primary-green)]"
                      : "w-2 bg-[var(--border-warm)] hover:bg-[var(--ink-muted)]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous best seller"
                className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next best seller"
                className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
