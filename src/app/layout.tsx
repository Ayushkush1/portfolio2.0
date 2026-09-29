import type { Metadata, Viewport } from 'next'
import '../index.css'
import { Providers } from '@/components/Providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CursorDot from '@/components/CursorDot'
import GoogleAnalytics from '@/components/GoogleAnalytics'
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

export const viewport: Viewport = {
  themeColor: '#ff5f26',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <CursorDot />
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
