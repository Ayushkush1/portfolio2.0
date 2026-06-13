import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { featuredProducts, FeaturedProduct } from "@/data/projects";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product, i, targetScale, progress }: { product: FeaturedProduct; i: number; targetScale: number; progress: any }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % product.sliderItems.length);

    useEffect(() => {
        if (product.sliderItems.length <= 1) return;
        const interval = setInterval(nextImage, 4000);
        return () => clearInterval(interval);
    }, [product.sliderItems.length]);

    const smoothImageProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const imageScale = useTransform(smoothImageProgress, [0, 1], [1.05, 1]);
    const scale = useTransform(progress, [i * 0.25, 1], [1, targetScale]);
    const currentItem = product.sliderItems[currentIndex];

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-6">
            <motion.div
                style={{ scale, top: `calc(${i * 25}px)`, willChange: "transform" }}
                className="relative flex flex-col md:flex-row p-8 md:p-12 h-auto w-full max-w-7xl mx-auto rounded-[2.5rem] bg-[#0A0F1A] border border-white/10 shadow-2xl overflow-hidden origin-top gap-8 md:gap-16"
            >
                {/* Left/Middle Column: Image Slider */}
                <div className="w-full md:flex-1 flex flex-col justify-center h-full">
                    <div className="w-full relative aspect-[16/10] rounded-[2rem] overflow-hidden group/slider bg-[#060A13] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <motion.div style={{ scale: imageScale, willChange: "transform" }} className="w-full h-full relative">
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
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="w-full h-full object-cover absolute inset-0"
                                />
                            </AnimatePresence>
                        </motion.div>

                        {/* Corner label inside image */}
                        <a
                            href={currentItem.url !== "#" ? currentItem.url : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-black/60 hover:border-white/30 transition-all duration-300 shadow-lg z-20 group"
                        >
                            <span className="text-[10px] md:text-xs font-semibold tracking-wide">{currentItem.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        </a>

                        {/* Pagination Dots */}
                        {product.sliderItems.length > 1 && (
                            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                                {product.sliderItems.map((_: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-5 md:w-6' : 'bg-white/40 hover:bg-white/80 w-1.5'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:flex-none md:w-[320px] xl:w-[400px] flex flex-col h-full py-4 md:py-8 pr-4 md:pr-8">
                    {/* Top Content */}
                    <div className="flex flex-col justify-start">
                        {/* Elegant Category Tag */}
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-6 h-[1px] bg-brand/40"></span>
                            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-brand/90">
                                {product.category}
                            </span>
                        </div>

                        {/* Premium Title */}
                        <h2 
                            className="text-4xl md:text-5xl font-light mb-6 text-white leading-[1.1] tracking-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            {product.name}
                        </h2>
                        
                        {/* Minimal Description */}
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-light">
                            {product.solution}
                        </p>

                        {/* Additional Content: Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {product.techStack.slice(0, 3).map((tech, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[10px] md:text-xs text-white/50 tracking-wider uppercase"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Action (Pinned to bottom) */}
                    <div className="mt-auto pt-8 border-t border-white/5">
                        <a 
                            href="/work" 
                            className="group flex items-center justify-between w-full text-white/60 hover:text-brand transition-colors"
                        >
                            <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">Explore Project</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Showcase = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section ref={containerRef} id="work" className="relative bg-background pt-20 pb-40">
            <div className="sticky top-0 h-screen flex items-center justify-center -z-10 pointer-events-none">
                <h2 className="text-[15vw] leading-none font-black text-white/[0.015] tracking-tighter" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    PRODUCTS
                </h2>
            </div>

            <div className="relative -mt-[100vh] z-10">
                {featuredProducts.map((product, i) => {
                    const targetScale = 1 - ((featuredProducts.length + 1 - i) * 0.05);
                    return (
                        <ProductCard
                            key={product.id}
                            i={i}
                            product={product}
                            targetScale={targetScale}
                            progress={smoothProgress}
                        />
                    );
                })}

                {/* Final CTA Card */}
                <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-6">
                    <motion.div
                        style={{
                            top: `calc(${featuredProducts.length * 25}px)`,
                            willChange: "transform"
                        }}
                        className="relative flex flex-col items-center justify-center h-[80vh] w-full max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden group cursor-pointer"
                        onClick={() => navigate('/work')}
                    >
                        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors duration-500" />

                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand transition-all duration-500">
                            <Layers className="w-9 h-9 text-white" />
                        </div>

                        <h2 className="text-5xl md:text-7xl font-light mb-6 text-white text-center" style={{ fontFamily: "'Fraunces', serif" }}>
                            Full Case <span className="font-bold italic">Studies</span>
                        </h2>

                        <p className="text-white/50 text-xl md:text-2xl mb-12 text-center max-w-2xl font-light">
                            Deep-dive into architecture, design decisions, and technical challenges behind each product.
                        </p>

                        <motion.div className="group mt-4" whileHover="hover" onClick={(e) => { e.stopPropagation(); navigate('/work'); }}>
                            <Button
                                variant="hero"
                                size="lg"
                                className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)] rounded-full px-4 py-7"
                            >
                                <motion.div
                                    className="bg-white rounded-full p-2.5 flex items-center justify-center mr-3 group-hover:bg-orange-50 transition-colors duration-300"
                                    animate={{
                                        boxShadow: [
                                            "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0.4)",
                                            "0 0 25px rgba(255, 95, 38, 0.5), 0 0 0 8px rgba(255, 95, 38, 0)",
                                            "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                </motion.div>
                                <div className="relative overflow-hidden h-6 w-fit text-white">
                                    <motion.div
                                        className="flex flex-col items-center"
                                        variants={{ hover: { y: -24 } }}
                                        initial={{ y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <span className="w-full flex items-center justify-center text-lg tracking-wide">Explore All Work</span>
                                        <span className="w-full flex items-center justify-center text-lg font-semibold tracking-wide">Explore All Work</span>
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
