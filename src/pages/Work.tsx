import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Contact from "@/components/Contact";
import { caseStudies, portfolioProjects } from "@/data/projects";

interface DisplayProject {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    url: string;
    year: string;
    role: string;
    techStack: string[];
}

const WorkPage = () => {
    const navigate = useNavigate();
    const title = "Work – Ayush Kushwaha | Full-Stack Product Engineer";
    const description = "Selected case studies of SaaS platforms, ERP systems, and digital products built by Ayush Kushwaha.";
    const canonical = typeof window !== "undefined" ? window.location.origin + "/work" : "/work";

    const displayProjects: DisplayProject[] = caseStudies.map(cs => ({
        id: cs.id,
        title: cs.name,
        category: cs.category,
        description: cs.tagline,
        image: cs.images[0],
        url: `/work/${cs.id}`,
        year: cs.year,
        role: cs.role,
        techStack: cs.techStack,
    }));

    const handleProjectClick = (project: DisplayProject) => {
        navigate(project.url);
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
            </Helmet>

            <section className="relative min-h-screen bg-background text-white selection:bg-brand selection:text-white">
                {/* Minimal ambient top light */}
                <div
                    className="pointer-events-none fixed inset-0 z-0"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 95, 38, 0.03) 0%, transparent 50%)" }}
                />

                {/* Header */}
                <motion.header
                    className="container max-w-7xl relative z-50 flex items-center justify-between pt-8 pb-4 mx-auto px-4 md:px-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/">
                        <motion.img src="/assets/ayush-kushwaha-logo.png" alt="Logo" className="h-6 w-auto brightness-0 invert" whileHover={{ scale: 1.02 }} />
                    </Link>
                    <Link to="/">
                        <motion.button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.header>

                <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-16">
                    {/* Hero Statement */}
                    <div className="mb-24">
                        <motion.p
                            className="text-brand text-xs font-mono uppercase tracking-[0.2em] mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Selected Projects
                        </motion.p>
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none max-w-4xl"
                            style={{ fontFamily: "'Fraunces', serif" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Products built <span className="italic font-bold text-brand">to perform</span>
                        </motion.h1>
                    </div>

                    {/* Creative Editorial Layout for Projects */}
                    <div className="flex flex-col gap-y-32 md:gap-y-48 mb-40">
                        {displayProjects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.article
                                    key={project.id}
                                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center group cursor-pointer`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Image Section */}
                                    <div className="w-full lg:w-3/4 relative">
                                        <div className="w-full rounded-xl overflow-hidden bg-neutral-900/40 relative border border-white/5 shadow-2xl">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                                className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                                        </div>
                                        {/* Floating Number watermark */}
                                        <div 
                                            className={`absolute top-4 ${isEven ? '-left-4 lg:-left-12' : '-right-4 lg:-right-12'} font-bold text-6xl md:text-8xl opacity-15 mix-blend-difference font-mono pointer-events-none transition-all duration-700 group-hover:opacity-30 z-[-1] lg:z-10`} 
                                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)', color: 'transparent' }}
                                        >
                                            0{index + 1}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="w-full lg:w-1/4 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                                                {project.year}
                                            </span>
                                            <div className="h-px w-6 bg-white/20 group-hover:w-10 group-hover:bg-brand transition-all duration-500" />
                                            <span className="text-[10px] font-mono tracking-widest text-brand uppercase">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-light text-white mb-4 group-hover:text-brand transition-colors duration-500 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                                            {project.title}
                                        </h2>
                                        
                                        <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                                            {project.description}
                                        </p>

                                        {/* Metadata Grid */}
                                        <div className="grid grid-cols-1 gap-5 pt-6 border-t border-white/10 mb-8">
                                            <div>
                                                <span className="block text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">Role</span>
                                                <span className="text-xs text-white/80 font-light">{project.role.split('—')[0].trim()}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">Tech Stack</span>
                                                <span className="text-xs text-white/80 font-light">{project.techStack.slice(0, 3).join(', ')}</span>
                                            </div>
                                        </div>

                                        {/* Explore Button */}
                                        <div className="inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-white/80 group-hover:text-brand transition-colors duration-300">
                                            <span>Explore Case Study</span>
                                            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand group-hover:bg-brand/10 transition-all duration-500">
                                                <ArrowUpRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>

                <Contact />
            </section>
        </>
    );
};

export default WorkPage;
