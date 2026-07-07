import { motion } from "framer-motion";
import { useRef } from "react";
import GridMotion from "./GridMotion";

const designs = [
    "/assets/Catfy_LandignPage1.webp",
    "/assets/Erp_Dashboard.webp",
    "/assets/Leadzenor_Dashboard.webp",
    "/assets/Karatrix_LandingPage1.webp",
    "/assets/TheSevenStar_LandingPage.webp",
    "/assets/EricHost1.webp",
];

const DesignShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);

    // Create 28 items by repeating designs
    const gridItems = Array.from({ length: 28 }, (_, index) => {
        return designs[index % designs.length];
    });

    return (
        <section id="design" ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10 mb-10 md:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
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
                            Elevating user{" "}
                            <br className="hidden md:block" />
                            <span 
                                className="italic text-gray-400" 
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                experiences<span className="text-[#ff5f26]">.</span>
                            </span>
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

            {/* Interactive GridMotion Container */}
            <div className="w-full h-[600px] md:h-[700px] relative z-20">
                <GridMotion items={gridItems} gradientColor="transparent" />
            </div>
        </section>
    );
};

export default DesignShowcase;
