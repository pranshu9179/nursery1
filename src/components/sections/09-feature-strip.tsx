"use client";

import * as React from "react";
import { Droplets, Sun, HeartHandshake, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const FEATURES = [
  {
    title: "14-Day Self-Watering",
    subtitle: "Built-in sub-irrigation basin",
    icon: Droplets,
    color: "text-[#2E86AB]",
    bg: "bg-[#2E86AB]/10",
  },
  {
    title: "UV-Resistant Pots",
    subtitle: "Never fades, chips or cracks",
    icon: Sun,
    color: "text-[var(--marigold)]",
    bg: "bg-[var(--marigold)]/10",
  },
  {
    title: "100% Pet-Safe Varieties",
    subtitle: "Non-toxic for cats & dogs",
    icon: HeartHandshake,
    color: "text-[var(--primary-green)]",
    bg: "bg-[var(--primary-green)]/10",
  },
  {
    title: "7-Day Healthy Arrival",
    subtitle: "Guaranteed replacement or refund",
    icon: ShieldCheck,
    color: "text-[var(--terracotta)]",
    bg: "bg-[var(--terracotta)]/10",
  },
];

export function FeatureStripSection() {
  return (
    <section className="py-10 bg-[var(--surface-muted)]/70 border-y border-[var(--border-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3.5">
                <div className={`h-12 w-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-xs border border-black/5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-[var(--ink)] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
