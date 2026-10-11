"use client";
import { useRef, ViewTransition } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredProducts, FeaturedProduct } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaskReveal from "@/components/ui/mask-reveal";
import { CurtainReveal } from "@/components/ui/scroll-reveal";
import { fadeUp } from "@/lib/motion";

/* ─── Row: big card + small card, text below each ──────────── */
function ShowcaseRow({
  big,
  small,
  reverse = false,
  annotate = false,
}: {
  big: FeaturedProduct;
  small: FeaturedProduct;
  reverse?: boolean;
  /** Blueprint mode note on the first row's small card (open space above it) */
  annotate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`flex gap-6 md:gap-10 w-full items-start ${reverse ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Big card — 62% width, taller */}
      <div className="flex flex-col gap-4" style={{ flex: "0 0 62%" }}>
        {/* Shares its name with the case study hero, so the card morphs into it on navigation */}
        <ViewTransition name={`project-${big.id}`} share="project-morph" default="none">
        <Link
          href={`/work/${big.id}`}
          data-cursor="View"
          data-cursor-ring={`${big.name} · ${big.category}`}
          className="group relative block cursor-none w-full h-[340px] md:h-[500px]"
          style={{ borderRadius: "40px", overflow: "hidden" }}
        >
          {/* Tall cover fills the card; opens like a curtain as the row scrolls in */}
          <CurtainReveal className="absolute inset-0 overflow-hidden">
            <Image
              src={big.cover ?? big.sliderItems[0]?.image}
              alt={big.name}
              fill
              sizes="(max-width: 768px) 62vw, 850px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </CurtainReveal>
        </Link>
        </ViewTransition>
        <div className="ml-3">
          <h3 className="text-xl md:text-2xl font-normal text-white">
            {big.name}
          </h3>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50 mt-1">
            {big.category}
          </p>
        </div>
      </div>

      {/* Small card — 38% width, shorter height */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Shares its name with the case study hero, so the card morphs into it on navigation */}
        <ViewTransition name={`project-${small.id}`} share="project-morph" default="none">
        <Link
          href={`/work/${small.id}`}
          {...(annotate && {
            "data-bp-note": "click → the card morphs into its case study",
            "data-bp-code": `<ViewTransition name="project-${small.id}" />`,
          })}
          data-cursor="View"
          data-cursor-ring={`${small.name} · ${small.category}`}
          className="group relative block cursor-none w-full h-[210px] md:h-[300px]"
          style={{ borderRadius: "40px", overflow: "hidden" }}
        >
          {/* Tall cover fills the card; opens like a curtain as the row scrolls in */}
          <CurtainReveal className="absolute inset-0 overflow-hidden">
            <Image
              src={small.cover ?? small.sliderItems[0]?.image}
              alt={small.name}
              fill
              sizes="(max-width: 768px) 38vw, 520px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </CurtainReveal>
        </Link>
        </ViewTransition>
        <div className="ml-3">
          <h3 className="text-xl md:text-2xl font-normal text-white">
            {small.name}
          </h3>
          <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/50 mt-1">
            {small.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
const Showcase = () => {
  const rows: [FeaturedProduct, FeaturedProduct][] = [];
  for (let i = 0; i + 1 < featuredProducts.length; i += 2) {
    rows.push([featuredProducts[i], featuredProducts[i + 1]]);
  }

  return (
    <section
      id="work"
      className="relative bg-gradient-to-br from-background via-background to-primary/5 pt-24 md:pt-32 pb-24 md:pb-40"
    >
      <div className="container relative z-10 flex flex-col gap-0">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 md:mb-16 text-center md:text-left">
          <div>
            <MaskReveal
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Fraunces', serif" }}
              lines={[
                "Selected products",
                <span key="l2" className="italic text-gray-400">
                  built to scale<span className="text-brand">.</span>
                </span>,
              ]}
            />
          </div>

          <motion.div className="w-fit" whileHover="hover" {...fadeUp(0.2)}>
            <Button
              variant="hero"
              size="lg"
              className="group/btn flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.3)] hover:shadow-[0_0_30px_rgba(255,95,38,0.5)] pl-5 pr-2 w-fit h-12"
              asChild
            >
              <Link href="/work">
                <div className="relative overflow-hidden h-6 w-fit text-white">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={{ hover: { y: -24 } }}
                    initial={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="w-full flex items-center justify-center whitespace-nowrap text-sm font-medium h-6 leading-6">
                      Explore All Work
                    </span>
                    <span className="w-full flex items-center justify-center font-semibold whitespace-nowrap text-sm h-6 leading-6">
                      Explore All Work
                    </span>
                  </motion.div>
                </div>
                <div className="relative bg-white rounded-full p-1.5 flex items-center justify-center ml-2.5 bg-orange-50 transition-colors duration-300 shadow-[0_0_10px_rgba(255,95,38,0.2)]">
                  {/* Pulse ring — transform/opacity only, so it runs on the compositor */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#ff5f26]/40 animate-pulse-ring" />
                  <ArrowRight className="h-3.5 w-3.5 text-[#ff5f26] transition-all group-hover/btn:rotate-0 -rotate-45 duration-300" />
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer [animation-delay:1.5s]" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col gap-10 md:gap-12">
          {rows.map(([big, small], i) => (
            <ShowcaseRow
              key={big.id}
              big={big}
              small={small}
              reverse={i % 2 === 1}
              annotate={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
