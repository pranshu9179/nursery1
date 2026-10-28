"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Sprout, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TICKER_ITEMS = [
  "🌿 100% Heirloom & Non-GMO Seeds",
  "🌱 95%+ Germination Lab Tested",
  "📦 10 Organic Coco-Coir Expanding Soil Pods Included",
  "🚚 Free Express Delivery Above ₹999",
  "🍅 Basil, Rosemary, Mint, Oregano, Thyme & More",
];

export function SeedBundleBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--terracotta)] text-white py-12 md:py-16">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-white/10 pointer-events-none" />

      {/* Moving Marquee Ticker Ribbon */}
      <div className="bg-black/15 py-2.5 mb-10 overflow-hidden border-y border-white/10">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-semibold tracking-wider text-white/90">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span>{item}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Copy & Value Proposition */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-white tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Festive Green Thumb Special</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Build Your Own Seed Bundle: <br className="hidden sm:block" />
              <span className="text-[var(--marigold)]">Any 10 Heirloom Seeds for ₹799</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-lg mx-auto md:mx-0">
              Transform your balcony or kitchen windowsill into an aromatic chef&apos;s herb paradise. Mix and match Italian culinary herbs, fragrant pollinator flowers, and crisp microgreens.
            </p>

            {/* Checkpoints */}
            <div className="grid grid-cols-2 gap-2 text-xs text-white/90 pt-1 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--marigold)] shrink-0" />
                <span>10 Compressed Coir Pods</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--marigold)] shrink-0" />
                <span>Step-by-Step Planting Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--marigold)] shrink-0" />
                <span>Free Plant Doctor Advice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--marigold)] shrink-0" />
                <span>95% Germination Guarantee</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <Link
                href="/shop?category=seeds"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[var(--terracotta)] font-bold text-sm hover:bg-[var(--marigold)] hover:text-[var(--ink)] transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Customize 10-Seed Bundle</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-xs text-white/70">
                Original Value: <span className="line-through">₹1,299</span> (Save 40%)
              </span>
            </div>
          </div>

          {/* Right: Visual Seed Box Artwork */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80"
                alt="Heirloom kitchen seed packets"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[var(--forest)]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-[var(--primary-green)]" />
                  <span className="font-semibold text-white">Culinary Herb Collection</span>
                </div>
                <span className="font-extrabold text-[var(--marigold)]">₹799 Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
