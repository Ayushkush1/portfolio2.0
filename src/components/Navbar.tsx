import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, User, Briefcase, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#github", label: "Activity", id: "github" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#process", label: "Process", id: "process" },
    { href: "#testimonials", label: "Testimonials", id: "testimonials" },
    { href: "#contact", label: "Contact", id: "contact" }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight * 0.4; // Trigger earlier

            setIsScrolled(window.scrollY > 50);

            let current = "Home";
            // Check if at the very bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                current = "Contact";
            } else {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    if (section && section.offsetTop <= scrollPosition) {
                        current = navItems[i].label;
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
    }, [activeSection]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'portfolio') {
            navigate('/portfolio');
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
                className="hidden md:flex fixed top-0 left-0 w-full z-50 items-center justify-between py-6 px-6 md:px-24 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <AnimatePresence>
                    {!isScrolled && (
                        <motion.a
                            href="#"
                            className="pointer-events-auto"
                            aria-label="Ayush home"
                            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img
                                src="/lovable-uploads/logo.png"
                                alt="Ayush Kushwaha Logo"
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </motion.a>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-3 lg:gap-4 pointer-events-auto ml-auto">
                    {/* Glassmorphism Text Pill */}
                    <div className="hidden md:flex items-center justify-center h-[46px] min-w-[90px] px-5 rounded-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <div className="relative flex items-center justify-center overflow-hidden w-full h-full">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={activeSection}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="text-base font-medium tracking-wide text-foreground"
                                >
                                    {activeSection}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.button
                        aria-label="Open menu"
                        className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-foreground border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden relative group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
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
                </div>
            </motion.header>

            {/* iOS App-like Bottom Navigation for Mobile */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-2xl backdrop-saturate-200 border border-white/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] w-[90vw] max-w-[400px]">
                {[
                    { id: "home", label: "Home", icon: Home },
                    { id: "about", label: "About", icon: User },
                    { id: "portfolio", label: "Portfolio", icon: Briefcase },
                    { id: "contact", label: "Contact", icon: Mail },
                ].map((item) => {
                    const isActive = activeSection.toLowerCase() === item.id;
                    return (
                        <button 
                            key={item.id} 
                            onClick={() => scrollToSection(item.id)} 
                            className={`relative p-3 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="mobileNavIndicator"
                                    className="absolute inset-0 bg-[#ff5f26] rounded-full z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon className="w-5 h-5 relative z-10" />
                        </button>
                    );
                })}
            </div>

            {/* Slide-out Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-screen bg-background/100 backdrop-blur-2xl flex flex-col items-center justify-center z-[100]"
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
                            className="flex flex-col items-center space-y-4 text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    className="text-3xl md:text-5xl lg:text-[3rem]  font-bold hover:text-brand transition-colors duration-300 cursor-pointer"
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
                            className="pointer-events-none absolute bottom-0 -left-1/3 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 text-center"
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
