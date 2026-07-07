import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Rows } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Contact from "@/components/Contact";
import { caseStudies } from "@/data/projects";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const workIndicatorSections = [
    { id: "projects-list", label: "Projects" },
    { id: "contact", label: "Contact" }
];

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
    const [viewMode, setViewMode] = useState<"editorial" | "grid">("editorial");
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
                <Navbar backTo="/" customIndicatorSections={workIndicatorSections} />

                <div id="projects-list" className="container relative z-10 pt-32">
                    {/* Hero Statement with Layout Toggle */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-20">
                        <div>
                            <motion.p
                                className="text-brand text-xs font-mono uppercase tracking-[0.2em] mb-2 md:mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Selected Projects
                            </motion.p>
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                                style={{ fontFamily: "'Fraunces', serif" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Selected products <br />
                                <span className="italic text-gray-400">built to scale<span className="text-brand">.</span></span>
                            </motion.h1>
                        </div>
                        
                        {/* View Mode Switcher — hidden on mobile */}
                        <motion.div 
                            className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full p-1 self-end md:self-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <button
                                onClick={() => setViewMode("editorial")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                    viewMode === "editorial" 
                                        ? "bg-brand text-white shadow-[0_0_15px_rgba(255,95,38,0.3)]" 
                                        : "text-white/40 hover:text-white/80"
                                }`}
                                aria-label="Editorial list view"
                            >
                                <Rows className="w-3.5 h-3.5" />
                                <span>Rows</span>
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                    viewMode === "grid" 
                                        ? "bg-brand text-white shadow-[0_0_15px_rgba(255,95,38,0.3)]" 
                                        : "text-white/40 hover:text-white/80"
                                }`}
                                aria-label="Image grid view"
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span>Grid</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Creative Layouts conditional on viewMode */}
                    {viewMode === "editorial" ? (
                        <div className="flex flex-col gap-y-12 md:gap-y-36 mb-40 px-2 md:px-10">
                        {displayProjects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.article
                                    key={project.id}
                                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-4 lg:gap-16 items-center group cursor-pointer border-b border-white/5 pb-8 lg:pb-0 lg:border-none`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover="hover"
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Image Section */}
                                    <div className="w-full lg:w-3/4 relative lg:w-auto w-[calc(100%+2rem)]">
                                        <div className="w-full rounded-[1rem] md:rounded-[3rem] overflow-hidden bg-neutral-900/40 relative border-y md:border border-white/5 shadow-2xl">
                                            <motion.img
                                                src={project.image}
                                                alt={project.title}
                                                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                                className="w-full h-auto"
                                                variants={{
                                                    hover: { scale: 1.03 }
                                                }}
                                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                                        </div>
                                        {/* Floating Number watermark */}
                                        <div 
                                            className={`absolute top-4 ${isEven ? '-left-4 lg:-left-12' : '-right-4 lg:-right-12'} font-bold text-5xl md:text-8xl opacity-15 mix-blend-difference font-mono pointer-events-none transition-all duration-700 group-hover:opacity-30 z-10`} 
                                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)', color: 'transparent' }}
                                        >
                                            0{index + 1}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="w-full lg:w-1/4 flex flex-col justify-center text-left">
                                         {/* Mobile category tag inline with title | Desktop standard */}
                                         <div className="flex items-start justify-between gap-2 mb-2 lg:hidden w-full">
                                             <h2 className="text-2xl font-light text-white leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                                                 {project.title}
                                             </h2>
                                             <span className="text-[10px] font-mono tracking-widest text-brand uppercase mt-1.5 shrink-0">
                                                 {project.category}
                                             </span>
                                         </div>

                                        {/* Desktop only Category & Title */}
                                        <div className="hidden lg:block">
                                             <div className="flex items-center gap-3 mb-4">
                                                 <span className="text-[10px] font-mono tracking-widest text-brand uppercase">
                                                     {project.category}
                                                 </span>
                                             </div>
                                             <h2 className="text-3xl md:text-4xl font-light text-white mb-1 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                                                 {project.title}
                                             </h2>
                                        </div>
                                        
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 lg:mb-6 font-light">
                                            {project.description}
                                        </p>

                                        {/* Tech tags list (Showcase style) below description on mobile | metadata grid on desktop */}
                                        <div className="flex flex-wrap gap-1.5 mb-2 lg:hidden">
                                            {project.techStack.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] text-white/50 tracking-wider uppercase"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Metadata Grid — desktop only */}
                                        <div className="hidden lg:grid grid-cols-1 gap-5 pt-6 border-t border-white/10 mb-8">
                                            <div>
                                                <span className="block text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">Role</span>
                                                <span className="text-xs text-white/80 font-light">{project.role.split('—')[0].trim()}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">Tech Stack</span>
                                                <span className="text-xs text-white/80 font-light">{project.techStack.slice(0, 3).join(', ')}</span>
                                            </div>
                                        </div>

                                         {/* Explore Button — hidden on mobile since image is clickable */}
                                         <div className="mt-2 w-fit mx-auto lg:mx-0 hidden lg:block">
                                             <Button
                                                 variant="hero"
                                                 size="lg"
                                                 className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)] pl-5 pr-2"
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
                                                         <span className="w-full flex items-center justify-center whitespace-nowrap text-sm font-medium h-6 leading-6">
                                                             Explore Case Study
                                                         </span>
                                                         <span className="w-full flex items-center justify-center font-semibold whitespace-nowrap text-sm h-6 leading-6">
                                                             Explore Case Study
                                                         </span>
                                                     </motion.div>
                                                 </div>
                                                 <motion.div
                                                     className="bg-white rounded-full p-1.5 flex items-center justify-center ml-2.5 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_10px_rgba(255,95,38,0.3)]"
                                                     animate={{
                                                         boxShadow: [
                                                             "0 0 10px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)",
                                                             "0 0 18px rgba(255, 95, 38, 0.5), 0 0 0 6px rgba(255, 95, 38, 0)",
                                                             "0 0 10px rgba(255, 95, 38, 0.3), 0 0 0 0 rgba(255, 95, 38, 0)"
                                                         ]
                                                     }}
                                                     transition={{
                                                         duration: 2,
                                                         repeat: Infinity,
                                                         ease: "easeInOut"
                                                     }}
                                                 >
                                                     <ArrowUpRight className="h-3.5 w-3.5 text-[#ff5f26] transition-all group-hover:rotate-45 duration-300" />
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
                                             </Button>
                                         </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                    ) : (
                        /* Pure Image Grid Layout */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
                            {displayProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-neutral-900/40 border border-white/5 shadow-2xl cursor-pointer group aspect-[16/7]"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover="hover"
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                        className="w-full h-full object-cover"
                                        variants={{
                                            hover: { scale: 1.04 }
                                        }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                    {/* Hover info overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                                        <span className="text-[10px] font-mono tracking-widest text-brand uppercase">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-light text-white leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <Contact />
            </section>
        </>
    );
};

export default WorkPage;
