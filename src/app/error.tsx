"use client";

import * as React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Botanica Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border-warm)] shadow-lg">
        <div className="h-16 w-16 mx-auto rounded-full bg-[var(--terracotta-tint)] flex items-center justify-center text-[var(--terracotta)]">
          <AlertCircle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl text-[var(--ink)]">
            Something Needs Pruning
          </h2>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            We ran into an unexpected garden snag. Don&apos;t worry, your cart and preferences remain safe.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="sm" onClick={() => reset()} className="flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")} className="flex items-center gap-1.5">
            <Home className="h-4 w-4" />
            <span>Back Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
