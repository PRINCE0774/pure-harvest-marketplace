import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBasket, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "Review your Pure Harvest demo cart: update quantities, remove items and see the total.",
      },
      { property: "og:title", content: "Cart — Pure Harvest Demo Store" },
      { property: "og:description", content: "Review your demo cart before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBasket className="h-7 w-7 text-primary" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add a jar of ghee or a pouch of makhana to get started.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the shop <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Your cart</h1>

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex flex-wrap items-center gap-4 p-4 sm:gap-6">
            <img
              src={product.image}
              alt={`${product.name} ${product.weight}`}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div className="min-w-40 flex-1">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="font-semibold hover:text-primary"
              >
                {product.name} <span className="text-sm font-normal text-muted-foreground">· {product.weight}</span>
              </Link>
              <p className="text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
            </div>
            <div className="flex items-center rounded-full border border-border">
              <button
                aria-label={`Decrease ${product.name} quantity`}
                onClick={() => setQuantity(product.id, quantity - 1)}
                className="p-2.5 text-muted-foreground hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-7 text-center text-sm font-semibold">{quantity}</span>
              <button
                aria-label={`Increase ${product.name} quantity`}
                onClick={() => setQuantity(product.id, quantity + 1)}
                className="p-2.5 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="min-w-20 text-right font-bold">{formatPrice(product.price * quantity)}</span>
            <button
              aria-label={`Remove ${product.name}`}
              onClick={() => removeItem(product.id)}
              className="p-2 text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-3">
        <div className="text-lg">
          <span className="text-muted-foreground">Subtotal: </span>
          <span className="font-display text-2xl font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-xs text-muted-foreground">Demo store — shipping and taxes are not charged.</p>
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/90"
        >
          Proceed to Checkout <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
