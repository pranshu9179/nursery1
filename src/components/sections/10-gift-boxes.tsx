"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function GiftBoxesSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--marigold-tint)]/60 border-y border-[#FDE59F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Large Visual Gift Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80"
                alt="Curated succulent gift hamper"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-[#825405] shadow-sm">
                  <Gift className="h-3.5 w-3.5" />
                  <span>Handcrafted Celebration Gift</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Content & Explanations */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#825405]/10 text-xs font-bold text-[#825405] uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gifts That Keep Growing</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#4A2F00] leading-tight">
              Succulent Garden & <br className="hidden sm:block" />
              <span className="font-script text-[var(--primary-green)] text-4xl sm:text-5xl md:text-6xl">
                Living Gift Hampers
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#735118] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Cut flowers wilt in four days. Give a living botanical gift that thrives for years. Each hamper includes drainage-enabled artisan ceramic planters, organic fertilizer dropper, and a personalized handwritten greeting envelope.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C3F0D] pt-1 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>Pre-potted & ready to display</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>Gold foil embossed gift packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>Custom gift message card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>Safe transit arrival guarantee</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop?category=gifting"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full sm:w-auto font-bold text-sm shadow-md",
                })}
              >
                <span>Explore Gift Hampers</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <span className="text-xs text-[#825405] font-semibold">
                Starting at ₹1,299 with free nationwide delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
