import { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Heros from "@/components/Heros";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import ClientWebsites from "@/components/ClientWebsites";
import Experience from "@/components/Experience";
import ServicesSection from "@/components/ServicesSection";
import DesignShowcase from "@/components/DesignShowcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
  description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
  openGraph: {
    title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
    url: "https://ayushkushwaha.com/",
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
    title: "Ayush Kushwaha | Product Designer & Full-Stack Engineer",
    description: "I design and build SaaS products, business platforms and premium websites — UI/UX, motion, architecture and deployment. Available for freelance projects.",
    images: ["https://ayushkushwaha.com/assets/og-image.jpg"],
  }
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Heros />
      <About />
      <Showcase />
      <ClientWebsites />
      <Experience />
      <ServicesSection />
      <DesignShowcase />
      <Testimonials />
      <Contact />
    </main>
  );
}
