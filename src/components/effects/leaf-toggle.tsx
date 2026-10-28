"use client";

import * as React from "react";
import { Leaf } from "lucide-react";
import { useEffectsStore } from "@/store/effects-store";

interface LeafToggleProps {
  variant?: "footer" | "drawer" | "standalone";
  className?: string;
}

export function LeafToggle({ variant = "footer", className = "" }: LeafToggleProps) {
  const leavesEnabled = useEffectsStore((state) => state.leavesEnabled);
  const toggleLeaves = useEffectsStore((state) => state.toggleLeaves);
  const hasHydrated = useEffectsStore((state) => state.hasHydrated);

  // Avoid hydration mismatch while reading localStorage state
  const isEnabled = hasHydrated ? leavesEnabled : true;

  if (variant === "drawer") {
    return (
      <button
        type="button"
        onClick={toggleLeaves}
        aria-pressed={isEnabled}
        aria-label={`Falling leaves animation: ${isEnabled ? "enabled" : "disabled"}. Click to toggle.`}
        title={`Falling leaves: ${isEnabled ? "On" : "Off"}`}
        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
          isEnabled
            ? "bg-[var(--primary-tint)] border-[#C5E5CC] text-[var(--primary-green-hover)]"
            : "bg-[var(--surface-muted)] border-[var(--border-warm)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <Leaf
            className={`h-4 w-4 transition-transform duration-300 ${
              isEnabled ? "text-[var(--primary-green)] rotate-12 scale-110" : "text-[var(--ink-muted)] -rotate-12"
            }`}
          />
          <span>Falling Leaves Effect</span>
        </div>
        <span
          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
            isEnabled
              ? "bg-[var(--primary-green)] text-white shadow-2xs"
              : "bg-[var(--border-warm)] text-[var(--ink-muted)]"
          }`}
        >
          {isEnabled ? "On" : "Off"}
        </span>
      </button>
    );
  }

  // Footer & Standalone Variant
  return (
    <button
      type="button"
      onClick={toggleLeaves}
      aria-pressed={isEnabled}
      aria-label={`Falling leaves animation: ${isEnabled ? "enabled" : "disabled"}. Click to toggle.`}
      title={`Falling leaves: ${isEnabled ? "On" : "Off"}`}
      className={`min-h-[44px] inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-medium cursor-pointer ${
        isEnabled
          ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
          : "bg-white/5 hover:bg-white/10 text-white/60 border-white/10"
      } ${className}`}
    >
      <Leaf
        className={`h-3.5 w-3.5 transition-transform duration-300 ${
          isEnabled
            ? "text-[var(--primary-green)] rotate-12 scale-110"
            : "text-white/40 -rotate-12"
        }`}
      />
      <span className="hidden sm:inline">Falling Leaves:</span>
      <span
        className={`text-[11px] font-bold ${
          isEnabled ? "text-[var(--primary-green)]" : "text-white/50"
        }`}
      >
        {isEnabled ? "On" : "Off"}
      </span>
    </button>
  );
}

