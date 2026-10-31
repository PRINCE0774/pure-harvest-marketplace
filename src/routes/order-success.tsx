import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { trackPurchase } from "@/lib/meta-pixel";
import type { DemoOrder } from "./checkout";

export const Route = createFileRoute("/order-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search["id"] === "string" ? search["id"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "Your demo order is confirmed. Nothing was charged — this is a practice store.",
      },
      { property: "og:title", content: "Order Confirmed — Pure Harvest Demo Store" },
      { property: "og:description", content: "Demo order confirmation — no real payment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { id } = Route.useSearch();
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    // Read the saved demo order and fire the Meta Pixel Purchase event ONCE.
    // trackPurchase() remembers each order id in localStorage, so refreshing
    // this page never sends a duplicate Purchase for the same order.
    try {
      const saved = window.localStorage.getItem("pureharvest_last_order");
      const parsed: DemoOrder | null = saved ? JSON.parse(saved) : null;
      if (parsed && (!id || parsed.orderId === id)) {
        setOrder(parsed);
        trackPurchase(parsed.orderId, parsed.total, parsed.itemIds);
      }
    } catch {
      // No saved order — still show the generic demo confirmation below.
    }
  }, [id]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <PartyPopper className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">Order confirmed!</h1>

      {order && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold">{order.orderId}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Placed for</span>
            <span className="font-semibold">{order.name || "Demo customer"}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span className="font-semibold">{order.itemIds.join(", ")}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-2xl font-semibold">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <p className="mt-6 text-muted-foreground">
        Thank you for practising with Pure Harvest. This is a demo confirmation — no
        payment was taken and nothing will ship. The Meta Pixel <code className="text-sm">Purchase</code>{" "}
        event for this order (if consent was accepted and a Pixel ID is configured) was
        sent exactly once, even if you refresh this page.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/shop"
          className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue shopping
        </Link>
        <Link
          to="/"
          className="rounded-full border border-border px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
