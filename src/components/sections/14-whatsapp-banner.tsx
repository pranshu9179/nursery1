"use client";

import * as React from "react";
import Image from "next/image";
import { MessageCircle, QrCode, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";

export function WhatsAppPromoSection() {
  const handleOpenWhatsApp = () => {
    const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    window.open(
      `https://wa.me/${cleanNumber}?text=Hi%20Botanica%2C%20I%20would%20like%20expert%20care%20guidance%20for%20my%20plants!`,
      "_blank"
    );
  };

  return (
    <section className="py-12 md:py-16 bg-[var(--surface-muted)]/60 border-b border-[var(--border-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#184740] to-[var(--forest)] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-[var(--primary-green)]/20 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[var(--marigold)] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Nursery Care Concierge</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                Have a Question About Your Plants? <br className="hidden sm:block" />
                Chat With Our Resident Botanists on WhatsApp.
              </h3>

              <p className="text-xs sm:text-sm text-[var(--forest-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Send photos of yellowing leaves, discuss customized repotting soil mixes, or request delivery updates. Available 7 days a week with zero automated bot loops.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/90 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[var(--marigold)]" />
                  <span>Avg Reply: Under 15 Mins</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[var(--primary-green)]" />
                  <span>100% Free Lifetime Care</span>
                </span>
              </div>

              <div className="pt-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleOpenWhatsApp}
                  className="font-bold text-xs sm:text-sm px-8 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto lg:mx-0"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  <span>Start WhatsApp Chat ({siteConfig.contact.whatsapp})</span>
                </Button>
              </div>
            </div>

            {/* Right: Interactive Mock QR Code */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white p-5 rounded-2xl shadow-xl text-center space-y-2 border border-white/20 max-w-[220px]">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[var(--surface-muted)] flex items-center justify-center p-3 border border-[var(--border-warm)]">
                  {/* Clean SVG Mock QR pattern */}
                  <svg className="w-full h-full text-[var(--forest)]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v20H40zM50 0h10v10H50zM40 40h20v20H40zM70 40h10v10H70zM90 40h10v10H90zM40 70h10v30H40zM60 70h20v10H60zM60 90h10v10H60zM80 80h20v20H80z" />
                  </svg>
                </div>
                <div className="text-[11px] font-bold text-[var(--ink)]">Scan To Connect</div>
                <div className="text-[10px] text-[var(--ink-muted)]">Instant camera QR link</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
