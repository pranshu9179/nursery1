export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--primary-tint)] animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-[var(--primary-green)] border-t-transparent animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-display font-semibold text-lg text-[var(--ink)]">
          Nurturing Greenery...
        </p>
        <p className="text-xs text-[var(--ink-muted)]">
          Loading freshly curated specimens & care guidance
        </p>
      </div>
    </div>
  );
}
