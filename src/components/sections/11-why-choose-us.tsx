"use client";

import * as React from "react";
import { Sprout, MessageCircleHeart, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";

const REASONS = [
  {
    title: "Nursery-Grown & Healthy",
    description:
      "Grown in climate-controlled polyhouses by horticulturists. Every plant is soil-sterilized, root-inspected, and pest-free before dispatch.",
    icon: Sprout,
    badge: "Grade-A Foliage",
  },
  {
    title: "Dedicated Plant Doctor",
    description:
      "Enjoy lifetime botanical care. WhatsApp our expert botanists photos of your leaves anytime for free diagnosis, watering tips, and pruning advice.",
    icon: MessageCircleHeart,
    badge: "Free Lifetime Care",
  },
  {
    title: "Ventilated Transit Crates",
    description:
      "Patented recycled corrugated packaging protects root balls from shock and leaves from snapping. Over 99.4% damage-free delivery rate.",
    icon: PackageCheck,
    badge: "Zero Soil Spill",
  },
  {
    title: "7-Day Replacement Guarantee",
    description:
      "If your plant arrives stressed, damaged, or unviable, simply snap a picture and we dispatch an immediate replacement or full refund.",
    icon: ShieldCheck,
    badge: "No Questions Asked",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
            <span>The Botanica Promise</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
            Why 10,000+ Plant Parents Trust Us
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
            We don&apos;t just sell plants; we guarantee they thrive in your home with our proprietary transit crates and lifetime doctor consultation.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--primary-tint)] text-[var(--primary-green)] flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-green-hover)]">
                      {reason.badge}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-[var(--ink)]">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
