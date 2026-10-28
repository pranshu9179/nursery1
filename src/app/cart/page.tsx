"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/formatters";
import { siteConfig } from "@/config/site.config";
import { Button, buttonVariants } from "@/components/ui/button";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    coupon,
    applyCoupon,
    removeCoupon,
    getSummary,
  } = useCartStore();

  const [couponCode, setCouponCode] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);

  const summary = getSummary();
  const upsellProducts = products.filter((p) => p.category === "care" || p.category === "pots").slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError(null);
      setCouponCode("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[var(--background)] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="h-24 w-24 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--primary-green)] mb-6 shadow-sm border border-[var(--border-warm)]">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-2">
          Your botanical cart is empty
        </h1>
        <p className="text-sm text-[var(--ink-muted)] max-w-md mb-8">
          Bring life to your home. Explore our air-purifying indoor plants, low-maintenance succulents, and organic nursery supplies.
        </p>
        <Link
          href="/shop"
          className={buttonVariants({ variant: "primary", size: "lg", className: "rounded-full px-8 shadow-md" })}
        >
          Explore Plant Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
            Your Botanical Cart
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
            Review your nursery specimens and prepare for safe, ventilated delivery.
          </p>
        </div>

        {/* Free Shipping Notification Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            {summary.amountNeededForFreeShipping > 0 ? (
              <span className="text-[var(--ink)]">
                Add <strong>{formatCurrency(summary.amountNeededForFreeShipping)}</strong> more to unlock{" "}
                <strong className="text-[var(--primary-green)] font-bold">FREE Doorstep Delivery</strong>!
              </span>
            ) : (
              <span className="font-bold text-[var(--primary-green)] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[var(--marigold)]" />
                Congratulations! You’ve unlocked FREE Standard Delivery!
              </span>
            )}
            <span className="text-xs text-[var(--ink-muted)] font-semibold">
              {Math.min(100, Math.round(summary.freeShippingProgress))}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary-green)] to-[var(--marigold)] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, summary.freeShippingProgress)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] divide-y divide-[var(--border-warm)] overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-warm)] shrink-0 group"
                  >
                    <Image
                      src={item.product.images[0] || "/placeholder-plant.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="96px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-display font-semibold text-sm sm:text-base text-[var(--ink)] hover:text-[var(--primary-green)] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-muted)] mt-0.5">
                          <span>Size: <strong>{item.selectedSize.name}</strong> ({item.selectedSize.label})</span>
                          {item.selectedColor && (
                            <>
                              <span>•</span>
                              <span>Planter: <strong>{item.selectedColor.name}</strong></span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--ink-muted)] hover:text-[var(--terracotta)] p-1 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center h-8 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] px-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-[var(--ink)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <div className="font-bold text-sm sm:text-base text-[var(--ink)]">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-[var(--ink-muted)]">
                            {formatCurrency(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/shop"
                className="text-xs font-semibold text-[var(--primary-green)] hover:underline flex items-center gap-1"
              >
                &larr; Continue Exploring Plants
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs space-y-4">
              <h2 className="font-display font-bold text-lg text-[var(--ink)]">Order Summary</h2>

              {/* Promo Code Input */}
              <div className="pt-2">
                {coupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--primary-green)]/10 border border-[var(--primary-green)]/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[var(--primary-green)]" />
                      <div>
                        <span className="font-bold text-[var(--primary-green-hover)]">{coupon.code}</span>
                        <p className="text-[10px] text-[var(--ink-muted)]">{coupon.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-[var(--terracotta)] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        placeholder="Coupon code (e.g. BLOOM10)"
                        className="flex-1 h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                      />
                      <button
                        type="submit"
                        className="h-10 px-4 rounded-xl bg-[var(--ink)] text-white text-xs font-semibold hover:bg-[var(--primary-green)] transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-[var(--terracotta)] font-medium">{couponError}</p>
                    )}
                    <p className="text-[10px] text-[var(--ink-muted)]">
                      Tip: Use code <strong>BLOOM10</strong> for 10% off your entire order!
                    </p>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[var(--border-warm)] text-xs text-[var(--ink-muted)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--ink)]">{formatCurrency(summary.subtotal)}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-[var(--primary-green)] font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatCurrency(summary.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {summary.shipping === 0 ? (
                      <strong className="text-[var(--primary-green)] font-bold">FREE</strong>
                    ) : (
                      formatCurrency(summary.shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST</span>
                  <span className="font-medium text-[var(--ink)]">Included in Price</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-[var(--border-warm)] text-base font-extrabold text-[var(--ink)]">
                  <span>Total Amount</span>
                  <span className="text-xl text-[var(--primary-green)]">{formatCurrency(summary.total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className={buttonVariants({
                    variant: "primary",
                    size: "lg",
                    className: "w-full h-12 text-sm font-bold rounded-full shadow-md flex items-center justify-center gap-2",
                  })}
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[var(--border-warm)] space-y-2 text-[11px] text-[var(--ink-muted)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                  <span>7-Day Transit Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                  <span>Custom ventilated plant crates for zero damage</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Add-ons */}
        <div className="mt-20 pt-12 border-t border-[var(--border-warm)]">
          <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-6">
            Frequently Added With Your Plants
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {upsellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
