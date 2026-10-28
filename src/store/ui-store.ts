import { create } from "zustand";
import { Product } from "@/types/product";

interface UIState {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  openWishlist: () => void;
  closeWishlist: () => void;
  
  openMobileNav: () => void;
  closeMobileNav: () => void;
  
  openSearch: () => void;
  closeSearch: () => void;
  
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,
  quickViewProduct: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openQuickView: (product: Product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));
