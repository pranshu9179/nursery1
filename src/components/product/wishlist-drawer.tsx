"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/formatters";

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, openCart } = useUIStore();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleMoveToCart = (product: typeof items[0]) => {
    addItemToCart(product);
    removeItem(product.id);
    closeWishlist();
    openCart();
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={(open) => !open && closeWishlist()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col h-full bg-[var(--surface)]">
        {/* Header */}
        <SheetHeader className="p-5 border-b border-[var(--border-warm)] bg-[var(--surface)]">
          <SheetTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[var(--terracotta)] fill-[var(--terracotta)]" />
              <span>Saved Greenery</span>
              <span className="text-xs font-normal text-[var(--ink-muted)]">
                ({items.length} items)
              </span>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs text-[var(--ink-muted)] hover:text-[var(--terracotta)] transition-colors"
              >
                Clear all
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)]">
                <Heart className="h-8 w-8 text-[var(--terracotta)]/40" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-base text-[var(--ink)]">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-[var(--ink-muted)] max-w-xs mx-auto">
                  Click the heart icon on any plant or planter card to save your favorites for later.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeWishlist}
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Explore Plants
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--border-warm)] group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-[var(--surface)] shrink-0 border border-[var(--border-warm)]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeWishlist}
                          className="font-medium text-xs text-[var(--ink)] hover:text-[var(--primary-green)] truncate transition-colors"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[var(--ink-muted)] hover:text-[var(--terracotta)] p-0.5 rounded transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[var(--ink-muted)] truncate">{product.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-[var(--ink)]">
                        {formatCurrency(product.price)}
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        className="h-7 text-[11px] px-3 rounded-full"
                        onClick={() => handleMoveToCart(product)}
                      >
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Move to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border-warm)] bg-[var(--surface-muted)]/50 text-center">
            <Link
              href="/shop"
              onClick={closeWishlist}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-green)] hover:underline"
            >
              <span>Continue exploring full catalog</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
