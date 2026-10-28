"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const announcements = siteConfig.announcements;

  React.useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="relative z-50 bg-[var(--forest)] text-white text-xs font-medium py-2.5 px-4 min-h-[38px] flex items-center transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Left Arrow on desktop */}
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="hidden md:flex items-center justify-center h-6 w-6 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5 opacity-80" />
        </button>

        {/* Center message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2 overflow-hidden px-2">
          <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)] shrink-0 animate-pulse" />
          <p className="truncate transition-opacity duration-300">
            {current.link ? (
              <Link href={current.link} className="hover:underline flex items-center gap-1.5 justify-center">
                <span>{current.text}</span>
                {current.highlight && (
                  <span className="underline font-bold text-[var(--marigold)] decoration-[var(--marigold)]/50">
                    {current.highlight}
                  </span>
                )}
              </Link>
            ) : (
              <span>{current.text}</span>
            )}
          </p>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="hidden md:flex items-center justify-center h-6 w-6 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 opacity-80" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white ml-2"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
