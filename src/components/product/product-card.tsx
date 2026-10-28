"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Eye, ShoppingBag, Check, Sparkles } from "lucide-react";
import { Product, ProductVariantSize, PlanterColor } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency, calculateDiscountPercent } from "@/lib/formatters";

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { openQuickView, openCart } = useUIStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const isSaved = isInWishlist(product.id);

  const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);

  const currentSize: ProductVariantSize =
    product.sizes[selectedSizeIndex] ||
    product.sizes[0] || {
      name: "M",
      label: "Medium",
      price: product.price,
      originalPrice: product.originalPrice,
      height: "12 in",
      potDiameter: "6 in",
    };

  const currentColor: PlanterColor | undefined =
    product.planterColors && product.planterColors.length > 0
      ? product.planterColors[selectedColorIndex]
      : undefined;

  const currentPrice = currentSize.price || product.price;
  const currentOriginalPrice = currentSize.originalPrice || product.originalPrice;
  const discount = calculateDiscountPercent(currentOriginalPrice, currentPrice);

  const primaryImage = product.images[0] || "/placeholder-plant.jpg";
  const secondaryImage = product.images[1] || primaryImage;

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAdding(true);
    setTimeout(() => {
      addItemToCart(product, currentSize, currentColor, 1);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
      openCart();
    }, 300);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] p-3 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Image Container with Badges & Slide-in Quick Actions */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]/70">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Image on Hover */}
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discount > 0 && (
            <Badge variant="terracotta" className="text-[10px] font-bold tracking-wide">
              -{discount}%
            </Badge>
          )}
          {product.badge && (
            <Badge variant={product.badgeType || "primary"} className="text-[10px] font-bold">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            isSaved
              ? "bg-[var(--surface)] text-[var(--terracotta)]"
              : "bg-[var(--surface)]/85 backdrop-blur-sm text-[var(--ink)] hover:text-[var(--terracotta)] hover:bg-[var(--surface)]"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-transform active:scale-125 ${
              isSaved ? "fill-[var(--terracotta)]" : ""
            }`}
          />
        </button>

        {/* Quick Action Floating Bar (Always available, slides up on desktop hover) */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center gap-2 transition-all duration-300 md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            onClick={handleQuickView}
            className="flex-1 h-9 rounded-full bg-[var(--surface)]/95 backdrop-blur-md text-xs font-semibold text-[var(--ink)] hover:text-[var(--primary-green)] shadow-md flex items-center justify-center gap-1.5 transition-colors border border-[var(--border-warm)]"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="h-9 w-9 rounded-full bg-[var(--primary-green)] text-white hover:bg-[var(--primary-green-hover)] shadow-md flex items-center justify-center transition-all active:scale-90 shrink-0"
            aria-label={`Quick add ${product.name} to bag`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between pt-3 space-y-2">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-[11px] text-[var(--ink-muted)] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[var(--ink-muted)]/80">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-[var(--marigold)] text-[var(--marigold)]" />
              <span className="font-bold text-[var(--ink)]">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[var(--primary-green)] transition-colors">
            <h3 className="font-display font-semibold text-sm text-[var(--ink)] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-[var(--ink-muted)] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Variant Swatches (Sizes & Planter Colors) */}
        <div className="space-y-1.5 pt-1">
          {/* Size Pills */}
          {product.sizes.length > 1 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[var(--ink-muted)] font-medium mr-1">Size:</span>
              <div className="flex items-center gap-1">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold transition-all ${
                      selectedSizeIndex === idx
                        ? "bg-[var(--primary-green)] text-white shadow-xs"
                        : "bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)] hover:border-[var(--primary-green)]"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Dots */}
          {product.planterColors && product.planterColors.length > 1 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[var(--ink-muted)] font-medium mr-1">Pot:</span>
              <div className="flex items-center gap-1">
                {product.planterColors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    aria-label={color.name}
                    className={`h-3.5 w-3.5 rounded-full border border-black/15 transition-transform ${
                      selectedColorIndex === idx ? "scale-125 ring-1.5 ring-[var(--primary-green)] ring-offset-1" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Scarcity / Add to Cart */}
        <div className="pt-2 border-t border-[var(--border-warm)]/60">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-base text-[var(--ink)]">
                {formatCurrency(currentPrice)}
              </span>
              {currentOriginalPrice > currentPrice && (
                <span className="text-xs text-[var(--ink-muted)] line-through">
                  {formatCurrency(currentOriginalPrice)}
                </span>
              )}
            </div>

            {/* Stock warning if low */}
            {product.stock < 10 && (
              <span className="text-[10px] font-semibold text-[var(--terracotta)]">
                Only {product.stock} left
              </span>
            )}
          </div>

          <Button
            variant={justAdded ? "primary" : "secondary"}
            size="sm"
            className={`w-full text-xs font-semibold h-8 rounded-full transition-all ${
              justAdded
                ? "bg-[var(--primary-green)] text-white hover:bg-[var(--primary-green)]"
                : "hover:bg-[var(--primary-green)] hover:text-white hover:border-[var(--primary-green)]"
            }`}
            onClick={handleAddToCart}
            isLoading={isAdding}
          >
            {justAdded ? (
              <span className="flex items-center gap-1.5 animate-in zoom-in">
                <Check className="h-3.5 w-3.5" /> Added to Cart
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
