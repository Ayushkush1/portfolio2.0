import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
    const navigate = useNavigate();

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
            title: "Archin Architecture Studio",
            category: "Prototype Design, Webflow",
            description: "A modern architecture studio website featuring immersive project showcases and seamless portfolio navigation.",
            image: "/lovable-uploads/proposal-pro.png",
            url: "https://archin-studio.com"
        },
        {
            id: 2,
            title: "Zumar Construct Firm",
            category: "Web Design , Development",
            description: "Professional construction company website with project galleries and service showcases.",
            image: "/lovable-uploads/blooger.png",
            url: "https://zumar-construct.com"
        },
        {
            id: 3,
            title: "Dallas Real Estate",
            category: "Web Design , Development",
            description: "Modern real estate platform with advanced property search and virtual tours.",
            image: "/lovable-uploads/MobuisEngine.png",
            url: "https://dallas-realestate.com"
        },
        {
            id: 4,
            title: "Luxe Interior Design",
            category: "Web Design , Development",
            description: "Elegant interior design website showcasing stunning project galleries and design services.",
            image: "/lovable-uploads/movix.png",
            url: "https://luxe-interior.com"
        },

    ];


    // Animation when index changes

    return (
        <section id="portfolio" className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-40">
                {/* Section Header */}
                <motion.div
                    className="flex items-center justify-between mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <motion.h2
                            className="text-5xl md:text-7xl font-bold text-foreground"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Featured <span className="italic font-light text-orange-500">Works</span>
                        </motion.h2>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="group"
                            whileHover="hover"
                        >
                            <Button
                                variant="hero"
                                size="lg"
                                className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)]"
                                onClick={navigateToPortfolio}
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
                                    <ArrowRight className="h-6 w-6 text-[#ff5f26]  transition-all group-hover:rotate-0 -rotate-45 duration-300" />
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
                                            See All Projects
                                        </span>
                                        <span className="w-full flex items-center justify-center font-semibold">
                                            See All Projects
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

                {/* Simple 2x2 Grid Layout */}
                <div className="relative">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="group relative cursor-pointer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                onMouseMove={(e) => handleMouseMove(e, project.id)}
                                onMouseEnter={() => handleMouseEnter(project.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleProjectClick(project.url)}
                            >
                                {/* Cursor Follower Circle with Arrow */}
                                <motion.div
                                    className="absolute pointer-events-none z-50 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        left: mousePosition.x - 40,
                                        top: mousePosition.y - 40,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: hoveredCardId === project.id ? 1 : 0,
                                        scale: hoveredCardId === project.id ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut"
                                    }}
                                >
                                    <ArrowRight className="w-6 h-6 -rotate-45" />
                                </motion.div>

                                {/* Project Card */}
                                <div className="flex flex-col ">
                                    {/* Direct Image */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gray-100 hover:bg-gray-50 transition-all duration-300 group-hover:shadow-2xl">
                                        <div className="aspect-[5/3] overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Hover Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                                            initial={false}
                                        />
                                    </div>

                                    {/* Project Info - Below the Card */}
                                    <div className="mt-4 flex justify-between items-center px-6">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {project.title}
                                        </h3>

                                        {/* Category Tags */}
                                        <div className="flex gap-2 flex-wrap">
                                            {project.category.split(',').map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-brand/10 text-brand text-xs rounded-full font-medium hover:bg-brand/20 transition-colors duration-200"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[5vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
            >
                Portfolio
            </motion.div>
        </section>
    );
};

export default Portfolio;
