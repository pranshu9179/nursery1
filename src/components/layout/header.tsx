"use client";

import * as React from "react";
import Link from "next/link";
import { Sprout, Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { siteConfig } from "@/config/site.config";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { openSearch, openWishlist, openCart, openMobileNav } = useUIStore();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--surface)]/98 backdrop-blur-md shadow-xs border-b border-[var(--border-warm)] py-2 sm:py-2.5"
          : "bg-[var(--background)] py-2.5 sm:py-3.5 border-b border-[var(--border-warm)]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-4 xl:gap-6 h-12 sm:h-14">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={openMobileNav}
              aria-label="Open mobile navigation menu"
              className="lg:hidden p-2 rounded-xl text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors -ml-1"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[var(--primary-tint)] border border-[#C5E5CC] flex items-center justify-center text-[var(--primary-green)] group-hover:scale-105 transition-transform duration-300 shadow-xs shrink-0">
                <Sprout className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base sm:text-lg lg:text-xl tracking-tight text-[var(--ink)] leading-none group-hover:text-[var(--primary-green)] transition-colors whitespace-nowrap">
                  {siteConfig.name}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.16em] text-[var(--ink-muted)] font-bold mt-1 whitespace-nowrap">
                  Artisan Nursery
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Mega-Menu Navigation (Centered with flexible fit) */}
          <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-1 xl:px-3">
            <MegaMenu />
          </div>

          {/* Right: Search, Wishlist & Cart Actions (Guaranteed 100% visible on screen) */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
            {/* Quick Search Button: Compact icon on laptops, expanded on wide screens */}
            <button
              onClick={openSearch}
              className="h-9 sm:h-10 w-9 sm:w-10 xl:w-auto xl:px-3.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-xs text-[var(--ink-muted)] border border-[var(--border-warm)] transition-all flex items-center justify-center xl:gap-2 shadow-xs group shrink-0"
              aria-label="Search nursery catalog"
              title="Search plants (⌘K)"
            >
              <Search className="h-4 w-4 text-[var(--ink-muted)] group-hover:text-[var(--primary-green)] transition-colors shrink-0" />
              <span className="hidden xl:inline text-xs font-medium text-[var(--ink)]">Search plants...</span>
              <kbd className="hidden 2xl:inline-flex h-4 items-center rounded px-1.5 text-[9px] font-bold bg-[var(--surface-muted)] text-[var(--ink-muted)] border border-[var(--border-warm)]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-[var(--surface)] border border-[var(--border-warm)] flex items-center justify-center text-[var(--ink)] hover:text-[var(--terracotta)] hover:border-[var(--terracotta)]/40 transition-colors shadow-xs shrink-0"
              aria-label="Open wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--terracotta)] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[var(--surface)] animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button: Always fully visible with guaranteed padding */}
            <button
              onClick={openCart}
              className="h-9 sm:h-10 pl-3 pr-3.5 sm:pl-3.5 sm:pr-4 rounded-full bg-[var(--primary-green)] text-white hover:bg-[var(--primary-green-hover)] transition-all shadow-sm active:scale-95 flex items-center gap-1.5 sm:gap-2 shrink-0 font-bold text-xs"
              aria-label="Open cart drawer"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[var(--marigold)] text-[var(--ink)] text-[9px] font-extrabold flex items-center justify-center ring-1 ring-[var(--surface)]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="tracking-wide whitespace-nowrap">
                {cartCount > 0 ? `${cartCount} in Bag` : "Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
