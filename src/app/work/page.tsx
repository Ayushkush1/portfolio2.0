import { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
    title: "Work – Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Explore a curated portfolio of scalable SaaS platforms, robust enterprise ERP systems, and high-performance digital products engineered by Ayush Kushwaha.",
    openGraph: {
        title: "Work – Ayush Kushwaha | Full-Stack Product Engineer",
        description: "Explore a curated portfolio of scalable SaaS platforms, robust enterprise ERP systems, and high-performance digital products engineered by Ayush Kushwaha.",
        url: "https://ayushkushwaha.com/work",
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
        title: "Work – Ayush Kushwaha | Full-Stack Product Engineer",
        description: "Explore a curated portfolio of scalable SaaS platforms, robust enterprise ERP systems, and high-performance digital products engineered by Ayush Kushwaha.",
        images: ["https://ayushkushwaha.com/assets/og-image.webp"],
    }
};

export default function WorkPage() {
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ayushkushwaha.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Work",
                "item": "https://ayushkushwaha.com/work"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <WorkClient />
        </>
    );
}
