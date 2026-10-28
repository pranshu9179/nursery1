"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";

export function CategoryCarouselSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
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
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Arrow Navigation */}
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Explore Varieties</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Find Plant Category
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous category"
              className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next category"
              className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" ref={emblaRef}>
          <div className="flex gap-5">
            {categories.map((cat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={cat.id}
                  className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0"
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative flex flex-col items-center rounded-2xl bg-[var(--surface)] p-5 text-center transition-all duration-300 ${
                      isActive
                        ? "border-2 border-[var(--primary-green)] shadow-md -translate-y-1"
                        : "border border-[var(--border-warm)] hover:border-[var(--primary-green)] hover:shadow-card"
                    }`}
                  >
                    {/* Visual Card Artwork */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[var(--surface-muted)] mb-4">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 20vw"
                      />
                    </div>

                    {/* Category Label & Item Count */}
                    <h3 className="font-display font-semibold text-base text-[var(--ink)] group-hover:text-[var(--primary-green)] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-[var(--ink-muted)] mt-1">
                      {cat.itemCount} Varieties Available
                    </span>

                    {/* Active Accent Dot */}
                    {isActive && (
                      <span className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[var(--primary-green)]">
                        <span>Explore Now</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
