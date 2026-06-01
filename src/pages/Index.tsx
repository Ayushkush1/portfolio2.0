import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Heros from "@/components/Heros";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import Experience from "@/components/Experience";
import ServicesSection from "@/components/ServicesSection";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import GithubActivity from "@/components/GithubActivity";

const Index = () => {
  const title = "Ayush Kushwaha | SaaS Engineer & Product Builder";
  const description =
    "SaaS Engineer & Product Builder based in India. I build scalable web products, lead development, and turn ideas into production-ready systems.";
  const canonical = typeof window !== "undefined" ? window.location.origin + "/" : "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Kushwaha",
    url: canonical,
    description,
    jobTitle: "SaaS Engineer & Product Builder",
    worksFor: {
      "@type": "Organization",
      name: "Freelance"
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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        <Navbar />
        <Heros />
        <About />
        <Showcase />
        <GithubActivity />
        <Experience />
        <ServicesSection />
        <Process />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
};

export default Index;
