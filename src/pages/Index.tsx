import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

// Critical above-the-fold: load eagerly
import Navbar from "@/components/Navbar";
import Heros from "@/components/Heros";

// Everything below the fold: lazy-load so they don't block initial paint
const About = lazy(() => import("@/components/About"));
const Showcase = lazy(() => import("@/components/Showcase"));
const Experience = lazy(() => import("@/components/Experience"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const DesignShowcase = lazy(() => import("@/components/DesignShowcase"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));

// Minimal inline placeholder so layout doesn't jump during load
const SectionFallback = () => (
  <div className="w-full min-h-[200px]" aria-hidden="true" />
);

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
        {/* Above the fold – no Suspense boundary needed */}
        <Navbar />
        <Heros />

        {/* Below the fold – each section lazy loads independently */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Showcase />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DesignShowcase />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
