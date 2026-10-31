import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "Terms of use for the Pure Harvest demo store — a practice project with no real transactions.",
      },
      { property: "og:title", content: "Terms & Conditions — Pure Harvest Demo Store" },
      { property: "og:description", content: "Demo store terms — no real transactions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Demo practice store — last updated November 2026.</p>

      <div className="mt-8 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">1. Demo purposes only</h2>
          <p className="mt-2">
            Pure Harvest is a demo e-commerce website created for learning Meta Ads and Meta
            Pixel tracking. All products, prices and orders are fictional demonstrations.
            No real payment is processed, no order is fulfilled and nothing is shipped.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">2. Orders &amp; checkout</h2>
          <p className="mt-2">
            The checkout collects your details to simulate a real order flow. Information
            entered stays in your browser's localStorage and is not used to create real
            shipments or accounts.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">3. Pricing</h2>
          <p className="mt-2">
            Prices shown (₹399, ₹749, ₹199, ₹379) are sample figures for practice purposes
            and do not constitute an offer to sell.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">4. Acceptable use</h2>
          <p className="mt-2">
            Please don't enter real sensitive information — use dummy details. This site
            exists purely for practising and demonstrating e-commerce tracking.
          </p>
        </section>
      </div>
    </div>
  );
}
