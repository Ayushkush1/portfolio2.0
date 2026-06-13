import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const designs = [
    { src: "/assets/Catfy_LandignPage.png", alt: "Catfy Landing Page", title: "Catfy Landing Page" },
    { src: "/assets/Erp_Dashboard.png", alt: "ERP Dashboard", title: "ERP Dashboard" },
    { src: "/assets/Leadzenor_Dashboard.png", alt: "Leadzenor Dashboard", title: "Leadzenor Dashboard" },
    { src: "/assets/Karatrix_LandingPage.png", alt: "Karatrix Landing Page", title: "Karatrix Landing Page" },
    { src: "/assets/TheSevenStar_LandingPage.png", alt: "The Seven Star Landing Page", title: "The Seven Star" },
    { src: "/assets/EricHost.png", alt: "EricHost Platform", title: "EricHost Platform" },
];

const DesignShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We move the rows in opposite directions as the user scrolls down
    // Row 1 moves left
    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    // Row 2 moves right
    const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

    // Create longer arrays by duplicating the designs so they don't run out of content while scrolling
    const row1 = [...designs.slice(0, 3), ...designs.slice(0, 3), ...designs.slice(0, 3), ...designs.slice(0, 3)];
    const row2 = [...designs.slice(3, 6), ...designs.slice(3, 6), ...designs.slice(3, 6), ...designs.slice(3, 6)];

    return (
        <section id="design" ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.p
                            className="text-brand text-sm md:text-base font-semibold tracking-widest uppercase mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Design Portfolio
                        </motion.p>
                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Elevating user <br className="hidden md:block" /> experiences.
                        </motion.h2>
                    </div>
                    <motion.p 
                        className="text-gray-500 max-w-md font-light leading-relaxed md:text-right"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        From wireframes to highly polished interfaces, I craft designs that balance beautiful aesthetics with frictionless functionality.
                    </motion.p>
                </div>
            </div>

            {/* Scrolling Marquee Rows */}
            <div className="flex flex-col gap-6 md:gap-8 relative w-full mt-10 md:mt-16">
                {/* Edge fading gradients for that premium smooth cutoff effect */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                {/* Top Row (Scrolls Left) */}
                <motion.div style={{ x: x1 }} className="flex gap-6 md:gap-8 w-max pl-4 md:pl-0">
                    {row1.map((design, i) => (
                        <div key={`r1-${i}`} className="w-[260px] md:w-[420px] shrink-0 group relative rounded-3xl overflow-hidden border border-white/5 bg-[#060A13] shadow-2xl">
                            <div className="aspect-[16/10] w-full overflow-hidden">
                                <img 
                                    src={design.src} 
                                    alt={design.alt} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            
                            {/* Base Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                            
                            {/* Beautiful Hover Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                                <div className="flex justify-end">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-100">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-brand text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                        UI/UX Design
                                    </span>
                                    <h3 className="text-white font-medium text-xl md:text-2xl tracking-wide leading-tight">
                                        {design.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Row (Scrolls Right) */}
                <motion.div style={{ x: x2 }} className="flex gap-6 md:gap-8 w-max pl-4 md:pl-0">
                    {row2.map((design, i) => (
                        <div key={`r2-${i}`} className="w-[260px] md:w-[420px] shrink-0 group relative rounded-3xl overflow-hidden border border-white/5 bg-[#060A13] shadow-2xl">
                            <div className="aspect-[16/10] w-full overflow-hidden">
                                <img 
                                    src={design.src} 
                                    alt={design.alt} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            
                            {/* Base Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                            
                            {/* Beautiful Hover Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                                <div className="flex justify-end">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-100">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-brand text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                        UI/UX Design
                                    </span>
                                    <h3 className="text-white font-medium text-xl md:text-2xl tracking-wide leading-tight">
                                        {design.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DesignShowcase;
