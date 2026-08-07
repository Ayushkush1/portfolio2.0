import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
    title: "Portfolio – Ayush Kushwaha | SaaS Engineer & Product Builder",
    description: "Explore my portfolio of SaaS platforms and digital products.",
    openGraph: {
        title: "Portfolio – Ayush Kushwaha | SaaS Engineer & Product Builder",
        description: "Explore my portfolio of SaaS platforms and digital products.",
        url: "https://ayushkushwaha.com/portfolio",
    }
};

export default function PortfolioPage() {
    return <PortfolioClient />;
}
