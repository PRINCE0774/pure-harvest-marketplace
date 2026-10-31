import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wheat, HeartHandshake, Quote } from "lucide-react";
import heroImage from "@/assets/hero-ghee-makhana.jpg";
import lifestyleImage from "@/assets/lifestyle-ghee.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Harvest — Desi Ghee & Roasted Makhana (Demo Store)" },
      {
        name: "description",
        content:
          "Small-batch bilona Desi Ghee and slow-roasted Makhana. A beginner-friendly demo store for practising Meta Ads and Pixel tracking — no real payments.",
      },
      { property: "og:title", content: "Pure Harvest — Desi Ghee & Roasted Makhana (Demo Store)" },
      {
        property: "og:description",
        content:
          "Small-batch bilona Desi Ghee and slow-roasted Makhana. A demo store for practising e-commerce tracking — no real payments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const benefits = [
  {
    icon: Wheat,
    title: "Traditional methods",
    text: "Bilona-churned ghee and slow-roasted makhana, made the way our grandmothers did.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing artificial",
    text: "No preservatives, no colours, no flavour enhancers. Just the ingredient and patience.",
  },
  {
    icon: HeartHandshake,
    title: "Fair to farmers",
    text: "Sourced directly from dairy families and makhana growers in Bihar at fair prices.",
  },
];

const testimonials = [
  {
    name: "Ananya S.",
    city: "Bengaluru",
    text: "The ghee actually smells like the one my mother made. My dosas have never been better.",
  },
  {
    name: "Rohit M.",
    city: "Delhi",
    text: "Finally a makhana that isn't soggy or over-salted. The 500 g pouch disappears too fast.",
  },
  {
    name: "Meera K.",
    city: "Pune",
    text: "Ordered for my family after seeing an ad — the packaging feels truly premium. (Demo review.)",
  },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Small batch · Made in India
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Golden ghee &amp; honest makhana, from our farm to your kitchen
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Slow-churned Desi Ghee and perfectly roasted Makhana — pure ingredients,
              traditional methods, and a practice playground for learning e-commerce tracking.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/90"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="rounded-full border border-dashed border-border px-4 py-2 text-xs font-semibold text-muted-foreground">
                Demo store — nothing is charged
              </span>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Pure Harvest Desi Ghee jar beside a bowl of roasted makhana"
              width={1600}
              height={1024}
              className="w-full rounded-3xl border border-border object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Our bestsellers</h2>
            <p className="mt-1 text-muted-foreground">Two honest products, four honest sizes.</p>
          </div>
          <Link to="/shop" className="shrink-0 text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Why Pure Harvest</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                  <b.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <img
          src={lifestyleImage}
          alt="Ghee drizzled over traditional Indian sweets"
          loading="lazy"
          width={1600}
          height={1024}
          className="w-full rounded-3xl border border-border object-cover shadow-lift"
        />
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            An everyday luxury, kept simple
          </h2>
          <p className="mt-3 text-muted-foreground">
            A spoon of ghee over hot dal, a bowl of roasted makhana with evening tea —
            we believe the oldest Indian kitchen staples deserve the most careful
            modern sourcing. Small batches, glass jars, resealable pouches.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            Explore the shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Loved by kitchens like yours</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="h-6 w-6 text-gold" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">{t.text}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
