import { Link } from "@tanstack/react-router";
import { OPEN_CONSENT_EVENT } from "./CookieConsent";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-primary">Pure Harvest</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Small-batch Desi Ghee and roasted Makhana, made the traditional way.
          </p>
          <p className="mt-4 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground">
            Practice demo store — no real payments, no real orders.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
            <li>
              {/* Reopens the cookie banner so the visitor can change their choice. */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
                className="hover:text-primary"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pure Harvest — a beginner practice project for Meta Ads &amp; Pixel tracking.
      </div>
    </footer>
  );
}
