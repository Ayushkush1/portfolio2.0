import type { Metadata, Viewport } from 'next'
import '../index.css'
import { Providers } from '@/components/Providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export const metadata: Metadata = {
  title: "Ayush Kushwaha | Web & UI/UX Designer",
  description: "Freelance Web & UI/UX Designer crafting beautiful, user-centered digital experiences. Based in India, specializing in modern web design, development, and user interface design.",
  authors: [{ name: "Ayush Kushwaha" }],
  keywords: "UI/UX Designer, Web Designer, Frontend Developer, Freelance Designer, India, React Developer, Modern Web Design",
  openGraph: {
    title: "Ayush Kushwaha | Web & UI/UX Designer",
    description: "Freelance Web & UI/UX Designer crafting beautiful, user-centered digital experiences. Based in India, specializing in modern web design, development, and user interface design.",
    type: "website",
    url: "https://ayushkushwaha.com/",
    siteName: "Ayush Kushwaha Portfolio",
    images: [
      {
        url: "https://ayushkushwaha.com/assets/ayush-kushwaha.webp",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kushwaha | Web & UI/UX Designer",
    description: "Freelance Web & UI/UX Designer crafting beautiful, user-centered digital experiences. Based in India, specializing in modern web design, development, and user interface design.",
    creator: "@awsm_ayush_",
    images: ["https://ayushkushwaha.com/assets/ayush-kushwaha.webp"],
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
    jobTitle: 'Web & UI/UX Designer',
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
