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
    return <ProjectDetailClient id={resolvedParams.id} />;
}
