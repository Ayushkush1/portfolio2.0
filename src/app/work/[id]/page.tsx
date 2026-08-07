import { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";
import { caseStudies } from "@/data/projects";

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const project = caseStudies.find((c) => c.id === resolvedParams.id);
    if (!project) return { title: "Not Found" };
    
    return {
        title: `${project.name} Case Study | Ayush Kushwaha`,
        description: project.tagline,
        openGraph: {
            title: `${project.name} Case Study | Ayush Kushwaha`,
            description: project.tagline,
            url: `https://ayushkushwaha.com/work/${project.id}`,
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
            title: `${project.name} Case Study | Ayush Kushwaha`,
            description: project.tagline,
            images: ["https://ayushkushwaha.com/assets/og-image.webp"],
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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": project.name,
                "item": `https://ayushkushwaha.com/work/${project.id}`
            }
        ]
    };

    const creativeWorkJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.name,
        "description": project.tagline,
        "creator": {
            "@type": "Person",
            "name": "Ayush Kushwaha"
        },
        "url": `https://ayushkushwaha.com/work/${project.id}`,
        "image": `https://ayushkushwaha.com${project.images[0]}`
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
            />
            <ProjectDetailClient id={resolvedParams.id} />
        </>
    );
}
