"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BlueprintSwitch from "./BlueprintSwitch";

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
    { id: "design", label: "Design" },
    { id: "websites", label: "Websites" },
    { id: "services", label: "Services" },
    { id: "experience", label: "Experience" },
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
    const [isOnLight, setIsOnLight] = useState(false);

    // Section label pill glides to each new label's width instead of snapping,
    // so the buttons beside it slide smoothly rather than jumping
    const labelMeasureRef = useRef<HTMLSpanElement>(null);
    const [labelWidth, setLabelWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (labelMeasureRef.current) setLabelWidth(labelMeasureRef.current.offsetWidth);
    }, [activeSection]);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        // Section positions are measured once (and whenever the page resizes), then scrolling
        // only compares numbers against window.scrollY — no layout reads inside the scroll loop.
        let tops: number[] = [];
        let lightRanges: [number, number][] = [];
        let docHeight = 0;
        const measure = () => {
            const y = window.scrollY;
            tops = sectionsToTrack.map((item) => {
                const el = document.getElementById(item.id);
                return el ? el.getBoundingClientRect().top + y : Infinity;
            });
            lightRanges = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="light"]')).map((el) => {
                const r = el.getBoundingClientRect();
                return [r.top + y, r.bottom + y];
            });
            docHeight = document.documentElement.scrollHeight;
        };

        let frame = 0;
        const update = () => {
            frame = 0;
            const y = window.scrollY;
            setIsScrolled(y > 50);

            // Dark ink while the header floats over a light surface (data-nav-theme="light")
            const probe = y + 40;
            setIsOnLight(lightRanges.some(([top, bottom]) => top <= probe && bottom >= probe));

            let current = sectionsToTrack[0]?.label || "Home";
            if (window.innerHeight + y >= docHeight - 100) {
                current = "Contact";
            } else {
                const line = y + window.innerHeight * 0.4; // trigger a little early
                for (let i = tops.length - 1; i >= 0; i--) {
                    if (tops[i] <= line) { current = sectionsToTrack[i].label; break; }
                }
            }
            setActiveSection(current);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

        measure();
        update();
        const ro = new ResizeObserver(() => { measure(); onScroll(); });
        ro.observe(document.body);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            ro.disconnect();
            if (frame) cancelAnimationFrame(frame);
        };
    }, [sectionsToTrack, isProjectDetail]);

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

        if (sectionId === 'work') {
            router.push('/work');
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
            <header className={`nav-in ${isOnLight ? "nav-light" : ""} fixed top-0 left-0 w-full z-50 flex items-center justify-between py-5 md:py-8 px-5 md:px-6 xl:px-16 2xl:px-24 pointer-events-none`}>
                    <a
                        href="#"
                        className="nav-logo-in nav-logo pointer-events-auto"
                        aria-label="Ayush home"
                        onClick={(e) => {
                            e.preventDefault();
                            if (backTo || isProjectDetail) {
                                router.push("/");
                            } else {
                                scrollToSection('home');
                            }
                        }}
                    >
                        <img
                            src="/assets/ayush-kushwaha-logo.webp"
                            alt="Ayush Kushwaha Logo"
                            width={274}
                            height={108}
                            className="h-8 w-auto brightness-0 invert"
                        />
                    </a>

                    <div className="nav-actions-in flex items-center gap-2 lg:gap-3 pointer-events-auto ml-auto">
                        {/* Live ⇄ Blueprint: see the site as designed & engineered */}
                        <BlueprintSwitch />

                        {/* Glassmorphism Text Pill */}
                        <div
                            style={{
                                width: labelWidth ? Math.max(80, labelWidth + 32) : undefined,
                                // Inline so it wins over .nav-glass's shorthand transition in index.css
                                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s, border-color 0.5s, color 0.5s",
                            }}
                            className="nav-glass flex items-center justify-center h-[38px] min-w-[80px] px-4 rounded-full bg-[hsl(222_47%_7%/0.5)] backdrop-blur-xl backdrop-saturate-200 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                            <div className="relative flex items-center justify-center overflow-hidden w-full h-full">
                                {/* Invisible copy of the label, measured to size the pill */}
                                <span ref={labelMeasureRef} aria-hidden="true" className="invisible absolute whitespace-nowrap text-sm font-medium tracking-wide">
                                    {activeSection}
                                </span>
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={activeSection}
                                        variants={textVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="whitespace-nowrap text-sm font-medium tracking-wide text-foreground"
                                    >
                                        {activeSection}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {backTo || isProjectDetail ? (
                            <motion.button
                                aria-label="Go back"
                                className="nav-glass inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[hsl(222_47%_7%/0.5)] backdrop-blur-xl backdrop-saturate-200 text-foreground border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative group before:absolute before:-inset-[3px] before:content-['']"
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
                                className="nav-glass inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[hsl(222_47%_7%/0.5)] backdrop-blur-xl backdrop-saturate-200 text-foreground border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative group before:absolute before:-inset-[3px] before:content-['']"
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
                    </div>
            </header>



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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
