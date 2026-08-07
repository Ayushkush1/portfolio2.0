"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProducts, FeaturedProduct } from "@/data/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product, index }: { product: FeaturedProduct; index: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % product.sliderItems.length);

    useEffect(() => {
        if (product.sliderItems.length <= 1) return;
        const interval = setInterval(nextImage, 4000);
        return () => clearInterval(interval);
    }, [product.sliderItems.length]);

    const currentItem = product.sliderItems[currentIndex];

    return (
        <div ref={containerRef} className="h-auto w-full flex items-start md:items-center justify-center relative showcase-card-wrapper py-3 md:py-24 lg:py-16">
            <motion.div
                style={{ scale, opacity, y }}
                whileHover="hover"
                className={`relative flex flex-col md:flex-row h-auto w-full mx-auto gap-5 md:gap-8 group ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
                {/* Image Column — tappable link on mobile, static on desktop */}
                <Link
                    href={`/work/${product.id}`}
                    className="w-full md:flex-1 flex flex-col justify-center h-full -mx-4 md:mx-0 md:pointer-events-none"
                    style={{ width: 'calc(100% + 2rem)' }}
                >
                    <div className="w-full relative rounded-2xl md:rounded-[3rem] overflow-hidden group/slider shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <div className="w-full h-auto relative">
                            <img src={product.sliderItems[0].image} className="w-full h-[190px] md:h-auto invisible block" alt="" />
                            <AnimatePresence>
                                <motion.img
                                    key={currentIndex}
                                    src={currentItem.image}
                                    alt={`${product.name} - ${currentItem.name}`}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.0, ease: "easeInOut" }}
                                    className="w-full h-full object-cover object-top absolute inset-0"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Pagination Dots */}
                        {product.sliderItems.length > 1 && (
                            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                                {product.sliderItems.map((_: any, idx: number) => (
                                    <button
                                        key={idx}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                                        className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? "bg-brand w-4" : "bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Mobile tap hint overlay */}
                        <div className="absolute inset-0 bg-black/0 md:hidden" aria-hidden="true" />
                    </div>
                </Link>

                {/* Right Column: Content */}
                <div className="w-full md:flex-none md:w-[250px] xl:w-[250px] flex flex-col h-full py-0 md:py-8">
                    {/* Top Content */}
                    <div className="flex flex-col justify-start">
                        {/* Mobile: category inline with title | Desktop: category above title */}
                        <div className="flex items-start justify-between gap-2 mb-2 md:hidden">
                            <h3
                                className="text-2xl font-light text-white leading-[1.1] tracking-tight"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                {product.name}
                            </h3>
                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand/90 mt-1 shrink-0">
                                {product.category}
                            </span>
                        </div>

                        {/* Desktop only: category above title */}
                        <div className="hidden md:block">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand/90">
                                    {product.category}
                                </span>
                            </div>
                            <h3
                                className="text-5xl font-light mb-6 text-white leading-[1.1] tracking-tight"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                {product.name}
                            </h3>
                        </div>

                        {/* Minimal Description */}
                        <p className="text-gray-500 text-xs md:text-base leading-relaxed mb-3 md:mb-8 font-light line-clamp-2 md:line-clamp-none">
                            {product.solution}
                        </p>

                        {/* Additional Content: Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-8">
                            {product.techStack.slice(0, 3).map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[10px] md:text-[10px] text-white/50 tracking-wider uppercase"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Action — hidden on mobile, shown on desktop */}
                    <div className="hidden md:block md:mt-auto md:pt-8 md:border-t border-white/5">
                        <motion.div className="w-fit" whileHover="hover">
                            <Button
                                variant="hero"
                                size="lg"
                                className="group/btn flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)] pl-5 pr-2 w-fit h-12"
                                asChild
                            >
                                <Link href={`/work/${product.id}`}>
                                    <div className="relative overflow-hidden h-6 w-fit text-white">
                                        <motion.div
                                            className="flex flex-col items-center"
                                            variants={{
                                                hover: { y: -24 }
                                            }}
                                            initial={{ y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <span className="w-full flex items-center justify-center whitespace-nowrap text-sm font-medium h-6 leading-6">
                                                Explore Case Study
                                            </span>
                                            <span className="w-full flex items-center justify-center font-semibold whitespace-nowrap text-sm h-6 leading-6">
                                                Explore Case Study
                                            </span>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="bg-white rounded-full p-1.5 flex items-center justify-center ml-2.5 bg-orange-50 transition-colors duration-300 shadow-[0_0_10px_rgba(255,95,38,0.3)]"
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)",
                                                "0 0 18px rgba(255, 95, 38, 0.5), 0 0 0 6px rgba(255, 95, 38, 0)",
                                                "0 0 10px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <ArrowRight className="h-3.5 w-3.5 text-[#ff5f26] transition-all group-hover/btn:rotate-0 -rotate-45 duration-300" />
                                    </motion.div>

                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2
                                        }}
                                    />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Showcase = () => {
    return (
        <section id="work" className="relative bg-gradient-to-br from-background via-background to-primary/5 py-24 md:pt-32">
            <div className="container relative z-10 flex flex-col gap-0">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-4 md:mb-14 text-center md:text-left">
                    <div>
                        <p className="text-brand text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
                            Case Studies
                        </p>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Selected products <br />
                            <span className="italic text-gray-400">built to scale<span className="text-brand">.</span></span>
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
                                        variants={{
                                            hover: { y: -24 }
                                        }}
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
                                            "0 0 10px rgba(255, 95, 38, 0.2), 0 0 0 0 rgba(255, 95, 38, 0)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <ArrowRight className="h-3.5 w-3.5 text-[#ff5f26] transition-all group-hover/btn:rotate-0 -rotate-45 duration-300 duration-300" />
                                </motion.div>

                                {/* Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1.5
                                    }}
                                />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Projects List */}
                {featuredProducts.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                    />
                ))}


            </div>

            {/* Background section name */}
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
