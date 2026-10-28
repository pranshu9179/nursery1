"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ROOM_CATEGORIES = [
  {
    title: "Plants for Small Pots",
    subtitle: "Desks, Credenzas & Floating Shelves",
    tag: "Under 10 Inches",
    href: "/shop?size=S",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Medium Tabletop Pots",
    subtitle: "Coffee Tables & Dining Sideboards",
    tag: "12 - 18 Inches",
    href: "/shop?size=M",
    image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Floor Statement Trees",
    subtitle: "Living Room Corners & Foyers",
    tag: "24 - 45+ Inches",
    href: "/shop?size=XL",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Sunny Balcony Greens",
    subtitle: "Drought-Resilient Sun Lovers",
    tag: "Balconies & Patios",
    href: "/shop?category=outdoor",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80",
  },
];

export function ShopBySizeSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--surface)] border-b border-[var(--border-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] block mb-1">
              Space Planning
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Shop Greenery By Room Scale
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-sm">
            Whether furnishing a compact bedroom shelf or styling a sunlit double-height foyer, discover perfectly scaled specimens.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOM_CATEGORIES.map((room) => (
            <Link
              key={room.title}
              href={room.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-300"
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Tag pill at top */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[var(--ink)]">
                  {room.tag}
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 inset-x-4 space-y-1 text-white">
                <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-[var(--marigold)] transition-colors">
                  {room.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  {room.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--primary-green)] group-hover:text-white transition-colors">
                  <span>Browse Category</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
