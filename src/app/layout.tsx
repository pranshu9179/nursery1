import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { CartDrawer } from "@/components/product/cart-drawer";
import { WishlistDrawer } from "@/components/product/wishlist-drawer";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { LeafFallLoader } from "@/components/effects/leaf-fall-loader";
import { siteConfig } from "@/config/site.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "plant nursery",
    "indoor plants online",
    "self watering pots",
    "succulents",
    "air purifying plants",
    "ceramic planters",
    "organic plant seeds",
    "Bangalore nursery",
    "buy plants online India",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#123C36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--ink)] antialiased selection:bg-[var(--primary-tint)] selection:text-[var(--primary-green-hover)]">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--primary-green)] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global Layout Chromes */}
        <AnnouncementBar />
        <Header />

        {/* Ambient Falling Leaves Effect (Fixed at z-[35], behind header & overlays) */}
        <LeafFallLoader />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <BottomNav />

        {/* Global Modals & Drawers */}
        <MobileDrawer />
        <SearchModal />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
      </body>
    </html>
  );
}
