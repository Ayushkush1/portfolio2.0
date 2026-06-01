import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Grid, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { showcaseProjects } from "@/data/projects";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Card = ({ project, i, targetScale, progress }: any) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % project.sliderItems.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + project.sliderItems.length) % project.sliderItems.length);
    };

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 4000); // 4 seconds
        return () => clearInterval(interval);
    }, [project.sliderItems.length]);

    // Smooth out the internal scroll progress for the image parallax
    const smoothImageProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const imageScale = useTransform(smoothImageProgress, [0, 1], [2, 1]);
    
    // progress here is already smoothed from the parent
    const scale = useTransform(progress, [i * 0.25, 1], [1, targetScale]);

    const currentItem = project.sliderItems[currentIndex];

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-6">
            <motion.div
                style={{ scale, top: `calc(${i * 25}px)`, willChange: "transform" }}
                className="relative flex flex-col md:flex-row h-[75vh] md:h-[80vh] w-full max-w-7xl rounded-[2.5rem] bg-gray-950 border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden origin-top"
            >
                {/* Left side info */}
                <div className="w-full md:w-[35%] p-10 md:p-14 flex flex-col justify-between border-r border-white/5 relative z-10 bg-gray-950">
                    <div>
                        <div className="text-[#ff5f26] text-sm md:text-base font-bold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {project.category}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light mb-6 text-white leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                            {project.title}
                        </h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            {project.stats?.map((stat: any, idx: number) => (
                                <div key={idx}>
                                    <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-white/40 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                            {project.techStack?.map((tech: string, idx: number) => (
                                <span key={idx} className="text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <a href={project.url} className="inline-flex items-center gap-3 text-white hover:text-[#ff5f26] transition-colors mt-4 group">
                            <span className="text-lg font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Explore Projects</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Right side image slider */}
                <div className="w-full md:w-[65%] h-full relative overflow-hidden bg-black/50 group/slider">
                    <motion.div style={{ scale: imageScale, willChange: "transform" }} className="w-full h-full relative bg-gray-900">
                        <AnimatePresence>
                            <motion.img 
                                key={currentIndex}
                                src={currentItem.image} 
                                alt={`${project.title} - view ${currentIndex + 1}`}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 0.8, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="w-full h-full object-cover object-top absolute inset-0"
                            />
                        </AnimatePresence>
                    </motion.div>

                    {/* Corner Overlay Link */}
                    <a 
                        href={currentItem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-black/60 hover:border-white/30 transition-all duration-300 shadow-lg z-20 group"
                    >
                        <span className="text-xs font-semibold tracking-wide">{currentItem.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </a>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                        {project.sliderItems.map((_: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#ff5f26] w-8' : 'bg-white/50 hover:bg-white w-2'}`}
                            />
                        ))}
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

    // Make the main scroll progress buttery smooth using physics-based spring
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative bg-background pt-20 pb-40">
            <div className="sticky top-0 h-screen flex items-center justify-center -z-10 pointer-events-none">
                <h2 className="text-[15vw] leading-none font-black text-white/[0.02] tracking-tighter" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    WORK
                </h2>
            </div>
            
            <div className="relative -mt-[100vh] z-10">
                {showcaseProjects.map((project, i) => {
                    const targetScale = 1 - ((showcaseProjects.length + 1 - i) * 0.05); // +1 because we have a final card
                    return (
                        <Card 
                            key={project.id}
                            i={i}
                            project={project}
                            targetScale={targetScale}
                            progress={smoothProgress}
                        />
                    );
                })}

                {/* Final CTA Card for All Projects */}
                <div className="h-screen flex items-center justify-center sticky top-0 px-6">
                    <motion.div
                        style={{ 
                            scale: useTransform(smoothProgress, [1 - 0.25, 1], [1, 1]), 
                            top: `calc(${showcaseProjects.length * 25}px)`,
                            willChange: "transform"
                        }}
                        className="relative flex flex-col items-center justify-center h-[75vh] md:h-[80vh] w-full max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden origin-top group cursor-pointer"
                        onClick={() => navigate('/portfolio')}
                    >
                        <div className="absolute inset-0 bg-[#ff5f26]/0 group-hover:bg-[#ff5f26]/5 transition-colors duration-500" />
                        
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#ff5f26] transition-all duration-500">
                            <Grid className="w-10 h-10 text-white" />
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-light mb-6 text-white text-center" style={{ fontFamily: "'Fraunces', serif" }}>
                            Want to see <span className="font-bold italic">more?</span>
                        </h2>
                        
                        <p className="text-white/60 text-xl md:text-2xl mb-12 text-center max-w-2xl font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Explore the full archive of SaaS platforms, CRM systems, Websites, and UI/UX designs.
                        </p>
                        
                        <motion.div
                            className="group mt-4"
                            whileHover="hover"
                            onClick={() => navigate('/portfolio')}
                        >
                            <Button
                                variant="hero"
                                size="lg"
                                className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)] rounded-full px-4 py-7"
                            >
                                <motion.div
                                    className="bg-white rounded-full p-2.5 flex items-center justify-center mr-3 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_15px_rgba(255,95,38,0.3)]"
                                    animate={{
                                        boxShadow: [
                                            "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0.4)",
                                            "0 0 25px rgba(255, 95, 38, 0.5), 0 0 0 8px rgba(255, 95, 38, 0)",
                                            "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <motion.div>
                                        <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                    </motion.div>
                                </motion.div>
                                <div className="relative overflow-hidden h-6 w-fit text-white">
                                    <motion.div
                                        className="flex flex-col items-center"
                                        variants={{
                                            hover: { y: -24 }
                                        }}
                                        initial={{ y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <span className="w-full flex items-center justify-center text-lg tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                            View All Projects
                                        </span>
                                        <span className="w-full flex items-center justify-center text-lg font-semibold tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                            View All Projects
                                        </span>
                                    </motion.div>
                                </div>

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
                            </Button>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
