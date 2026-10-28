import { Product, ProductVariantSize, PlanterColor } from './product';

export interface CartItem {
  id: string; // unique item hash based on product.id + selected size + color
  product: Product;
  quantity: number;
  selectedSize: ProductVariantSize;
  selectedColor?: PlanterColor;
  price: number;
}

export interface CouponCode {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderValue?: number;
  description: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingProgress: number; // 0 to 100%
  amountNeededForFreeShipping: number;
}
