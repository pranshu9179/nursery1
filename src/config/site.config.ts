export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  currency: {
    symbol: string;
    code: string;
    locale: string;
  };
  shipping: {
    freeDeliveryThreshold: number;
    standardDeliveryFee: number;
    estimatedDeliveryDays: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
    workingHours: string;
  };
  trustFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  announcements: {
    id: string;
    text: string;
    link?: string;
    highlight?: string;
  }[];
  navigation: {
    label: string;
    href: string;
    badge?: string;
    featuredImage?: string;
    sections?: {
      title: string;
      items: {
        label: string;
        href: string;
        description?: string;
        badge?: string;
      }[];
    }[];
  }[];
  socials: {
    name: string;
    href: string;
    handle: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Shubham Nursery",
  tagline: "Bring nature home.",
  description:
    "Curated indoor & outdoor plants, self-watering architectural planters, organic fertilizers, and expert plant-care guidance. Delivered safely to your doorstep across India.",
  url: "https://shubham-nursery.vercel.app",
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },
  shipping: {
    freeDeliveryThreshold: 999,
    standardDeliveryFee: 99,
    estimatedDeliveryDays: "2-4 Business Days",
  },
  contact: {
    phone: "+91 80 4567 8900",
    email: "care@botanica.co",
    whatsapp: "+91 98765 43210",
    address: "Botanica Nursery, 42 Greenview Avenue, Indiranagar, Bengaluru, KA 560038",
    workingHours: "Mon - Sun: 9:00 AM - 8:00 PM IST",
  },
  announcements: [
    {
      id: "free-shipping",
      text: "Festive Bloom Sale: Enjoy Free Express Delivery on orders above ₹999",
      highlight: "Free Express Delivery",
      link: "/shop",
    },
    {
      id: "replacement",
      text: "7-Day Healthy Plant Guarantee — replacement or full refund if your plant arrives unhappy",
      highlight: "7-Day Guarantee",
      link: "/about",
    },
    {
      id: "cod-upi",
      text: "Secure UPI, Netbanking & Cash on Delivery (COD) available pan-India",
      highlight: "COD Available",
      link: "/shop",
    },
  ],
  trustFeatures: [
    {
      title: "Self-Watering Ease",
      description: "Sub-irrigation reservoirs keep root systems hydrated for up to 14 days without fuss.",
      icon: "Droplets",
    },
    {
      title: "Healthy Plant Guarantee",
      description: "Every plant is hand-selected, soil-sterilized, and inspected before safe transit.",
      icon: "ShieldCheck",
    },
    {
      title: "UV-Resistant Pots",
      description: "Recycled premium polymers that never fade, crack, or peel in Indian weather.",
      icon: "Sun",
    },
    {
      title: "100% Pet-Safe Options",
      description: "Clearly marked non-toxic varieties safe for curious cats and playful dogs.",
      icon: "HeartHandshake",
    },
  ],
  navigation: [
    {
      label: "Plants",
      href: "/shop?category=plants",
      featuredImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
      sections: [
        {
          title: "By Environment",
          items: [
            { label: "Indoor Foliage", href: "/shop?category=indoor", description: "Lush greens for bedrooms and desks" },
            { label: "Outdoor Sun-Lovers", href: "/shop?category=outdoor", description: "Hardy plants for balconies and patios" },
            { label: "Low-Light Champions", href: "/shop?category=low-light", description: "Thrive in indirect or fluorescent light" },
            { label: "Air Purifying", href: "/shop?category=air-purifying", description: "NASA-tested toxins filtering greenery", badge: "Popular" },
          ],
        },
        {
          title: "By Type & Care",
          items: [
            { label: "Succulents & Cacti", href: "/shop?category=succulents", description: "Drought-tolerant architectural beauties" },
            { label: "Flowering Beauties", href: "/shop?category=flowering", description: "Seasonal blooms & fragrance" },
            { label: "Pet-Friendly Plants", href: "/shop?category=pet-friendly", description: "100% non-toxic for cats & dogs", badge: "Safe" },
            { label: "Bonsai & Ficus", href: "/shop?category=bonsai", description: "Living meditative sculpture art" },
          ],
        },
      ],
    },
    {
      label: "Pots & Planters",
      href: "/shop?category=pots",
      featuredImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      sections: [
        {
          title: "By Material",
          items: [
            { label: "Self-Watering Smart Pots", href: "/shop?category=self-watering", description: "Never overwater or underwater again", badge: "Smart" },
            { label: "Handcrafted Ceramics", href: "/shop?category=ceramic-pots", description: "Artisan glazed minimalist planters" },
            { label: "Terracotta Classics", href: "/shop?category=terracotta", description: "Porous natural clay for root breathability" },
            { label: "Metal & Brass Stands", href: "/shop?category=stands", description: "Mid-century modern elevated stands" },
          ],
        },
      ],
    },
    {
      label: "Seeds & Care",
      href: "/shop?category=seeds-care",
      featuredImage: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80",
      sections: [
        {
          title: "Seeds & Microgreens",
          items: [
            { label: "Organic Herb Seeds", href: "/shop?category=herb-seeds", description: "Basil, mint, oregano & coriander" },
            { label: "Exotic Bloom Seeds", href: "/shop?category=flower-seeds", description: "Wildflower, marigold & petunias" },
            { label: "Seed Starter Kits", href: "/shop?category=seed-kits", description: "Complete soil pods & germination tray", badge: "Bundle" },
          ],
        },
        {
          title: "Soil & Nourishment",
          items: [
            { label: "Nutrient-Rich Potting Mix", href: "/shop?category=potting-mix", description: "Perlite, cocopeat & vermicompost" },
            { label: "Organic Bio-Fertilizers", href: "/shop?category=fertilizers", description: "Slow-release seaweed & bone meal" },
            { label: "Organic Pest Defense", href: "/shop?category=pest-care", description: "Cold-pressed pure neem oil spray" },
          ],
        },
      ],
    },
    {
      label: "Gift Boxes",
      href: "/shop?category=gifting",
      badge: "Gifts",
    },
    {
      label: "Care Guides",
      href: "/blog",
    },
    {
      label: "About Us",
      href: "/about",
    },
  ],
  socials: [
    { name: "Instagram", href: "https://instagram.com", handle: "@botanica.nursery" },
    { name: "Facebook", href: "https://facebook.com", handle: "BotanicaNursery" },
    { name: "Pinterest", href: "https://pinterest.com", handle: "botanicaplants" },
    { name: "YouTube", href: "https://youtube.com", handle: "BotanicaPlantCare" },
  ],
};
