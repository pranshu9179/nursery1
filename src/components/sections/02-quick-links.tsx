"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QUICK_CHIPS = [
  {
    label: "Extra Large",
    tagline: "Floor Specimens",
    href: "/shop?size=XL",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80",
    badge: "Statement",
  },
  {
    label: "Large Plants",
    tagline: "Corner Accents",
    href: "/shop?size=L",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Medium Plants",
    tagline: "Tabletop Greens",
    href: "/shop?size=M",
    image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Small Plants",
    tagline: "Desks & Shelves",
    href: "/shop?size=S",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Plant Stands",
    tagline: "Elevated Planters",
    href: "/shop?category=pots",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Seed Bundles",
    tagline: "Grow From Scratch",
    href: "/shop?category=seeds",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=300&q=80",
    badge: "10 for ₹799",
  },
];

export function QuickLinksSection() {
  return (
    <section className="py-10 bg-[var(--surface)] border-y border-[var(--border-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] block">
              Quick Browse
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)]">
              Find Plants By Scale & Lifestyle
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[var(--primary-green)] hover:underline hidden sm:flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scrollable Container on Mobile, Grid on Desktop */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-2 scrollbar-none sm:grid sm:grid-cols-6 sm:overflow-visible">
          {QUICK_CHIPS.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="group flex flex-col items-center shrink-0 w-28 sm:w-auto text-center"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden p-1 bg-[var(--surface-muted)] border-2 border-[var(--border-warm)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--primary-green)] group-hover:shadow-md">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src={chip.image}
                    alt={chip.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>
                {chip.badge && (
                  <span className="absolute -top-1 right-0 rounded-full bg-[var(--terracotta)] text-white text-[9px] font-bold px-1.5 py-0.2 shadow-sm">
                    {chip.badge}
                  </span>
                )}
              </div>
              <span className="font-semibold text-xs text-[var(--ink)] mt-2.5 group-hover:text-[var(--primary-green)] transition-colors">
                {chip.label}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)] line-clamp-1">
                {chip.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
