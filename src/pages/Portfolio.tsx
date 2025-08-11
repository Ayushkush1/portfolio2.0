import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Contact from "@/components/Contact";

const PortfolioPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

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

    const allProjects = [
        {
            id: 1,
            title: "NinzaHost Platform",
            category: "Web Design, Development, UI/UX",
            description: "A modern web hosting platform featuring intuitive dashboard, server management, and seamless user experience.",
            image: "/lovable-uploads/ninzahost.png",
            url: "https://ninzahost.com",
            year: "2024",
            technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
            rotation: "rotate-2"
        },
        {
            id: 2,
            title: "RemoveQ Background Remover",
            category: "Web App, AI Integration",
            description: "Advanced AI-powered background removal tool with batch processing and high-quality image editing capabilities.",
            image: "/lovable-uploads/removeq.png",
            url: "https://removeq.com",
            year: "2024",
            technologies: ["React", "AI/ML", "Canvas API", "WebGL"],
            rotation: "-rotate-2"
        },
        {
            id: 3,
            title: "Tigsaw Project Management",
            category: "SaaS, Dashboard Design",
            description: "Comprehensive project management platform with team collaboration, task tracking, and analytics dashboard.",
            image: "/lovable-uploads/six-table.png",
            url: "https://tigsaw.com",
            year: "2023",
            technologies: ["Vue.js", "Express", "MongoDB", "D3.js"],
            rotation: "rotate-2"
        },
        {
            id: 4,
            title: "Blooger Content Platform",
            category: "CMS, Blog Platform",
            description: "Modern blogging platform with rich text editor, SEO optimization, and content management system.",
            image: "/lovable-uploads/blooger.png",
            url: "https://blooger.com",
            year: "2023",
            technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
            rotation: "-rotate-2"
        },
        {
            id: 5,
            title: "Movix Entertainment Hub",
            category: "Streaming, UI/UX",
            description: "Entertainment streaming platform with movie discovery, watchlists, and personalized recommendations.",
            image: "/lovable-uploads/movix.png",
            url: "https://movix.com",
            year: "2023",
            technologies: ["React", "Redux", "Firebase", "TMDB API"],
            rotation: "rotate-2"
        },
        {
            id: 6,
            title: "Proposal Pro Business Tool",
            category: "Business App, Document Generation",
            description: "Professional proposal creation tool with templates, e-signatures, and client management features.",
            image: "/lovable-uploads/proposal-pro.png",
            url: "https://proposalpro.com",
            year: "2022",
            technologies: ["Angular", "PDF.js", "Node.js", "Stripe"],
            rotation: "-rotate-2"
        },
        {
            id: 7,
            title: "Mobius Engine Analytics",
            category: "Data Analytics, Dashboard",
            description: "Advanced analytics engine with real-time data visualization, custom reports, and business intelligence.",
            image: "/lovable-uploads/MobuisEngine.png",
            url: "https://mobiusengine.com",
            year: "2022",
            technologies: ["React", "Chart.js", "WebSockets", "Python"],
            rotation: "rotate-2"
        },
        {
            id: 8,
            title: "Personal Portfolio v1",
            category: "Portfolio, Creative Design",
            description: "First iteration of personal portfolio showcasing creative design approach and interactive elements.",
            image: "/lovable-uploads/portfolio.png",
            url: "https://ayushkushwaha.dev",
            year: "2022",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
            rotation: "-rotate-2"
        }
    ];

    const title = "Portfolio – Ayush Kushwaha | Web & UI/UX Designer";
    const description = "Explore my complete portfolio of web design and development projects. From SaaS platforms to creative websites, discover my work in UI/UX design and full-stack development.";
    const canonical = typeof window !== "undefined" ? window.location.origin + "/portfolio" : "/portfolio";

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Helmet>

            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
                {/* Navigation Header */}
                <motion.header
                    className="container relative z-10 flex items-center justify-between py-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Link to="/">
                        <motion.img
                            src="/lovable-uploads/logo.png"
                            alt="Ayush Kushwaha Logo"
                            className="h-8 w-auto brightness-0 invert cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        />
                    </Link>
                    <Link to="/">
                        <motion.button
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 cursor-pointer hover:bg-brand/20 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.header>

                <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-24">
                    {/* Hero Section */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-6xl font-bold text-foreground mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            My <span className="italic font-light text-brand">Portfolio</span>
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            A curated collection of my web design and development projects,
                            showcasing creativity, functionality, and user-centered design.
                        </motion.p>
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.1 }}
                    >
                        {allProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="group relative cursor-pointer"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                whileHover={{
                                    y: -8,
                                    rotateY: 5,
                                    rotateX: 5
                                }}
                                onMouseMove={(e) => handleMouseMove(e, project.id)}
                                onMouseEnter={() => handleMouseEnter(project.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleProjectClick(project.url)}
                            >
                                {/* Cursor Follower Circle */}
                                <motion.div
                                    className="absolute pointer-events-none z-50 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        left: mousePosition.x - 30,
                                        top: mousePosition.y - 30,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: hoveredCardId === project.id ? 1 : 0,
                                        scale: hoveredCardId === project.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </motion.div>

                                {/* Project Card */}
                                <div className="relative h-[420px] p-6 rounded-3xl bg-gradient-to-br from-gray-900/10 via-gray-800/10 to-gray-800/20 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-brand/20 rounded-full blur-lg" />

                                    {/* Floating Image Container - Browser Mockup */}
                                    <div className={`relative mb-4 ${project.rotation} group-hover:rotate-0 transition-transform duration-500`}>
                                        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gray-900 p-2">
                                            {/* Browser Frame */}
                                            <div className="bg-gray-800 rounded-t-lg p-2 flex items-center gap-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                                <div className="flex-1 bg-gray-700 rounded-sm h-5 ml-2"></div>
                                            </div>

                                            {/* Screen Content Area */}
                                            <div className="aspect-[16/7] overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
                                                    className="px-3 py-1 bg-brand/10 text-brand text-xs rounded-md font-medium border border-brand/20 hover:bg-brand/20 transition-colors duration-200"
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

                <Contact />


            </section>
        </>
    );
};

export default PortfolioPage;
