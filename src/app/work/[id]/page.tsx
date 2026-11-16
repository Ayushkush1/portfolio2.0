import { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";
import { caseStudies } from "@/data/projects";
import { JsonLd, breadcrumbJsonLd, PERSON_ID, SITE_UPDATED, SITE_URL, WEBSITE_ID } from "@/lib/seo";

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const project = caseStudies.find((c) => c.id === resolvedParams.id);
    if (!project) return { title: "Not Found" };
    
    return {
        title: `${project.name} Case Study | Ayush Kushwaha`,
        description: `${project.tagline}: a case study by Ayush Kushwaha.`,
        alternates: { canonical: `/work/${project.id}` },
        openGraph: {
            title: `${project.name} Case Study | Ayush Kushwaha`,
            description: `${project.tagline}: a case study by Ayush Kushwaha.`,
            url: `https://ayushkushwaha.com/work/${project.id}`,
            images: [
                {
                    url: `https://ayushkushwaha.com/assets/og/${project.id}.jpg`,
                    width: 1200,
                    height: 630,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.name} Case Study | Ayush Kushwaha`,
            description: `${project.tagline}: a case study by Ayush Kushwaha.`,
            images: [`https://ayushkushwaha.com/assets/og/${project.id}.jpg`],
        }
    }
}

export async function generateStaticParams() {
    return caseStudies.map((project) => ({
        id: project.id,
    }))
}

export default async function ProjectDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const project = caseStudies.find((c) => c.id === resolvedParams.id);
    
    if (!project) {
        return <ProjectDetailClient id={resolvedParams.id} />;
    }

    const pageUrl = `${SITE_URL}/work/${project.id}`;
    // A case study is a CreativeWork about a piece of software (or a website). additionalType names
    // that without using the SoftwareApplication type itself, which Google only accepts with pricing
    // or ratings, and would otherwise flag as an invalid item on every case study in Search Console.
    const creativeWorkJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${pageUrl}#work`,
        additionalType: project.kind === "website" ? "https://schema.org/WebSite" : "https://schema.org/SoftwareApplication",
        name: `${project.name}: ${project.tagline}`,
        headline: project.tagline,
        abstract: project.challenge,
        description: project.overview,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: [
            `${SITE_URL}/assets/og/${project.id}.jpg`,
            ...project.images.map((src) => `${SITE_URL}${src}`),
        ],
        inLanguage: "en",
        dateCreated: project.year,
        dateModified: project.updated ?? SITE_UPDATED,
        creativeWorkStatus: project.status,
        genre: project.category,
        keywords: project.techStack.join(", "),
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        ...(project.liveUrl !== "#" && { sameAs: project.liveUrl }),
    };

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Work", path: "/work" },
                { name: project.name, path: `/work/${project.id}` },
            ])} />
            <JsonLd data={creativeWorkJsonLd} />
            <ProjectDetailClient id={resolvedParams.id} />
        </>
    );
}
