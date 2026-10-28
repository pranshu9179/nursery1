"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Sun, Droplets, HeartHandshake, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency, calculateDiscountPercent } from "@/lib/formatters";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, openCart } = useUIStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdded, setIsAdded] = React.useState(false);

  React.useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedSizeIndex(0);
    setSelectedColorIndex(0);
    setQuantity(1);
    setIsAdded(false);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentSize = quickViewProduct.sizes[selectedSizeIndex] || quickViewProduct.sizes[0];
  const currentColor = quickViewProduct.planterColors ? quickViewProduct.planterColors[selectedColorIndex] : undefined;
  const currentPrice = currentSize.price || quickViewProduct.price;
  const currentOriginalPrice = currentSize.originalPrice || quickViewProduct.originalPrice;
  const discountPercent = calculateDiscountPercent(currentOriginalPrice, currentPrice);

  const handleAddToCart = () => {
    addItemToCart(quickViewProduct, currentSize, currentColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
      openCart();
    }, 600);
  };

  return (
    <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && closeQuickView()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-2xl">
        <DialogTitle className="sr-only">{quickViewProduct.name} Quick View</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="md:col-span-6 bg-[var(--surface-muted)]/50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--border-warm)]">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-[var(--border-warm)]">
              <Image
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-3 left-3">
                  <Badge variant={quickViewProduct.badgeType || "terracotta"}>
                    {quickViewProduct.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-14 w-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-[var(--primary-green)] ring-2 ring-[var(--primary-green)]/20"
                        : "border-[var(--border-warm)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Purchase */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary-green-hover)] bg-[var(--primary-tint)] px-2.5 py-0.5 rounded-full">
                  {quickViewProduct.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-[var(--marigold)]">
                    <Star className="h-3.5 w-3.5 fill-[var(--marigold)]" />
                  </div>
                  <span className="font-bold text-[var(--ink)]">{quickViewProduct.rating}</span>
                  <span className="text-[var(--ink-muted)]">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-display font-bold text-xl text-[var(--ink)]">
                  {quickViewProduct.name}
                </h3>
                {quickViewProduct.botanicalName && (
                  <p className="text-xs italic text-[var(--ink-muted)] font-serif mt-0.5">
                    {quickViewProduct.botanicalName}
                  </p>
                )}
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  {quickViewProduct.tagline}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="text-2xl font-extrabold text-[var(--ink)]">
                  {formatCurrency(currentPrice)}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <>
                    <span className="text-sm text-[var(--ink-muted)] line-through">
                      {formatCurrency(currentOriginalPrice)}
                    </span>
                    <span className="text-xs font-bold text-[var(--terracotta)]">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Size Selector */}
              {quickViewProduct.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--ink)]">Select Size:</span>
                    <span className="text-[var(--ink-muted)]">{currentSize.label}</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.sizes.map((s, idx) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          selectedSizeIndex === idx
                            ? "bg-[var(--primary-green)] text-white shadow-sm"
                            : "bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)] hover:border-[var(--primary-green)]"
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Planter Color Swatches */}
              {quickViewProduct.planterColors && quickViewProduct.planterColors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--ink)]">Planter Color:</span>
                    <span className="text-[var(--ink-muted)]">{currentColor?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.planterColors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        aria-label={color.name}
                        className={`h-7 w-7 rounded-full transition-transform border border-black/15 flex items-center justify-center ${
                          selectedColorIndex === idx ? "scale-110 ring-2 ring-[var(--primary-green)] ring-offset-2" : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColorIndex === idx && (
                          <Check className={`h-3.5 w-3.5 ${color.hex === "#FFFFFF" || color.hex === "#FAFAFA" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Care Snapshot */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border-warm)] text-center text-[11px]">
                <div className="flex flex-col items-center gap-1">
                  <Sun className="h-4 w-4 text-[var(--marigold)]" />
                  <span className="font-semibold text-[var(--ink)]">Light</span>
                  <span className="text-[10px] text-[var(--ink-muted)] truncate max-w-full">
                    {quickViewProduct.care.light.split(".")[0]}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-[var(--border-warm)]">
                  <Droplets className="h-4 w-4 text-[#2E86AB]" />
                  <span className="font-semibold text-[var(--ink)]">Water</span>
                  <span className="text-[10px] text-[var(--ink-muted)] truncate max-w-full">
                    {quickViewProduct.care.water.split(".")[0]}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <HeartHandshake className="h-4 w-4 text-[var(--primary-green)]" />
                  <span className="font-semibold text-[var(--ink)]">Pet Safe</span>
                  <span className="text-[10px] text-[var(--ink-muted)]">
                    {quickViewProduct.care.petFriendly ? "Yes, Safe" : "Caution"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper & Add to Cart button */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-warm)]">
              <div className="flex gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[var(--border-warm)] bg-[var(--surface-muted)] rounded-full h-11 px-2 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[var(--ink)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="primary"
                  size="default"
                  className="flex-1 font-bold text-xs"
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Added to Bag!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="h-4 w-4" /> Add to Cart • {formatCurrency(currentPrice * quantity)}
                    </span>
                  )}
                </Button>
              </div>

              {/* View full product page link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[var(--ink-muted)] flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary-green)]" />
                  7-Day Plant Guarantee
                </span>
                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  onClick={closeQuickView}
                  className="font-bold text-[var(--primary-green)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Full product details</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
