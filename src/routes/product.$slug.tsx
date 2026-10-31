import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBasket, Minus, Plus, Check } from "lucide-react";
import { findProductBySlug, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { trackAddToCart, trackViewContent } from "@/lib/meta-pixel";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product
      ? `${product.name} ${product.weight} — Pure Harvest Demo Store`
      : "Product — Pure Harvest Demo Store";
    const description = product?.short ?? "Product details in the Pure Harvest demo store.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Meta Pixel: ViewContent — fires once when the product page is viewed
  // (consent + pixel id are checked inside the helper).
  useEffect(() => {
    trackViewContent(product);
  }, [product]);

  const handleAdd = () => {
    addItem(product.id, quantity);
    // Meta Pixel: AddToCart with the chosen quantity and value.
    trackAddToCart(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={`${product.name} ${product.weight}`}
          width={1024}
          height={1024}
          className="w-full rounded-3xl border border-border object-cover shadow-lift"
        />

        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {product.name} <span className="text-muted-foreground">· {product.weight}</span>
          </h1>
          <p className="mt-3 text-lg">{formatPrice(product.price)}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-border bg-card">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-muted-foreground hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="p-3 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/90 sm:flex-none"
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBasket className="h-4 w-4" /> Add to Cart
                </>
              )}
            </button>
          </div>

          <Link
            to="/cart"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Go to cart →
          </Link>
        </div>
      </div>
    </div>
  );
}
