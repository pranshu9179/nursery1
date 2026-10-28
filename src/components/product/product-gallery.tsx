"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  badgeType?: "terracotta" | "primary" | "marigold" | "sky" | "sage";
}

export function ProductGallery({
  images,
  productName,
  badge,
  badgeType = "primary",
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Zoom */}
      <div
        className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-warm)] shadow-sm cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
          sizes="(max-width: 1024px) 100vw, 600px"
        />

        {/* Badge Overlay */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <Badge variant={badgeType} className="text-xs font-bold px-3 py-1">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-[var(--surface-muted)] ${
                selectedIndex === idx
                  ? "border-[var(--primary-green)] ring-2 ring-[var(--primary-green)]/20 scale-105"
                  : "border-[var(--border-warm)] opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
