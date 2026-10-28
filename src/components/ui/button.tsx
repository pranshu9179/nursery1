import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary-green)] text-white hover:bg-[var(--primary-green-hover)] shadow-sm hover:shadow-md focus-visible:ring-[var(--primary-green)]",
        secondary:
          "bg-[var(--surface-muted)] text-[var(--ink)] hover:bg-[#E4E0D6] border border-[var(--border-warm)] focus-visible:ring-[var(--ink)]",
        outline:
          "border border-[var(--border-warm)] bg-transparent text-[var(--ink)] hover:bg-[var(--surface)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] focus-visible:ring-[var(--primary-green)]",
        terracotta:
          "bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-hover)] shadow-sm hover:shadow-md focus-visible:ring-[var(--terracotta)]",
        forest:
          "bg-[var(--forest)] text-white hover:bg-[#0c2a26] shadow-sm hover:shadow-md focus-visible:ring-[var(--forest)]",
        ghost:
          "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-muted)] focus-visible:ring-[var(--ink)]",
        link:
          "text-[var(--primary-green)] underline-offset-4 hover:underline p-0 h-auto font-semibold",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-wide",
        default: "h-11 px-6 text-sm tracking-wide",
        lg: "h-13 px-8 text-base tracking-wide font-medium",
        icon: "h-10 w-10 p-0 shrink-0",
        "icon-sm": "h-8 w-8 p-0 shrink-0",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "pill",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, className }))}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
