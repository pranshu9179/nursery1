import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariantSize, PlanterColor } from "@/types/product";
import { CartItem, CouponCode, OrderSummary } from "@/types/cart";
import { siteConfig } from "@/config/site.config";

interface CartState {
  items: CartItem[];
  coupon: CouponCode | null;

  addItem: (
    product: Product,
    selectedSize?: ProductVariantSize,
    selectedColor?: PlanterColor,
    quantity?: number
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  getSummary: () => OrderSummary;
  getItemCount: () => number;
}

const VALID_COUPONS: CouponCode[] = [
  { code: "BLOOM10", discountPercent: 10, description: "10% off your entire plant order" },
  { code: "GREENHOME", discountPercent: 15, minOrderValue: 1499, description: "15% off orders above ₹1,499" },
  { code: "SEED799", discountAmount: 200, minOrderValue: 999, description: "₹200 instant festive saving" },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const size = selectedSize || product.sizes[0] || {
          name: "M",
          label: "Medium (10-12 inches)",
          price: product.price,
          originalPrice: product.originalPrice,
          height: "10-12 in",
          potDiameter: "5 in",
        };
        const color = selectedColor || (product.planterColors ? product.planterColors[0] : undefined);
        const itemId = `${product.id}-${size.name}-${color?.name || "default"}`;

        const existingItems = get().items;
        const existingIndex = existingItems.findIndex((i) => i.id === itemId);

        if (existingIndex > -1) {
          const updated = [...existingItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated });
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
            price: size.price || product.price,
          };
          set({ items: [...existingItems, newItem] });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const found = VALID_COUPONS.find((c) => c.code === cleanCode);
        if (!found) {
          return { success: false, message: "Invalid coupon code. Try 'BLOOM10' or 'GREENHOME'." };
        }

        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (found.minOrderValue && subtotal < found.minOrderValue) {
          return {
            success: false,
            message: `Minimum order of ₹${found.minOrderValue} required for this coupon.`,
          };
        }

        set({ coupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => set({ coupon: null }),

      getSummary: () => {
        const items = get().items;
        const coupon = get().coupon;
        const threshold = siteConfig.shipping.freeDeliveryThreshold;

        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        let discount = 0;
        if (coupon) {
          if (coupon.discountPercent) {
            discount = Math.round((subtotal * coupon.discountPercent) / 100);
          } else if (coupon.discountAmount) {
            discount = Math.min(subtotal, coupon.discountAmount);
          }
        }

        const isFreeShipping = subtotal >= threshold || subtotal === 0;
        const shipping = isFreeShipping ? 0 : siteConfig.shipping.standardDeliveryFee;
        const total = Math.max(0, subtotal - discount + shipping);

        const freeShippingProgress = Math.min(100, Math.round((subtotal / threshold) * 100));
        const amountNeededForFreeShipping = Math.max(0, threshold - subtotal);

        return {
          subtotal,
          discount,
          shipping,
          total,
          freeShippingProgress,
          amountNeededForFreeShipping,
        };
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "botanica-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
