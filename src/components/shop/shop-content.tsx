"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ShopFilters, FilterState } from "./shop-filters";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";

export function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filter state from search params
  const [filters, setFilters] = React.useState<FilterState>({
    category: searchParams.get("category") || "all",
    priceRange: searchParams.get("price") || "all",
    light: searchParams.get("light") || "all",
    petFriendly: searchParams.get("petFriendly") === "true",
    difficulty: searchParams.get("difficulty") || "all",
    size: searchParams.get("size") || "all",
  });

  const [sortOption, setSortOption] = React.useState<string>(
    searchParams.get("sort") || "featured"
  );
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const searchQuery = searchParams.get("q") || "";

  // Synchronize state with URL parameters
  const updateURL = React.useCallback(
    (newFilters: FilterState, newSort: string) => {
      const params = new URLSearchParams();
      if (newFilters.category !== "all") params.set("category", newFilters.category);
      if (newFilters.priceRange !== "all") params.set("price", newFilters.priceRange);
      if (newFilters.light !== "all") params.set("light", newFilters.light);
      if (newFilters.petFriendly) params.set("petFriendly", "true");
      if (newFilters.size !== "all") params.set("size", newFilters.size);
      if (newSort !== "featured") params.set("sort", newSort);
      if (searchQuery) params.set("q", searchQuery);

      const queryStr = params.toString();
      router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
    },
    [pathname, router, searchQuery]
  );

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    updateURL(updated, sortOption);
  };

  const handleSortChange = (newSort: string) => {
    setSortOption(newSort);
    updateURL(filters, newSort);
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      category: "all",
      priceRange: "all",
      light: "all",
      petFriendly: false,
      difficulty: "all",
      size: "all",
    };
    setFilters(resetState);
    updateURL(resetState, "featured");
  };

  // Filter and sort computation
  const filteredProducts = React.useMemo(() => {
    let list: Product[] = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category !== "all") {
      list = list.filter(
        (p) =>
          p.category === filters.category ||
          p.tags.some((t) => t.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }

    // Price
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-799":
          list = list.filter((p) => p.price < 800);
          break;
        case "800-1499":
          list = list.filter((p) => p.price >= 800 && p.price <= 1499);
          break;
        case "1500-2499":
          list = list.filter((p) => p.price >= 1500 && p.price <= 2499);
          break;
        case "above-2500":
          list = list.filter((p) => p.price >= 2500);
          break;
      }
    }

    // Light
    if (filters.light !== "all") {
      list = list.filter((p) =>
        p.care.light.toLowerCase().includes(filters.light.toLowerCase())
      );
    }

    // Pet Friendly
    if (filters.petFriendly) {
      list = list.filter((p) => p.care.petFriendly === true);
    }

    // Scale / Size
    if (filters.size !== "all") {
      list = list.filter((p) => p.sizes.some((s) => s.name === filters.size));
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [filters, sortOption, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-[var(--ink)]">Botanical Catalog</span>
          {searchQuery && (
            <>
              <span>/</span>
              <span className="text-[var(--primary-green)]">Results for &ldquo;{searchQuery}&rdquo;</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              All Plants & Planters
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
              Curated nursery-grown houseplants, smart self-watering vessels, and heirloom seeds.
            </p>
          </div>
          <span className="text-xs font-semibold text-[var(--ink-muted)]">
            Showing {filteredProducts.length} botanical items
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filter Component */}
        <ShopFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalCount={filteredProducts.length}
        />

        {/* Product Catalog Grid & Action Bar */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Control Bar: Mobile Filter Button, Sort Dropdown & Grid/List Toggle */}
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Mobile Filter Drawer is embedded within ShopFilters */}
            <div className="lg:hidden">
              <ShopFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalCount={filteredProducts.length}
              />
            </div>

            {/* Active Search Query Tag */}
            {searchQuery && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[var(--ink-muted)]">Search:</span>
                <span className="font-bold text-[var(--ink)]">&ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("q");
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                  className="text-[var(--ink-muted)] hover:text-[var(--terracotta)] ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Right: Sort & Layout Toggles */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="shop-sort" className="text-xs text-[var(--ink-muted)] font-medium hidden sm:inline">
                  Sort By:
                </label>
                <select
                  id="shop-sort"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-9 rounded-full bg-[var(--surface-muted)] px-3 text-xs font-semibold text-[var(--ink)] border border-[var(--border-warm)] outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Grid / List Toggles */}
              <div className="hidden sm:flex items-center border border-[var(--border-warm)] rounded-full p-0.5 bg-[var(--surface-muted)]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "grid"
                      ? "bg-[var(--surface)] text-[var(--primary-green)] shadow-xs"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "list"
                      ? "bg-[var(--surface)] text-[var(--primary-green)] shadow-xs"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {(filters.category !== "all" ||
            filters.priceRange !== "all" ||
            filters.light !== "all" ||
            filters.petFriendly ||
            filters.size !== "all") && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[var(--ink-muted)]">Active:</span>
              {filters.category !== "all" && (
                <Badge variant="primary" className="cursor-pointer gap-1" onClick={() => handleFilterChange("category", "all")}>
                  <span>Category: {filters.category}</span>
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filters.priceRange !== "all" && (
                <Badge variant="primary" className="cursor-pointer gap-1" onClick={() => handleFilterChange("priceRange", "all")}>
                  <span>Price: {filters.priceRange}</span>
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filters.size !== "all" && (
                <Badge variant="primary" className="cursor-pointer gap-1" onClick={() => handleFilterChange("size", "all")}>
                  <span>Size: {filters.size}</span>
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filters.light !== "all" && (
                <Badge variant="primary" className="cursor-pointer gap-1" onClick={() => handleFilterChange("light", "all")}>
                  <span>Light: {filters.light}</span>
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filters.petFriendly && (
                <Badge variant="sage" className="cursor-pointer gap-1" onClick={() => handleFilterChange("petFriendly", false)}>
                  <span>Pet-Friendly Only</span>
                  <X className="h-3 w-3" />
                </Badge>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-[var(--terracotta)] hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Catalog Products Display */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] p-8 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)]">
                <Search className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-lg text-[var(--ink)]">
                  No Greenery Matches Your Filters
                </h3>
                <p className="text-xs text-[var(--ink-muted)] max-w-sm mx-auto">
                  Try clearing some filter criteria or searching for general varieties like &ldquo;Monstera&rdquo; or &ldquo;Succulents&rdquo;.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold hover:bg-[var(--primary-green-hover)] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="w-full sm:w-48 aspect-[4/5] sm:aspect-square relative rounded-xl overflow-hidden shrink-0 bg-[var(--surface-muted)]">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
