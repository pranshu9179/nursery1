"use client";

import * as React from "react";
import { Filter, X, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export interface FilterState {
  category: string;
  priceRange: string;
  light: string;
  petFriendly: boolean;
  difficulty: string;
  size: string;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onResetFilters: () => void;
  totalCount: number;
}

const CATEGORIES = [
  { id: "all", label: "All Greenery" },
  { id: "indoor", label: "Indoor Foliage" },
  { id: "outdoor", label: "Balcony & Outdoor" },
  { id: "succulents", label: "Succulents & Cacti" },
  { id: "flowering", label: "Flowering Beauties" },
  { id: "pots", label: "Pots & Planters" },
  { id: "seeds", label: "Seeds & Microgreens" },
  { id: "care", label: "Organic Plant Care" },
  { id: "gifting", label: "Gift Hampers" },
];

const PRICE_RANGES = [
  { id: "all", label: "All Prices" },
  { id: "under-799", label: "Under ₹799" },
  { id: "800-1499", label: "₹800 - ₹1,499" },
  { id: "1500-2499", label: "₹1,500 - ₹2,499" },
  { id: "above-2500", label: "Above ₹2,500" },
];

const LIGHT_OPTIONS = [
  { id: "all", label: "Any Light" },
  { id: "low", label: "Low Light / Shaded" },
  { id: "indirect", label: "Bright Indirect Sun" },
  { id: "direct", label: "Direct Balcony Sunlight" },
];

const SIZES = [
  { id: "all", label: "All Sizes" },
  { id: "S", label: "Small (Desk/Shelf)" },
  { id: "M", label: "Medium (Tabletop)" },
  { id: "L", label: "Large (Floor/Stand)" },
  { id: "XL", label: "Extra Large (Tree)" },
];

export function ShopFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}: ShopFiltersProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.priceRange !== "all" ? 1 : 0) +
    (filters.light !== "all" ? 1 : 0) +
    (filters.petFriendly ? 1 : 0) +
    (filters.size !== "all" ? 1 : 0);

  const FilterContent = (
    <div className="space-y-6">
      {/* Category List */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange("category", cat.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors text-left ${
                filters.category === cat.id
                  ? "bg-[var(--primary-tint)] text-[var(--primary-green-hover)] font-bold"
                  : "text-[var(--ink-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink)]"
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5 pt-4 border-t border-[var(--border-warm)]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
          Price Range
        </h4>
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => onFilterChange("priceRange", range.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors text-left ${
                filters.priceRange === range.id
                  ? "bg-[var(--primary-tint)] text-[var(--primary-green-hover)] font-bold"
                  : "text-[var(--ink-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink)]"
              }`}
            >
              <span>{range.label}</span>
              {filters.priceRange === range.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Size */}
      <div className="space-y-2.5 pt-4 border-t border-[var(--border-warm)]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
          Scale & Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s.id}
              onClick={() => onFilterChange("size", s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.size === s.id
                  ? "bg-[var(--primary-green)] text-white shadow-xs font-bold"
                  : "bg-[var(--surface-muted)] text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--border-warm)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Light Requirements */}
      <div className="space-y-2.5 pt-4 border-t border-[var(--border-warm)]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
          Light Requirements
        </h4>
        <div className="space-y-1">
          {LIGHT_OPTIONS.map((light) => (
            <button
              key={light.id}
              onClick={() => onFilterChange("light", light.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors text-left ${
                filters.light === light.id
                  ? "bg-[var(--primary-tint)] text-[var(--primary-green-hover)] font-bold"
                  : "text-[var(--ink-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink)]"
              }`}
            >
              <span>{light.label}</span>
              {filters.light === light.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Pet Friendly Toggle */}
      <div className="pt-4 border-t border-[var(--border-warm)]">
        <label className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-warm)] cursor-pointer hover:bg-[var(--primary-tint)]/40 transition-colors">
          <input
            type="checkbox"
            checked={filters.petFriendly}
            onChange={(e) => onFilterChange("petFriendly", e.target.checked)}
            className="h-4 w-4 rounded text-[var(--primary-green)] focus:ring-[var(--primary-green)] accent-[var(--primary-green)]"
          />
          <div className="text-xs">
            <span className="font-bold text-[var(--ink)] block">100% Pet-Friendly Only</span>
            <span className="text-[11px] text-[var(--ink-muted)]">Non-toxic to cats & dogs</span>
          </div>
        </label>
      </div>

      {/* Reset CTA */}
      {activeFilterCount > 0 && (
        <div className="pt-2">
          <button
            onClick={onResetFilters}
            className="w-full py-2.5 rounded-xl border border-[var(--border-warm)] text-xs font-bold text-[var(--terracotta)] hover:bg-[var(--terracotta-tint)] transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters ({activeFilterCount})</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border-warm)] shadow-xs h-fit sticky top-24">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-warm)]">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[var(--primary-green)]" />
            <span className="font-display font-bold text-sm text-[var(--ink)]">Filter Catalog</span>
          </div>
          {activeFilterCount > 0 && (
            <Badge variant="primary" className="text-[10px]">
              {activeFilterCount} Active
            </Badge>
          )}
        </div>
        {FilterContent}
      </aside>

      {/* Mobile Filter Drawer Trigger & Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs font-semibold rounded-full"
            >
              <Filter className="h-3.5 w-3.5 text-[var(--primary-green)]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-[var(--primary-green)] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm p-6 overflow-y-auto bg-[var(--surface)]">
            <SheetHeader className="pb-4 mb-4 border-b border-[var(--border-warm)]">
              <SheetTitle className="flex items-center justify-between text-base">
                <span>Filter Greenery</span>
                <span className="text-xs font-normal text-[var(--ink-muted)]">
                  {totalCount} products
                </span>
              </SheetTitle>
            </SheetHeader>
            {FilterContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
