// Shared schema.org (JSON-LD) nodes. Stable @ids let pages reference the same
// Person / WebSite instead of repeating them, so Google links everything together.
export const SITE_URL = "https://ayushkushwaha.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;

export const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Ayush Kushwaha",
    jobTitle: "Product Designer & Full-Stack Engineer",
    description:
        "Freelance product designer and full-stack engineer building SaaS products, CRM and ERP systems, and premium websites.",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/assets/ayush-kushwaha.webp`,
    email: "mailto:ayushkushwaha381@gmail.com",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    knowsAbout: [
        "Product Design",
        "UI/UX Design",
        "Web Animation",
        "SaaS Development",
        "CRM Development",
        "ERP Development",
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
    ],
    sameAs: [
        "https://github.com/Ayushkush1",
        "https://x.com/kushwaha_ayush",
        "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/",
    ],
};

export const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Ayush Kushwaha",
    url: `${SITE_URL}/`,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
};

// Freelance offering — lets the site match "hire a … developer/designer" style searches
export const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: "Ayush Kushwaha — Product Design & Development",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/assets/og-image.jpg`,
    description:
        "Freelance design and development of SaaS products, startup MVPs, custom CRMs, ERP systems and premium websites.",
    founder: { "@id": PERSON_ID },
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
    email: "ayushkushwaha381@gmail.com",
    telephone: "+91-8738954475",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
            "SaaS Product Development",
            "Startup MVP Development",
            "Custom CRM & ERP Development",
            "UI/UX & Product Design",
            "Website Design & Development",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
};

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
    })),
});

export function JsonLd({ data }: { data: object }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
