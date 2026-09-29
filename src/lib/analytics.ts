// Google Analytics 4 event helper. Safe to call anywhere: it does nothing until
// NEXT_PUBLIC_GA_ID is set and the gtag queue exists (see GoogleAnalytics component).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Params = Record<string, string | number | undefined>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function track(event: string, params: Params = {}) {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", event, params);
}
