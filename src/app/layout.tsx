import type { Metadata, Viewport } from 'next'
import '../index.css'
import { Providers } from '@/components/Providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CursorDot from '@/components/CursorDot'

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
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush Kushwaha',
    jobTitle: 'Product Designer & Full-Stack Engineer',
    url: 'https://ayushkushwaha.com/',
    sameAs: [
      'https://github.com/Ayushkush1',
      'https://x.com/kushwaha_ayush',
      'https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/'
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ayush Kushwaha Portfolio',
    url: 'https://ayushkushwaha.com/'
  }

  const navigationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Work & Case Studies',
        url: 'https://ayushkushwaha.com/work'
      }
    ]
  }

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
        />
        <CursorDot />
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
