export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

export interface DonationTier {
  name: string;
  amount: number;
  description: string;
  perks: string[];
  featured?: boolean;
}

export const products: Product[] = [
  { id: 1, name: "40th Anniversary Hoodie", description: "Premium cotton hoodie with embroidered anniversary crest.", price: 65, category: "Apparel", image: "/shop/hoodie.jpg", badge: "Bestseller" },
  { id: 2, name: "Commemorative Book", description: "A 300-page hardcover documenting AGM's 40-year journey.", price: 45, category: "Books", image: "/shop/book.jpg", badge: "New" },
  { id: 3, name: "Anniversary Pin Set", description: "Enamel pin set featuring the anniversary logo and crest.", price: 20, category: "Accessories", image: "/shop/pins.jpg" },
  { id: 4, name: "Campus Art Print", description: "Limited edition watercolor print of the original campus.", price: 35, category: "Art", image: "/shop/print.jpg", badge: "Limited" },
  { id: 5, name: "Alumni T-Shirt", description: "Soft tri-blend tee with vintage AGM logo.", price: 30, category: "Apparel", image: "/shop/tshirt.jpg" },
  { id: 6, name: "Coffee Mug", description: "Ceramic mug with gold-foil anniversary seal.", price: 18, category: "Accessories", image: "/shop/mug.jpg" },
];

export const donationTiers: DonationTier[] = [
  {
    name: "Mesrob Mashtots",
    amount: 250000,
    description: "Honoree of the Night with exclusive top-tier naming opportunity.",
    featured: true,
    perks: [
      "2-night stay at Pelican Hill for Gala Weekend",
      "2 tables (20 tickets)",
      "VIP seating at gala",
      "VIP sponsor recognition invitation",
      "Highest-tier donor tree recognition",
      "Dedicated social media recognition",
      "Full-page gala program advertisement",
    ],
  },
  {
    name: "Sayat Nova",
    amount: 100000,
    description: "Major naming opportunity.",
    featured: true,
    perks: [
      "2-night stay at Pelican Hill for Gala Weekend",
      "1 table (10 tickets)",
      "VIP seating at gala",
      "VIP sponsor recognition invitation",
      "Prominent donor tree recognition",
      "Social media recognition",
      "Full-page gala program advertisement",
    ],
  },
  {
    name: "Hovhannes Tumanyan",
    amount: 50000,
    description: "Premier sponsorship with full VIP experience.",
    perks: [
      "1 table (10 tickets)",
      "VIP seating at gala",
      "VIP sponsor recognition invitation",
      "Donor tree recognition",
      "Social media recognition",
      "Full-page gala program advertisement",
    ],
  },
  {
    name: "Zabel Yessayan",
    amount: 25000,
    description: "VIP sponsorship with table and recognition.",
    perks: [
      "1 table (10 tickets)",
      "VIP seating at gala",
      "VIP sponsor recognition invitation",
      "Donor tree recognition",
      "Social media recognition",
      "Half-page gala program advertisement",
    ],
  },
  {
    name: "Yeghishe Charents",
    amount: 10000,
    description: "Gala tickets with prominent recognition.",
    perks: [
      "4 gala tickets",
      "Donor tree recognition",
      "Social media recognition",
      "Half-page gala program advertisement",
    ],
  },
  {
    name: "William Saroyan",
    amount: 5000,
    description: "Gala attendance with donor recognition.",
    perks: [
      "2 gala tickets",
      "Donor tree recognition",
      "Social media recognition",
      "Quarter-page gala program advertisement",
    ],
  },
  {
    name: "Charles Aznavour",
    amount: 2500,
    description: "Gala attendance with program listing.",
    perks: [
      "1 gala ticket",
      "Donor tree recognition",
      "Social media recognition",
      "Name listed in gala program",
    ],
  },
  {
    name: "Movses Khorenatsi",
    amount: 1500,
    description: "Teacher appreciation sponsorship.",
    perks: [
      "1 gala ticket gifted to a teacher to attend and enjoy the evening",
      "Social media recognition",
      "Name listed in gala program",
    ],
  },
];
