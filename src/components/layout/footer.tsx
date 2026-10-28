"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sprout, ArrowUp, Heart, ShieldCheck, Truck, RefreshCw, Send, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { LeafToggle } from "@/components/effects/leaf-toggle";

const INSTAGRAM_PREVIEWS = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
    alt: "Fiddle Leaf Fig in sunlight",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80",
    alt: "Monstera Deliciosa leaves",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80",
    alt: "Succulent arrangement",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
    alt: "Ceramic pot collection",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
    alt: "Kitchen herb garden",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80",
    alt: "Plant nursery greenhouse",
  },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--forest)] text-white pt-16 pb-24 md:pb-12 border-t border-[var(--forest-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Value Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--primary-green)] shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-white">Safe Transit Delivery</h5>
              <p className="text-[11px] text-[var(--forest-muted)]">Specially ventilated crates</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--marigold)] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-white">7-Day Guarantee</h5>
              <p className="text-[11px] text-[var(--forest-muted)]">Healthy arrival guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--primary-green)] shrink-0">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-white">Self-Watering Pots</h5>
              <p className="text-[11px] text-[var(--forest-muted)]">14-day zero hassle hydration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--marigold)] shrink-0">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-white">Lifetime Plant Doctor</h5>
              <p className="text-[11px] text-[var(--forest-muted)]">Free care guidance forever</p>
            </div>
          </div>
        </div>

        {/* Instagram Visual Strip */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-display text-lg text-white font-semibold">
                Follow <span className="text-[var(--marigold)]">@botanica.nursery</span>
              </h4>
              <p className="text-xs text-[var(--forest-muted)]">
                Tag your thriving houseplants on Instagram for a chance to be featured.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--primary-green)] hover:text-white transition-colors"
            >
              Join 50k+ plant parents &rarr;
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {INSTAGRAM_PREVIEWS.map((item) => (
              <a
                key={item.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-black/20"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-[var(--forest)]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--primary-green)]">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-xs text-[var(--forest-muted)] leading-relaxed max-w-sm">
              Cultivating harmony between modern urban living and nature. Hand-potted specimen foliage, architectural planters, and organic botanical nourishment.
            </p>

            {/* Quick Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-2">
                Join The Botanical Club
              </span>
              <p className="text-xs text-[var(--forest-muted)] mb-3">
                Receive weekly plant care tips and early access to rare seasonal propagation drops.
              </p>
              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-white/10 text-xs text-[var(--marigold)] font-medium">
                  🌿 Welcome to the family! Check your inbox for 10% off.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 text-xs rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[var(--forest-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold hover:bg-[var(--primary-green-hover)] transition-colors flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column 1: Shop */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--marigold)]">
              Shop Greenery
            </h4>
            <ul className="space-y-2 text-xs text-[var(--forest-muted)]">
              <li>
                <Link href="/shop?category=indoor" className="hover:text-white transition-colors">
                  Indoor Foliage
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outdoor" className="hover:text-white transition-colors">
                  Outdoor Garden
                </Link>
              </li>
              <li>
                <Link href="/shop?category=succulents" className="hover:text-white transition-colors">
                  Succulents & Cacti
                </Link>
              </li>
              <li>
                <Link href="/shop?category=self-watering" className="hover:text-white transition-colors">
                  Self-Watering Pots
                </Link>
              </li>
              <li>
                <Link href="/shop?category=seeds" className="hover:text-white transition-colors">
                  Organic Seeds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifting" className="hover:text-white transition-colors">
                  Festive Gift Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Care & Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--marigold)]">
              Plant Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-[var(--forest-muted)]">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Plant Doctor Care Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Nursery & Greenhouses
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Free Doctor WhatsApp Clinic
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shipping & Safe Transit Crates
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  7-Day Plant Guarantee Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--marigold)]">
              Greenhouse Flagship
            </h4>
            <div className="space-y-2.5 text-xs text-[var(--forest-muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[var(--primary-green)] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <p className="text-[11px] pt-1 text-[var(--forest-muted)]/80">
                {siteConfig.contact.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Icons, Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--forest-muted)]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
            <span>•</span>
            <span>Crafted with love in India</span>
          </div>

          {/* Payment Trust Badges */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-white/60">
              Trusted Payments:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white">
                UPI
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white">
                RuPay
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white">
                Visa
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white">
                Mastercard
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[var(--marigold)]">
                COD
              </span>
            </div>
          </div>

          {/* Controls: Falling Leaves Toggle & Back to Top */}
          <div className="flex items-center gap-2.5">
            <LeafToggle variant="footer" />
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
