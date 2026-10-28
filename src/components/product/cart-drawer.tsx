"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/formatters";
import { siteConfig } from "@/config/site.config";
import { products } from "@/data/products";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const {
    items,
    updateQuantity,
    removeItem,
    coupon,
    applyCoupon,
    removeCoupon,
    getSummary,
  } = useCartStore();
  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);

  const summary = getSummary();
  const upsellProduct =
    products.find((p) => p.category === "care") || products[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput("");
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col h-full bg-[var(--surface)]"
      >
        {/* Header */}
        <SheetHeader className="p-5 border-b border-[var(--border-warm)] bg-[var(--surface)]">
          <SheetTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[var(--primary-green)]" />
              <span>Your Botanical Cart</span>
              <span className="text-xs font-normal text-[var(--ink-muted)]">
                ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
              </span>
            </div>
          </SheetTitle>

          {/* Free Shipping Progress Bar */}
          <div className="mt-3 pt-3 border-t border-[var(--border-warm)]/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {summary.amountNeededForFreeShipping > 0 ? (
                <span className="text-[var(--ink-muted)]">
                  Add{" "}
                  <strong className="text-[var(--ink)]">
                    {formatCurrency(summary.amountNeededForFreeShipping)}
                  </strong>{" "}
                  more for{" "}
                  <strong className="text-[var(--primary-green)]">
                    FREE Delivery
                  </strong>
                </span>
              ) : (
                <span className="font-semibold text-[var(--primary-green)] flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
                  Unlocked: You have FREE Express Delivery!
                </span>
              )}
              <span className="text-[11px] font-bold text-[var(--ink-muted)]">
                {summary.freeShippingProgress}%
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--surface-muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary-green)] transition-all duration-500 rounded-full"
                style={{ width: `${summary.freeShippingProgress}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Line Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)]">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-base text-[var(--ink)]">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[var(--ink-muted)] max-w-xs mx-auto">
                  Bring green calm into your home. Explore our fresh indoor
                  specimens and architectural planters.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--border-warm)] relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-[var(--surface)] shrink-0 border border-[var(--border-warm)]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-medium text-xs text-[var(--ink)] hover:text-[var(--primary-green)] truncate transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--ink-muted)] hover:text-[var(--terracotta)] p-0.5 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Variant chips */}
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[var(--ink-muted)]">
                        <span className="px-1.5 py-0.2 rounded bg-[var(--surface)] border border-[var(--border-warm)] font-medium">
                          Size: {item.selectedSize.name}
                        </span>
                        {item.selectedColor && (
                          <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-[var(--surface)] border border-[var(--border-warm)]">
                            <span
                              className="h-2 w-2 rounded-full border border-black/10"
                              style={{
                                backgroundColor: item.selectedColor.hex,
                              }}
                            />
                            {item.selectedColor.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[var(--border-warm)] bg-[var(--surface)] rounded-full h-7 px-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[var(--ink)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[var(--ink)]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell Mini Row */}
              {upsellProduct && (
                <div className="p-3 rounded-2xl bg-[var(--primary-tint)]/60 border border-[#C5E5CC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-11 w-11 rounded-lg overflow-hidden shrink-0 border border-white">
                      <Image
                        src={upsellProduct.images[0]}
                        alt={upsellProduct.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-green-hover)] block">
                        Care Essential
                      </span>
                      <h5 className="text-xs font-semibold text-[var(--ink)] truncate max-w-[150px]">
                        {upsellProduct.name}
                      </h5>
                      <span className="text-xs font-bold text-[var(--primary-green-hover)]">
                        {formatCurrency(upsellProduct.price)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-8 text-[11px] px-3 shrink-0"
                    onClick={() =>
                      useCartStore.getState().addItem(upsellProduct)
                    }
                  >
                    + Add
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <SheetFooter className="p-5 border-t border-[var(--border-warm)] bg-[var(--surface)] space-y-3">
            {/* Coupon input */}
            {coupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--terracotta-tint)] border border-[#EDC5BD] text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--terracotta)]">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Code: {coupon.code}</span>
                  <span className="font-normal text-[var(--ink-muted)]">
                    (-{formatCurrency(summary.discount)})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-[var(--terracotta)] font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. BLOOM10)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-[var(--ink)] uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="h-9 px-3 text-xs"
                >
                  Apply
                </Button>
              </form>
            )}

            {couponError && (
              <p className="text-[11px] text-[var(--terracotta)]">
                {couponError}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[var(--ink-muted)] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[var(--ink)]">
                  {formatCurrency(summary.subtotal)}
                </span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-[var(--terracotta)]">
                  <span>Discount</span>
                  <span>-{formatCurrency(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[var(--ink)]">
                  {summary.shipping === 0 ? (
                    <span className="text-[var(--primary-green)] font-bold">
                      FREE
                    </span>
                  ) : (
                    formatCurrency(summary.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[var(--ink)] pt-2 border-t border-[var(--border-warm)]">
                <span>Total Amount</span>
                <span className="text-base text-[var(--primary-green)]">
                  {formatCurrency(summary.total)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className:
                  "w-full text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2",
              })}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Trust Micro-Text */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--ink-muted)] text-center pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary-green)]" />
              <span>UPI, Cards, Netbanking & Cash On Delivery Accepted</span>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
