"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Quote, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import MaskReveal from "@/components/ui/mask-reveal";
import { DURATION, EASE, VIEWPORT, fadeUp } from "@/lib/motion";

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [100, -100]);
    // The paper sheet settles from slightly inset to full size as it scrolls in
    const sheetScale = useTransform(scrollYProgress, [0, 0.3], [0.94, 1]);

    const testimonials = [
        {
            id: 1,
            name: "Founder, Erichost",
            role: "Web hosting platform",
            text: "I'm thoroughly impressed with Ayush's designing creativity! He brought fresh ideas to our hosting platform and delivered beyond expectations. His creative approach to web design is exactly what Erichost needed.",
            avatar: "/avatar/erichost.jpg"
        },
        {
            id: 2,
            name: "Founder, NinzaHost",
            role: "Web hosting platform",
            text: "Ayush transformed our vision into a stunning web hosting platform. His technical expertise and attention to detail made NinzaHost stand out in the competitive hosting market. The user experience he created is simply outstanding!",
            avatar: "/avatar/ninzahost.png"
        },
        {
            id: 3,
            name: "Anshul Singh",
            role: "Senior Software Engineer",
            text: "I’ve worked with Ayush on multiple projects, and he owns the whole product from the interface and motion down to clean, maintainable code. He picks up anything new remarkably fast, and every team he’s part of ships better because of it.",
            avatar: "/avatar/anshul.jpg"
        },
        {
            id: 4,
            name: "Vishal Vishwakarma",
            role: "CRO at Thomson Reuters",
            text: "Ayush pairs sharp problem-solving with a real eye for product. He consistently delivered high-quality work, took initiative without being asked, and made complex things feel simple for users. I’d recommend him for any serious product build.",
            avatar: "/avatar/vishal.jpg"
        }
    ];

    // Automatic slider
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length, isHovered]);

    return (
        <section ref={sectionRef} id="testimonials" className="relative bg-background px-2 md:px-4 py-4 md:py-8">
            {/* The page's one light surface: a change of chapter before the closing contact section */}
            <motion.div
                data-nav-theme="light"
                data-bp-note="the one light surface = a chapter break"
                data-bp-code='data-nav-theme="light"'
                style={{ scale: sheetScale }}
                className="relative overflow-hidden rounded-[28px] md:rounded-[4rem] bg-paper text-paper-foreground pt-14 md:pt-24 md:pb-6"
            >
            {/* Moving Background Text (Desktop) */}
            <motion.div 
                style={{ x }}
                className="absolute top-20 left-0 whitespace-nowrap text-[14rem] font-bold text-paper-foreground/[0.04] select-none pointer-events-none hidden md:block"
                aria-hidden="true"
                data-nosnippet
            >
                CLIENT FEEDBACK • REAL RESULTS • CLIENT FEEDBACK • REAL RESULTS
            </motion.div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-14 md:pb-0">
                {/* Header */}
                <div className="text-center mb-8 md:mb-32 px-4">
                    <motion.p
                        className="text-brand text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
                        {...fadeUp()}
                    >
                        Success Stories
                    </motion.p>
                    <MaskReveal
                        className="text-[2.2rem] md:text-7xl font-bold tracking-tight text-paper-foreground mb-6"
                        style={{ fontFamily: "'Fraunces', serif" }}
                        delay={0.1}
                        lines={[<>Loved by <span className="text-paper-foreground/45 italic font-light">visionaries<span className="text-brand">.</span></span></>]}
                    />
                </div>

                {/* --- MOBILE AUTO-SLIDING UI --- */}
                <div className="md:hidden relative h-[350px] px-2 grid place-items-center">
                    <AnimatePresence initial={false}>
                        <motion.div 
                            key={activeIndex}
                            className="relative flex flex-col w-full text-center items-center [grid-area:1/1]"
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE.out, delay: 0.12 } }}
                            exit={{ opacity: 0, x: -24, transition: { duration: 0.4, ease: EASE.in } }}
                        >
                            {/* Huge Quote Mark Background */}
                            <Quote className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-24 h-24 text-brand/5 -rotate-6 pointer-events-none" />
                            
                            {/* Floating Index */}
                            <div className="text-brand/40 font-mono text-sm mb-6 tracking-tighter">
                                / 0{activeIndex + 1}
                            </div>

                            {/* Large Typography Text (No Box) */}
                            <p className="text-lg font-light text-paper-foreground/75 leading-relaxed mb-8 italic max-w-[90vw]" style={{ fontFamily: "'Fraunces', serif" }}>
                                "{testimonials[activeIndex].text}"
                            </p>

                            {/* Minimal Author Info */}
                            <div className="flex flex-col items-center">
                                {testimonials[activeIndex].avatar && (
                                    <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-12 h-12 rounded-full mb-3 object-cover border border-paper-foreground/10" />
                                )}
                                <h3 className="text-paper-foreground font-semibold text-base leading-none mb-2">{testimonials[activeIndex].name}</h3>
                                <p className="text-paper-foreground/70 text-xs uppercase tracking-[0.12em]">{testimonials[activeIndex].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Bar Indicators */}
                    <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex gap-3">
                        {testimonials.map((_, i) => (
                            <div 
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-brand' : 'w-2 bg-paper-foreground/10'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* --- DESKTOP ORIGINAL UI (Preserved) --- */}
                <motion.div
                    className="hidden md:grid lg:grid-cols-2 gap-16 md:gap-0 relative min-h-[600px]"
                    {...fadeUp(0.2)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px bg-paper-foreground/10 transform -translate-x-1/2 hidden lg:block"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 }}
                        viewport={VIEWPORT}
                        style={{ transformOrigin: "top" }}
                    >
                        {/* Unique subtle progress indicator on the central line */}
                        <motion.div 
                            className="absolute top-0 left-0 w-full bg-brand rounded-full"
                            initial={false}
                            animate={{
                                height: `${100 / testimonials.length}%`,
                                top: `${(activeIndex / testimonials.length) * 100}%`
                            }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        />
                    </motion.div>

                    {/* Left Testimonial */}
                    <motion.div
                        className="md:p-16 lg:pr-24 grid items-start"
                    >
                        <AnimatePresence initial={false}>
                            <motion.div 
                                key={activeIndex}
                                className="relative w-full [grid-area:1/1]"
                                initial={{ opacity: 0, filter: "blur(6px)", y: 14 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: DURATION.base, ease: EASE.out, delay: 0.15 } }}
                                exit={{ opacity: 0, filter: "blur(6px)", y: -14, transition: { duration: 0.45, ease: EASE.in } }}
                            >
                                <div className="flex items-start gap-4 mb-10">
                                    <p className="text-paper-foreground/80 text-xl lg:text-2xl leading-relaxed italic font-light" style={{ fontFamily: "'Fraunces', serif" }}>
                                        "{testimonials[activeIndex].text}"
                                    </p>
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1 opacity-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-paper-foreground/5 border border-paper-foreground/10 flex items-center justify-center text-paper-foreground/50 overflow-hidden">
                                        {testimonials[activeIndex].avatar ? (
                                            <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-paper-foreground text-base">{testimonials[activeIndex].name}</h3>
                                        <p className="text-paper-foreground/55 text-sm">{testimonials[activeIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Right Testimonial */}
                    <motion.div
                        className="md:px-16 md:pt-16 md:pb-12 lg:pl-24 grid items-end"
                    >
                        <AnimatePresence initial={false}>
                            <motion.div 
                                key={(activeIndex + 1) % testimonials.length}
                                className="relative w-full [grid-area:1/1]"
                                initial={{ opacity: 0, filter: "blur(6px)", y: 14 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: DURATION.base, ease: EASE.out, delay: 0.15 } }}
                                exit={{ opacity: 0, filter: "blur(6px)", y: -14, transition: { duration: 0.45, ease: EASE.in } }}
                            >
                                <div className="flex items-start gap-4 mb-10">
                                    <p className="text-paper-foreground/80 text-xl lg:text-2xl leading-relaxed italic font-light" style={{ fontFamily: "'Fraunces', serif" }}>
                                        "{testimonials[(activeIndex + 1) % testimonials.length].text}"
                                    </p>
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1 opacity-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-paper-foreground/5 border border-paper-foreground/10 flex items-center justify-center text-paper-foreground/50 overflow-hidden">
                                        {testimonials[(activeIndex + 1) % testimonials.length].avatar ? (
                                            <img src={testimonials[(activeIndex + 1) % testimonials.length].avatar} alt={testimonials[(activeIndex + 1) % testimonials.length].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-paper-foreground text-base">{testimonials[(activeIndex + 1) % testimonials.length].name}</h3>
                                        <p className="text-paper-foreground/55 text-sm">{testimonials[(activeIndex + 1) % testimonials.length].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;

