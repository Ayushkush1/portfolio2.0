import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
    const navigate = useNavigate();

    // Load designer fonts ONLY for this component
    useEffect(() => {
        const id = "portfolio-fonts";
        if (!document.getElementById(id)) {
            const link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
            document.head.appendChild(link);
        }
    }, []);

    // Handle mouse movement for cursor follower
    const handleMouseMove = (e: React.MouseEvent, cardId: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = (cardId: number) => {
        setHoveredCardId(cardId);
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null);
    };

    const handleProjectClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const navigateToPortfolio = () => {
        navigate('/portfolio');
    };
    const featuredProjects = [
        {
            id: 1,
            title: "Catfy",
            workType: "SaaS",
            image: "/lovable-uploads/catfy.png",
            url: "https://catfy-catalog.vercel.app",
        },
        {
            id: 2,
            title: "Coding Pandas",
            workType: "EdTech",
            image: "/lovable-uploads/coding-pandas.png",
            url: "https://coding-pandas.vercel.app/",
        },
        {
            id: 3,
            title: "Erichost",
            workType: "Platform",
            image: "/lovable-uploads/EricHost.png",
            url: "https://main.erichost.app/",
        },
        {
            id: 4,
            title: "NeatRoots",
            workType: "Development",
            image: "/lovable-uploads/neatroots.png",
            url: "https://neatroot.vercel.app/",
        },
    ];


    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    // This shifts the track left as the user scrolls down the 300vh section
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-240vw"]);

    return (
        <section ref={targetRef} id="portfolio" className="relative h-[350vh] py-10 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden">

                {/* Horizontal Scroll Track — header card is first item */}
                <div className="relative flex w-full items-center pt-14">
                    <motion.div
                        style={{ x }}
                        className="flex gap-12 pl-8 md:pl-16 lg:pl-24 w-max pb-6 items-center"
                    >
                        {/* ── Text Card (leftmost, same height as project cards) ── */}
                        <motion.div
                            className="shrink-0 w-[52vw] md:w-[35vw] lg:w-[25vw] flex flex-col justify-end pb-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-3xl md:text-4xl lg:text-[2.5rem] leading-snug text-foreground mb-6"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                <span className="font-light opacity-50">Selected works</span>
                                <br />
                                <span className="font-light opacity-50">crafted with </span>
                                <br />
                                <span className="font-bold italic">pure intent</span>
                                <span className="text-[#ff5f26]">.</span>
                            </h2>

                            <motion.button
                                whileHover={{ boxShadow: "0 15px 40px rgba(255, 95, 38, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={navigateToPortfolio}
                                className="self-start group flex items-center gap-4 p-1.5 pr-8 rounded-full bg-[#ff5f26] text-white shadow-[0_10px_30px_rgba(255,95,38,0.2)] transition-all duration-300"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#ff5f26] group-hover:rotate-0 -rotate-45 transition-transform duration-500">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <div className="relative overflow-hidden h-5">
                                    <motion.div
                                        className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5"
                                    >
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">View all projects</span>
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">View all projects</span>
                                    </motion.div>
                                </div>
                            </motion.button>
                        </motion.div>

                        {/* ── Project Cards ── */}
                        {featuredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative cursor-none w-[85vw] md:w-[65vw] lg:w-[57vw] shrink-0"
                                onMouseMove={(e) => handleMouseMove(e, project.id)}
                                onMouseEnter={() => handleMouseEnter(project.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleProjectClick(project.url)}
                            >
                                {/* Glassmorphism "VIEW WORK" cursor */}
                                <motion.div
                                    className="absolute pointer-events-none z-50 w-[76px] h-[76px] rounded-full flex items-center justify-center text-gray-900 text-[10px] font-semibold tracking-[0.15em] uppercase shadow-2xl"
                                    style={{
                                        left: mousePosition.x - 48,
                                        top: mousePosition.y - 48,
                                        fontFamily: "'DM Sans', sans-serif",
                                        background: "rgba(255, 255, 255, 0.12)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255, 255, 255, 0.25)",
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: hoveredCardId === project.id ? 1 : 0,
                                        scale: hoveredCardId === project.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                >
                                    VIEW
                                </motion.div>

                                {/* Card Image Container */}
                                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/9] bg-gray-950 border border-white/8 shadow-xl transition-all duration-500 group-hover:border-white/15 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    <div className="w-full h-full overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-auto object-top transition-transform will-change-transform"
                                            style={{ 
                                                transitionDuration: hoveredCardId === project.id ? '20s' : '3s',
                                                transitionDelay: hoveredCardId === project.id ? '300ms' : '0ms',
                                                transitionTimingFunction: hoveredCardId === project.id ? 'linear' : 'ease-out',
                                                transform: hoveredCardId === project.id 
                                                    ? (window.innerWidth < 768 ? 'translateY(calc(-100% + 47.81vw))' : (window.innerWidth < 1024 ? 'translateY(calc(-100% + 36.56vw))' : 'translateY(calc(-100% + 32.06vw))'))
                                                    : 'translateY(0)'
                                            }}
                                        />
                                    </div>
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                                </div>

                                {/* Below-card info bar */}
                                <div className="flex items-center justify-between mt-2 px-6">
                                    <h3 className="text-xl font-light italic text-foreground tracking-normal" style={{ fontFamily: "'Fraunces', serif" }}>
                                            {project.title}
                                        </h3>
                                    <div className="flex items-center gap-2 ml-4 shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                        <div className="h-[1px] w-8 bg-foreground/20" />
                                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                            {project.workType}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ── Closing CTA Card ── */}
                        <motion.div
                            className="shrink-0 w-[60vw] md:w-[38vw] lg:w-[30vw] flex flex-col justify-end pb-2 pl-10"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-3xl md:text-4xl lg:text-[2.5rem] leading-snug text-foreground mb-6"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                <span className="font-light opacity-50">Got an idea?</span>
                                <br />
                                <span className="font-light opacity-50">Let's build </span>
                                <br />
                                <span className="font-bold italic">something real</span>
                                <span className="text-[#ff5f26]">.</span>
                            </h2>

                            <motion.button
                                whileHover={{boxShadow: "0 15px 40px rgba(255, 95, 38, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const el = document.getElementById('contact');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="self-start group flex items-center gap-4 p-1.5 pr-8 rounded-full bg-[#ff5f26] text-white shadow-[0_10px_30px_rgba(255,95,38,0.2)] transition-all duration-300"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#ff5f26] group-hover:rotate-0 -rotate-45 transition-transform duration-500">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <div className="relative overflow-hidden h-5">
                                    <motion.div
                                        className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5"
                                    >
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">Start a project</span>
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">Start a project</span>
                                    </motion.div>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Background decoration */}
                <motion.div
                    className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true }}
                >
                    Portfolio
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
