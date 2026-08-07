"use client";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
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
        <section ref={sectionRef} id="experience" className="relative py-12 pt-20 md:py-24 md:pt-40 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">


            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-12 md:pb-32">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Side - Profile Image & Info */}
                    <div className="lg:-rotate-2 order-1 w-full">
                        <motion.div
                            className="flex flex-col pt-6 lg:pt-12"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
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
                                        <img src="assets/ayush-kushwaha.webp" className="w-full h-full object-cover object-top" alt="Ayush Kushwaha" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex justify-between px-4 md:px-12 -mt-2 lg:-mt-4">
                                {/* Name & Title */}
                                <motion.div
                                    className="mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-base md:text-lg font-semibold text-foreground">Ayush Kushwaha</h2>
                                    <p className="text-gray-500 text-[11px] md:text-xs">SaaS Engineer & Product Builder</p>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="flex gap-3 md:gap-4 justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                    viewport={{ once: true }}
                                >

                                    <motion.a
                                        href="https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/"
                                        target="_blank"
                                        aria-label="LinkedIn Profile"
                                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
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
                                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
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
                                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
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
                                        aria-label="Email Me"
                                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-colors duration-300"
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
                        className="order-2 pt-10 pb-8 px-6 lg:pt-24 lg:px-0 w-full bg-white/5 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none rounded-[3rem] md:rounded-none shadow-2xl md:shadow-none"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Header */}
                        <div className="mb-12">
                            <motion.p
                                className="text-gray-400 text-lg mb-4 italic"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                My Experiences
                            </motion.p>
                            <motion.h2
                                className="text-4xl md:text-5xl lg:text-[3rem] tracking-tight mb-8 leading-[1.1] text-gray-500"
                                style={{ fontFamily: "'Fraunces', serif" }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Pushing boundaries{" "}
                                <span className="text-white font-normal">since 2023<span className="text-[#ff5f26] text-[3rem]">.</span></span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                className="text-gray-600 text-[17px] leading-relaxed mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Building high-performance SaaS platforms, internal business systems, and modern web applications that drive operational efficiency. With a strong focus on scalable architecture and exceptional user experiences.
                            </motion.p>
                        </div>

                        {/* Experience Table */}
                        <motion.div
                            className="space-y-0 rounded-2xl px-4 shadow-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    className="flex justify-between items-center py-4 border-b border-gray-100/10 last:border-b-0  transition-colors duration-200  px-4 -mx-4"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-[40%] md:flex-1">
                                        <p className="font-medium text-gray-200 text-[10px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                            {exp.role}
                                        </p>
                                    </div>
                                    <div className="w-[30%] md:flex-1 text-center">
                                        <p className="text-gray-500 text-[10px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="w-[30%] md:flex-1 text-right">
                                        <p className="text-gray-400 text-[10px] md:text-sm whitespace-nowrap">
                                            {exp.period}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>


            </div>

            {/* Background decoration */}
            <div
                ref={bgTextRef}
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 hidden md:block"
            >
                Experience
            </div>
        </section>
    );
};



export default Experience;

