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
  const title = "Dominic – Brand & UI/UX Designer in London";
  const description =
    "Portfolio hero of Dominic, a UI/UX and brand designer crafting seamless digital experiences in London.";
  const canonical = typeof window !== "undefined" ? window.location.origin + "/" : "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dominic – UI/UX Designer",
    url: canonical,
    description,
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
