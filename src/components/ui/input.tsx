import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[var(--border-warm)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-green)] focus-visible:border-[var(--primary-green)] disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[var(--terracotta)] focus-visible:ring-[var(--terracotta)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
