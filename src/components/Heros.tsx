import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const CountUp = ({ to, duration = 2 }: { to: number, duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, to, { duration: duration, ease: "easeOut", delay: 1.2 });
        return animation.stop;
    }, [count, to, duration]);

    return <motion.span>{rounded}</motion.span>;
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
        window.open(whatsappURL, '_blank');
    };

    return (
        <section id="home" ref={containerRef} aria-label="Hero – Product Developer" className="relative overflow-hidden pt-[7rem] md:pt-24">
            {/* Ambient brand light */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(70% 70% at 70% 40%, hsl(var(--brand) / 0.25) 0%, transparent 60%)",
                }}
            />

            <div className="container relative z-10 grid min-h-[70vh] lg:min-h-[80vh] grid-cols-1 items-start md:items-center lg:gap-10 md:gap-4 gap-0 pt-8 md:pt-36 pb-12 md:pb-40 md:py-20 md:grid-cols-2">
                {/* Left copy */}
                <motion.div
                    className="md:space-y-6 space-y-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.a
                        href="/AYUSH_KUSHWAHA_resume_updated.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 hover:bg-primary/20 transition-colors cursor-pointer"
                        initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                        <FileText className="h-3 w-3 text-white" />
                        <span className="text-xs text-muted-foreground font-medium"> My Resume</span>
                    </motion.a>
                    <motion.h1
                        className=" text-[2.6rem] md:text-4xl font-bold leading-tight tracking-tight md:text-6xl max-w-xl flex flex-wrap"
                        variants={{
                            hidden: { opacity: 1 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.02, delayChildren: 0.2 }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {["Full-Stack Product", "Engineer, built", "to scale"].map((line, lineIdx) => (
                            <span
                                key={lineIdx}
                                className="block w-full"
                            >
                                {line.split(" ").map((word, wordIdx, array) => (
                                    <span key={wordIdx} className="inline-block whitespace-nowrap">
                                        {word.split("").map((char, charIdx) => (
                                            <motion.span
                                                key={charIdx}
                                                variants={{
                                                    hidden: { opacity: 0, filter: "blur(12px)", y: 40, rotateX: -30 },
                                                    show: { opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, transition: { type: "spring", bounce: 0, duration: 1.2 } }
                                                }}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                        {wordIdx !== array.length - 1 && <span className="inline-block">&nbsp;</span>}
                                    </span>
                                ))}
                                {lineIdx === 2 && (
                                    <motion.span
                                        variants={{
                                            hidden: { opacity: 0, filter: "blur(12px)", y: 40, rotateX: -30 },
                                            show: { opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, transition: { type: "spring", bounce: 0, duration: 1.2 } }
                                        }}
                                        className="inline-block text-brand not-italic"
                                    >
                                        .
                                    </motion.span>
                                )}
                            </span>
                        ))}
                    </motion.h1>
                </motion.div>

                {/* Right side - portrait and bio */}
                <motion.div
                    className="flex flex-col items-start justify-center -mt-8 md:mt-0 gap-4 md:gap-6 md:items-end w-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        className="w-full max-w-full md:max-w-[310px] flex flex-col gap-2 md:gap-4 md:text-right"
                        initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            className="flex gap-8 w-full justify-start md:justify-end pb-4 md:pb-2 md:border-b md:border-white/5 order-2 md:order-1"
                            variants={{
                                hidden: { opacity: 0 },
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
                                    hidden: { opacity: 0, scale: 0.8, y: 15 },
                                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
                                }}
                            >
                                <span className="text-2xl md:text-3xl font-black text-white flex items-start">
                                    <CountUp to={20} /><span className="text-brand text-xl font-black ml-[2px] mt-[2px]">+</span>
                                </span>
                                <span className="text-[10px] uppercase leading-3 text-gray-400/60 tracking-wide font-medium mt-1">Products Built</span>
                            </motion.div>
                            <motion.div
                                className="flex flex-col justify-center items-start md:items-end p-0"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, y: 15 },
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
                            I design, build, and scale modern digital products from SaaS platforms and business systems to high performance web applications and user centric experiences.
                        </p>
                    </motion.div>
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
                    className="pointer-events-none absolute bottom-4 lg:bottom-[-1rem] left-0 w-full select-none text-[20vw] md:text-[19vw] leading-none font-extrabold tracking-tight text-foreground/[0.025] hidden md:block"
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
