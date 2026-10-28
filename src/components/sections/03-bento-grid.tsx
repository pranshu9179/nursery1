"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Tag, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoPromoSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Seasonal Highlights</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Curated Botanical Bento
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md">
            Architectural planters, air-purifying low light foliage, and exclusive bundles arranged for modern interior inspiration.
          </p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Tile 1: Large Sky Blue Featured Hero Tile (Flat 50% Off Best Selling) */}
          <div className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-[#DDEBF3] p-6 sm:p-8 flex flex-col justify-between border border-[#C6DFED] transition-all duration-300 hover:shadow-card">
            <div className="relative z-10 max-w-sm space-y-3">
              <Badge variant="sky" className="text-xs uppercase font-extrabold tracking-wide">
                Special Festive Offer
              </Badge>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#14425D] leading-tight">
                Up to 40% Off Best-Selling Air Purifiers
              </h3>
              <p className="text-xs sm:text-sm text-[#276184] leading-relaxed">
                NASA clean-air tested Snake Plants and Monstera foliage potted with rich organic nutrition.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop?category=air-purifying"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14425D] text-white text-xs font-bold hover:bg-[#0E3044] transition-all shadow-sm group-hover:gap-3"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right-aligned plant imagery */}
            <div className="relative mt-6 sm:mt-0 sm:absolute sm:right-4 sm:bottom-0 sm:top-4 w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80"
                alt="Air purifying houseplant"
                fill
                className="object-contain object-bottom sm:object-right-bottom group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>

          {/* Tile 2: Sage Green Tile (Self-Watering Pots) */}
          <div className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#E6EEE1] p-6 sm:p-8 flex flex-col justify-between border border-[#CDDEC4] transition-all duration-300 hover:shadow-card">
            <div className="space-y-2 relative z-10">
              <Badge variant="sage" className="text-xs font-bold">
                Smart Planters
              </Badge>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E4D2B]">
                Summer&apos;s Self-Watering Pots
              </h3>
              <p className="text-xs text-[#396B48] leading-relaxed">
                Sub-irrigation reservoirs prevent root rot while you travel.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full my-4 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"
                alt="Self watering pots"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>

            <div className="relative z-10 pt-1">
              <Link
                href="/shop?category=pots"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4D2B] hover:underline group-hover:gap-2.5 transition-all"
              >
                <span>Explore Planters</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 3: Terracotta Tint Tile (Seed Bundles 10 for ₹799) */}
          <div className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#F7E3DE] p-6 sm:p-8 flex flex-col justify-between border border-[#EDC5BD] transition-all duration-300 hover:shadow-card">
            <div className="space-y-2 relative z-10">
              <Badge variant="terracotta" className="text-xs font-bold">
                Seeds & Herbs
              </Badge>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#7D221D]">
                Build Your Own Seed Bundle
              </h3>
              <p className="text-xs text-[#963732] leading-relaxed">
                Pick any 10 culinary or exotic wildflower heirloom packets for ₹799.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full my-4 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"
                alt="Organic seed bundle"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>

            <div className="relative z-10 pt-1">
              <Link
                href="/shop?category=seeds"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7D221D] hover:underline group-hover:gap-2.5 transition-all"
              >
                <span>Customize Bundle</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 4: Cream Tint Tile (100% Pet Friendly Greenery) */}
          <div className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#F5EFEB] p-6 sm:p-8 flex flex-col justify-between border border-[#E7DECE] transition-all duration-300 hover:shadow-card">
            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#635541] uppercase tracking-wider">
                <Heart className="h-3 w-3 text-[var(--terracotta)]" />
                Cat & Dog Friendly
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)]">
                Pet-Safe Foliage Collection
              </h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Non-toxic Calatheas, Peperomias, and Palms safe for curious pets.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full my-4 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80"
                alt="Pet safe calathea plant"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>

            <div className="relative z-10 pt-1">
              <Link
                href="/shop?category=pet-friendly"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] hover:text-[var(--primary-green)] transition-colors group-hover:gap-2.5"
              >
                <span>Browse Non-Toxic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 5: Marigold Tint Tile (Living Gift Hampers) */}
          <div className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#FDF1CF] p-6 sm:p-8 flex flex-col justify-between border border-[#FDE59F] transition-all duration-300 hover:shadow-card">
            <div className="space-y-2 relative z-10">
              <Badge variant="marigold" className="text-xs font-bold">
                Festive Gifting
              </Badge>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#825405]">
                Living Celebration Gift Boxes
              </h3>
              <p className="text-xs text-[#996507] leading-relaxed">
                Pre-potted succulent trios in embossed boxes with handwritten greeting notes.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full my-4 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80"
                alt="Succulent gift box"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>

            <div className="relative z-10 pt-1">
              <Link
                href="/shop?category=gifting"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#825405] hover:underline group-hover:gap-2.5 transition-all"
              >
                <span>Send A Living Gift</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
