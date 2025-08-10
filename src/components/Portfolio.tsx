import { motion } from "framer-motion";
import { ExternalLink, Eye, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "Modern e-commerce solution with advanced filtering and seamless checkout experience.",
            image: "/lovable-uploads/placeholder.svg",
            tags: ["UI/UX", "React", "TypeScript"],
            liveUrl: "#",
            caseStudyUrl: "#"
        },
        {
            id: 2,
            title: "Health & Wellness App",
            description: "Mobile-first health tracking application with personalized wellness recommendations.",
            image: "/lovable-uploads/placeholder.svg",
            tags: ["Mobile Design", "React Native", "API"],
            liveUrl: "#",
            caseStudyUrl: "#"
        },
        {
            id: 3,
            title: "SaaS Dashboard",
            description: "Comprehensive analytics dashboard for business intelligence and data visualization.",
            image: "/lovable-uploads/placeholder.svg",
            tags: ["Dashboard", "Data Viz", "Vue.js"],
            liveUrl: "#",
            caseStudyUrl: "#"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Ambient brand light - similar to hero */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(60% 50% at 30% 60%, hsl(var(--brand) / 0.15) 0%, transparent 70%)",
                }}
            />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="h-2 w-2 rounded-full bg-brand" />
                        <span className="text-sm text-muted-foreground">Featured Work</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Selected Projects
                    </motion.h2>

                    <motion.p
                        className="text-muted-foreground max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        A showcase of my recent work in UI/UX design and web development,
                        featuring projects that solve real-world problems with elegant solutions.
                    </motion.p>
                </motion.div>

                {/* Portfolio Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Project Image */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                    {/* Overlay on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <div className="flex gap-3">
                                            <motion.a
                                                href={project.liveUrl}
                                                className="p-3 bg-white rounded-full text-black hover:bg-orange-50 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </motion.a>
                                            <motion.a
                                                href={project.caseStudyUrl}
                                                className="p-3 bg-[#ff5f26] rounded-full text-white hover:bg-[#ff4d1a] transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Eye className="h-5 w-5" />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#ff5f26] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Glow effect similar to hero button */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    initial={{ boxShadow: "0 0 0 rgba(255, 95, 38, 0)" }}
                                    whileHover={{ boxShadow: "0 0 30px rgba(255, 95, 38, 0.3)" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Projects Button - inspired by hero button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        whileHover={{
                            boxShadow: "0 0 40px rgba(255, 95, 38, 0.6)"
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
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
                                    rotate: [0, -10, 10, 0],
                                    scale: 1.1,
                                    boxShadow: "0 0 30px rgba(255, 95, 38, 0.8)"
                                }}
                            >
                                <Code className="h-6 w-6 text-[#ff5f26] group-hover:translate-x-1 group-hover:text-[#ff4d1a] transition-all duration-300" />
                            </motion.div>
                            <span className="flex-grow text-center group-hover:tracking-wide group-hover:font-semibold transition-all duration-300">View All Projects</span>

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

            {/* Background decoration similar to hero name */}
            <motion.div
                className="pointer-events-none absolute bottom-0 right-0 w-full select-none text-[15vw] sm:text-[12vw] md:text-[10vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
            >
                Portfolio
            </motion.div>
        </section>
    );
};

export default Portfolio;
