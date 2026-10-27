import type { Metadata, Viewport } from 'next'
import { Caveat, Fraunces, Roboto_Flex } from 'next/font/google'
import '../index.css'
import { Providers } from '@/components/Providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CursorDot from '@/components/CursorDot'
import BlueprintMode from '@/components/BlueprintMode'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MobileCTA from '@/components/MobileCTA'
import { JsonLd, personJsonLd, websiteJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushkushwaha.com/"),
  title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
  description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
  authors: [{ name: "Ayush Kushwaha" }],
  keywords: "Product Designer, UI/UX Designer, Full-Stack Engineer, Freelance Developer, SaaS Development, Next.js Developer, Web Design, India",
  openGraph: {
    title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
    type: "website",
    url: "https://ayushkushwaha.com/",
    siteName: "Ayush Kushwaha Portfolio",
    images: [
      {
        url: "https://ayushkushwaha.com/assets/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
    creator: "@kushwaha_ayush",
    images: ["https://ayushkushwaha.com/assets/og-image.jpg"],
  },
  verification: {
    google: "4kD9H2fqRgqKEkOEOc1hEe17-BtCjDAoArqGcQXDkkw",
    other: {
      "p:domain_verify": "4909401e93e99aa7579470b8a31f5d0d"
    }
  }
}

// Self-hosted through next/font: preloaded with the page and given size-matched fallbacks,
// so text doesn't jump when the real face arrives (the Google Fonts stylesheet caused layout shift)
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})
// Only the oversized decorative names use it: they wait for the real face instead of swapping
const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-roboto-flex',
  display: 'block',
})
// Blueprint mode's handwritten notes only, so it isn't preloaded
const caveat = Caveat({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-caveat',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  themeColor: '#ff5f26',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${fraunces.variable} ${robotoFlex.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <CursorDot />
        <BlueprintMode />
        <Providers>
          {children}
          <MobileCTA />
        </Providers>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
