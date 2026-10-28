"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUIStore } from "@/store/ui-store";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/formatters";

const TRENDING_KEYWORDS = [
  "Monstera Deliciosa",
  "Snake Plant",
  "Self-Watering Planters",
  "Pet-Friendly Greens",
  "Air Purifying",
  "Kitchen Herb Kit",
];

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useUIStore.getState().openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  const filteredProducts = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query]);

  const handleSelectKeyword = (keyword: string) => {
    setQuery(keyword);
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      closeSearch();
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-2xl">
        <DialogTitle className="sr-only">Search Plants and Garden Supplies</DialogTitle>
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-warm)] bg-[var(--surface)]">
          <Search className="h-5 w-5 text-[var(--ink-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleViewAllResults();
            }}
            placeholder="Search indoor plants, pots, seeds, fertilizers..."
            className="w-full text-base bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-[var(--ink-muted)] hover:bg-[var(--surface-muted)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded bg-[var(--surface-muted)] px-2 text-[10px] font-medium text-[var(--ink-muted)] border border-[var(--border-warm)]">
            ESC
          </kbd>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
          {/* Live Product Results */}
          {query.trim() && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
                  Product Matches ({filteredProducts.length})
                </span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleViewAllResults}
                    className="text-xs font-semibold text-[var(--primary-green)] hover:underline flex items-center gap-1"
                  >
                    <span>View all results</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[var(--surface-muted)] transition-colors group"
                    >
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[var(--surface-muted)] shrink-0 border border-[var(--border-warm)]">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--primary-green)] truncate transition-colors">
                            {product.name}
                          </h4>
                          {product.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--primary-tint)] text-[var(--primary-green-hover)] font-medium">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--ink-muted)] truncate">{product.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-[var(--ink)]">
                          {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <div className="text-[11px] text-[var(--ink-muted)] line-through">
                            {formatCurrency(product.originalPrice)}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-[var(--ink-muted)]">
                  <p className="text-sm">No plants found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-[var(--ink-muted)]/70 mt-1">
                    Try searching for &quot;Monstera&quot;, &quot;Succulents&quot;, or &quot;Pots&quot;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--primary-green)]" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_KEYWORDS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectKeyword(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] transition-all"
                >
                  <Sparkles className="h-3 w-3 text-[var(--marigold)]" />
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[var(--surface-muted)]/70 border-t border-[var(--border-warm)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <span>Press ESC or click outside to close</span>
          <span className="font-medium text-[var(--primary-green)]">Free shipping on orders above ₹999</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
