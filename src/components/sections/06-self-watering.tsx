"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Droplets, Sparkles, ShieldCheck, ArrowRight, Gauge, Layers, Sprout } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Fill The Reservoir",
    subtitle: "Through Dedicated Spout",
    description:
      "Pour clean water into the side funnel spout. The internal sub-irrigation basin holds enough moisture for up to 14 days of gradual hydration.",
    icon: Droplets,
  },
  {
    step: "02",
    title: "Capillary Aeration",
    subtitle: "Oxygenated Root Zone",
    description:
      "A perforated porous separation barrier prevents roots from drowning in stagnant water, allowing natural capillary suction and air circulation.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Float Gauge Alerts",
    subtitle: "Zero Guesswork Refills",
    description:
      "The integrated water level indicator needle visibly rises when full and descends when dry. You never have to guess or check damp soil.",
    icon: Gauge,
  },
];

export function SelfWateringSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--forest)] text-white overflow-hidden">
      {/* Decorative Forest Ambient Glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--primary-green)]/15 blur-3xl" />
      <div className="absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-[#1A534B]/40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[var(--marigold)] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Patented Nursery Engineering</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Plant Care Made <span className="font-script text-[var(--marigold)] text-4xl sm:text-5xl md:text-6xl">Effortless</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--forest-muted)] leading-relaxed">
            Overwatering and underwatering cause 85% of plant casualties. Our sub-irrigation architectural pots provide steady root hydration for up to 14 days without fuss.
          </p>
        </div>

        {/* Hero Feature Showcase + 3 Connected Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Diagram Artwork */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[var(--forest-surface)] p-3">
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
                  alt="Architectural self-watering planter cutaway"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)] via-transparent to-transparent" />

                {/* Floating Callouts */}
                <div className="absolute top-4 left-4 glass-chip-dark p-2.5 rounded-xl border border-white/20 text-xs">
                  <div className="flex items-center gap-1.5 text-[var(--marigold)] font-bold">
                    <Droplets className="h-3.5 w-3.5" />
                    <span>14-Day Reservoir</span>
                  </div>
                  <span className="text-[10px] text-white/80 block mt-0.5">Hydration while traveling</span>
                </div>

                <div className="absolute bottom-4 right-4 glass-chip-dark p-2.5 rounded-xl border border-white/20 text-xs text-right">
                  <div className="flex items-center justify-end gap-1.5 text-[var(--primary-green)] font-bold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Root Rot Shield</span>
                  </div>
                  <span className="text-[10px] text-white/80 block mt-0.5">Aeration separation plate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3 Connected Numbered Steps */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* Visual Step Connector Line (desktop) */}
            <div className="hidden lg:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[var(--primary-green)] via-[var(--marigold)] to-[var(--forest-muted)] opacity-30" />

            {STEPS.map((stepItem) => {
              const Icon = stepItem.icon;
              return (
                <div
                  key={stepItem.step}
                  className="relative group p-6 rounded-2xl bg-[var(--forest-surface)]/80 border border-white/10 hover:border-[var(--primary-green)] transition-all duration-300 flex items-start gap-5 hover:bg-[var(--forest-surface)]"
                >
                  {/* Step Number Circle */}
                  <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-display font-extrabold text-base text-[var(--marigold)] group-hover:bg-[var(--primary-green)] group-hover:text-white transition-colors shrink-0 shadow-sm">
                    {stepItem.step}
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-lg text-white">
                        {stepItem.title}
                      </h4>
                      <Icon className="h-4 w-4 text-[var(--forest-muted)] group-hover:text-[var(--marigold)] transition-colors" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--marigold)] block">
                      {stepItem.subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--forest-muted)] leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/shop?category=pots"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full sm:w-auto font-bold text-sm shadow-lg",
                })}
              >
                <span>Shop Self-Watering Planters</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-[var(--forest-muted)]">
                <Sprout className="h-4 w-4 text-[var(--primary-green)]" />
                <span>Fits all standard nursery plant sizes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
