"use client";

import * as React from "react";
import Link from "next/link";
import { Sprout, Phone, MessageCircle, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useUIStore } from "@/store/ui-store";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { LeafToggle } from "@/components/effects/leaf-toggle";

export function MobileDrawer() {
  const { isMobileNavOpen, closeMobileNav, openWishlist, openCart } = useUIStore();

  const handleLinkClick = () => {
    closeMobileNav();
  };

  return (
    <Sheet open={isMobileNavOpen} onOpenChange={(open) => !open && closeMobileNav()}>
      <SheetContent side="left" className="w-[85vw] max-w-sm p-0 flex flex-col h-full bg-[var(--surface)]">
        {/* Header with Logo */}
        <SheetHeader className="p-5 border-b border-[var(--border-warm)]">
          <SheetTitle className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-[var(--primary-tint)] flex items-center justify-center text-[var(--primary-green)]">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[var(--ink)] block leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[11px] font-sans text-[var(--ink-muted)] block font-normal">
                {siteConfig.tagline}
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Quick Action Pills */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                closeMobileNav();
                openWishlist();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--surface-muted)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--primary-tint)] transition-colors"
            >
              <Heart className="h-4 w-4 text-[var(--terracotta)]" />
              <span>Wishlist</span>
            </button>
            <button
              onClick={() => {
                closeMobileNav();
                openCart();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--primary-tint)] text-xs font-semibold text-[var(--primary-green-hover)] hover:bg-[var(--primary-green)] hover:text-white transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>View Cart</span>
            </button>
          </div>

          {/* Categorized Accordion */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Explore Catalog
            </span>
            <Accordion type="single" collapsible className="w-full">
              {siteConfig.navigation.map((navItem) => {
                if (!navItem.sections || navItem.sections.length === 0) {
                  return (
                    <div key={navItem.label} className="border-b border-[var(--border-warm)] py-3">
                      <Link
                        href={navItem.href}
                        onClick={handleLinkClick}
                        className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--primary-green)] flex items-center justify-between"
                      >
                        <span>{navItem.label}</span>
                        {navItem.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--terracotta-tint)] text-[var(--terracotta)] font-bold">
                            {navItem.badge}
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                }

                return (
                  <AccordionItem key={navItem.label} value={navItem.label}>
                    <AccordionTrigger className="text-sm font-semibold text-[var(--ink)] hover:no-underline">
                      <div className="flex items-center gap-2">
                        <span>{navItem.label}</span>
                        {navItem.badge && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[var(--primary-tint)] text-[var(--primary-green-hover)] font-bold">
                            {navItem.badge}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-2 pt-2">
                      {navItem.sections.map((sec) => (
                        <div key={sec.title} className="space-y-2">
                          <span className="text-[11px] font-bold text-[var(--ink-muted)] uppercase tracking-wider">
                            {sec.title}
                          </span>
                          <div className="space-y-1.5 pl-2">
                            {sec.items.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={handleLinkClick}
                                className="block text-sm text-[var(--ink)] hover:text-[var(--primary-green)] py-1"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Link
                          href={navItem.href}
                          onClick={handleLinkClick}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary-green)]"
                        >
                          <span>All {navItem.label}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Additional Quick Pages */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Help & Nursery
            </span>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="block text-sm font-medium text-[var(--ink)] hover:text-[var(--primary-green)] py-1.5"
            >
              Plant Care Journal & Guides
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block text-sm font-medium text-[var(--ink)] hover:text-[var(--primary-green)] py-1.5"
            >
              About Our Greenhouses
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="block text-sm font-medium text-[var(--ink)] hover:text-[var(--primary-green)] py-1.5"
            >
              Contact & Plant Clinic
            </Link>
          </div>

          {/* Visual Preferences: Falling Leaves Toggle */}
          <div className="pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
              Atmosphere
            </span>
            <LeafToggle variant="drawer" />
          </div>

          {/* Plant Doctor / WhatsApp Concierge Box */}
          <div className="p-4 rounded-2xl bg-[var(--primary-tint)] border border-[#C5E5CC] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-green-hover)]">
              <MessageCircle className="h-4 w-4" />
              <span>Plant Doctor Helpline</span>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Have a sick leaf or need soil advice? WhatsApp our resident botanists for free care consultation.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                window.open(`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`, "_blank");
              }}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        {/* Footer Contact bar */}
        <div className="p-4 border-t border-[var(--border-warm)] bg-[var(--surface-muted)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[var(--primary-green)]" />
            <span>{siteConfig.contact.phone}</span>
          </div>
          <span>Bengaluru, India</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
