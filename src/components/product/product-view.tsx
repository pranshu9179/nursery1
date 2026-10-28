"use client";

import * as React from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sun,
  Droplets,
  PawPrint,
  Sparkles,
  Share2,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  PackageCheck,
  Plus,
  Minus,
} from "lucide-react";
import { Product, ProductVariantSize, PlanterColor, ProductReview } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product/product-gallery";
import { PincodeChecker } from "@/components/product/pincode-checker";
import { StickyMobileCart } from "@/components/product/sticky-mobile-cart";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { formatCurrency, calculateDiscountPercent } from "@/lib/formatters";
import { siteConfig } from "@/config/site.config";

interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductView({ product, relatedProducts }: ProductViewProps) {
  const { openCart } = useUIStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const isSaved = isInWishlist(product.id);

  const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  const selectedSize: ProductVariantSize =
    product.sizes[selectedSizeIndex] ||
    product.sizes[0] || {
      name: "M",
      label: "Medium",
      price: product.price,
      originalPrice: product.originalPrice,
      height: "12-16 in",
      potDiameter: "6 in",
    };

  const selectedColor: PlanterColor | undefined =
    product.planterColors && product.planterColors.length > 0
      ? product.planterColors[selectedColorIndex]
      : undefined;

  const currentPrice = selectedSize.price || product.price;
  const currentOriginalPrice = selectedSize.originalPrice || product.originalPrice;
  const discount = calculateDiscountPercent(currentOriginalPrice, currentPrice);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItemToCart(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
      openCart();
    }, 250);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Mock verified reviews if none in product
  const reviews: ProductReview[] = product.reviews || [
    {
      id: "rev-1",
      author: "Pooja V.",
      rating: 5,
      date: "2 days ago",
      title: "Arrived in flawless condition — zero leaf damage!",
      comment:
        "I was honestly skeptical about ordering live foliage online all the way to Delhi, but the 7-layer ventilated crate kept the soil 100% intact and moist. The plant has already unfurled a brand new split leaf!",
      verified: true,
      likes: 24,
    },
    {
      id: "rev-2",
      author: "Karan Singhal",
      rating: 5,
      date: "1 week ago",
      title: "The self-watering pot actually works as advertised.",
      comment:
        "Left for a 10-day work trip right after receiving this. Filled the water reservoir before leaving and came back to find vibrant, thriving green leaves. Highly recommend Botanica & Co.!",
      verified: true,
      likes: 18,
    },
    {
      id: "rev-3",
      author: "Dr. Meenakshi Sundaram",
      rating: 5,
      date: "2 weeks ago",
      title: "Superior root aeration and healthy soil mix.",
      comment:
        "As a hobbyist gardener for over 15 years, usually commercial nursery plants are root-bound in heavy red clay. Botanica’s coco-coir perlite blend is top tier. Beautiful specimen.",
      verified: true,
      likes: 31,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[var(--border-warm)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[var(--ink-muted)]">
          <Link href="/" className="hover:text-[var(--primary-green)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-[var(--primary-green)] transition-colors">
            Shop All
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[var(--primary-green)] transition-colors capitalize"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-[var(--ink)] truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main PDP Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Product Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-28">
              <ProductGallery
                images={product.images}
                productName={product.name}
                badge={product.badge}
                badgeType={product.badgeType}
              />

              {/* Trust Badges Strip Under Gallery */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[var(--border-warm)] text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)]">
                  <ShieldCheck className="h-5 w-5 text-[var(--primary-green)]" />
                  <span className="text-[11px] font-bold text-[var(--ink)]">7-Day Transit Guarantee</span>
                  <span className="text-[10px] text-[var(--ink-muted)]">Free replacement if damaged</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)]">
                  <Truck className="h-5 w-5 text-[var(--terracotta)]" />
                  <span className="text-[11px] font-bold text-[var(--ink)]">Ventilated Crates</span>
                  <span className="text-[10px] text-[var(--ink-muted)]">Zero soil spill packing</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)]">
                  <RotateCcw className="h-5 w-5 text-[var(--primary-green)]" />
                  <span className="text-[11px] font-bold text-[var(--ink)]">Free WhatsApp SOS</span>
                  <span className="text-[10px] text-[var(--ink-muted)]">Lifetime horticulturist help</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box & Options (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green)]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-full hover:bg-[var(--surface-muted)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors text-xs flex items-center gap-1"
                    title="Copy product link"
                  >
                    <Share2 className="h-4 w-4" />
                    {copiedLink && <span className="text-[10px] text-[var(--primary-green)] font-bold">Copied!</span>}
                  </button>
                  <button
                    onClick={() => toggleItem(product)}
                    className="p-1.5 rounded-full hover:bg-[var(--surface-muted)] text-[var(--ink-muted)] hover:text-[var(--terracotta)] transition-colors"
                    title={isSaved ? "Saved to wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`h-4 w-4 ${isSaved ? "fill-[var(--terracotta)] text-[var(--terracotta)]" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] leading-tight">
                {product.name}
              </h1>

              {product.botanicalName && (
                <p className="font-serif italic text-sm text-[var(--ink-muted)] mt-1">
                  {product.botanicalName}
                </p>
              )}

              {/* Reviews Stars & Sold Count */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-[var(--marigold-tint)] px-2.5 py-1 rounded-full border border-[var(--marigold)]/30">
                  <Star className="h-3.5 w-3.5 fill-[var(--marigold)] text-[var(--marigold)]" />
                  <span className="text-xs font-bold text-[var(--ink)]">{product.rating}</span>
                  <span className="text-[11px] text-[var(--ink-muted)]">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-xs text-[var(--ink-muted)]">•</span>
                <span className="text-xs font-medium text-[var(--primary-green-hover)] flex items-center gap-1">
                  <PackageCheck className="h-3.5 w-3.5" /> 1.2k+ delivered safely
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="font-extrabold text-3xl text-[var(--ink)]">
                  {formatCurrency(currentPrice)}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <span className="text-base text-[var(--ink-muted)] line-through">
                    {formatCurrency(currentOriginalPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <Badge variant="terracotta" className="text-xs font-bold px-2 py-0.5">
                    Save {discount}%
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-[var(--ink-muted)] mt-1">
                Inclusive of all taxes. Free shipping on orders above {formatCurrency(siteConfig.shipping.freeDeliveryThreshold)}.
              </p>
            </div>

            {/* Size Variants */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--ink)]">
                    Select Size: <span className="font-normal text-[var(--ink-muted)]">{selectedSize.label}</span>
                  </span>
                  <span className="text-[11px] text-[var(--ink-muted)]">
                    Height: <strong>{selectedSize.height}</strong> | Pot: <strong>{selectedSize.potDiameter}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedSizeIndex === idx
                          ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                          : "border-[var(--border-warm)] bg-[var(--surface)] hover:border-[var(--primary-green)]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[var(--ink)]">{size.name}</span>
                        <span className="text-[10px] font-semibold text-[var(--primary-green)]">
                          {formatCurrency(size.price)}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--ink-muted)] line-clamp-1">{size.height}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Planter Color Options */}
            {product.planterColors && product.planterColors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--ink)]">
                    Self-Watering Planter:{" "}
                    <span className="font-normal text-[var(--ink-muted)]">{selectedColor?.name}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.planterColors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={color.name}
                      className={`h-8 w-8 rounded-full border border-black/20 transition-all ${
                        selectedColorIndex === idx
                          ? "scale-115 ring-2 ring-[var(--primary-green)] ring-offset-2"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center h-12 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface-muted)] disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[var(--ink)]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface-muted)] disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 h-12 text-sm font-bold rounded-full shadow-lg transition-transform active:scale-98"
                  onClick={handleAddToCart}
                  isLoading={isAdding}
                >
                  {justAdded ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" /> Add to Cart • {formatCurrency(currentPrice * quantity)}
                    </span>
                  )}
                </Button>
              </div>

              {/* Scarcity Notice */}
              {product.stock < 15 && (
                <p className="text-xs font-semibold text-[var(--terracotta)] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  High demand: Only {product.stock} left in current greenhouse batch!
                </p>
              )}
            </div>

            {/* Pincode Delivery Availability Checker */}
            <PincodeChecker />

            {/* Direct WhatsApp Concierge Question */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-warm)]">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--ink)]">Have a plant care question?</h4>
                  <p className="text-[11px] text-[var(--ink-muted)]">Ask our greenhouse botanist on WhatsApp</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=Hi%20Botanica%20Co,%20I%20have%20a%20question%20about%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-3 rounded-full bg-[var(--surface)] border border-[var(--border-warm)] hover:border-[var(--primary-green)] text-xs font-semibold text-[var(--ink)] flex items-center gap-1 transition-colors"
              >
                Chat Now
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Care, Description, In The Box */}
        <div className="mt-16 pt-12 border-t border-[var(--border-warm)]">
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="mb-8 p-1.5 bg-[var(--surface-muted)] rounded-2xl max-w-xl mx-auto flex">
              <TabsTrigger value="care" className="flex-1 rounded-xl text-xs sm:text-sm font-semibold">
                Care Routine
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1 rounded-xl text-xs sm:text-sm font-semibold">
                Botanical Details
              </TabsTrigger>
              <TabsTrigger value="contents" className="flex-1 rounded-xl text-xs sm:text-sm font-semibold">
                What&apos;s Included
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 rounded-xl text-xs sm:text-sm font-semibold">
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Care Routine */}
            <TabsContent value="care" className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-2">
                  <div className="flex items-center gap-2 text-[var(--marigold)] font-bold text-sm">
                    <Sun className="h-5 w-5" />
                    <span className="text-[var(--ink)]">Light Requirements</span>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{product.care.light}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-2">
                  <div className="flex items-center gap-2 text-[var(--sky-tint)] font-bold text-sm">
                    <Droplets className="h-5 w-5 text-sky-500" />
                    <span className="text-[var(--ink)]">Watering Frequency</span>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{product.care.water}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-2">
                  <div className="flex items-center gap-2 text-[var(--terracotta)] font-bold text-sm">
                    <PawPrint className="h-5 w-5" />
                    <span className="text-[var(--ink)]">Pet & Child Safety</span>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {product.care.petFriendly
                      ? "100% Non-Toxic & Pet-Friendly. Safe around curious dogs and cats."
                      : "Mild toxicity if ingested. Keep out of reach of inquisitive pets and infants."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-2">
                  <div className="flex items-center gap-2 text-[var(--primary-green)] font-bold text-sm">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-[var(--ink)]">Soil & Nutrition</span>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {product.care.fertilizer || "Feed once every 4 weeks with organic seaweed fertilizer during spring and summer months."}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Botanical Details */}
            <TabsContent value="about" className="space-y-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-4">
                <h3 className="font-display font-bold text-lg text-[var(--ink)]">About this Specimen</h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{product.description}</p>

                <h4 className="font-bold text-sm text-[var(--ink)] pt-2">Key Botanical Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[var(--ink-muted)]">
                      <Check className="h-4 w-4 text-[var(--primary-green)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Tab 3: What's Included */}
            <TabsContent value="contents" className="space-y-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-4">
                <h3 className="font-display font-bold text-lg text-[var(--ink)]">Inside Your Delivery Box</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(product.includes || [
                    "Root-aerated healthy plant specimen",
                    "Self-watering recyclable planter pot",
                    "Printed botanical care card & passport",
                    "Organic slow-release fertilizer pellet sample",
                  ]).map((inc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-warm)] text-xs font-semibold text-[var(--ink)]"
                    >
                      <PackageCheck className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Verified Reviews */}
            <TabsContent value="reviews" className="space-y-6 max-w-4xl mx-auto">
              {/* Rating Summary Bar */}
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="font-display font-bold text-4xl text-[var(--ink)]">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[var(--marigold)] text-[var(--marigold)]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)]">Based on {product.reviewCount} verified nursery purchases</p>
                </div>

                <div className="text-xs text-[var(--ink-muted)] space-y-1.5 w-full md:w-64">
                  <div className="flex items-center justify-between">
                    <span>5 Star</span>
                    <div className="w-36 h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                      <div className="bg-[var(--primary-green)] h-full w-[92%]" />
                    </div>
                    <span>92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>4 Star</span>
                    <div className="w-36 h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                      <div className="bg-[var(--primary-green)] h-full w-[6%]" />
                    </div>
                    <span>6%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>3 Star</span>
                    <div className="w-36 h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                      <div className="bg-[var(--primary-green)] h-full w-[2%]" />
                    </div>
                    <span>2%</span>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[var(--ink)]">{rev.author}</span>
                        {rev.verified && (
                          <Badge variant="primary" className="text-[10px] py-0">
                            Verified Buyer
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-[var(--ink-muted)]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[var(--marigold)] text-[var(--marigold)]" />
                      ))}
                    </div>

                    <h4 className="font-semibold text-xs text-[var(--ink)]">{rev.title}</h4>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{rev.comment}</p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-[var(--ink-muted)]">
                      <button className="flex items-center gap-1 hover:text-[var(--primary-green)] transition-colors">
                        <ThumbsUp className="h-3 w-3" /> Helpful ({rev.likes})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Specimen Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[var(--border-warm)]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green)]">
                  Handpicked Pairings
                </span>
                <h2 className="font-display font-bold text-2xl text-[var(--ink)] mt-1">
                  You May Also Like
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold text-[var(--primary-green)] hover:underline hidden sm:inline"
              >
                Browse All Specimens &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sticky Mobile Cart Bar */}
      <StickyMobileCart
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToCart={handleAddToCart}
        isAdding={isAdding}
        justAdded={justAdded}
      />
    </div>
  );
}
