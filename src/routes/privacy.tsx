import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "How the Pure Harvest demo store handles cookies, the Meta Pixel and your demo details.",
      },
      { property: "og:title", content: "Privacy Policy — Pure Harvest Demo Store" },
      { property: "og:description", content: "Cookies, Meta Pixel and demo data handling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Demo practice store — last updated November 2026.</p>

      <div className="mt-8 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">About this store</h2>
          <p className="mt-2">
            Pure Harvest is a beginner practice project built for learning Meta Ads and Meta
            Pixel (e-commerce) tracking. It does not process real payments, does not ship
            products and does not create real customer accounts.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Cookies &amp; the Meta Pixel</h2>
          <p className="mt-2">
            If you accept cookies on our banner, this site loads the Meta Pixel (Meta Platforms,
            Inc.) to measure visits and shopping actions — page views, product views, add-to-cart,
            checkout starts and demo purchases. The pixel may set cookies and share information
            such as pages visited, products viewed, event values and order identifiers with Meta
            for advertising measurement and ad optimisation purposes.
          </p>
          <p className="mt-2">
            If you reject cookies, the pixel is never loaded and no tracking events are sent.
            You can change your choice at any time via the "Cookie settings" link in the footer.
            You can also opt out of Meta's use of cookies through your ad preferences on Facebook.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Data stored on your device</h2>
          <p className="mt-2">
            Your cart, your cookie choice and your demo order details (name, items and total)
            are stored only in your browser's localStorage. They never leave your device except
            for the tracking events described above, and you can clear them any time via your
            browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about this practice project? Use the contact form on our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
