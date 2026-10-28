import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (!exists) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },
      toggleItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "botanica-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
