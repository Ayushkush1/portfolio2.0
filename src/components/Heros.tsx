import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Hero = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <section aria-label="Hero – UI/UX Designer" className="relative overflow-hidden">
            {/* Ambient brand light */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(70% 70% at 70% 40%, hsl(var(--brand) / 0.25) 0%, transparent 60%)",
                }}
            />

            <motion.header
                className="container relative z-10 flex items-center justify-between py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.a
                    href="#"
                    className=""
                    aria-label="Ayush home"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src="/lovable-uploads/logo.png"
                        alt="Ayush Kushwaha Logo"
                        className="h-8 w-auto brightness-0 invert"
                    />
                </motion.a>
                <motion.button
                    aria-label="Open menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onClick={handleMenuToggle}
                >
                    {!isMenuOpen && (
                        <img
                            src="/lovable-uploads/MenuIcon.png"
                            alt="Menu"
                            className="w-8 brightness-0 invert"
                        />
                    )}
                </motion.button>
            </motion.header>

            {/* Slide-out Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center z-50"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                    >
                        {/* Close Icon */}
                        <motion.button
                            className="absolute top-6 right-6 text-foreground text-4xl cursor-pointer hover:text-brand transition-colors duration-300 w-12 h-12 flex items-center justify-center"
                            onClick={handleMenuToggle}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        {/* Navigation Links */}
                        <motion.nav
                            className="flex flex-col items-center space-y-4 text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {[
                                { href: "#portfolio", label: "Portfolio" },
                                { href: "#about", label: "About" },
                                { href: "#services", label: "Services" },
                                { href: "#testimonials", label: "Testimonials" },
                                { href: "#contact", label: "Contact" }
                            ].map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    className="text-4xl md:text-6xl lg:text-7xl font-bold hover:text-brand transition-colors duration-300 cursor-pointer"
                                    onClick={handleMenuItemClick}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: (index * 0.1),
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        color: "hsl(var(--brand))",
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }
                                    }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </motion.nav>

                        
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container relative z-10 grid min-h-[80vh] grid-cols-1 items-center gap-10 py-8 md:grid-cols-2">
                {/* Left copy */}
                <motion.div
                    className="space-y-6"
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
                        className="text-4xl font-bold leading-tight tracking-tight md:text-6xl max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Web & UI/UX Designer based in India
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
                        className="max-w-[290px] text-md text-gray-300 md:text-right"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        Hi, I'm Ayush Kushwaha - a UI/UX and web designer passionate about
                        creating seamless digital experiences that connect and convert.
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
                                <Button variant="hero" size="lg" className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)]">
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
                                            <ArrowRight className="h-6 w-6 text-[#ff5f26] group-hover:text-[#ff4d1a] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
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
                                                See my works
                                            </span>
                                            <span className="w-full flex items-center justify-center font-semibold">
                                                See my works
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

                {/* Portrait */}
                {/* <div className="pointer-events-none absolute right-0 top-20 hidden max-w-[520px] md:block">
          <img
            src="/lovable-uploads/c92ecd03-1561-4fbe-afc1-fe27e3e9fdbe.png"
            alt="UI/UX designer hero portrait with orange accent glasses"
            loading="lazy"
            className="h-auto w-[520px] rounded-xl object-cover shadow-[var(--shadow-elevate)]"
          />
        </div> */}

                {/* Oversized name */}
                <motion.div
                    className="pointer-events-none absolute bottom-[-1rem] left-0 w-full select-none text-[22vw] sm:text-[20vw] md:text-[19vw] leading-none font-extrabold tracking-tight text-foreground/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    Ayush Kushwaha
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
