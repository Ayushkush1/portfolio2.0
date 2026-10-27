"use client";
import { motion, MotionValue, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import MaskReveal from "@/components/ui/mask-reveal";
import { ScrollBlurText } from "@/components/ui/scroll-reveal";
import { DURATION, EASE, STAGGER, fadeUp } from "@/lib/motion";

// The big sticky "01" re-renders on its own: the active service lives in a motion value,
// so scrolling into a new service doesn't re-render the whole section and its ~150 animated words
const StickyIndex = ({ active }: { active: MotionValue<number> }) => {
    const [activeId, setActiveId] = useState(active.get());
    useMotionValueEvent(active, "change", setActiveId);
    return (
        <motion.div
            key={activeId}
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
            className="text-[18rem] xl:text-[22rem] leading-none font-bold text-transparent select-none"
            style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.15)",
                fontFamily: "var(--font-fraunces), serif"
            }}
        >
            0{activeId}
        </motion.div>
    );
};

const ServicesSection = () => {
    const activeId = useMotionValue(1);

    const services = [
        {
            id: 1,
            title: "SaaS Product Development",
            description: "End-to-end SaaS platform development from product strategy and system architecture to cloud deployment. I build production-ready platforms designed to launch fast and scale without limits.",
            features: ["Product Strategy", "System Architecture", "Cloud Infrastructure", "Rapid Prototyping"],
        },
        {
            id: 2,
            title: "Product Design & UX",
            description: "Crafting user-centric digital experiences that balance premium aesthetics with functional excellence. Design that converts, retains, and delights users at every interaction.",
            features: ["User Research", "Wireframing & Flows", "Interactive Prototyping", "Design Systems"],
        },
        {
            id: 3,
            title: "Full-Stack Engineering",
            description: "Scalable, high-performance web applications built with modern architectures. From robust backend systems and REST/GraphQL APIs to polished frontend interfaces.",
            features: ["Frontend Engineering", "Backend Systems", "API Development", "Database Design"],
        },
        {
            id: 4,
            title: "Website Modernization",
            description: "Transforming aging websites into modern, high-converting digital assets. Full code modernization, performance optimization, and brand-aligned UI refresh.",
            features: ["UI Refresh", "Code Modernization", "Performance Tuning", "SEO Strategy"],
        },
    ];

    return (
        <section id="services" className="relative pb-8 md:pb-32 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Sticky Scroll Services Section */}
            <div className="container relative z-10 max-w-7xl mx-auto md:px-4">
                <div className="flex flex-col lg:flex-row relative">

                    {/* Left Sticky Number */}
                    <div data-bp-note="sticky index — one chapter per service" data-bp-pos="right" className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center justify-start lg:pl-2 xl:pl-4">
                        <StickyIndex active={activeId} />
                    </div>

                    {/* Right Scrolling Content */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-4 md:pt-20 md:pb-[10vh]">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                className="md:min-h-[60vh] flex flex-col justify-center items-start text-left py-10 md:py-24 border-b border-white/10 md:border-white/5 last:border-0"
                                onViewportEnter={() => activeId.set(service.id)}
                                viewport={{ margin: "-45% 0px -45% 0px" }}
                            >
                                {/* Mobile Number */}
                                <motion.div
                                    className="lg:hidden text-5xl md:text-6xl leading-none font-bold text-transparent mb-4"
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", fontFamily: "var(--font-fraunces), serif" }}
                                    {...fadeUp()}
                                >
                                    0{service.id}<span className="text-brand">.</span>
                                </motion.div>

                                <MaskReveal
                                    className="text-[2rem] leading-[1.1] md:text-5xl md:leading-normal font-medium mb-4 md:mb-6 tracking-tight text-white"
                                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                                    lines={[<>{service.title}<span className="text-brand ml-1">.</span></>]}
                                />

                                <ScrollBlurText
                                    className="text-gray-400 text-[17px] md:text-xl mb-7 md:mb-10 max-w-lg leading-relaxed"
                                    text={service.description}
                                />

                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 md:gap-y-6 md:gap-x-12 w-full md:w-auto">
                                    {service.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex items-baseline text-gray-300 md:text-gray-400 group cursor-default transition-all duration-300 hover:translate-x-2"
                                            {...fadeUp(0.25 + idx * STAGGER)}
                                        >
                                            <span className="text-[13px] md:text-xs mr-2 md:mr-4 font-mono text-brand/80 md:text-brand/60 shrink-0 group-hover:text-brand transition-all duration-300">
                                                / 0{idx + 1}
                                            </span>
                                            <span className="text-[15px] md:text-base leading-snug group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/10 pb-1">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

