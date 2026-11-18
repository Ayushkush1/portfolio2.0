// Shared schema.org (JSON-LD) nodes. Stable @ids let pages reference the same
// Person / WebSite instead of repeating them, so Google links everything together.
export const SITE_URL = "https://ayushkushwaha.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const PROFILE_ID = `${SITE_URL}/#profile`;

// Date the site's content last changed (YYYY-MM-DD). Feeds the sitemap's lastmod and the
// dateModified fields, so bump it when copy or case studies change — not on every deploy,
// or Google learns the dates are meaningless and stops trusting them.
export const SITE_UPDATED = "2026-11-17";

// Turns a YYYY-MM-DD content date into a full ISO 8601 datetime in IST. Google's ProfilePage
// rejects bare dates for dateCreated/dateModified ("Invalid datetime value"), and its Article
// docs recommend a timezone so the date isn't read in Googlebot's own zone.
export const toSchemaDateTime = (date: string) => `${date}T00:00:00+05:30`;

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
    worksFor: { "@type": "Organization", name: "The Gold Technologies" },
    hasOccupation: [
        {
            "@type": "Occupation",
            name: "Tech Lead",
            description: "Leads product engineering at The Gold Technologies, building internal platforms, ERP and SaaS products.",
        },
        {
            "@type": "Occupation",
            name: "Freelance Product Designer & Full-Stack Engineer",
            description: "Designs and builds SaaS products, CRM and ERP systems and premium websites for clients.",
        },
    ],
    knowsLanguage: ["English", "Hindi"],
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
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Server Monitoring",
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
    name: "Ayush Kushwaha | Product Design & Development",
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

// The homepage is Ayush's profile: Google's ProfilePage markup ties the page to the Person,
// which helps it surface for name searches and in knowledge panels
export const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: `${SITE_URL}/`,
    name: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    inLanguage: "en",
    dateModified: toSchemaDateTime(SITE_UPDATED),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
};

export const breadcrumbJsonLd =(items: { name: string; path: string }[]) => ({
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
