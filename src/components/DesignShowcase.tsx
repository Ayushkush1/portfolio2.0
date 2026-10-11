"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import GridMotion from "./GridMotion";
import MaskReveal from "./ui/mask-reveal";
import { fadeUp } from "@/lib/motion";

// Every image shows once across the two fully-visible middle rows:
// the first half goes in the upper middle row, the rest in the lower one.
// The top & bottom rows reuse these automatically, so just add or remove lines here.
const designs = [
    "/assets/AgencyOS_1.webp",
    "/assets/Catfy_LandignPage1.webp",
    "/assets/TheSevenStar_LandingPage1.webp",
    "/assets/Karatrix_LandingPage1.webp",
    "/assets/sites/kokalachi.webp",
    "/assets/sites/little-flower-schools.webp",
    "/assets/CodignPanda_LandignPage1.webp",
    "/assets/Leadzenor_LandingPage1.webp",
    "/assets/sites/cp-atlas.webp",
    "/assets/Erp_LandinPage1.webp",
    "/assets/sites/coding-pandas-studio.webp",
    "/assets/EricHost1.webp",
    "/assets/sites/neatroots.webp",
    "/assets/sites/seven-stars.webp",
    "/assets/sites/coding-pandas.webp",
];

const DesignShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section id="design" ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10 mb-10 md:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                       
                        <MaskReveal
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                            lines={[
                                "Elevating user",
                                <span key="l2" className="italic text-gray-400">
                                    experiences<span className="text-brand">.</span>
                                </span>,
                            ]}
                        />
                    </div>
                    <motion.p
                        className="text-gray-400 max-w-md font-normal leading-relaxed md:text-right"
                        {...fadeUp(0.2)}
                    >
                        From wireframes to highly polished interfaces, I craft designs that balance beautiful aesthetics with frictionless functionality.
                    </motion.p>
                </div>
            </div>

            {/* Interactive GridMotion Container */}
            <div className="w-full h-[500px] md:h-[700px] relative z-20">
                <GridMotion items={designs} gradientColor="transparent" />
            </div>
        </section>
    );
};

export default DesignShowcase;

