import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Contact from "@/components/Contact";

import { portfolioProjects as allProjects } from "@/data/projects";

const PortfolioPage = () => {
    const title = "Portfolio – Ayush Kushwaha | SaaS Engineer & Product Builder";
    const description = "Explore my portfolio of SaaS platforms and digital products.";
    const canonical = typeof window !== "undefined" ? window.location.origin + "/portfolio" : "/portfolio";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        url: canonical,
        description: description,
        author: {
            "@type": "Person",
            name: "Ayush Kushwaha"
        }
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ayushkushwaha.com/assets/ayush-kushwaha.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://ayushkushwaha.com/assets/ayush-kushwaha.webp" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <section className="relative min-h-screen bg-background text-white selection:bg-[#ff5f26] selection:text-white">
                
                {/* Background Ambient Lighting */}
                <div
                    className="pointer-events-none fixed inset-0 z-0"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 95, 38, 0.05) 0%, transparent 60%)" }}
                />

                {/* Header */}
                <motion.header
                    className="container max-w-7xl relative z-50 flex items-center justify-between pt-8 pb-4 mx-auto px-4 md:px-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link to="/">
                        <motion.img src="/assets/ayush-kushwaha-logo.webp" alt="Logo" className="h-6 w-auto brightness-0 invert" whileHover={{ scale: 1.05 }} />
                    </Link>
                    <Link to="/">
                        <motion.button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.header>

                <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-4">
                    
                    {/* Hero Section - Reverted to massive cinematic typography */}
                    <motion.div 
                        className="text-center mb-24 mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light text-white mb-6 tracking-tight leading-none drop-shadow-2xl" style={{ fontFamily: "'Fraunces', serif" }}>
                            My <span className="italic font-bold text-[#ff5f26]">Work</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            A curated collection of scalable SaaS platforms, CRMs, and performant web applications. Built for production.
                        </p>
                    </motion.div>

                    {/* Multi-Card Folder Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                        {allProjects.map((project, index) => {
                            return (
                                <motion.div
                                    key={project.id}
                                    className="relative w-full flex flex-col group cursor-pointer"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                                    onClick={() => window.open(project.url, '_blank')}
                                >
                                    {/* Top Row: Tab area (Left) and Raised Card (Right) */}
                                    <div className="flex h-10 md:h-12 w-full">
                                        {/* Tab Area */}
                                        <div className="w-28 md:w-36 h-full flex items-center px-4 relative z-10">
                                            <span className="text-white/40 group-hover:text-[#ff5f26] font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                                {project.title.split(' ')[0]}
                                            </span>
                                        </div>
                                        
                                        {/* Raised Card (Right side) */}
                                        <div className="flex-1 h-full bg-[#18181b] group-hover:bg-[#27272a] transition-colors duration-500 rounded-tr-[1.5rem] rounded-tl-2xl relative border-t border-r border-white/10 shadow-inner">
                                            {/* The SVG Inner Curve connecting tab area to raised card */}
                                            <svg className="absolute bottom-0 -left-6 w-6 h-6 fill-[#18181b] group-hover:fill-[#27272a] transition-colors duration-500" viewBox="0 0 24 24">
                                                <path d="M 0 24 C 12 24, 24 12, 24 0 L 24 24 Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Main Card Body */}
                                    <div className="w-full bg-[#18181b] group-hover:bg-[#27272a] transition-colors duration-500 rounded-b-[1.5rem] rounded-tl-2xl p-4 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-t-0 border-white/10">
                                        
                                        {/* Image Section - Now has explicit padding around it so the card background is visible */}
                                        <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl relative mb-6">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" />
                                            
                                            {/* Hover Interaction Overlay */}
                                            <div className="absolute inset-0 bg-[#ff5f26]/0 group-hover:bg-[#ff5f26]/20 transition-colors duration-500 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-white text-[#ff5f26] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                                    <ArrowRight className="w-8 h-8 -rotate-45" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Text & Details Section - Now placed explicitly on the card body */}
                                        <div className="px-2 pb-2 flex justify-between items-end">
                                            <div>
                                                <h3 className="text-3xl font-light text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                                                    {project.title}
                                                </h3>
                                                <span className="text-white/50 text-sm tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
                
                <div className="mt-32">
                    <Contact />
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;
