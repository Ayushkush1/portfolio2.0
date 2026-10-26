"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@/lib/analytics";
import MaskReveal from "@/components/ui/mask-reveal";
import { ScrollBlurText } from "@/components/ui/scroll-reveal";
import { fadeUp, STAGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax for profile image
            gsap.to(imageRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const experiences = [
        {
            id: 0,
            role: "Tech Lead",
            company: "The Gold Technologies",
            period: " August 2025 → Now"
        },
        {
            id: 1,role: "Freelance Practice",
            company: "Freelance Agency",
            period: "2023 → Now"
            
        },
        {
            id: 2,
            role: "Frontend Developer",
            company: "NinzaHost",
            period: "2024 → 2025"
            
        },
      

    ];

    return (
        <section ref={sectionRef} id="experience" className="relative py-12 pt-16 md:py-24 md:pt-40 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">


            <div className="container relative z-10 max-w-7xl mx-auto md:px-4 pb-8 md:pb-32">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Side - Profile Image & Info */}
                    <div className="lg:-rotate-2 order-1 w-full">
                        <motion.div
                            className="flex flex-col pt-6 lg:pt-12"
                            {...fadeUp()}
                            >
                                                 {/* Profile Image Wrapper for GSAP Parallax */}
                            <div
                                ref={imageRef}
                                className="relative mb-0"
                            >
                                {/* Motion div for Hover lift */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 400, 
                                        damping: 25 
                                    }}
                                >
                                    <div className="w-full md:w-[90%] mx-auto relative rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5 h-[400px] md:h-[500px] lg:h-[560px] scale-95">
                                        <Image src="/assets/ayush-kushwaha.webp" alt="Ayush Kushwaha" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover object-top" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-3 px-2 md:px-12 -mt-2 lg:-mt-4">
                                {/* Name & Title */}
                                <motion.div
                                    className="mb-2"
                                    {...fadeUp(0.2)}
                                >
                                    <h2 className="text-base md:text-lg font-semibold text-foreground">Ayush Kushwaha</h2>
                                    <p className="text-gray-400 text-sm md:text-xs">Product Designer & Full-Stack Engineer</p>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="flex gap-0 md:gap-4 justify-start md:justify-center -ml-2.5 md:ml-0"
                                    {...fadeUp(0.2 + STAGGER)}
                                >

                                    <motion.a
                                        href="https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/"
                                        target="_blank"
                                        aria-label="LinkedIn Profile"
                                        className="flex items-center justify-center w-10 h-10 p-2.5 md:p-0 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Linkedin className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="https://github.com/Ayushkush1"
                                        target="_blank"
                                        aria-label="GitHub Profile"
                                        className="flex items-center justify-center w-10 h-10 p-2.5 md:p-0 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Github className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="https://www.instagram.com/awsm_ayush_/"
                                        target="_blank"
                                        aria-label="Instagram Profile"
                                        className="flex items-center justify-center w-10 h-10 p-2.5 md:p-0 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Instagram className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="mailto:ayushkushwaha381@gmail.com"
                                        onClick={() => track("email_click", { location: "experience" })}
                                        aria-label="Email Me"
                                        className="flex items-center justify-center w-10 h-10 p-2.5 md:p-0 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Mail className="w-full h-full" />
                                    </motion.a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Content */}
                    <motion.div
                        className="order-2 pt-10 pb-6 px-6 lg:pt-24 lg:px-0 w-full bg-white/5 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none rounded-[3rem] md:rounded-none shadow-2xl md:shadow-none"
                    >
                        {/* Header */}
                        <div className="mb-6 md:mb-12">
                            <motion.p
                                className="text-gray-400 text-lg mb-4 italic"
                                {...fadeUp()}
                            >
                                My Experiences
                            </motion.p>
                            <MaskReveal
                                className="text-4xl md:text-5xl lg:text-[3rem] tracking-tight mb-8 leading-[1.1] text-gray-500"
                                style={{ fontFamily: "'Fraunces', serif" }}
                                delay={0.1}
                                lines={[
                                    "Pushing boundaries",
                                    <span key="l2" className="text-white font-normal">since 2023<span className="text-brand">.</span></span>,
                                ]}
                            />

                            {/* Description */}
                            <ScrollBlurText
                                className="text-gray-400 text-[17px] leading-relaxed md:mb-12"
                                text="Building high-performance SaaS platforms, internal business systems, and modern web applications that drive operational efficiency. With a strong focus on scalable architecture and exceptional user experiences."
                            />
                        </div>

                        {/* Experience Table */}
                        <motion.div
                            className="space-y-0 rounded-2xl px-4 shadow-sm"
                        >
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    className="flex justify-between items-start md:items-center gap-4 py-4 border-b border-gray-100/10 last:border-b-0  transition-colors duration-200  px-4 -mx-4"
                                    {...fadeUp(0.25 + index * STAGGER)}
                                >
                                    <div className="min-w-0 md:flex-1">
                                        <p className="font-medium text-gray-100 md:text-gray-200 text-base md:text-sm">
                                            {exp.role}
                                        </p>
                                        <p className="md:hidden mt-0.5 text-gray-400 text-[15px]">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="hidden md:block md:flex-1 text-center">
                                        <p className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="shrink-0 md:flex-1 text-right">
                                        <p className="text-gray-400 text-sm whitespace-nowrap pt-0.5 md:pt-0">
                                            {exp.period.trim()}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>


            </div>
        </section>
    );
};



export default Experience;

