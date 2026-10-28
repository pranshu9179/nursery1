export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
  plantPurchased: string;
  plantImage: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Meera Krishnan",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    quote:
      "I was skeptical about ordering a large Monstera online, but the safe transit packaging is phenomenal! Not a single leaf was bruised or bent. Two months in, and it's already sprouted three huge new leaves.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    plantPurchased: "Monstera Deliciosa (Large)",
    plantImage: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80",
    verified: true,
  },
  {
    id: "test-2",
    name: "Vikram Malhotra",
    location: "Bandra West, Mumbai",
    rating: 5,
    quote:
      "The self-watering planter is an absolute game changer for someone who travels constantly for work. I left for a 12-day conference, and came home to a thriving Fiddle Leaf Fig without dry soil or yellowing leaves.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    plantPurchased: "Self-Watering Planter & Ficus",
    plantImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
    verified: true,
  },
  {
    id: "test-3",
    name: "Pooja Hegde",
    location: "Vasant Vihar, New Delhi",
    rating: 5,
    quote:
      "The plant doctor WhatsApp support answered my repotting questions within 15 minutes! The soil mix is fresh, rich with earthworm castings, and my Calathea is putting out non-stop foliage.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    plantPurchased: "Calathea Orbifolia (Pet-Safe)",
    plantImage: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=400&q=80",
    verified: true,
  },
  {
    id: "test-4",
    name: "Aditya Roy",
    location: "Jubilee Hills, Hyderabad",
    rating: 5,
    quote:
      "Ordered 25 customized succulent gift boxes for our corporate anniversary event. Every client was blown away by the quality of the ceramic pots and personalized notes. Truly premium experience.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    plantPurchased: "Succulent Gift Box Collection",
    plantImage: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80",
    verified: true,
  },
];

export const pressLogos = [
  { name: "Architectural Digest", label: "ARCHITECTURAL DIGEST" },
  { name: "Elle Decor", label: "ELLE DECOR" },
  { name: "Vogue Living", label: "VOGUE LIVING" },
  { name: "The Hindu Lifestyle", label: "THE HINDU" },
  { name: "Mint Lounge", label: "MINT LOUNGE" },
];
