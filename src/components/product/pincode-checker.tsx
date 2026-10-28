"use client";

import * as React from "react";
import { Truck, Check, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function PincodeChecker() {
  const [pincode, setPincode] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "checking" | "serviceable" | "error">("idle");
  const [city, setCity] = React.useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setStatus("error");
      return;
    }

    setStatus("checking");
    setTimeout(() => {
      setStatus("serviceable");
      const prefix = pincode.slice(0, 2);
      if (prefix === "56") setCity("Bengaluru & Karnataka (Next-Day Delivery)");
      else if (prefix === "40") setCity("Mumbai & Maharashtra (2-3 Days)");
      else if (prefix === "11") setCity("Delhi NCR (2-3 Days)");
      else if (prefix === "60") setCity("Chennai & Tamil Nadu (2-3 Days)");
      else if (prefix === "50") setCity("Hyderabad & Telangana (2-3 Days)");
      else setCity("All India Express Transit (3-4 Days)");
    }, 400);
  };

  return (
    <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-warm)] space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
        <Truck className="h-4 w-4 text-[var(--primary-green)]" />
        <span>Check Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setStatus("idle");
            }}
            placeholder="Enter 6-digit PIN code (e.g. 560038)"
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface)] text-xs text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
          />
        </div>
        <button
          type="submit"
          className="h-9 px-4 rounded-xl bg-[var(--ink)] text-white text-xs font-semibold hover:bg-[var(--primary-green)] transition-colors shrink-0"
        >
          Check
        </button>
      </form>

      {status === "checking" && (
        <p className="text-[11px] text-[var(--ink-muted)] animate-pulse">Checking courier routes...</p>
      )}

      {status === "error" && (
        <p className="text-[11px] text-[var(--terracotta)] font-medium">
          Please enter a valid 6-digit Indian PIN code.
        </p>
      )}

      {status === "serviceable" && (
        <div className="space-y-1.5 pt-1 text-xs text-[var(--ink-muted)] border-t border-[var(--border-warm)] animate-in fade-in">
          <div className="flex items-center gap-1.5 text-[var(--primary-green-hover)] font-bold">
            <Check className="h-3.5 w-3.5" />
            <span>Serviceable: {city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Clock className="h-3 w-3 text-[var(--ink-muted)]" />
            <span>Ventilated crate dispatch in 24 hours. Cash On Delivery (COD) available.</span>
          </div>
        </div>
      )}
    </div>
  );
}
