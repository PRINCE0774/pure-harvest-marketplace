import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBasket, Leaf } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-primary">
            Pure Harvest
          </span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-5 text-sm font-medium sm:order-none sm:w-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={
                pathname === l.to
                  ? "text-primary underline underline-offset-4"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {l.label}
            </Link>
          ))}
          <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            Demo store
          </span>
        </nav>

        <Link
          to="/cart"
          aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          className="relative ml-auto flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <ShoppingBasket className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
