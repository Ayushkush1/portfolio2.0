import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

// Loads GA4 only when a Measurement ID is configured. The gtag queue is defined
// inline so events fired before the library arrives are kept; the library itself
// loads when the browser is idle, so it never competes with the first paint.
export default function GoogleAnalytics() {
    if (!GA_ID) return null;
    return (
        <>
            <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        </>
    );
}
