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
        <section ref={ref} id="contact" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 text-foreground">


            <div className="container relative z-10 flex flex-col min-h-screen">
                {/* Top Badge */}
                <motion.div
                    className="text-center pt-20 mb-8"
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
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold leading-tight"
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
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Feel free to contact me if having any questions.<br />
                            I'm available for new projects or just for chatting.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">

                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 items-center"
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
                    className="pb-8 pt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Left - Copyright */}
                        <div className="text-muted-foreground text-sm">
                            © Ayush Kushwaha, 2023
                        </div>

                        {/* Center - Social Links */}
                        <div className="flex items-center gap-4 lg:ml-10">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    className="w-10 h-10 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#ff5f26] hover:bg-[#ff5f26]/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <link.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right - Email Contact */}
                        <motion.div
                            className="text-right"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-foreground text-xs mb-1">
                                Email me directly
                            </div>
                            <motion.a
                                href="mailto:ayushkushwaha381@gmail.com"
                                className="text-muted-foreground hover:text-[#bfbfbf] text-sm  transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ayushkushwaha381@gmail.com
                            </motion.a>
                        </motion.div>

                    </div>
                </motion.footer>
            </div>
        </section>
    );
};

export default Contact;
