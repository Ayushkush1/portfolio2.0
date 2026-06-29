import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, ShieldAlert, Cpu, Palette, Milestone } from "lucide-react";
import { caseStudies } from "@/data/projects";
import Contact from "@/components/Contact";

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const project = caseStudies.find((c) => c.id === id);

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center px-4">
                <ShieldAlert className="w-16 h-16 text-brand mb-6 animate-pulse" />
                <h1 className="text-3xl font-light mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Project Not Found</h1>
                <p className="text-white/50 mb-8 max-w-md text-center font-light">
                    The project case study you are looking for doesn't exist or may have been relocated.
                </p>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        );
    }

    const title = `${project.name} Case Study | Ayush Kushwaha`;
    const description = project.tagline;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Helmet>

            <div className="min-h-screen bg-background text-white selection:bg-brand selection:text-white relative overflow-hidden">
                {/* Ambient glow styled to project's custom theme color */}
                <div
                    className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
                    }}
                />

                {/* Grid overlay for aesthetic premium texture */}
                <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

                {/* Header Navbar */}
                <motion.header
                    className="container max-w-7xl relative z-50 flex items-center justify-between pt-8 pb-4 mx-auto px-4 md:px-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link to="/">
                        <motion.img 
                            src="/assets/ayush-kushwaha-logo.png" 
                            alt="Logo" 
                            className="h-6 w-auto brightness-0 invert" 
                            whileHover={{ scale: 1.05 }} 
                        />
                    </Link>
                    <Link to="/work">
                        <motion.button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.header>

                <main className="relative z-10 container max-w-7xl mx-auto px-4 md:px-8 mt-12 pb-32">
                    {/* Project Intro / Hero */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
                        {/* Title & Tagline Column */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span
                                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                                        style={{ 
                                            color: project.color, 
                                            borderColor: `${project.color}40`, 
                                            backgroundColor: `${project.color}0a` 
                                        }}
                                    >
                                        {project.category}
                                    </span>
                                    <span className="text-white/40 text-sm font-mono">{project.year}</span>
                                    <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-semibold uppercase tracking-wider bg-green-500/5 border border-green-500/20 px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                        {project.status}
                                    </span>
                                </div>
                                <h1 
                                    className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-2 tracking-tight leading-none"
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    {project.name}
                                </h1>
                                <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-3xl">
                                    {project.tagline}
                                </p>
                            </motion.div>
                        </div>

                        {/* Top Link Column */}
                        <div className="lg:col-span-4 lg:text-right pt-2">
                            {project.liveUrl !== "#" ? (
                                <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium text-black bg-white hover:bg-brand hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_10px_35px_rgba(255,95,38,0.25)] group"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Visit Live Project
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.a>
                            ) : (
                                <span className="text-white/30 text-sm italic font-light block lg:pt-4">
                                    Internal / Enterprise system (live URL restricted)
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Featured Large Screenshot */}
                    {project.images.length > 0 && (
                        <motion.div 
                            className="w-full aspect-[16/10] md:aspect-[16/8] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-white/5 mb-24 relative group"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <img 
                                src={project.images[0]} 
                                alt={`${project.name} Overview Showcase`} 
                                className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                            />
                        </motion.div>
                    )}

                    {/* Metadata Overview Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-y border-white/10 mb-24">
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">My Role</span>
                            <span className="text-white/80 font-light text-sm md:text-base leading-relaxed block">{project.role.split(" — ")[0]}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Platform / Category</span>
                            <span className="text-white/80 font-light text-sm md:text-base block">{project.category}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Year</span>
                            <span className="text-white/80 font-light text-sm md:text-base block">{project.year}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Core Tech</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {project.techStack.slice(0, 3).map((t, idx) => (
                                    <span key={idx} className="text-[10px] text-white/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 font-mono">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Case Study Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
                        {/* Left Column: Challenge & Solution */}
                        <div className="lg:col-span-7 space-y-16">
                            <div>
                                <h2 
                                    className="text-3xl md:text-4xl font-light mb-6 flex items-center gap-3 text-white" 
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    <Milestone className="w-6 h-6 text-brand" />
                                    The Challenge
                                </h2>
                                <p className="text-white/60 font-light text-base leading-relaxed">
                                    {project.challenge}
                                </p>
                            </div>

                            <div>
                                <h2 
                                    className="text-3xl md:text-4xl font-light mb-6 flex items-center gap-3 text-white" 
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    <Cpu className="w-6 h-6 text-green-400" />
                                    The Solution
                                </h2>
                                <p className="text-white/60 font-light text-base leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Architecture & Outcomes */}
                        <div className="lg:col-span-5 space-y-16">
                            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-brand mb-4 flex items-center gap-2">
                                    <Code2 className="w-4 h-4" />
                                    Technical Architecture
                                </h3>
                                <p className="text-white/75 font-light text-sm leading-relaxed mb-6">
                                    {project.architecture}
                                </p>

                                <h3 className="text-xs font-mono uppercase tracking-widest text-green-400 mb-3">
                                    Key Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech, i) => (
                                        <span 
                                            key={i} 
                                            className="text-xs text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 
                                    className="text-3xl font-light mb-4 text-white" 
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    Business Outcome
                                </h2>
                                <p className="text-white/60 font-light text-base leading-relaxed">
                                    {project.outcome}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Showcase Images */}
                    {project.images.length > 1 && (
                        <div className="mb-24">
                            <h2 
                                className="text-3xl md:text-4xl font-light mb-10 text-center text-white" 
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                Interface & Dashboard Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.images.slice(1).map((img, i) => (
                                    <div 
                                        key={i} 
                                        className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gray-900 shadow-2xl"
                                    >
                                        <img 
                                            src={img} 
                                            alt={`${project.name} Detail Page Showcase`} 
                                            className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Design Decisions Block */}
                    <div className="p-8 md:p-12 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.01] to-white/[0.04] mb-24">
                        <h2 
                            className="text-3xl md:text-4xl font-light mb-8 flex items-center gap-3 text-white" 
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            <Palette className="w-6 h-6 text-purple-400" />
                            UX & Design Decisions
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.designDecisions.map((decision, idx) => (
                                <li key={idx} className="relative pl-8 text-white/70 font-light text-sm leading-relaxed">
                                    <span 
                                        className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                                        style={{ backgroundColor: project.color }}
                                    />
                                    {decision}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Page Footer CTA */}
                    <div className="flex flex-col items-center justify-center py-12 border-t border-white/10 text-center">
                        <h3 
                            className="text-2xl md:text-3xl font-light mb-6 text-white" 
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Interested in building something similar?
                        </h3>
                        <div className="flex gap-4">
                            <Link 
                                to="/work" 
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                All Case Studies
                            </Link>
                            <Link 
                                to="/" 
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white hover:bg-opacity-90 transition-colors text-sm font-medium"
                            >
                                Let's Connect
                            </Link>
                        </div>
                    </div>

                </main>

                <Contact />
            </div>
        </>
    );
};

export default ProjectDetail;
