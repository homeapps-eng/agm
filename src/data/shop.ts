export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  url: string;
}

export interface DonationTier {
  name: string;
  amount: number;
  description: string;
  perks: string[];
  featured?: boolean;
}

export const products: Product[] = [
  { id: 1, name: "Minassian Varsity Tee", description: "Cream tee with the MINASSIAN varsity arch on the front and the 40th anniversary seal on the back. Sizes XS–4XL.", price: 20, category: "Adult", image: "/shop/minassian-varsity-tee.jpg", url: "https://preview.chipply.com/product.html?pid=30918702&eid=640330" },
  { id: 2, name: "Minassian Varsity Youth Crewneck", description: "Navy crewneck sweatshirt with the MINASSIAN varsity arch on the front and the 40th anniversary seal on the back. Sizes YXS–YXL.", price: 50, category: "Youth", image: "/shop/minassian-varsity-youth-crewneck.jpg", url: "https://preview.chipply.com/product.html?pid=30920829&eid=640330" },
  { id: 3, name: "Minassian Varsity Crewneck", description: "Navy crewneck sweatshirt with the MINASSIAN varsity arch on the front and the 40th anniversary seal on the back. Sizes XS–5XL.", price: 60, category: "Adult", image: "/shop/minassian-varsity-crewneck.jpg", url: "https://preview.chipply.com/product.html?pid=30920802&eid=640330" },
  { id: 4, name: "Armenian Alphabet Youth Tee", description: "Navy tee with an Armenian alphabet design on the front and the 40th anniversary seal on the back. Sizes YXS–YXL.", price: 20, category: "Youth", image: "/shop/armenian-alphabet-youth-tee.jpg", url: "https://preview.chipply.com/product.html?pid=30920658&eid=640330" },
  { id: 5, name: "Armenian Alphabet Tee", description: "Navy tee with an Armenian alphabet design on the front and the 40th anniversary seal on the back. Sizes XS–4XL.", price: 20, category: "Adult", image: "/shop/armenian-alphabet-tee.jpg", url: "https://preview.chipply.com/product.html?pid=30918728&eid=640330" },
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
