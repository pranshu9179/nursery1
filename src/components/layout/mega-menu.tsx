"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/badge";

export function MegaMenu() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 150);
  };

  return (
    <nav className="flex items-center gap-0.5 lg:gap-1 xl:gap-1.5 shrink-0" onMouseLeave={handleMouseLeave}>
      {siteConfig.navigation.map((navItem) => {
        const hasSections = navItem.sections && navItem.sections.length > 0;
        const isOpen = activeItem === navItem.label;

        return (
          <div
            key={navItem.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(navItem.label)}
          >
            <Link
              href={navItem.href}
              className={`inline-flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-semibold transition-all rounded-full whitespace-nowrap shrink-0 ${
                isOpen
                  ? "text-[var(--primary-green-hover)] bg-[var(--primary-green)]/10 font-bold"
                  : "text-[var(--ink)]/90 hover:text-[var(--primary-green)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              <span>{navItem.label}</span>
              {navItem.badge && (
                <Badge
                  variant="terracotta"
                  className="text-[9px] px-1.5 py-0.5 h-3.5 uppercase tracking-wider font-bold shrink-0 bg-[var(--terracotta)]/10 text-[var(--terracotta)] border-0 hidden sm:inline-flex"
                >
                  {navItem.badge}
                </Badge>
              )}
              {hasSections && (
                <ChevronDown
                  className={`h-3 w-3 shrink-0 text-[var(--ink-muted)] opacity-70 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[var(--primary-green)] opacity-100" : ""
                  }`}
                />
              )}
            </Link>

            {/* Dropdown Flyout */}
            {hasSections && isOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-3xl bg-[var(--surface)] p-6 shadow-2xl border border-[var(--border-warm)] animate-in fade-in-50 zoom-in-95 duration-200 z-50"
                onMouseEnter={() => handleMouseEnter(navItem.label)}
              >
                <div className="grid grid-cols-12 gap-6">
                  {/* Category Columns */}
                  <div className="col-span-8 grid grid-cols-2 gap-6">
                    {navItem.sections!.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-green)]" />
                          {section.title}
                        </h4>
                        <ul className="space-y-1.5">
                          {section.items.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                href={subItem.href}
                                onClick={() => setActiveItem(null)}
                                className="group flex flex-col p-2 rounded-xl hover:bg-[var(--surface-muted)] transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs sm:text-sm font-medium text-[var(--ink)] group-hover:text-[var(--primary-green)] transition-colors">
                                    {subItem.label}
                                  </span>
                                  {subItem.badge && (
                                    <Badge variant="primary" className="text-[10px] px-1.5 py-0 h-4">
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </div>
                                {subItem.description && (
                                  <span className="text-[11px] text-[var(--ink-muted)] line-clamp-1 mt-0.5">
                                    {subItem.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured Category Visual Preview */}
                  <div className="col-span-4 bg-[var(--surface-muted)] rounded-2xl p-4 flex flex-col justify-between border border-[var(--border-warm)]">
                    <div>
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3">
                        {navItem.featuredImage && (
                          <Image
                            src={navItem.featuredImage}
                            alt={navItem.label}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="240px"
                          />
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-[var(--ink)] shadow-xs">
                            <Sparkles className="h-2.5 w-2.5 text-[var(--marigold)]" />
                            Curated
                          </span>
                        </div>
                      </div>
                      <h5 className="font-display font-semibold text-sm text-[var(--ink)]">
                        Explore All {navItem.label}
                      </h5>
                      <p className="text-xs text-[var(--ink-muted)] mt-1 line-clamp-2">
                        Hand-nurtured botanical selections with step-by-step care cards.
                      </p>
                    </div>

                    <Link
                      href={navItem.href}
                      onClick={() => setActiveItem(null)}
                      className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--primary-green)] hover:text-[var(--primary-green-hover)] group"
                    >
                      <span>View entire collection</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
