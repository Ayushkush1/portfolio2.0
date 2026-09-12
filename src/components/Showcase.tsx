"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredProducts, FeaturedProduct } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Single card: image only + text BELOW ─────────────────── */
function ProjectCard({
  product,
  className = "",
}: {
  product: FeaturedProduct;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Card — image only, fully rounded */}
      <Link
        href={`/work/${product.id}`}
        className="group relative block overflow-hidden rounded-[20px] cursor-none w-full flex-1 min-h-0"
        style={{ borderRadius: "20px" }}
      >
        <img
          src={product.sliderItems[0]?.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </Link>

      {/* Text BELOW the card — floating outside */}
      <div>
        <h3
          className="text-xl md:text-2xl font-light text-white leading-tight tracking-tight"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {product.name}
        </h3>
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand/80 mt-1">
          {product.category}
        </p>
      </div>
    </div>
  );
}

/* ─── Row: big card + small card, text below each ──────────── */
function ShowcaseRow({
  big,
  small,
  reverse = false,
}: {
  big: FeaturedProduct;
  small: FeaturedProduct;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`flex gap-6 md:gap-10 w-full items-start ${reverse ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Big card — 62% width, taller */}
      <div className="flex flex-col gap-4" style={{ flex: "0 0 62%" }}>
        <Link
          href={`/work/${big.id}`}
          className="group relative block cursor-none w-full h-[340px] md:h-[500px]"
          style={{ borderRadius: "40px", overflow: "hidden" }}
        >
          {/* Full-width fit — shows complete hero, crops from bottom only */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={big.sliderItems[0]?.image}
              alt={big.name}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ display: 'block' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        </Link>
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
        <Link
          href={`/work/${small.id}`}
          className="group relative block cursor-none w-full h-[210px] md:h-[300px]"
          style={{ borderRadius: "40px", overflow: "hidden" }}
        >
          {/* Full-width fit — shows complete hero, crops from bottom only */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={small.sliderItems[0]?.image}
              alt={small.name}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ display: 'block' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        </Link>
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
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Selected products <br />
              <span className="italic text-gray-400">
                built to scale<span className="text-brand">.</span>
              </span>
            </h2>
          </div>

          <motion.div className="w-fit" whileHover="hover">
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
                <motion.div
                  className="bg-white rounded-full p-1.5 flex items-center justify-center ml-2.5 bg-orange-50 transition-colors duration-300 shadow-[0_0_10px_rgba(255,95,38,0.2)]"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 95, 38, 0.2), 0 0 0 0 rgba(255, 95, 38, 0)",
                      "0 0 18px rgba(255, 95, 38, 0.4), 0 0 0 6px rgba(255, 95, 38, 0)",
                      "0 0 10px rgba(255, 95, 38, 0.2), 0 0 0 0 rgba(255, 95, 38, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-3.5 w-3.5 text-[#ff5f26] transition-all group-hover/btn:rotate-0 -rotate-45 duration-300" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
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
            />
          ))}
        </div>
      </div>

      {/* Background watermark */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none pb-5 text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Projects
      </motion.div>
    </section>
  );
};

export default Showcase;
