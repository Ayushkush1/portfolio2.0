import { Helmet } from "react-helmet-async";
import Heros from "@/components/Heros";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import ServicesSection from "@/components/ServicesSection";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

const Index = () => {
  const title = "Ayush Kushwaha | Web & UI/UX Designer";
  const description =
    "Freelance Web & UI/UX Designer crafting beautiful, user-centered digital experiences. Based in India, specializing in modern web design, development, and user interface design.";
  const canonical = typeof window !== "undefined" ? window.location.origin + "/" : "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Kushwaha",
    url: canonical,
    description,
    jobTitle: "Web & UI/UX Designer",
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
        <Heros />
        <About />
        <Portfolio />
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
