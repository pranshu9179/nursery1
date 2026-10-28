"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, Heart, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function BottomNav() {
  const pathname = usePathname();
  const { openSearch, openWishlist, openCart } = useUIStore();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border-warm)] px-2 py-1 shadow-lg pb-[env(safe-area-inset-bottom,0.5rem)]">
      <div className="grid grid-cols-5 items-center">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            pathname === "/" ? "text-[var(--primary-green)] font-semibold" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            pathname.startsWith("/shop")
              ? "text-[var(--primary-green)] font-semibold"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
          }`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Shop</span>
        </Link>

        {/* Search */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center py-1.5 text-[var(--ink-muted)] hover:text-[var(--primary-green)] transition-colors"
          aria-label="Open search dialog"
        >
          <Search className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={openWishlist}
          className="relative flex flex-col items-center justify-center py-1.5 text-[var(--ink-muted)] hover:text-[var(--terracotta)] transition-colors"
          aria-label="Open wishlist"
        >
          <div className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[var(--terracotta)] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[var(--surface)]">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1.5 text-[var(--ink-muted)] hover:text-[var(--primary-green)] transition-colors"
          aria-label="Open cart drawer"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[var(--primary-green)] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[var(--surface)] animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </button>
      </div>
    </div>
  );
}
