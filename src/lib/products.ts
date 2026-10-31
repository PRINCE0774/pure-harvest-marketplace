import gheeImage from "@/assets/product-ghee.jpg";
import makhanaImage from "@/assets/product-makhana.jpg";

/**
 * Demo catalogue for the Pure Harvest practice store.
 * Prices are in Indian Rupees (INR) and match the brief.
 */
export interface Product {
  /** Stable id used for cart storage and Meta Pixel content_ids */
  id: string;
  /** URL-friendly id used in /product/<slug> links */
  slug: string;
  name: string;
  weight: string;
  /** Price in whole rupees */
  price: number;
  image: string;
  short: string;
  description: string;
  benefits: string[];
}

export const products: Product[] = [
  {
    id: "ghee-500",
    slug: "pure-desi-ghee-500g",
    name: "Pure Desi Ghee",
    weight: "500 g",
    price: 399,
    image: gheeImage,
    short: "Slow-churned bilona ghee with a golden, grainy texture and nutty aroma.",
    description:
      "Our signature Desi Ghee is made the traditional bilona way: curd from grass-fed cow milk is hand-churned and simmered slowly until every drop turns golden. It carries a rich, nutty aroma, a grainy spoonable texture and none of the impurities of industrial ghee. No preservatives, no artificial colours.",
    benefits: [
      "Traditional bilona churned method",
      "100% natural, no preservatives",
      "High smoke point — perfect for everyday cooking",
      "Glass jar packaging, nothing to leach",
    ],
  },
  {
    id: "ghee-1kg",
    slug: "pure-desi-ghee-1kg",
    name: "Pure Desi Ghee",
    weight: "1 kg",
    price: 749,
    image: gheeImage,
    short: "Our family-size jar — a full kilo of slow-churned golden goodness.",
    description:
      "The family-size jar of our bilona Desi Ghee. Same slow-churned, small-batch recipe, packed in a generous one-kilo glass jar for households that cook with ghee every day. Better value per gram, same golden standard.",
    benefits: [
      "Traditional bilona churned method",
      "Family size — better value per gram",
      "100% natural, no preservatives",
      "Reusable glass jar",
    ],
  },
  {
    id: "makhana-250",
    slug: "roasted-makhana-250g",
    name: "Roasted Makhana",
    weight: "250 g",
    price: 199,
    image: makhanaImage,
    short: "Crunchy roasted fox nuts, lightly salted — the perfect guilt-free snack.",
    description:
      "Hand-picked Bihar makhana, slow-roasted in small batches and finished with a whisper of rock salt. Light, crisp and naturally plant-based protein — the snack you can finish the whole pouch of without a second thought.",
    benefits: [
      "Slow-roasted, never fried",
      "Naturally plant-based protein",
      "Only rock salt added — no flavour enhancers",
      "Resealable pouch keeps every bite crisp",
    ],
  },
  {
    id: "makhana-500",
    slug: "roasted-makhana-500g",
    weight: "500 g",
    name: "Roasted Makhana",
    price: 379,
    image: makhanaImage,
    short: "The bigger pouch for serious makhana lovers.",
    description:
      "For households that go through makhana faster than they can admit: the 500 g pouch of our slow-roasted fox nuts. Same hand-picked grade, same light roast, better value per gram.",
    benefits: [
      "Slow-roasted, never fried",
      "Naturally plant-based protein",
      "Value size for regular snackers",
      "Resealable pouch keeps every bite crisp",
    ],
  },
];

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function findProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Format a whole-rupee price the Indian way, e.g. ₹399 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
