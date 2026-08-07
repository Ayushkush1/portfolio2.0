import { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
    title: "Work – Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Selected case studies of SaaS platforms, ERP systems, and digital products built by Ayush Kushwaha.",
    openGraph: {
        title: "Work – Ayush Kushwaha | Full-Stack Product Engineer",
        description: "Selected case studies of SaaS platforms, ERP systems, and digital products built by Ayush Kushwaha.",
        url: "https://ayushkushwaha.com/work",
    }
};

export default function WorkPage() {
    return <WorkClient />;
}
