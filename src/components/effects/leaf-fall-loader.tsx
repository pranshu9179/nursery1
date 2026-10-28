"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { leavesConfig } from "@/config/leaves.config";
import { useEffectsStore } from "@/store/effects-store";

// The ONLY place next/dynamic with ssr: false is used for the effect
const DynamicLeafFall = dynamic(
  () => import("./leaf-fall").then((mod) => mod.LeafFall),
  {
    ssr: false,
    loading: () => null,
  }
);

export function LeafFallLoader() {
  const pathname = usePathname();
  const leavesEnabled = useEffectsStore((state) => state.leavesEnabled);
  const hasHydrated = useEffectsStore((state) => state.hasHydrated);

  const [isIdleReady, setIsIdleReady] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  // 1. Accessibility: Listen live to prefers-reduced-motion
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 2. Performance: Defer loading until after window "load" AND browser idle
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let timer: ReturnType<typeof setTimeout>;
    let idleId: number | null = null;

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = (window as Window & {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }).requestIdleCallback(() => setIsIdleReady(true), { timeout: 2000 });
      } else {
        timer = setTimeout(() => setIsIdleReady(true), 1500);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      const onLoad = () => {
        scheduleIdle();
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        window.removeEventListener("load", onLoad);
        if (timer) clearTimeout(timer);
        if (idleId && "cancelIdleCallback" in window) {
          (window as Window & {
            cancelIdleCallback: (id: number) => void;
          }).cancelIdleCallback(idleId);
        }
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (idleId && "cancelIdleCallback" in window) {
        (window as Window & {
          cancelIdleCallback: (id: number) => void;
        }).cancelIdleCallback(idleId);
      }
    };
  }, []);

  // 3. Low-hardware or Save-Data gating
  const isSaveData = React.useMemo(() => {
    if (typeof navigator === "undefined" || !leavesConfig.skipSaveData) return false;
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    return Boolean(conn?.saveData);
  }, []);

  const isLowHardware = React.useMemo(() => {
    if (typeof navigator === "undefined" || !leavesConfig.skipLowHardware) return false;
    return Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  }, []);

  // 4. Route exclusion gating (e.g. /cart, /checkout)
  const isExcludedRoute = React.useMemo(() => {
    if (!pathname) return false;
    return leavesConfig.disabledRoutes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  // Overall mounting decision
  const shouldMount =
    leavesConfig.enabled &&
    leavesEnabled &&
    hasHydrated &&
    isIdleReady &&
    !isExcludedRoute &&
    !isSaveData &&
    !isLowHardware &&
    !(leavesConfig.respectReducedMotion && reducedMotion);

  if (!shouldMount) {
    return null;
  }

  return <DynamicLeafFall />;
}

