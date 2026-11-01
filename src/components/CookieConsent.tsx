/**
 * Cookie consent banner.
 * - Shown until the visitor answers (choice saved in localStorage).
 * - Accept  → saves the choice, loads the Meta Pixel, fires the first PageView.
 * - Reject  → saves the choice; no pixel, no events.
 * - The footer's "Cookie settings" link reopens this banner so the visitor can
 *   change their mind later.
 */
import { useEffect, useState } from "react";
import {
  getStoredConsent,
  initPixel,
  revokePixelConsent,
  saveConsent,
  trackPageView,
  type ConsentChoice,
} from "@/lib/meta-pixel";
import { Link } from "@tanstack/react-router";

/** Footer link dispatches this to reopen the banner. */
export const OPEN_CONSENT_EVENT = "ph:open-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const maybeShow = () => {
      if (getStoredConsent() === null) setVisible(true);
    };
    maybeShow();
    window.addEventListener(OPEN_CONSENT_EVENT, maybeShow);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, maybeShow);
  }, []);

  const answer = (choice: ConsentChoice) => {
    saveConsent(choice);
    setVisible(false);
    if (choice === "accepted") {
      // Consent given → start tracking now.
      initPixel();
      trackPageView();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-lift sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="flex-1">
          <p className="font-semibold text-foreground">Cookies &amp; ads tracking</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This demo store can use cookies and a Meta Pixel to measure visits and ad
            performance. Accept to allow tracking, or Reject to browse without it. See our{" "}
            <Link to="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => answer("rejected")}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:flex-none"
          >
            Reject
          </button>
          <button
            onClick={() => answer("accepted")}
            className="flex-1 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
