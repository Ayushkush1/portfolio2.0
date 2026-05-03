import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const [activeId, setActiveId] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Reveal header
            gsap.fromTo(headerRef.current, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Reveal background text
            gsap.fromTo(bgTextRef.current, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const processSteps = [
        {
            id: 1,
            number: "01",
            title: "Discovery",
            description: "Everything starts with a deep dive into your vision. I research your market, analyze your competitors, and define the core problem we're solving together.",
            features: ["Market Research", "Stakeholder Interviews", "Goals Definition", "Audience Persona"]
        },
        {
            id: 2,
            number: "02",
            title: "Strategy",
            description: "A solid plan is half the battle. I map out the user journey, define the technical architecture, and create a roadmap that ensures we're building for success.",
            features: ["User Flows", "Information Architecture", "Tech Stack Selection", "Project Roadmap"]
        },
        {
            id: 3,
            number: "03",
            title: "Design",
            description: "Visuals that communicate and convert. I craft high-fidelity designs that blend aesthetics with functionality, ensuring a seamless experience across all touchpoints.",
            features: ["UI/UX Design", "Interactive Prototypes", "Design System", "Visual Identity"]
        },
        {
            id: 4,
            number: "04",
            title: "Development",
            description: "Bringing the vision to life with precision. I build high-performance, scalable applications using modern web technologies and industry best practices.",
            features: ["Frontend Engineering", "API Integration", "Performance Tuning", "Responsive Build"]
        },
        {
            id: 5,
            number: "05",
            title: "Launch",
            description: "Crossing the finish line with confidence. I perform rigorous testing, handle deployment, and ensure your product is ready to make an impact on the world.",
            features: ["Quality Assurance", "SEO Optimization", "Deployment", "Maintenance Plan"]
        }
    ];

    return (
        <section ref={sectionRef} id="process" className="relative py-32 bg-gradient-to-br from-background via-background to-primary/5 overflow-visible">
            {/* Header */}
            <div className="container relative z-20 max-w-7xl mx-auto px-4 mb-32">
                <div ref={headerRef} className="text-center opacity-0">
                    <h2 className="text-6xl md:text-8xl tracking-tight leading-[0.9] mb-8" style={{ fontFamily: "'Fraunces', serif" }}>
                        <span className="text-gray-500 font-light italic block text-3xl md:text-4xl mb-2">Workflow that</span>
                        <span className="text-white font-bold">delivers<span className="text-[#ff5f26]">.</span></span>
                    </h2>
                    <p className="text-gray-500 font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs">
                        A systematic approach to excellence
                    </p>
                </div>
            </div>

            {/* Stacking Cards Container */}
            <div className="container relative z-10 max-w-7xl mx-auto px-4 space-y-[25vh] pb-[25vh]">
                {processSteps.map((step, index) => (
                    <div
                        key={step.id}
                        className="sticky top-[15vh] w-full"
                    >
                        <div 
                            className="w-full min-h-[70vh] flex flex-col justify-center bg-[#0a1120] border border-white/10 rounded-[3rem] p-8 md:p-20 relative overflow-hidden group"
                            style={{ 
                                marginTop: `${index * 32}px`,
                                transform: `scale(${1 - (processSteps.length - index) * 0.015})`,
                            }}
                        >
                            {/* Subtle background number */}
                            <div className="absolute top-1 right-[-5%] text-[20rem] font-bold text-white/[0.02] select-none pointer-events-none italic" style={{ fontFamily: "'Fraunces', serif" }}>
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ff5f26] font-bold">
                                        {step.number}
                                    </div>
                                    <div className="h-px w-24 bg-white/10" />
                                    <span className="text-gray-500 font-bold text-xs tracking-widest uppercase">Phase</span>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-12 items-end">
                                    <div>
                                        <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                                            {step.title}<span className="text-[#ff5f26]">.</span>
                                        </h3>
                                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {step.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-1 h-1 rounded-full bg-[#ff5f26]" />
                                                <span className="text-gray-400 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom glow effect */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5f26]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Background decoration */}
            <div
                ref={bgTextRef}
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 opacity-0"
            >
                Process
            </div>
        </section>
    );
};

export default Process;
