import { HeroSection } from "@/components/sections/01-hero";
import { QuickLinksSection } from "@/components/sections/02-quick-links";
import { BentoPromoSection } from "@/components/sections/03-bento-grid";
import { BestSellersSection } from "@/components/sections/04-best-sellers";
import { SeedBundleBanner } from "@/components/sections/05-seed-bundle-banner";
import { SelfWateringSection } from "@/components/sections/06-self-watering";
import { CategoryCarouselSection } from "@/components/sections/07-category-carousel";
import { NewArrivalsSection } from "@/components/sections/08-new-arrivals";
import { FeatureStripSection } from "@/components/sections/09-feature-strip";
import { GiftBoxesSection } from "@/components/sections/10-gift-boxes";
import { WhyChooseUsSection } from "@/components/sections/11-why-choose-us";
import { ShopBySizeSection } from "@/components/sections/12-shop-by-size";
import { TestimonialsSection } from "@/components/sections/13-testimonials";
import { WhatsAppPromoSection } from "@/components/sections/14-whatsapp-banner";
import { LatestArticlesSection } from "@/components/sections/15-latest-articles";
import { NewsletterSection } from "@/components/sections/16-newsletter";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero with botanical arch & floating glass chips */}
      <HeroSection />

      {/* 2. Category quick links image chips */}
      <QuickLinksSection />

      {/* 3. Bento promo grid (PlantZone pastel style) */}
      <BentoPromoSection />

      {/* 4. Best Sellers Embla carousel with instant category tabs */}
      <BestSellersSection />

      {/* 5. Terracotta Seed bundle promo banner with ribbon marquee */}
      <SeedBundleBanner />

      {/* 6. Dark "Self-watering planter" section on deep forest #123C36 */}
      <SelfWateringSection />

      {/* 7. Shop by Category carousel with active green card border */}
      <CategoryCarouselSection />

      {/* 8. New Arrivals responsive 4-column grid with Load More */}
      <NewArrivalsSection />

      {/* 9. Feature highlights strip */}
      <FeatureStripSection />

      {/* 10. Gift Boxes feature split section on marigold tint */}
      <GiftBoxesSection />

      {/* 11. Why Choose Us 4 icon cards with soft layered shadows */}
      <WhyChooseUsSection />

      {/* 12. Shop by size/room image cards */}
      <ShopBySizeSection />

      {/* 13. Testimonials carousel + "As seen in" media logo strip */}
      <TestimonialsSection />

      {/* 14. WhatsApp / App promo concierge banner */}
      <WhatsAppPromoSection />

      {/* 15. Latest Articles / Plant Doctor care guides */}
      <LatestArticlesSection />

      {/* 16. Newsletter subscription with confetti micro-interaction */}
      <NewsletterSection />
    </div>
  );
}
