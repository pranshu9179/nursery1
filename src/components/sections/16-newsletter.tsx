"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { Mail, Check, Sprout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address (e.g. name@domain.com)"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate brief network dispatch
    await new Promise((r) => setTimeout(r, 600));
    setIsSuccess(true);
    reset();

    // Trigger botanical confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#2E9E4F", "#F2B632", "#A8322D", "#123C36", "#E4F2E7"],
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] p-8 sm:p-12 shadow-sm text-center space-y-6 relative overflow-hidden">
          {/* Subtle Decorative Arch Accents */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[var(--primary-tint)]/40 -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-[var(--marigold-tint)]/40 -z-0 pointer-events-none" />

          {/* Plant Icon & Eyebrow */}
          <div className="relative z-10 space-y-3">
            <div className="h-14 w-14 mx-auto rounded-full bg-[var(--primary-tint)] text-[var(--primary-green)] flex items-center justify-center shadow-xs">
              <Sprout className="h-7 w-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Join 50,000+ Urban Gardeners</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)] leading-tight max-w-lg mx-auto">
              Subscribe to Newsletter & <br />
              Get 10% Off Your First Plant
            </h2>

            <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
              Weekly seasonal care tips, invitations to propagation workshops, and secret holiday discount codes delivered directly to your inbox.
            </p>
          </div>

          {/* Form / Success State */}
          <div className="relative z-10 max-w-md mx-auto">
            {isSuccess ? (
              <div className="p-4 rounded-2xl bg-[var(--primary-tint)] border border-[#C5E5CC] space-y-2 animate-in zoom-in">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--primary-green-hover)]">
                  <Check className="h-5 w-5" />
                  <span>Welcome to the Botanica Family!</span>
                </div>
                <p className="text-xs text-[var(--ink-muted)]">
                  Use coupon code <strong className="text-[var(--ink)]">BLOOM10</strong> at checkout for 10% off. We also emailed your welcome guide!
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-[11px] text-[var(--primary-green-hover)] font-bold underline mt-1"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[var(--ink-muted)]" />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address..."
                      className={`h-11 w-full rounded-full border bg-[var(--surface-muted)] pl-11 pr-4 text-xs text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] ${
                        errors.email ? "border-[var(--terracotta)]" : "border-[var(--border-warm)]"
                      }`}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="default"
                    isLoading={isSubmitting}
                    className="font-bold text-xs h-11 px-7 rounded-full shadow-sm hover:shadow-md shrink-0"
                  >
                    Subscribe
                  </Button>
                </div>

                {errors.email && (
                  <p className="text-left text-[11px] text-[var(--terracotta)] pl-4">
                    {errors.email.message}
                  </p>
                )}

                <p className="text-[10px] text-[var(--ink-muted)]/70 pt-1">
                  We respect your privacy. No spam ever, unsubscribe in 1 click anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
