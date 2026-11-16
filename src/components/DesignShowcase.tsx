"use client";
import { useRef } from "react";
import GridMotion from "./GridMotion";
import MaskReveal from "./ui/mask-reveal";
import { ScrollBlurText } from "@/components/ui/scroll-reveal";

// Every image shows once across the two fully-visible middle rows:
// the first half goes in the upper middle row, the rest in the lower one.
// The outer rows reuse these automatically, so just add or remove lines here.
// `alt` describes the design for screen readers and image search.
const designs = [
    { src: "/assets/AgencyOS_1.webp", alt: "AgencyOS agency management dashboard with revenue, profit and project status" },
    { src: "/assets/Catfy_LandignPage1.webp", alt: "CATFY digital catalogue builder landing page" },
    { src: "/assets/TheSevenStar_LandingPage1.webp", alt: "Seven Stars pub and restaurant website homepage" },
    { src: "/assets/Karatrix_LandingPage1.webp", alt: "Karatrix jewellery inventory SaaS landing page" },
    { src: "/assets/sites/kokalachi.webp", alt: "Kokalachi group travel website homepage" },
    { src: "/assets/sites/little-flower-schools.webp", alt: "Little Flower Schools education website homepage" },
    { src: "/assets/CodignPanda_LandignPage1.webp", alt: "Coding Pandas coding courses landing page" },
    { src: "/assets/Leadzenor_LandingPage1.webp", alt: "Leadzenor QR lead capture SaaS landing page" },
    { src: "/assets/ServEye_1.webp", alt: "ServEye server and website monitoring dashboard" },
    { src: "/assets/sites/cp-atlas.webp", alt: "CP Atlas startup workspace SaaS landing page" },
    { src: "/assets/Erp_LandinPage1.webp", alt: "IP ERP platform landing page" },
    { src: "/assets/sites/coding-pandas-studio.webp", alt: "Coding Pandas Studio software agency website" },
    { src: "/assets/EricHost1.webp", alt: "Erichost web hosting website homepage" },
    { src: "/assets/sites/neatroots.webp", alt: "NeatRoots app development studio website" },
    { src: "/assets/sites/seven-stars.webp", alt: "Seven Stars pub website, dining and events sections" },
    { src: "/assets/sites/coding-pandas.webp", alt: "Coding Pandas EdTech website homepage" },
];

const DesignShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section id="design" ref={containerRef} className="py-16 md:py-32 bg-background relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-5 md:px-12 xl:px-16 relative z-10 mb-10 md:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 md:gap-8">
                    <div>
                       
                        <MaskReveal
                            className="text-display md:text-5xl lg:text-6xl font-light text-white tracking-tight md:leading-[1.1]"
                            style={{ fontFamily: "var(--font-fraunces), serif" }}
                            lines={[
                                "Elevating user",
                                <span key="l2" className="italic text-gray-400">
                                    experiences<span className="text-brand">.</span>
                                </span>,
                            ]}
                        />
                    </div>
                    <ScrollBlurText
                        className="text-gray-400 text-[17px] md:text-base max-w-md font-normal leading-relaxed md:text-right"
                        text="From wireframes to highly polished interfaces, I craft designs that balance beautiful aesthetics with frictionless functionality."
                    />
                </div>
            </div>

            {/* Interactive GridMotion Container */}
            <div
                data-bp-skip
                data-bp-note="endless marquee: never slows, never reverses"
                data-bp-code="gsap.ticker + utils.wrap()"
                className="w-full h-[540px] md:h-[900px] relative z-20"
            >
                <GridMotion items={designs} gradientColor="transparent" />
            </div>
        </section>
    );
};

export default DesignShowcase;

