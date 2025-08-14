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
            title: "Web Development Agency",
            category: "Prototype Design, Development",
            description: "A modern web development agency website featuring immersive project showcases and seamless portfolio navigation.",
            image: "/lovable-uploads/six-table.png",
            url: "https://six-table.vercel.app/",
            rotation: "rotate-2"
        },
        {
            id: 2,
            title: "Web Hosting Company",
            category: "Web Design , Development",
            description: "Professional web hosting company website with project galleries and service showcases.",
            image: "/lovable-uploads/ninzahost.png",
            url: "https://ninzahost.com",
            rotation: "-rotate-2"
        },
        {
            id: 3,
            title: "Movie Searching Platform",
            category: "Web Design , Development",
            description: "Modern movie searching platform with advanced search and streaming features.",
            image: "/lovable-uploads/movix.png",
            url: "https://ayushmovix.vercel.app/",
            rotation: "rotate-2"
        },
        {
            id: 4,
            title: "Professional Documents Management Tool",
            category: "Web Design , Development",
            description: "Comprehensive document management tool for professionals with advanced organization and collaboration features.",
            image: "/lovable-uploads/proposal-pro.png",
            url: "https://proposal-pro-sable.vercel.app/",
            rotation: "-rotate-2"
        },

    ];


    // Animation when index changes

    return (
        <section id="portfolio" className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-40">
                {/* Section Header */}
                <motion.div
                    className="flex flex-col md:flex-row gap-10 lg:gap-0 items-center justify-between mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <motion.h2
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
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
                                <div className="relative md:h-[410px] p-6 rounded-3xl bg-gradient-to-br from-gray-900/10 via-gray-800/10 to-gray-800/20 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-brand/20 rounded-full blur-lg" />

                                    {/* Floating Image Container - Optimized for Screenshots */}
                                    <div className={`relative mb-4 ${project.rotation} group-hover:rotate-0 transition-transform duration-500`}>
                                        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gray-900 p-2">
                                            {/* Browser Frame */}
                                            <div className="bg-gray-800 rounded-t-lg p-2 flex items-center gap-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                                <div className="flex-1 bg-gray-700 rounded-sm h-5 ml-2 flex items-center px-2">
                                                    <span className="text-gray-300 text-[10px] font-mono truncate">
                                                        {project.url}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Screen Content Area - Perfect for Screenshots */}
                                            <div className="aspect-[16/7] overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform origin-center"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="relative z-10 space-y-3 mt-4">
                                        <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2">
                                            {project.title}
                                        </h3>

                                        {/* Category Tags */}
                                        <div className="flex gap-2 flex-wrap">
                                            {project.category.split(',').slice(0, 2).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-foreground/5 text-gray-500 text-xs rounded-xl font-medium border border-foreground/20 transition-colors duration-200"
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
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
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
