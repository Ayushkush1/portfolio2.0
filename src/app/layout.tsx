import type { Metadata, Viewport } from 'next'
import '../index.css'
import { Providers } from '@/components/Providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushkushwaha.com/"),
  alternates: {
    canonical: '/',
  },
  title: "Ayush Kushwaha | Full-Stack Product Engineer",
  description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
  authors: [{ name: "Ayush Kushwaha" }],
  keywords: "Full-Stack Engineer, Product Engineer, SaaS Developer, React Developer, Next.js Developer, India, Web Development",
  openGraph: {
    title: "Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
    type: "website",
    url: "https://ayushkushwaha.com/",
    siteName: "Ayush Kushwaha Portfolio",
    images: [
      {
        url: "https://ayushkushwaha.com/assets/og-image.webp",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
    creator: "@awsm_ayush_",
    images: ["https://ayushkushwaha.com/assets/og-image.webp"],
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
    jobTitle: 'Full-Stack Product Engineer',
    url: 'https://ayushkushwaha.com/',
    sameAs: [
      'https://github.com/ayushkushwaha', 
      'https://twitter.com/awsm_ayush_',
      'https://linkedin.com/in/ayushkushwaha'
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ayush Kushwaha Portfolio',
    url: 'https://ayushkushwaha.com/'
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
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
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
