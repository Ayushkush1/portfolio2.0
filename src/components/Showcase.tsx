"use client";
import { useRef, ViewTransition } from "react";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { featuredProducts, FeaturedProduct } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaskReveal from "@/components/ui/mask-reveal";
import { CurtainReveal, useScrollProgress } from "@/components/ui/scroll-reveal";
import { fadeUp } from "@/lib/motion";

/* ─── Name + category under a card; phones also get a tap-sized arrow ── */
function CardCaption({ product }: { product: FeaturedProduct }) {
  return (
    <Link
      href={`/work/${product.id}`}
      data-cursor="View"
      className="ml-3 flex items-start justify-between gap-4 cursor-none"
    >
      <div className="min-w-0">
        <h3 className="text-2xl font-normal text-white">{product.name}</h3>
        <p className="text-xs md:text-[11px] font-medium tracking-[0.14em] md:tracking-[0.16em] uppercase text-white/65 md:text-white/55 mt-1">
          {product.category}
        </p>
      </div>
      <span className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white">
        <ArrowRight className="h-4 w-4 -rotate-45" />
      </span>
    </Link>
  );
}

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
  const scrollYProgress = useScrollProgress(ref, ["start", 1], ["end", 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`flex flex-col gap-12 md:gap-10 w-full items-start ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Big card — 62% width, taller (phones: full width, one card per screen) */}
      <div className="flex flex-col gap-4 w-full md:w-auto md:basis-[62%] md:shrink-0 md:grow-0">
        {/* Shares its name with the case study hero, so the card morphs into it on navigation */}
        <ViewTransition name={`project-${big.id}`} share="project-morph" default="none">
        <Link
          href={`/work/${big.id}`}
          data-cursor="View"
          data-cursor-ring={`${big.name} · ${big.category}`}
          className="group relative block cursor-none w-full aspect-[4/5] md:aspect-auto md:h-[500px] [--card-radius:24px] md:[--card-radius:40px] rounded-[var(--card-radius)] overflow-hidden"
        >
          {/* Tall cover fills the card; opens like a curtain as the row scrolls in */}
          <CurtainReveal className="absolute inset-0 overflow-hidden">
            <Image
              src={big.cover ?? big.sliderItems[0]?.image}
              alt={big.name}
              fill
              sizes="(max-width: 768px) 100vw, 850px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </CurtainReveal>
        </Link>
        </ViewTransition>
        <CardCaption product={big} />
      </div>

      {/* Small card — 38% width, shorter height (phones: same full-width card) */}
      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1">
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
          className="group relative block cursor-none w-full aspect-[4/3] md:aspect-auto md:h-[300px] [--card-radius:24px] md:[--card-radius:40px] rounded-[var(--card-radius)] overflow-hidden"
        >
          {/* Tall cover fills the card; opens like a curtain as the row scrolls in */}
          <CurtainReveal className="absolute inset-0 overflow-hidden">
            <Image
              src={small.cover ?? small.sliderItems[0]?.image}
              alt={small.name}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </CurtainReveal>
        </Link>
        </ViewTransition>
        <CardCaption product={small} />
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
      className="relative bg-gradient-to-br from-background via-background to-primary/5 pt-16 md:pt-32 pb-20 md:pb-40"
    >
      <div className="container relative z-10 flex flex-col gap-0">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16 text-left">
          <div>
            <MaskReveal
              className="text-display md:text-5xl lg:text-6xl font-light text-white tracking-tight md:leading-[1.1]"
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
        <div className="flex flex-col gap-14 md:gap-12">
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
