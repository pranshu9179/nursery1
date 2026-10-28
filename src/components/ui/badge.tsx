import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--border-warm)]",
        terracotta: "bg-[var(--terracotta-tint)] text-[var(--terracotta)] border border-[#EDC5BD]",
        primary: "bg-[var(--primary-tint)] text-[var(--primary-green-hover)] border border-[#C5E5CC]",
        marigold: "bg-[var(--marigold-tint)] text-[#8C5D06] border border-[#FDE59F]",
        sky: "bg-[var(--sky-tint)] text-[#1C5D85] border border-[#C6DFED]",
        sage: "bg-[var(--sage-tint)] text-[#2F613B] border border-[#CDDEC4]",
        forest: "bg-[var(--forest)] text-white",
        outline: "border border-[var(--border-warm)] text-[var(--ink-muted)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
