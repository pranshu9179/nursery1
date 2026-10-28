import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  ShieldCheck,
  HeartHandshake,
  Recycle,
  Award,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: `Our Story & Philosophy | ${siteConfig.name}`,
  description:
    "Learn how Botanica & Co. cultivates acclimatised indoor plants across 25 acres of greenhouse polyhouses with 100% peat-free organic care.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[var(--border-warm)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-green)]/10 text-[var(--primary-green-hover)] text-xs font-bold border border-[var(--primary-green)]/20">
                <Sprout className="h-4 w-4" />
                <span>Our Greenhouse Journey</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.1] tracking-tight">
                Cultivating Living Sanctuaries for Modern Homes.
              </h1>

              <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-xl">
                Founded in 2018 in the lush outskirts of Bengaluru, Botanica & Co. was born from a simple belief: every home deserves the calming, restorative presence of living greenery.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/shop"
                  className={buttonVariants({ variant: "primary", size: "lg", className: "rounded-full px-8 shadow-md" })}
                >
                  Explore Our Collection
                </Link>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8" })}
                >
                  Visit Our Greenhouse
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-[var(--surface)]">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                  alt="Botanica Nursery Greenhouse"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="py-12 bg-[var(--forest)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[var(--marigold)]">
                250,000+
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Homes Greened Across India</p>
            </div>
            <div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[var(--marigold)]">
                25 Acres
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Climate-Controlled Polyhouses</p>
            </div>
            <div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[var(--marigold)]">
                99.4%
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Safe Transit Arrival Rate</p>
            </div>
            <div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[var(--marigold)]">
                4.9 / 5.0
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Customer Satisfaction Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Nursery Pillars */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green)]">
            The Botanica Difference
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)] mt-2">
            Why Discerning Plant Parents Trust Us
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-3">
            We don’t just broker plants; we propagate, nurture, and acclimatise each root system before it embarks on its journey to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-3 shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-[var(--primary-green)]/10 text-[var(--primary-green)] flex items-center justify-center">
              <Sprout className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Peat-Free Organic Soil
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Sterilised coco-peat, volcanic perlite, and vermicompost enrich our pots with maximum aeration, completely eliminating nursery root rot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-3 shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-[var(--terracotta)]/10 text-[var(--terracotta)] flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Shock-Free Transit
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Our patented 7-layer ventilated corrugated crates lock roots in place while allowing airflow, backed by a 7-day free replacement guarantee.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-3 shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-[var(--marigold)]/15 text-[var(--ink)] flex items-center justify-center">
              <HeartHandshake className="h-6 w-6 text-[var(--marigold)]" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Lifetime Plant SOS
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Every customer receives lifetime access to our WhatsApp plant hospital. Send photos of yellowing leaves for free diagnosis within 2 hours.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-3 shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Recycle className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Sub-Irrigation Pots
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Crafted from 100% recyclable, UV-stabilised polymers with self-watering wicks that cut watering frequency down to once every 10–14 days.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Botanists */}
      <section className="py-16 bg-[var(--surface)] border-y border-[var(--border-warm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green)]">
              Our Horticulture Team
            </span>
            <h2 className="font-display font-bold text-3xl text-[var(--ink)] mt-2">
              Guided by Science & Passion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-[var(--background)] border border-[var(--border-warm)] text-center space-y-4">
              <div className="relative h-28 w-28 rounded-full overflow-hidden mx-auto border-2 border-[var(--primary-green)]">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                  alt="Dr. Ananya Sharma"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[var(--ink)]">Dr. Ananya Sharma</h3>
                <p className="text-xs font-semibold text-[var(--primary-green)]">Lead Botanist (Ph.D. Plant Physiology)</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  Specialises in root zone microbial inoculation and tropical understory foliage acclimation.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--background)] border border-[var(--border-warm)] text-center space-y-4">
              <div className="relative h-28 w-28 rounded-full overflow-hidden mx-auto border-2 border-[var(--terracotta)]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
                  alt="Rohan Varma"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[var(--ink)]">Rohan Varma</h3>
                <p className="text-xs font-semibold text-[var(--terracotta)]">Biophilic Interior Designer</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  Designs ergonomic, plant-centred living rooms and low-light work environments.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--background)] border border-[var(--border-warm)] text-center space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="relative h-28 w-28 rounded-full overflow-hidden mx-auto border-2 border-[var(--marigold)]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
                  alt="Kavita Reddy"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[var(--ink)]">Kavita Reddy</h3>
                <p className="text-xs font-semibold text-[var(--marigold)]">Head of Nursery Operations</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  Oversees propagation beds and safe parcel packaging across 15,000+ monthly shipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
