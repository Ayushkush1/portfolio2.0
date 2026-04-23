import { ArrowRight, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const openWhatsApp = () => {
        const phoneNumber = "918738954475"; // Your WhatsApp number
        const message = "Hello Ayush, I'm interested in your services.";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <section id="home" ref={containerRef} aria-label="Hero – UI/UX Designer" className="relative overflow-hidden pt-20">
            {/* Ambient brand light */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(70% 70% at 70% 40%, hsl(var(--brand) / 0.25) 0%, transparent 60%)",
                }}
            />



            <div className="container relative z-10 grid min-h-[70vh] lg:min-h-[80vh] grid-cols-1 items-center lg:gap-10 gap-3 py-20 md:grid-cols-2">
                {/* Left copy */}
                <motion.div
                    className="md:space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <span className="h-2 w-2 rounded-full bg-brand" />
                        <span className="text-xs text-muted-foreground">Available for Work</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl font-bold leading-tight tracking-tight md:text-6xl max-w-xl flex flex-wrap"
                        variants={{
                            hidden: { opacity: 1 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.06, delayChildren: 0.4 }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {"Web & UI/UX Designer based in India".split(" ").map((word, wordIdx, array) => (
                            <span key={wordIdx} className="inline-block whitespace-nowrap">
                                {word.split("").map((char, charIdx) => (
                                    <motion.span
                                        key={charIdx}
                                        variants={{
                                            hidden: { opacity: 0, filter: "blur(8px)", x: -4 },
                                            show: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
                                        }}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordIdx !== array.length - 1 && <span className="inline-block">&nbsp;</span>}
                            </span>
                        ))}
                    </motion.h1>
                </motion.div>

                {/* Right side - portrait and bio */}
                <motion.div
                    className="flex flex-col items-start justify-center gap-6 md:items-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.p
                        className="max-w-[280px] text-md text-gray-300 md:text-right"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        Hi, I'm Ayush Kushwaha - a UI/UX designer & MVP expert crafting digital experiences that connect and convert.<br /> I turn ideas into launch ready products.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
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
                                    <motion.div
                                        className="bg-white rounded-full p-2 flex items-center justify-center mr-2 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_15px_rgba(255,95,38,0.3)]"
                                        animate={{
                                            boxShadow: [
                                                "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0.4)",
                                                "0 0 25px rgba(255, 95, 38, 0.5), 0 0 0 8px rgba(255, 95, 38, 0)",
                                                "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        whileHover={{

                                        }}
                                    >
                                        <motion.div

                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                        </motion.div>
                                    </motion.div>
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
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2
                                        }}
                                    />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>



                {/* Oversized name */}
                <motion.div
                    className="pointer-events-none absolute bottom-4 lg:bottom-[-1rem] left-0 w-full select-none text-[20vw] md:text-[19vw] leading-none font-extrabold tracking-tight text-foreground/[0.025]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <motion.div style={{ x: xLeft }}>Ayush</motion.div>
                    <motion.div style={{ x: xRight }}>Kushwaha</motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
