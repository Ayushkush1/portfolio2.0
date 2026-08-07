"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const navItems = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "/work", label: "Work", id: "work" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#contact", label: "Contact", id: "contact" }
];

const indicatorSections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "services", label: "Services" },
    { id: "design", label: "Design" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" }
];

const projectDetailNavItems = [
    { href: "#overview", label: "Overview", id: "overview" },
    { href: "#context", label: "Context", id: "context" },
    { href: "#vision", label: "Vision", id: "vision" },
    { href: "#interface", label: "Interface", id: "interface" },
    { href: "#decisions", label: "Decisions", id: "decisions" },
    { href: "#contact", label: "Contact", id: "contact" }
];

const projectDetailIndicatorSections = [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "vision", label: "Vision" },
    { id: "interface", label: "Interface" },
    { id: "decisions", label: "Decisions" },
    { id: "contact", label: "Contact" }
];

interface NavbarProps {
    isProjectDetail?: boolean;
    backTo?: string;
    customNavItems?: { href: string; label: string; id: string }[];
    customIndicatorSections?: { id: string; label: string }[];
}

const Navbar = ({ 
    isProjectDetail = false,
    backTo,
    customNavItems,
    customIndicatorSections
}: NavbarProps) => {
    const items = customNavItems || (isProjectDetail ? projectDetailNavItems : navItems);
    const sectionsToTrack = customIndicatorSections || (isProjectDetail ? projectDetailIndicatorSections : indicatorSections);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(sectionsToTrack[0]?.label || "Home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = sectionsToTrack.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight * 0.4; // Trigger earlier

            setIsScrolled(window.scrollY > 50);

            let current = sectionsToTrack[0]?.label || "Home";
            // Check if at the very bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                current = "Contact";
            } else {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    if (section && section.offsetTop <= scrollPosition) {
                        current = sectionsToTrack[i].label;
                        break;
                    }
                }
            }

            if (activeSection !== current) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection, sectionsToTrack, isProjectDetail]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        if (backTo || isProjectDetail) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (sectionsToTrack[0] && sectionId === sectionsToTrack[0].id) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsMenuOpen(false);
            return;
        }

        if (sectionId === 'portfolio' || sectionId === 'work') {
            router.push(sectionId === 'work' ? '/work' : '/portfolio');
            setIsMenuOpen(false);
            return;
        }

        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const textVariants: any = {
        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
        exit: { opacity: 0, y: -20, filter: "blur(4px)", position: "absolute", transition: { duration: 0.2, ease: "easeIn" } }
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-8 px-6 xl:px-16 2xl:px-24 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <AnimatePresence>
                    <motion.a
                        href="#"
                        className="pointer-events-auto"
                        aria-label="Ayush home"
                        onClick={(e) => {
                            e.preventDefault();
                            if (backTo || isProjectDetail) {
                                router.push("/");
                            } else {
                                scrollToSection('home');
                            }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img
                            src="/assets/ayush-kushwaha-logo.webp"
                            alt="Ayush Kushwaha Logo"
                            className="h-8 w-auto brightness-0 invert"
                        />
                    </motion.a>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.div 
                        className="flex items-center gap-2 lg:gap-3 pointer-events-auto ml-auto"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, filter: "blur(4px)", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Glassmorphism Text Pill */}
                        <div className="flex items-center justify-center h-[38px] min-w-[80px] px-4 rounded-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                            <div className="relative flex items-center justify-center overflow-hidden w-full h-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={activeSection}
                                        variants={textVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="text-sm font-medium tracking-wide text-foreground"
                                    >
                                        {activeSection}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {backTo || isProjectDetail ? (
                            <motion.button
                                aria-label="Go back"
                                className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-foreground border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden relative group"
                                onClick={() => router.push(backTo || "/work")}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowLeft className="w-4 h-4 text-foreground" />
                            </motion.button>
                        ) : (
                            <motion.button
                                aria-label="Open menu"
                                className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-foreground border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden relative group"
                                onClick={handleMenuToggle}
                            >
                                <AnimatePresence mode="wait">
                                    {!isMenuOpen ? (
                                        <motion.div
                                            key="hamburger"
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col items-center justify-center gap-[6px]"
                                        >
                                            <div className="w-[18px] h-[2px] bg-foreground rounded-full group-hover:w-[22px] transition-all duration-300" />
                                            <div className="w-[18px] h-[2px] bg-foreground rounded-full group-hover:w-[22px] transition-all duration-300" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="close"
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <X className="w-5 h-5 text-foreground" strokeWidth={2} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.header>



            {/* Slide-out Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-[100dvh] bg-background/100 backdrop-blur-2xl flex flex-col items-center justify-center z-[100]"
                        initial={{ clipPath: "circle(0px at calc(100% - 70px) 50px)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 70px) 50px)" }}
                        exit={{ clipPath: "circle(0px at calc(100% - 70px) 50px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <motion.button
                            className="absolute top-6 right-6 lg:right-24 text-foreground text-4xl cursor-pointer hover:text-brand transition-colors duration-300 w-12 h-12 flex items-center justify-center"
                            onClick={handleMenuToggle}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.nav
                            className="flex flex-col items-center lg:space-y-4 space-y-2 text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold hover:text-brand transition-colors duration-300 cursor-pointer text-center w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.id);
                                    }}
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
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                        transition: { type: "spring", stiffness: 300, damping: 25 }
                                    }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </motion.nav>

                        <motion.div
                            className="pointer-events-none absolute bottom-0 -left-28 lg:-left-1/3 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        >
                            Menu
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
