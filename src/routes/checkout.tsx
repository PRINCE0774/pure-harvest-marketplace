import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBasket, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { trackInitiateCheckout } from "@/lib/meta-pixel";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "Demo checkout for the Pure Harvest practice store — details are saved locally, nothing is charged.",
      },
      { property: "og:title", content: "Checkout — Pure Harvest Demo Store" },
      { property: "og:description", content: "Demo checkout — no real payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

/** One saved demo order (kept in localStorage for the success page). */
export interface DemoOrder {
  orderId: string;
  name: string;
  total: number;
  itemIds: string[];
  placedAt: string;
}

const ORDER_KEY = "pureharvest_last_order";

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  // Meta Pixel: InitiateCheckout — fired when the visitor begins checkout
  // with a non-empty cart (consent + pixel id checked inside the helper).
  useEffect(() => {
    if (items.length > 0) {
      trackInitiateCheckout(
        items.map(({ product }) => product.id),
        subtotal
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBasket className="h-7 w-7 text-primary" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">Nothing to check out</h1>
        <p className="mt-2 text-muted-foreground">Your cart is empty — add something first.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the shop <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const placeDemoOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const order: DemoOrder = {
      orderId: `DEMO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(data.get("name") ?? ""),
      total: subtotal,
      itemIds: items.map(({ product }) => product.id),
      placedAt: new Date().toISOString(),
    };

    // Save the order so the success page can show and "Purchase"-track it
    // (only after the cart has been read — so clear the cart last).
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    clearCart();
    setPlacing(true);
    navigate({ to: "/order-success", search: { id: order.orderId } });
  };

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-2 rounded-lg border border-dashed border-border bg-secondary/50 px-4 py-2 text-sm font-semibold text-muted-foreground">
        Demo store — your details stay in this browser and no payment is taken.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-5">
        {/* Delivery details */}
        <form onSubmit={placeDemoOrder} className="lg:col-span-3">
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Full name</span>
              <input name="name" required placeholder="Priya Sharma" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Phone</span>
              <input
                name="phone"
                required
                type="tel"
                pattern="[0-9+ -]{8,15}"
                placeholder="+91 98765 43210"
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Email</span>
              <input name="email" required type="email" placeholder="priya@example.com" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Address</span>
              <textarea
                name="address"
                required
                rows={3}
                placeholder="Flat, street, area, city"
                className={field}
              />
            </label>
            <label className="block sm:max-w-48">
              <span className="mb-1.5 block text-sm font-semibold">Pincode</span>
              <input
                name="pincode"
                required
                pattern="[0-9]{6}"
                title="A 6-digit Indian pincode"
                placeholder="411001"
                className={field}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {placing ? "Placing demo order…" : "Place Demo Order"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Order summary */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-3 text-sm">
                  <span>
                    {product.name} {product.weight} × {quantity}
                  </span>
                  <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">INR · demo only, nothing charged</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
