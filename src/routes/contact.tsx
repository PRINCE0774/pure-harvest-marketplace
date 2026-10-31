import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Pure Harvest Demo Store" },
      {
        name: "description",
        content: "Get in touch with the Pure Harvest demo store team — a practice project, not a real business.",
      },
      { property: "og:title", content: "Contact Us — Pure Harvest Demo Store" },
      { property: "og:description", content: "Contact the Pure Harvest demo store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Contact us</h1>
      <p className="mt-2 text-muted-foreground">
        We'd love to hear from you — even if we're just a practice store.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true); // demo: nothing is actually sent anywhere
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Name</span>
            <input required name="name" placeholder="Your name" className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Email</span>
            <input required type="email" name="email" placeholder="you@example.com" className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Message</span>
            <textarea required name="message" rows={5} placeholder="Hello…" className={field} />
          </label>
          <button
            type="submit"
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send message
          </button>
          {sent && (
            <p className="rounded-lg border border-dashed border-border bg-secondary/50 px-4 py-2 text-sm font-semibold text-muted-foreground">
              Demo only — your message was not actually sent anywhere.
            </p>
          )}
        </form>

        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Address", text: "Pure Harvest (demo), 12 Orchard Lane, Pune, Maharashtra 411001" },
            { icon: Phone, title: "Phone", text: "+91 98765 43210 (demo)" },
            { icon: Mail, title: "Email", text: "hello@pureharvest.example (demo)" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <c.icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
