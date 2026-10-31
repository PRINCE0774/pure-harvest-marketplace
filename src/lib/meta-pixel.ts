/**
 * ============================================================================
 * META PIXEL UTILITY (practice / demo store)
 * ============================================================================
 * This is the single place where all Meta Pixel (Facebook) tracking lives so a
 * beginner can read one file and understand the whole tracking setup.
 *
 * How it works, in plain language:
 *
 * 1. The Pixel ID is read from an environment variable (VITE_META_PIXEL_ID).
 *    Without a real Pixel ID nothing is sent anywhere — the helpers below
 *    simply log a note in the console. Add the ID in your Lovable project
 *    settings as a VITE_ variable to switch tracking on.
 *
 * 2. Consent first: the pixel is initialised ONLY after the visitor accepts
 *    cookies on the banner (see src/components/CookieConsent.tsx). If they
 *    reject, or never answer, no events are fired.
 *
 * 3. Events tracked (all standard Meta events):
 *    - PageView          → every page navigation
 *    - ViewContent       → product detail page
 *    - AddToCart         → "Add to Cart" button
 *    - InitiateCheckout  → arriving on the checkout page
 *    - Purchase          → demo order confirmed (deduplicated by order id)
 *
 *    Where relevant we pass content_ids, content_name, value and currency
 *    ("INR") so Meta can report and optimise on them.
 */

/** Pixel ID from the environment. Empty string means "tracking disabled". */
export const META_PIXEL_ID: string = import.meta.env.VITE_META_PIXEL_ID ?? "";

/** localStorage keys (namespaced so they never clash with the cart). */
const CONSENT_KEY = "pureharvest_cookie_consent";
const FIRED_PURCHASES_KEY = "pureharvest_fired_purchases";

/** The two answers a visitor can give on the cookie banner. */
export type ConsentChoice = "accepted" | "rejected";

/** Shape of Meta's global fbq() function (only what we use). */
interface FbqFn {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

/* -------------------------------------------------------------------------
 * CONSENT — stored in localStorage so the choice survives page reloads.
 * ------------------------------------------------------------------------- */

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null; // server-side render: no storage
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function saveConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, choice);
}

/* -------------------------------------------------------------------------
 * PIXEL LOADING — the standard Meta base snippet, once, only after consent.
 * ------------------------------------------------------------------------- */

export function initPixel(): void {
  if (typeof window === "undefined") return; // never run during SSR
  if (!META_PIXEL_ID) {
    // Helpful for practice: explain in the console why nothing is sent.
    console.info(
      "[Pure Harvest demo] No VITE_META_PIXEL_ID set — Meta Pixel is NOT loaded and no events are sent. Add the ID to enable tracking."
    );
    return;
  }
  if (window.fbq && window.fbq.loaded) return; // already installed

  // Standard Meta base snippet (as function calls so it survives bundling).
  const fbq: FbqFn = window.fbq ?? function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      (fbq.queue = fbq.queue ?? []).push(args);
    }
  };
  if (!window.fbq) {
    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  // agent identifies this integration; empty user data (no advanced matching).
  fbq("init", META_PIXEL_ID, {}, { agent: "lovable" });
  console.info(`[Pure Harvest demo] Meta Pixel initialised (id ${META_PIXEL_ID}).`);
}

/* -------------------------------------------------------------------------
 * EVENT HELPERS
 * Every helper first checks: (1) consent accepted, (2) pixel id present.
 * If either is missing the event is silently skipped.
 * ------------------------------------------------------------------------- */

function send(eventName: string, params: Record<string, unknown>, eventId?: string): void {
  if (getStoredConsent() !== "accepted") return; // consent gate
  if (typeof window === "undefined" || !window.fbq || !META_PIXEL_ID) return; // pixel gate

  const args: unknown[] = ["track", eventName, params];
  if (eventId) args.push({ eventID: eventId }); // lets Meta dedupe browser/server hits
  window.fbq(...args);
}

/** PageView — fired on every page navigation (see PageViewTracker). */
export function trackPageView(): void {
  send("PageView", {});
}

/** ViewContent — a visitor looked at one product's detail page. */
export function trackViewContent(product: { id: string; name: string; price: number }): void {
  send(
    "ViewContent",
    {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "INR",
    },
    `vc-${product.id}`
  );
}

/** AddToCart — the visitor added a product (with quantity) to the cart. */
export function trackAddToCart(product: { id: string; name: string; price: number }, quantity: number): void {
  send(
    "AddToCart",
    {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price * quantity,
      currency: "INR",
    },
    `atc-${product.id}`
  );
}

/** InitiateCheckout — the visitor reached the checkout page with items. */
export function trackInitiateCheckout(itemIds: string[], value: number): void {
  send(
    "InitiateCheckout",
    {
      content_ids: itemIds,
      content_type: "product",
      value,
      currency: "INR",
    },
    "ic-start"
  );
}

/**
 * Purchase — a demo order was confirmed.
 * `orderId` is passed as the eventID and remembered in localStorage, so
 * refreshing the success page (or returning later) never fires a duplicate
 * Purchase for the same order.
 */
export function trackPurchase(orderId: string, value: number, itemIds: string[]): void {
  if (typeof window === "undefined") return;
  let fired: string[] = [];
  try {
    fired = JSON.parse(window.localStorage.getItem(FIRED_PURCHASES_KEY) ?? "[]");
  } catch {
    fired = [];
  }
  if (fired.includes(orderId)) {
    console.info(`[Pure Harvest demo] Purchase for order ${orderId} already sent — skipping duplicate.`);
    return;
  }
  send(
    "Purchase",
    {
      content_ids: itemIds,
      content_type: "product",
      value,
      currency: "INR",
      num_items: itemIds.length,
    },
    orderId
  );
  fired.push(orderId);
  window.localStorage.setItem(FIRED_PURCHASES_KEY, JSON.stringify(fired));
}
