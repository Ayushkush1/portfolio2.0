import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code2, ShieldAlert, Cpu, Palette, Milestone } from "lucide-react";
import { caseStudies } from "@/data/projects";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

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
                <Navbar isProjectDetail={true} />

                <main className="relative z-10 container  pt-24 md:pt-32 pb-26">
                    {/* Project Intro / Hero */}
                    <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start md:mb-12">
                        {/* Title & Tagline Column */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 
                                    className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-2 tracking-tight leading-none"
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    {project.name}
                                </h1>
                                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-3xl">
                                    {project.tagline}
                                </p>
                            </motion.div>
                        </div>

                        {/* Top Link Column */}
                        <div className="lg:col-span-4 flex lg:justify-end items-end">
                            {/* URL CTA — hidden on mobile */}
                            <div className="hidden lg:block">
                                {project.liveUrl !== "#" ? (
                                    <motion.div
                                        className="group"
                                        whileHover="hover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Button
                                            variant="hero"
                                            size="lg"
                                            className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)] pl-5 pr-2"
                                            asChild
                                        >
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div className="relative overflow-hidden h-6 w-fit text-white">
                                                    <motion.div
                                                        className="flex flex-col items-center"
                                                        variants={{
                                                            hover: { y: -24 }
                                                        }}
                                                        initial={{ y: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <span className="w-full flex items-center justify-center whitespace-nowrap">
                                                            Visit Live Project
                                                        </span>
                                                        <span className="w-full flex items-center justify-center font-semibold whitespace-nowrap">
                                                            Visit Live Project
                                                        </span>
                                                    </motion.div>
                                                </div>
                                                <motion.div
                                                    className="bg-white rounded-full p-2 flex items-center justify-center ml-2 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_15px_rgba(255,95,38,0.3)]"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 15px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)",
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
                                                    <ArrowRight className="h-4 w-4 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                                </motion.div>

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
                                            </a>
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <span className="text-white/30 text-sm italic font-light block lg:pt-4">
                                        Internal / Enterprise system (live URL restricted)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Featured Large Screenshot */}
                    {project.images.length > 0 && (
                        <motion.div 
                            className="w-full aspect-[16/7] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-white/5 mb-10 md:mb-24 relative group"
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
                    <div id="context" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-6 md:py-10 border-y border-white/10 mb-10 md:mb-24">
                        <div>
                            <span className="block text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">My Role</span>
                            <span className="text-white/80 font-light text-xs md:text-base leading-relaxed block">{project.role.split(" — ")[0]}</span>
                        </div>
                        <div>
                            <span className="block text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Platform / Category</span>
                            <span className="text-white/80 font-light text-xs md:text-base block">{project.category}</span>
                        </div>
                        <div>
                            <span className="block text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Year</span>
                            <span className="text-white/80 font-light text-xs md:text-base block">{project.year}</span>
                        </div>
                        <div>
                            <span className="block text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Core Tech</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {project.techStack.slice(0, 3).map((t, idx) => (
                                    <span key={idx} className="text-[9px] md:text-[10px] text-white/70 bg-white/5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-white/5 font-mono">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Case Study Details Grid */}
                    <div id="vision" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
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
                        <div id="interface" className="mb-24">
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
                                        className="rounded-[1.5rem] overflow-hidden border border-white/10 aspect-[16/7] bg-gray-900 shadow-2xl"
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
                    <div id="decisions" className="p-8 md:p-12 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.01] to-white/[0.04] mb-24">
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

                </main>

                <Contact title="Interested in building something similar?" />
            </div>
        </>
    );
};

export default ProjectDetail;
