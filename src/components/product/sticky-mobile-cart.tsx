"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { Product, ProductVariantSize, PlanterColor } from "@/types/product";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

interface StickyMobileCartProps {
  product: Product;
  selectedSize: ProductVariantSize;
  selectedColor?: PlanterColor;
  onAddToCart: () => void;
  isAdding: boolean;
  justAdded: boolean;
}

export function StickyMobileCart({
  product,
  selectedSize,
  selectedColor,
  onAddToCart,
  isAdding,
  justAdded,
}: StickyMobileCartProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border-warm)] px-4 py-3 shadow-xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-warm)] shrink-0">
            <Image
              src={product.images[0] || "/placeholder-plant.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[var(--ink)] truncate">
              {product.name}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--ink-muted)]">
              <span>{selectedSize.name}</span>
              {selectedColor && (
                <>
                  <span>•</span>
                  <span className="truncate">{selectedColor.name}</span>
                </>
              )}
              <span>•</span>
              <span className="font-bold text-[var(--ink)]">
                {formatCurrency(selectedSize.price || product.price)}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant={justAdded ? "primary" : "primary"}
          size="sm"
          className="h-10 px-5 text-xs font-bold rounded-full shrink-0 shadow-md"
          onClick={onAddToCart}
          isLoading={isAdding}
        >
          {justAdded ? (
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Added
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
