"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Truck,
  ArrowRight,
  Eye,
  Droplets,
  Sun,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { products } from "@/data/products";
import { useUIStore } from "@/store/ui-store";

const HERO_SLIDES = [
  {
    product: products[0], // Monstera Deliciosa
    eyebrow: "Air-Purifying Botanical Specimen",
    headingMain: "Plants Gonna Make People",
    headingAccent: "Happy",
    subcopy:
      "Hand-nurtured botanical statements potted in organic perlite-coir medium. Delivered in shock-absorbent ventilated crates across India.",
    floatingChips: [
      { icon: Sun, label: "Indirect Light", sub: "Medium to High", position: "top-8 -left-3 sm:-left-6" },
      { icon: Droplets, label: "Sub-Irrigation", sub: "Water Every 7-10 Days", position: "bottom-24 left-2 sm:left-4" },
      { icon: HeartHandshake, label: "Jungle Vibe", sub: "Rapid Split Growth", position: "top-16 -right-3 sm:-right-6" },
    ],
    videoSrc: "/assets/video.mp4",
    mediaType: "video" as const,
  },
  {
    product: products[1], // Fiddle Leaf Fig
    eyebrow: "Architectural Statement Foliage",
    headingMain: "Transform Your Living",
    headingAccent: "Sanctuary",
    subcopy:
      "Sculptural broad violin leaves with deep veining that purify household air and anchor contemporary interior spaces with natural warmth.",
    floatingChips: [
      { icon: Sun, label: "Morning Sun", sub: "East-Facing Window", position: "top-8 -left-3 sm:-left-6" },
      { icon: Droplets, label: "Aerated Pot", sub: "No Waterlogging", position: "bottom-24 left-2 sm:left-4" },
      { icon: Sparkles, label: "Designer Pick", sub: "Top Editorial Favorite", position: "top-16 -right-3 sm:-right-6" },
    ],
    mediaType: "image" as const,
  },
  {
    product: products[2], // Snake Plant Laurentii
    eyebrow: "Indestructible Bedroom Purifier",
    headingMain: "Breathe Pure Nocturnal",
    headingAccent: "Oxygen",
    subcopy:
      "Thrives on drought and neglect while continuously releasing crisp oxygen throughout the night. The ultimate beginner houseplant.",
    floatingChips: [
      { icon: Sun, label: "Any Light", sub: "Dim Corners to Sun", position: "top-8 -left-3 sm:-left-6" },
      { icon: Droplets, label: "Sparse Water", sub: "Once Every 3 Weeks", position: "bottom-24 left-2 sm:left-4" },
      { icon: ShieldCheck, label: "NASA Tested", sub: "Toxin Filtration", position: "top-16 -right-3 sm:-right-6" },
    ],
    mediaType: "image" as const,
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide
const INTERVAL_STEP = 50;

export function HeroSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(1); // default M
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true); // Default muted as requested
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { openQuickView } = useUIStore();

  const currentSlide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];
  const currentProduct = currentSlide.product;
  const currentSize = currentProduct.sizes[selectedSizeIndex] || currentProduct.sizes[0];
  const currentPrice = currentSize.price || currentProduct.price;

  // Slide duration: 8 seconds for video slide, 5 seconds for image slides
  const currentSlideDuration = currentSlide.mediaType === "video" ? 8000 : SLIDE_DURATION;

  // Ensure HTML video element muted property is strictly synced with state (critical for autoplay)
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.defaultMuted = isMuted;
    }
  }, [isMuted]);

  // Handle slide transitions and pause video when leaving video slide
  React.useEffect(() => {
    if (!videoRef.current) return;
    if (activeSlide === 0) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => {
            // Autoplay safety fallback
            setIsVideoPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [activeSlide, isMuted]);

  // Auto-play timer with smooth progress bar
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          setSelectedSizeIndex(1); // reset to M
          return 0;
        }
        return prev + (INTERVAL_STEP / currentSlideDuration) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPaused, activeSlide, currentSlideDuration]);

  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setIsPaused(true);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleNextSlide = () => {
    setActiveSlide((curr) => (curr + 1) % HERO_SLIDES.length);
    setSelectedSizeIndex(1);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setActiveSlide((curr) => (curr === 0 ? HERO_SLIDES.length - 1 : curr - 1));
    setSelectedSizeIndex(1);
    setProgress(0);
  };

  const handleSelectSlide = (idx: number) => {
    setActiveSlide(idx);
    setSelectedSizeIndex(1);
    setProgress(0);
  };

  return (
    <section
      className="relative overflow-hidden bg-[var(--background)] pt-6 pb-16 md:pt-10 md:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--sage-tint)]/60 blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 -z-10 h-80 w-80 rounded-full bg-[var(--sky-tint)]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-[var(--marigold-tint)]/40 blur-3xl pointer-events-none" />

      {/* Floating Botanical Leaf SVGs */}
      <div className="absolute top-16 right-1/3 text-[var(--primary-green)]/15 pointer-events-none animate-float-slow">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-1/3 text-[var(--forest)]/10 pointer-events-none animate-float-reverse">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4L6 22l2.6-.9c1.1.6 2.3.9 3.4.9 5.5 0 10-4.5 10-10S17.5 2 12 2zm1 14.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4zm0-6.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5s.5.2.5.5v1z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy, Size Pill Picker, Price, CTAs & Trust Badges */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[var(--primary-green)] animate-ping" />
              <span className="text-xs font-semibold text-[var(--ink)] tracking-wide">
                Free Express Delivery on orders above ₹999
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
            </div>

            {/* Main Headline with Animated Key */}
            <div key={`headline-${activeSlide}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] leading-[1.12] tracking-tight">
                {currentSlide.headingMain}{" "}
                <span className="relative inline-block font-script text-[var(--primary-green)] text-5xl sm:text-6xl md:text-7xl font-normal ml-1">
                  {currentSlide.headingAccent}
                  {/* Hand-drawn Underline curve */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-[var(--primary-green)]/35"
                    viewBox="0 0 160 12"
                    fill="none"
                  >
                    <path
                      d="M3 9C40 2 120 1 157 8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subcopy */}
              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0 mt-4">
                {currentSlide.subcopy}
              </p>
            </div>

            {/* Interactive Size Pill Selector & Dynamic Price */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-sm space-y-3 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--ink)]">Select Size:</span>
                <span className="text-xs text-[var(--ink-muted)] font-medium">
                  {currentSize.name} &bull; {currentSize.height} height &bull; Pot: {currentSize.potDiameter}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {currentProduct.sizes.map((size, idx) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full text-xs font-bold transition-all ${
                        selectedSizeIndex === idx
                          ? "bg-[var(--primary-green)] text-white shadow-sm scale-105 ring-2 ring-[var(--primary-green)] ring-offset-2"
                          : "bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)] hover:border-[var(--primary-green)]"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>

                <div className="text-right pl-3 border-l border-[var(--border-warm)]">
                  <span className="text-xs text-[var(--ink-muted)] block line-through">
                    {formatCurrency(currentSize.originalPrice)}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-[var(--ink)]">
                    {formatCurrency(currentPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/shop"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full sm:w-auto shadow-md hover:shadow-lg font-bold text-sm h-12 px-8 rounded-full",
                })}
              >
                <span>Shop Plants Now</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>

              <button
                onClick={() => openQuickView(currentProduct)}
                className="w-full sm:w-auto h-12 px-6 rounded-full border border-[var(--border-warm)] bg-[var(--surface)] text-sm font-semibold text-[var(--ink)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>

            {/* Specimen Switcher with Plant Thumbnails & Auto-Play Progress */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--ink)]">Featured Specimens:</span>
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--ink-muted)]">
                  {isPaused ? (
                    <span className="flex items-center gap-1 text-[var(--terracotta)] font-semibold">
                      <Pause className="h-3 w-3" /> Paused
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[var(--primary-green)] font-semibold">
                      <Play className="h-3 w-3 fill-[var(--primary-green)]" /> Auto-playing
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = activeSlide === idx;
                  return (
                    <button
                      key={slide.product.name}
                      onClick={() => handleSelectSlide(idx)}
                      className={`relative overflow-hidden flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                        isActive
                          ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)] shadow-xs"
                          : "border-[var(--border-warm)] bg-[var(--surface)] hover:border-[var(--primary-green)]/60 text-[var(--ink-muted)]"
                      }`}
                      aria-label={`Switch to ${slide.product.name}`}
                    >
                      {/* Active Slide Progress Fill */}
                      {isActive && (
                        <div
                          className="absolute inset-0 bg-[var(--primary-green)]/15 pointer-events-none transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}

                      <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0 border border-black/10 z-10">
                        <Image
                          src={slide.product.images[0]}
                          alt={slide.product.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="24px"
                        />
                        {slide.mediaType === "video" && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="h-2 w-2 fill-white text-white translate-x-[0.5px]" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold z-10 ${
                          isActive
                            ? "text-[var(--primary-green-hover)] font-bold"
                            : "text-[var(--ink)]"
                        }`}
                      >
                        {slide.product.name}
                      </span>
                      {slide.mediaType === "video" && (
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-[var(--primary-green)] text-white z-10 shadow-2xs">
                          Video
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Proof Row */}
            <div className="pt-6 border-t border-[var(--border-warm)] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[var(--marigold)]">
                  <Star className="h-3.5 w-3.5 fill-[var(--marigold)]" />
                  <span className="font-extrabold text-sm text-[var(--ink)]">4.8 / 5</span>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">10,000+ Plant Parents</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[var(--primary-green)]">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="font-extrabold text-sm text-[var(--ink)]">Free Transit</span>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">On orders ₹999+</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[var(--terracotta)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="font-extrabold text-sm text-[var(--ink)]">7-Day Guarantee</span>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">100% Happy Arrival</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Arch Image with Floating Glass Chips & Slider Controls */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background Arch Aura with explicit min-height */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] min-h-[480px] sm:min-h-[540px] md:min-h-[580px]">
              {/* Backdrop Shadow Container */}
              <div className="absolute inset-0 arch-mask bg-gradient-to-b from-[#E6EEE1] via-[#F4EFE6] to-[#DDEBF3] shadow-2xl p-3 border border-white/60">
                <div className="relative h-full w-full arch-mask overflow-hidden bg-[var(--surface-muted)] group">
                  {currentSlide.mediaType === "video" && currentSlide.videoSrc ? (
                    <div className="relative h-full w-full">
                      <video
                        ref={videoRef}
                        poster={currentProduct.images[0]}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        onClick={toggleVideoPlayback}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      >
                        <source src={currentSlide.videoSrc} type="video/mp4" />
                        <source src="/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Subtle Ambient Vignette & Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />

                      {/* Video Top Controls Overlay */}
                      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
                        {/* Botanical Video Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-sm pointer-events-none">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-green)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary-green)]" />
                          </span>
                          <span className="tracking-wide">Botanical Video</span>
                        </div>

                        {/* Top-Right Action Controls (Play/Pause + Mute/Unmute) */}
                        <div className="flex items-center gap-1.5">
                          {/* Play/Pause Button */}
                          <button
                            type="button"
                            onClick={toggleVideoPlayback}
                            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                            title={isVideoPlaying ? "Pause video" : "Play video"}
                            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white border border-white/25 flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            {isVideoPlaying ? (
                              <Pause className="h-3.5 w-3.5 fill-white text-white" />
                            ) : (
                              <Play className="h-3.5 w-3.5 fill-white text-white translate-x-0.5" />
                            )}
                          </button>

                          {/* Sound Toggle Button (Muted by default) */}
                          <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                            title={isMuted ? "Audio muted by default (Click to unmute)" : "Audio playing (Click to mute)"}
                            className={`flex items-center gap-1.5 px-3 h-8 rounded-full backdrop-blur-md text-xs font-semibold border transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer ${
                              isMuted
                                ? "bg-black/50 hover:bg-black/75 text-white/90 border-white/25"
                                : "bg-[var(--primary-green)] text-white border-[var(--primary-green)] ring-2 ring-white/50"
                            }`}
                          >
                            {isMuted ? (
                              <>
                                <VolumeX className="h-3.5 w-3.5 text-white" />
                                <span className="text-[11px] font-medium tracking-wide">Muted</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-3.5 w-3.5 text-white animate-pulse" />
                                <span className="text-[11px] font-medium tracking-wide">Audio On</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Paused Overlay Center Watermark */}
                      {!isVideoPlaying && (
                        <div
                          onClick={toggleVideoPlayback}
                          className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] cursor-pointer transition-all"
                        >
                          <div className="h-16 w-16 rounded-full bg-white/90 text-[var(--forest)] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform">
                            <Play className="h-7 w-7 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Image
                        key={currentProduct.id}
                        src={currentProduct.images[0]}
                        alt={currentProduct.name}
                        fill
                        priority
                        unoptimized
                        className="object-cover transition-all duration-700 hover:scale-105 animate-in fade-in zoom-in-95"
                        sizes="(max-width: 768px) 100vw, 550px"
                      />
                      {/* Subtle Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </>
                  )}
                </div>
              </div>

              {/* Slider Previous Arrow Button */}
              <button
                onClick={handlePrevSlide}
                aria-label="Previous plant slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-warm)] shadow-md flex items-center justify-center text-[var(--ink)] hover:text-[var(--primary-green)] hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Slider Next Arrow Button */}
              <button
                onClick={handleNextSlide}
                aria-label="Next plant slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-warm)] shadow-md flex items-center justify-center text-[var(--ink)] hover:text-[var(--primary-green)] hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Floating Glassmorphism Info Chips */}
              {currentSlide.floatingChips.map((chip, idx) => {
                const IconComponent = chip.icon;
                const animClass = idx % 2 === 0 ? "animate-float-slow" : "animate-float-reverse";
                return (
                  <div
                    key={`${currentProduct.id}-${chip.label}`}
                    className={`absolute ${chip.position} ${animClass} glass-chip rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 z-20 max-w-[190px] pointer-events-none shadow-md animate-in fade-in duration-300`}
                  >
                    <div className="h-8 w-8 rounded-xl bg-[var(--primary-tint)] flex items-center justify-center text-[var(--primary-green)] shrink-0">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-[var(--ink)] block truncate">
                        {chip.label}
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)] block truncate">
                        {chip.sub}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Plant Specimen Badge with Thumbnail & Quick View */}
              <div className="absolute bottom-4 inset-x-6 sm:inset-x-8 z-20 glass-chip rounded-xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative h-9 w-9 rounded-lg overflow-hidden shrink-0 border border-black/10 bg-[var(--surface)]">
                    <Image
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--primary-green-hover)] block">
                      {currentSlide.mediaType === "video" ? "Featured Video Specimen" : "Featured Specimen"}
                    </span>
                    <h4 className="font-display font-semibold text-sm text-[var(--ink)] truncate">
                      {currentProduct.name}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => openQuickView(currentProduct)}
                  className="px-3.5 py-1.5 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold hover:bg-[var(--primary-green-hover)] transition-colors shrink-0 shadow-xs"
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
