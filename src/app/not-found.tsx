import Link from "next/link";
import { Sprout, Compass, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="h-24 w-24 mx-auto rounded-full bg-[var(--primary-tint)] flex items-center justify-center text-[var(--primary-green)] shadow-inner">
          <Sprout className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta)]">
            404 — Lost In The Greenhouse
          </span>
          <h1 className="font-display font-extrabold text-3xl text-[var(--ink)]">
            This Plant Seems Unpotted
          </h1>
          <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
            The page you are looking for might have been pruned, relocated, or never took root in our garden.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className={buttonVariants({ variant: "primary" })}>
            <Sprout className="h-4 w-4 mr-2" />
            <span>Return Home</span>
          </Link>
          <Link href="/shop" className={buttonVariants({ variant: "outline" })}>
            <Compass className="h-4 w-4 mr-2" />
            <span>Browse Catalog</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
