import { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Heros from "@/components/Heros";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import Experience from "@/components/Experience";
import ServicesSection from "@/components/ServicesSection";
import DesignShowcase from "@/components/DesignShowcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Ayush Kushwaha | Full-Stack Product Engineer",
  description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
  openGraph: {
    title: "Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
    url: "https://ayushkushwaha.com/",
    images: [
      {
        url: "https://ayushkushwaha.com/assets/ayush-kushwaha-logo.webp",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kushwaha | Full-Stack Product Engineer",
    description: "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.",
    images: ["https://ayushkushwaha.com/assets/ayush-kushwaha-logo.webp"],
  }
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Heros />
      <About />
      <Showcase />
      <Experience />
      <ServicesSection />
      <DesignShowcase />
      <Testimonials />
      <Contact />
    </main>
  );
}
