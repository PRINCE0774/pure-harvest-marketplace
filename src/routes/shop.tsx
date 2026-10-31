import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Pure Harvest Demo Store" },
      {
        name: "description",
        content:
          "Browse Pure Harvest Desi Ghee (500 g & 1 kg) and Roasted Makhana (250 g & 500 g). Demo store for practising e-commerce tracking — no real payments.",
      },
      { property: "og:title", content: "Shop — Pure Harvest Demo Store" },
      {
        property: "og:description",
        content: "Browse Desi Ghee and Roasted Makhana in the Pure Harvest demo store.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Shop</h1>
      <p className="mt-2 text-muted-foreground">
        Everything we make, in every size. Prices include GST.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
