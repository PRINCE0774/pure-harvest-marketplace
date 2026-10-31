import { Link } from "@tanstack/react-router";
import { ShoppingBasket } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { trackAddToCart } from "@/lib/meta-pixel";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product.id, 1);
    // Meta Pixel: AddToCart event (consent + pixel id checked inside).
    trackAddToCart(product, 1);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lift">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={`${product.name} ${product.weight}`}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="font-display text-lg font-semibold leading-snug hover:text-primary"
        >
          {product.name}{" "}
          <span className="text-sm font-normal text-muted-foreground">· {product.weight}</span>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.short}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBasket className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
