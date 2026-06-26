import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Heros from "@/components/Heros";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import GithubActivity from "@/components/GithubActivity";
import Experience from "@/components/Experience";
import ServicesSection from "@/components/ServicesSection";
import DesignShowcase from "@/components/DesignShowcase";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

const Index = () => {
  const title = "Ayush Kushwaha | Full-Stack Product Engineer";
  const description =
    "Full-Stack Product Engineer building SaaS platforms, business systems, and exceptional user experiences. Based in India.";
  const canonical = typeof window !== "undefined" ? window.location.origin + "/" : "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Kushwaha",
    url: canonical,
    description,
    jobTitle: "Full-Stack Product Engineer & UI/UX Designer",
    image: "https://ayushkushwaha.com/assets/ayush-kushwaha.webp",
    knowsAbout: ["Software Engineering", "Web Development", "UI/UX Design", "SaaS Development", "React", "Next.js"],
    worksFor: {
      "@type": "Organization",
      name: "The Gold Technologies"
    },
    sameAs: [
      "https://github.com/Ayushkush1",
      "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/",
      "https://www.instagram.com/awsm_ayush_/"
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
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
    </>
  );
};

export default Index;
