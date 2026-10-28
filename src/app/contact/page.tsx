"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a 10-digit mobile number"),
  inquiryType: z.enum(["care", "order", "corporate", "visit"]),
  message: z.string().min(10, "Please describe how we can assist you"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "care",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const faqs = [
    {
      q: "How do living plants survive 3-4 days in courier transit?",
      a: "Our specimens are hydrated thoroughly and treated with an organic microbial root protectant prior to dispatch. They are secured inside patented 7-layer ventilated corrugated crates with root soil anchors. Even if the box is tilted, the soil cannot spill and leaves receive fresh oxygen.",
    },
    {
      q: "What is your 7-Day Replacement Guarantee?",
      a: "If any plant arrives damaged, wilted, or develops root shock within 7 days of delivery, simply send a photo to our WhatsApp support number. We will dispatch an immediate free replacement specimen with no questions asked.",
    },
    {
      q: "Can I visit your greenhouse in person?",
      a: "Absolutely! Our flagship nursery greenhouse in Sarjapur, Bengaluru is open daily from 9:00 AM to 7:00 PM. You can wander through our 25-acre polyhouse, meet our botanists, and choose your own plant specimens in person.",
    },
    {
      q: "Do plants arrive pre-potted in soil?",
      a: "Yes! Every single Botanica plant arrives pre-planted in our proprietary peat-free organic coco-coir potting blend inside a premium sub-irrigation self-watering planter. You don't need to buy separate soil or repot immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-green)]/10 text-[var(--primary-green-hover)] text-xs font-bold mb-3 border border-[var(--primary-green)]/20">
            <Mail className="h-3.5 w-3.5" />
            <span>Greenhouse Concierge</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            We’re Here to Help Your Urban Sanctuary Thrive
          </h1>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-3">
            Have a question about plant care, corporate gifting, or an existing delivery? Reach out directly to our nursery team.
          </p>
        </div>

        {/* WhatsApp SOS Emergency Card Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[var(--forest)] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg">
                <MessageCircle className="h-8 w-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--marigold)]">
                  Live Horticulturist Helpline
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl mt-0.5">
                  Plant Doctor WhatsApp SOS
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
                  Notice yellow leaves, drooping foliage, or signs of pests? Snap a quick photo and get personalized treatment advice within 2 hours.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=Hi%20Botanica%20Plant%20Doctor,%20I%20need%20care%20advice%20for%20my%20plant.`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shrink-0"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* 2-Column Section: Info + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] space-y-6 shadow-xs">
              <h2 className="font-display font-bold text-lg text-[var(--ink)]">
                Greenhouse Locations & Hours
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--primary-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)] font-bold">
                      Bengaluru Flagship Polyhouse
                    </strong>
                    <span className="text-[var(--ink-muted)]">
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[var(--terracotta)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)] font-bold">
                      Greenhouse Visiting Hours
                    </strong>
                    <span className="text-[var(--ink-muted)]">
                      Monday – Sunday: 9:00 AM – 7:00 PM (All 7 Days)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[var(--marigold)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)] font-bold">
                      Customer Support Line
                    </strong>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-[var(--ink-muted)] hover:text-[var(--primary-green)]"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)] font-bold">Email Inquiries</strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[var(--ink-muted)] hover:text-[var(--primary-green)]"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--sage-tint)] border border-[var(--primary-green)]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-green-hover)]">
                <Sparkles className="h-4 w-4" />
                <span>Bulk & Corporate Greenery</span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Planning customized desk plants for your team or festive client gifts? Email us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-bold underline text-[var(--ink)]"
                >
                  {siteConfig.contact.email}
                </a>{" "}
                for corporate tier pricing.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] shadow-xs">
              <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-[var(--ink-muted)] mb-6">
                Our support team responds to all inquiries within 4 business hours.
              </p>

              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-[var(--primary-green)]/10 border border-[var(--primary-green)] text-xs text-[var(--primary-green-hover)] font-bold flex items-center gap-2 mb-6 animate-in fade-in">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Message sent successfully! Our botanists will get in touch shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="e.g. Siddharth Rao"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--ink)]">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="9876543210"
                      className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[var(--terracotta)]">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="siddharth@example.com"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[var(--terracotta)]">{errors.email.message}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    What can we help you with? *
                  </label>
                  <select
                    {...register("inquiryType")}
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                  >
                    <option value="care">Plant Care & Diagnosis Help</option>
                    <option value="order">Order Tracking & Dispatch Query</option>
                    <option value="corporate">Corporate & Bulk Gifting</option>
                    <option value="visit">Schedule Greenhouse Tour Visit</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Tell us about your plant requirements, delivery questions, or specific species you are looking for..."
                    className="w-full p-3 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-muted)] text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)]"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-[var(--terracotta)]">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-11 text-xs font-bold rounded-full shadow-md flex items-center justify-center gap-2"
                  isLoading={isSubmitting}
                >
                  <Send className="h-4 w-4" /> Send Message to Greenhouse
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto pt-12 border-t border-[var(--border-warm)]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary-green)] mb-1">
              <HelpCircle className="h-4 w-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-warm)]"
              >
                <AccordionTrigger className="text-sm font-bold text-[var(--ink)] py-2">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--ink-muted)] leading-relaxed pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
