"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, animate, AnimatePresence, useReducedMotion } from "framer-motion";

import { useRef, useEffect, useState, Fragment } from "react";

import VariableProximity from "./VariableProximity";
import { track } from "@/lib/analytics";


const CountUp = ({ to, duration = 2 }: { to: number, duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, to, { duration: duration, ease: "easeOut", delay: 1.2 });
        return animation.stop;
    }, [count, to, duration]);

    return <motion.span>{rounded}</motion.span>;
};

const ROTATING_WORDS = ["startup MVPs", "SaaS products", "custom CRMs", "ERP systems"];

// Renders "&" in the sans face so the serif ampersand doesn't pull focus
const withQuietAmpersand = (text: string) =>
    text.split(/(&)/).map((part, i) =>
        part === "&" ? (
            <span key={i} className="font-extralight" style={{ fontFamily: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)" }}>&amp;</span>
        ) : (
            <Fragment key={i}>{part}</Fragment>
        )
    );

// Bold hero line: plays the shared char intro first, then cycles through ROTATING_WORDS
const RotatingLine = ({ renderIntro }: { renderIntro: (text: string) => React.ReactNode }) => {
    const [index, setIndex] = useState(0);
    const [hasCycled, setHasCycled] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        let interval: ReturnType<typeof setInterval>;
        const start = setTimeout(() => {
            interval = setInterval(() => {
                setHasCycled(true);
                setIndex((i) => (i + 1) % ROTATING_WORDS.length);
            }, 2800);
        }, 1800);
        return () => {
            clearTimeout(start);
            clearInterval(interval);
        };
    }, [reduceMotion]);

    return (
        <span className="relative block w-full overflow-hidden pb-2 -mb-2">
            <span className="sr-only">{ROTATING_WORDS.join(", ")}</span>
            <AnimatePresence mode="wait" initial={false}>
                {!hasCycled ? (
                    <motion.span key="intro" className="block whitespace-nowrap" aria-hidden="true" exit={{ y: "-100%", opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}>
                        {renderIntro(ROTATING_WORDS[0])}
                    </motion.span>
                ) : (
                    <motion.span
                        key={index}
                        className="block whitespace-nowrap"
                        aria-hidden="true"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                        exit={{ y: "-100%", opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
                    >
                        {withQuietAmpersand(ROTATING_WORDS[index])}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const openWhatsApp = () => {
        const phoneNumber = "918738954475";
        const message = "Hello Ayush, I'm interested in your services.";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        track("whatsapp_click", { location: "hero" });
        window.open(whatsappURL, '_blank');
    };


    const HEADLINE = ["I design & build", ROTATING_WORDS[0], "and premium websites."];
    // Global letter index per line, so the stagger runs across the whole headline
    const lineStart = HEADLINE.map((_, i) =>
        HEADLINE.slice(0, i).reduce((n, l) => n + l.replace(/ /g, "").length, 0)
    );

    // CSS-driven letter reveal: starts on first paint, no JavaScript needed
    const renderChars = (line: string, lineIdx: number) => {
        let n = lineStart[lineIdx];
        return line.split(" ").map((word, wordIdx, array) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                    <span
                        key={charIdx}
                        className={`hero-char ${char === '.' && lineIdx === 2 ? 'text-brand not-italic font-bold' : ''} ${char === '&' ? 'font-extralight' : ''}`}
                        style={{
                            animationDelay: `${0.1 + n++ * 0.02}s`,
                            ...(char === '&' ? { fontFamily: 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)' } : {}),
                        }}
                    >
                        {char}
                    </span>
                ))}
                {wordIdx !== array.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
        ));
    };

    return (
        <section id="home" ref={containerRef} aria-label="Hero – Product Designer & Full-Stack Engineer" className="relative overflow-hidden pt-[7rem] md:pt-24">
            {/* Ambient brand light */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(70% 70% at 70% 40%, hsl(var(--brand) / 0.25) 0%, transparent 60%)",
                }}
            />

            <div className="container relative z-10 grid min-h-[70vh] lg:min-h-[80vh] grid-cols-1 items-start md:items-center lg:gap-10 md:gap-4 gap-8 pt-8 md:pt-36 pb-12 md:pb-40 md:py-20 md:grid-cols-2">
                {/* Left copy */}
                <div className="hero-left">
                    <h1 className="text-[2.2rem] sm:text-[2.6rem] lg:text-6xl font-bold leading-tight tracking-tight max-w-xl flex flex-wrap">
                        {HEADLINE.map((line, lineIdx) => (
                            <span
                                key={lineIdx}
                                className={`block w-full ${lineIdx === 0 ? "pb-2" : "-mb-1"} ${lineIdx === 0 || lineIdx === 2 ? "text-gray-400  pt-2 font-light" : "text-white"}`}
                                style={lineIdx === 2 || lineIdx === 0 ? { fontFamily: "'Fraunces', serif" } : undefined}
                            >
                                {lineIdx === 1 ? (
                                    <RotatingLine renderIntro={(text) => renderChars(text, lineIdx)} />
                                ) : (
                                    renderChars(line, lineIdx)
                                )}
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Right side - portrait and bio */}
                <div className="hero-right flex flex-col items-start justify-center -mt-8 md:mt-0 gap-4 md:gap-6 md:items-end w-full">
                    <div className="hero-intro w-full max-w-full md:max-w-[310px] flex flex-col gap-2 md:gap-4 md:text-right">
                        <motion.div
                            className="flex gap-8 w-full justify-start md:justify-end pb-4 md:pb-2 md:border-b md:border-white/5 order-2 md:order-1"
                            variants={{
                                hidden: { opacity: 0.001 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.2, delayChildren: 1.0 }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div
                                className="flex flex-col justify-center items-start md:items-end p-0"
                                variants={{
                                    hidden: { opacity: 0.001, scale: 0.8, y: 15 },
                                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
                                }}
                            >
                                <span className="text-2xl md:text-3xl font-black text-white flex items-start">
                                    <CountUp to={20} /><span className="text-brand text-xl font-black ml-[2px] mt-[2px]">+</span>
                                </span>
                                <span className="text-[10px] uppercase leading-3 text-gray-400/60 tracking-wide font-medium mt-1">Projects Shipped</span>
                            </motion.div>
                            <motion.div
                                className="flex flex-col justify-center items-start md:items-end p-0"
                                variants={{
                                    hidden: { opacity: 0.001, scale: 0.8, y: 15 },
                                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
                                }}
                            >
                                <span className="text-2xl md:text-3xl font-black text-white flex items-start">
                                    <CountUp to={3} /><span className="text-brand text-xl font-black ml-[2px] mt-[2px]">+</span>
                                </span>
                                <span className="text-[10px] uppercase leading-3 text-gray-400/60 tracking-wide font-medium mt-1">Years Exp.</span>
                            </motion.div>
                        </motion.div>
                        <p className="text-md text-gray-300 leading-relaxed order-1 md:order-2">
                            Product designer and full-stack engineer. <br/> I take products from first sketch to production: interface design, motion, architecture and deployment for founders, agencies and growing businesses.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0.001, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        <motion.div
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <motion.div
                                className="group"
                                whileHover="hover"
                            >
                                <Button
                                    variant="hero"
                                    size="lg"
                                    className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)]"
                                    onClick={openWhatsApp}
                                >
                                    <div className="relative bg-white rounded-full p-2 flex items-center justify-center mr-2 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_15px_rgba(255,95,38,0.3)]">
                                        {/* Pulse ring — transform/opacity only, so it runs on the compositor */}
                                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#ff5f26]/40 animate-pulse-ring" />
                                        <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                    </div>
                                    <div className="relative overflow-hidden h-6 w-fit text-white">
                                        <motion.div
                                            className="flex flex-col items-center"
                                            variants={{
                                                hover: { y: -24 }
                                            }}
                                            initial={{ y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <span className="w-full flex items-center justify-center">
                                                Let's Connect
                                            </span>
                                            <span className="w-full flex items-center justify-center font-semibold">
                                                Let's Connect
                                            </span>
                                        </motion.div>
                                    </div>

                                    {/* Shimmer effect */}
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer [animation-delay:2s]" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Oversized name – VariableProximity weight morph on hover */}
                <motion.div
                    className="pointer-events-none absolute bottom-10 lg:bottom-4 left-0 w-full select-none text-[20vw] md:text-[19vw] leading-none tracking-tighter text-foreground/[0.025] hidden md:block"
                    aria-hidden="true"
                    initial={{ opacity: 0.001 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <motion.div style={{ x: xLeft }}>
                        <VariableProximity
                            label="Ayush"
                            fromFontVariationSettings="'wght' 800, 'opsz' 110"
                            toFontVariationSettings="'wght' 1000, 'opsz' 110"
                            containerRef={containerRef as React.MutableRefObject<HTMLElement | null>}
                            radius={300}
                            falloff="gaussian"
                            style={{
                                display: 'block',
                                fontFamily: '"Roboto Flex", sans-serif',
                                letterSpacing: '0em',
                                lineHeight: 1,
                            }}
                        />
                    </motion.div>
                    <motion.div style={{ x: xRight }}>
                        <VariableProximity
                            label="Kushwaha"
                            fromFontVariationSettings="'wght' 800, 'opsz' 110"
                            toFontVariationSettings="'wght' 1000, 'opsz' 110"
                            containerRef={containerRef as React.MutableRefObject<HTMLElement | null>}
                            radius={300}
                            falloff="gaussian"
                            style={{
                                display: 'block',
                                fontFamily: '"Roboto Flex", sans-serif',
                                letterSpacing: '0em',
                                lineHeight: 1,
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

