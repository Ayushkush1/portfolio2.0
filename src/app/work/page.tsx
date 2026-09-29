import { Metadata } from "next";
import WorkClient from "./WorkClient";
import { caseStudies } from "@/data/projects";
import { JsonLd, breadcrumbJsonLd, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = {
    alternates: { canonical: '/work' },
    title: "Work – Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    description: "SaaS products, business platforms and client websites designed and built by Ayush Kushwaha.",
    openGraph: {
        title: "Work – Ayush Kushwaha | Product Designer & Full-Stack Engineer",
        description: "SaaS products, business platforms and client websites designed and built by Ayush Kushwaha.",
        url: "https://ayushkushwaha.com/work",
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
        title: "Work – Ayush Kushwaha | Product Designer & Full-Stack Engineer",
        description: "SaaS products, business platforms and client websites designed and built by Ayush Kushwaha.",
        images: ["https://ayushkushwaha.com/assets/og-image.jpg"],
    }
};

export default function WorkPage() {
    // The page as a list of case studies, each credited to the same Person node
    const collectionJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Selected work — Ayush Kushwaha",
        url: `${SITE_URL}/work`,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: caseStudies.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/work/${project.id}`,
                name: project.name,
            })),
        },
    };

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Work", path: "/work" },
            ])} />
            <JsonLd data={collectionJsonLd} />
            <WorkClient />
        </>
    );
}
