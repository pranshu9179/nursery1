"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  PackageCheck,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/formatters";
import { siteConfig } from "@/config/site.config";
import { Button, buttonVariants } from "@/components/ui/button";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  address: z.string().min(8, "Please enter complete street and apartment address"),
  landmark: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  shippingMethod: z.enum(["standard", "express"]),
  paymentMethod: z.enum(["upi", "card", "netbanking", "cod"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getSummary, clearCart, coupon } = useCartStore();
  const summary = getSummary();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = React.useState("");
  const [customerInfo, setCustomerInfo] = React.useState<CheckoutFormValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: "standard",
      paymentMethod: "upi",
      state: "Karnataka",
    },
  });

  const selectedShipping = watch("shippingMethod");
  const selectedPayment = watch("paymentMethod");

  // Additional shipping charge if express selected
  const shippingCharge =
    selectedShipping === "express"
      ? 149
      : summary.shipping;

  const finalTotal = summary.subtotal - summary.discount + shippingCharge;

  const onSubmit = (data: CheckoutFormValues) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `BOT-IND-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(orderId);
      setCustomerInfo(data);
      setIsSubmitting(false);
      setOrderComplete(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2E9E4F", "#F2B632", "#A8322D", "#123C36"],
        });
      } catch {
        // Fallback gracefully if canvas context unavailable
      }

      clearCart();
    }, 1500);
  };

  // ORDER SUCCESS SCREEN
  if (orderComplete && customerInfo) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-[var(--surface)] border border-[var(--border-warm)] rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="h-20 w-20 rounded-full bg-[var(--primary-green)]/15 text-[var(--primary-green)] mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary-green)]">
              Order Confirmed & Greenhouse Preparing
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mt-1">
              Thank You, {customerInfo.fullName}!
            </h1>
            <p className="text-sm text-[var(--ink-muted)] mt-1">
              Your botanical order <strong className="text-[var(--ink)]">#{confirmedOrderId}</strong> has been received.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-warm)] text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--border-warm)]">
              <span className="text-[var(--ink-muted)]">Estimated Delivery</span>
              <span className="font-bold text-[var(--primary-green-hover)]">
                {selectedShipping === "express" ? "Tomorrow by 6:00 PM (Express)" : "3 - 4 Business Days"}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[var(--border-warm)]">
              <span className="text-[var(--ink-muted)]">Payment Mode</span>
              <span className="font-semibold text-[var(--ink)] uppercase">{customerInfo.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-[var(--ink-muted)] shrink-0 mr-4">Deliver To</span>
              <span className="font-medium text-[var(--ink)] text-right">
                {customerInfo.address}, {customerInfo.city}, {customerInfo.state} - {customerInfo.pincode}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--sage-tint)] border border-[var(--border-warm)] flex items-center justify-between text-xs text-left">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-[var(--ink)]">Track live updates on WhatsApp</p>
                <p className="text-[11px] text-[var(--ink-muted)]">We sent dispatch tracking details to {customerInfo.phone}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className={buttonVariants({ variant: "primary", size: "lg", className: "rounded-full px-8 shadow-md" })}
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8" })}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART GUARD
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-[70vh] bg-[var(--background)] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="font-display font-bold text-2xl text-[var(--ink)] mb-2">
          Your cart is empty
        </h1>
        <p className="text-sm text-[var(--ink-muted)] mb-6">
          Add plants to your cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className={buttonVariants({ variant: "primary", size: "default", className: "rounded-full px-6" })}
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)] mb-6">
          <Link href="/cart" className="hover:text-[var(--primary-green)] transition-colors">
            Cart
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-[var(--ink)]">Checkout</span>
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-8">
          Express Botanical Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer Contact & Shipping */}
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-warm)]">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="font-display font-bold text-base text-[var(--ink)]">
                      Shipping & Delivery Address
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)]">
                    <Lock className="h-3 w-3 text-[var(--primary-green)]" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Mobile Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      Phone Number (WhatsApp Updates) *
                    </label>
                    <div className="flex">
                      <span className="h-10 px-3 rounded-l-xl border border-r-0 border-[var(--border-warm)] bg-[var(--surface-muted)]/70 text-xs text-[var(--ink-muted)] flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="9876543210"
                        className="flex-1 h-10 px-3 rounded-r-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="radhika@example.com"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      House / Flat No., Apartment, Street *
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      placeholder="e.g. Flat 402, Green Glen Layout, Bellandur"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.address.message}</p>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      {...register("pincode")}
                      placeholder="560103"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.pincode.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      {...register("city")}
                      placeholder="Bengaluru"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.city.message}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      State *
                    </label>
                    <select
                      {...register("state")}
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Other">Other States & UTs</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Method */}
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-warm)]">
                  <span className="h-6 w-6 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-display font-bold text-base text-[var(--ink)]">
                    Transit Packaging & Speed
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedShipping === "standard"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <input
                      type="radio"
                      value="standard"
                      {...register("shippingMethod")}
                      className="mt-1 accent-[var(--primary-green)]"
                    />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Standard Ventilated Transit
                        </span>
                        <span className="text-xs font-bold text-[var(--primary-green)]">
                          {summary.shipping === 0 ? "FREE" : formatCurrency(summary.shipping)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                        Delivered in 3-4 days in safe air-flow corrugated crates.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedShipping === "express"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <input
                      type="radio"
                      value="express"
                      {...register("shippingMethod")}
                      className="mt-1 accent-[var(--primary-green)]"
                    />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Greenhouse Priority Express
                        </span>
                        <span className="text-xs font-bold text-[var(--ink)]">
                          ₹149
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                        Priority next-day dispatch with live courier GPS link.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-warm)]">
                  <span className="h-6 w-6 rounded-full bg-[var(--primary-green)] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-display font-bold text-base text-[var(--ink)]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === "upi"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="upi"
                        {...register("paymentMethod")}
                        className="accent-[var(--primary-green)]"
                      />
                      <Smartphone className="h-5 w-5 text-[var(--primary-green)]" />
                      <div>
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Instant UPI (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <p className="text-[10px] text-[var(--primary-green-hover)] font-semibold">
                          Recommended • Instant confirmation & zero surcharge
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === "card"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="card"
                        {...register("paymentMethod")}
                        className="accent-[var(--primary-green)]"
                      />
                      <CreditCard className="h-5 w-5 text-[var(--ink-muted)]" />
                      <div>
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Credit / Debit Cards
                        </span>
                        <p className="text-[10px] text-[var(--ink-muted)]">
                          Visa, MasterCard, RuPay, Amex
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Netbanking */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === "netbanking"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="netbanking"
                        {...register("paymentMethod")}
                        className="accent-[var(--primary-green)]"
                      />
                      <Building2 className="h-5 w-5 text-[var(--ink-muted)]" />
                      <div>
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Net Banking
                        </span>
                        <p className="text-[10px] text-[var(--ink-muted)]">
                          All major Indian banks supported
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === "cod"
                        ? "border-[var(--primary-green)] bg-[var(--primary-green)]/10 ring-1 ring-[var(--primary-green)]"
                        : "border-[var(--border-warm)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="cod"
                        {...register("paymentMethod")}
                        className="accent-[var(--primary-green)]"
                      />
                      <Banknote className="h-5 w-5 text-[var(--ink-muted)]" />
                      <div>
                        <span className="font-bold text-xs text-[var(--ink)]">
                          Cash on Delivery (COD)
                        </span>
                        <p className="text-[10px] text-[var(--ink-muted)]">
                          Pay cash or scan QR when courier arrives
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs space-y-4 sticky top-28">
                <h3 className="font-display font-bold text-base text-[var(--ink)]">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </h3>

                {/* Items preview list */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[var(--border-warm)]/60">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-warm)] shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder-plant.jpg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[var(--ink)] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-[var(--ink-muted)]">
                          {item.selectedSize.name} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[var(--ink)]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing summary breakdown */}
                <div className="space-y-2 pt-3 border-t border-[var(--border-warm)] text-xs text-[var(--ink-muted)]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[var(--ink)]">{formatCurrency(summary.subtotal)}</span>
                  </div>

                  {summary.discount > 0 && (
                    <div className="flex justify-between text-[var(--primary-green)] font-semibold">
                      <span>Coupon Discount ({coupon?.code})</span>
                      <span>-{formatCurrency(summary.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>
                      {shippingCharge === 0 ? (
                        <strong className="text-[var(--primary-green)] font-bold">FREE</strong>
                      ) : (
                        formatCurrency(shippingCharge)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (All India)</span>
                    <span className="font-medium text-[var(--ink)]">Included in Price</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[var(--border-warm)] text-base font-extrabold text-[var(--ink)]">
                    <span>Total Amount</span>
                    <span className="text-xl text-[var(--primary-green)]">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-12 text-sm font-bold rounded-full shadow-lg transition-transform active:scale-98"
                  isLoading={isSubmitting}
                >
                  Place Botanical Order • {formatCurrency(finalTotal)}
                </Button>

                {/* Trust guarantees */}
                <div className="space-y-2 pt-2 text-[11px] text-[var(--ink-muted)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                    <span>7-Day Plant Replacement & Healthy Arrival Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[var(--primary-green)] shrink-0" />
                    <span>Sterilised soil & moisture retention root pack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
