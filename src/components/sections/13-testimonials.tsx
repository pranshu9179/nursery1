"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials, pressLogos } from "@/data/testimonials";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Star className="h-3.5 w-3.5 fill-[var(--marigold)] text-[var(--marigold)]" />
              <span>Verified Plant Parents</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Real Stories From Growing Homes
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous review"
              className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next review"
              className="h-10 w-10 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_90%] sm:flex-[0_0_65%] lg:flex-[0_0_48%] min-w-0"
              >
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs hover:shadow-card transition-all space-y-6">
                  {/* Top Quote & Rating */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[var(--marigold)]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[var(--marigold)]" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-[var(--border-warm)]" />
                    </div>

                    <p className="font-serif italic text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Customer & Purchased Plant Thumbnail */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-warm)]">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-full overflow-hidden bg-[var(--surface-muted)] shrink-0 border border-[var(--border-warm)]">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-semibold text-sm text-[var(--ink)]">
                            {t.name}
                          </h4>
                          {t.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] text-[var(--primary-green-hover)] font-bold">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[var(--ink-muted)] block">
                          {t.location}
                        </span>
                      </div>
                    </div>

                    {/* Plant Thumbnail */}
                    <div className="flex items-center gap-2 pl-3 border-l border-[var(--border-warm)]">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-[var(--border-warm)]">
                        <Image src={t.plantImage} alt={t.plantPurchased} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block">
                          Purchased
                        </span>
                        <span className="text-xs font-semibold text-[var(--ink)] truncate max-w-[120px] block">
                          {t.plantPurchased}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "As Seen In" Media Strip with Grayscale-to-Color Hover */}
        <div className="pt-8 border-t border-[var(--border-warm)] space-y-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]/70 block">
            Featured Across Leading Design & Lifestyle Publications
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {pressLogos.map((press) => (
              <div
                key={press.name}
                className="font-serif font-bold text-sm sm:text-base tracking-widest text-[var(--ink-muted)]/50 hover:text-[var(--ink)] transition-colors cursor-default"
              >
                {press.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
