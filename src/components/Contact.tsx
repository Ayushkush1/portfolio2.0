import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Globe,
    Twitter,
    Instagram,
    Linkedin,
    Github,
    ExternalLink
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // WhatsApp function
    const openWhatsApp = () => {
        const phoneNumber = "918738954475"; // Your WhatsApp number
        const message = "Hi Ayush! I'm interested in discussing a project with you. Can we schedule a free intro call?";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };

    const socialLinks = [
        {
            icon: Globe,
            label: "Website",
            href: "https://ayushkushwaha.vercel.app"
        },
        {
            icon: Github,
            label: "Github",
            href: "https://github.com/Ayushkush1"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/"
        },
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/awsm_ayush_/"
        }
    ];

    return (
        <section ref={ref} id="contact" className="relative min-h-screen py-12 md:py-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 text-foreground">

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-12 md:py-10">
                {/* Top Badge */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-muted-foreground text-sm">2 spots available</span>
                    </motion.div>
                </motion.div>

                {/* Main Content - Centered */}
                <div className="flex flex-col justify-center items-center text-center space-y-4 md:space-y-6 px-6 py-10 md:py-0 bg-white/5 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none rounded-[3rem] md:rounded-none shadow-2xl md:shadow-none w-[88vw] mx-auto md:w-full">
                    <motion.h1
                        className="text-[2.5rem] md:text-8xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Let's Connect
                    </motion.h1>

                    <motion.div
                        className="max-w-lg space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Feel free to contact me if having any questions.<br className="hidden md:block" />
                            I'm available for new projects or just for chatting.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 items-center pt-4"
                    >
                        {/* Primary WhatsApp Button */}
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
                                >
                                    <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
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
                                            WhatsApp Chat
                                        </span>
                                        <span className="w-full flex items-center justify-center font-semibold">
                                            WhatsApp Chat
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
                </div>

                {/* Footer */}
                <motion.footer
                    className="pb-6 pt-8 md:pt-40 w-full relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Ghost Watermark - Desktop Only */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.01] select-none pointer-events-none tracking-tighter hidden md:block">
                        KUSHWAHA
                    </div>

                    <div className="relative bg-transparent md:bg-[#0d121f]/40 border-0 md:border md:border-white/5 backdrop-blur-none md:backdrop-blur-md rounded-none md:rounded-[2.5rem] p-4 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 overflow-hidden transition-all duration-500 shadow-none md:shadow-2xl">
                        {/* Interactive Glow - Desktop Only */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none hidden md:block" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none hidden md:block" />

                        {/* Order on Mobile: 1. Socials, 2. Email, 3. Copyright */}
                        
                        {/* Center - Social Links (Second on Mobile) */}
                        <div className="flex items-center gap-4 md:gap-6 order-2 md:order-2">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    className="w-12 h-12 md:w-12 md:h-12 rounded-full md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand/40 hover:bg-brand/5 transition-all duration-500 group/link"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <link.icon className="h-5 w-5 md:h-5 md:w-5 transition-transform duration-300 group-hover/link:scale-110" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right - Email Contact (First on Mobile) */}
                        <motion.div
                            className="text-center md:text-right order-1 md:order-3"
                        >
                            <div className="text-gray-400/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                                Start a conversation
                            </div>
                            <motion.a
                                href="mailto:ayushkushwaha381@gmail.com"
                                className="text-gray-300 hover:text-brand text-sm font-medium transition-all duration-300 block"
                                
                            >
                                ayushkushwaha381@gmail.com
                            </motion.a>
                        </motion.div>

                        {/* Left - Copyright & Status (Last on Mobile) */}
                        <div className="flex flex-col items-center md:items-start gap-2 order-3 md:order-1">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-green-500/80">Available for hire</span>
                            </div>
                            <div className="text-gray-500 text-sm font-medium">
                                © Ayush Kushwaha, 2026 • All rights reserved
                            </div>
                        </div>

                    </div>
                </motion.footer>
            </div>
        </section>
    );
};

export default Contact;
