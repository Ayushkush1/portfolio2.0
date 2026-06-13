import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Contact from "@/components/Contact";

const caseStudies = [
    {
        id: "catfy",
        name: "CATFY",
        tagline: "AI-Powered Catalogue Platform",
        category: "SaaS Platform",
        year: "2024",
        status: "Live",
        color: "#ff5f26",
        overview: "CATFY is a full-stack SaaS platform that empowers businesses to create, manage, and share professional digital catalogues — without any design expertise. Businesses can add products, generate AI-assisted descriptions, and share branded catalogues with clients via link.",
        challenge: "Small and medium businesses were spending hours creating PDF catalogues manually in Canva or PowerPoint. There was no centralized platform to manage product listings, update them in real time, or track who viewed the catalogue.",
        solution: "Built a multi-tenant SaaS platform with a drag-and-drop catalogue builder, AI content generation for product descriptions, real-time analytics, and shareable catalogue links with custom branding.",
        designDecisions: [
            "Chose a card-based builder UX to minimize the learning curve for non-technical users.",
            "Implemented AI description generation directly in-context to reduce friction.",
            "Dark dashboard theme with brand-color accents for a premium SaaS feel.",
        ],
        architecture: "Next.js frontend with React server components, PostgreSQL via Prisma ORM, Supabase for auth and file storage, Vercel deployment with edge functions for fast global performance.",
        role: "Solo Full-Stack Engineer & Product Designer — architecture, UI/UX design, backend APIs, database schema, and deployment.",
        outcome: "Live platform with 10k+ catalogue views. Businesses report 70% reduction in time spent creating product listings.",
        techStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS", "Vercel"],
        images: ["/assets/catfy.png", "/assets/Catfy_LandignPage.png"],
        liveUrl: "https://catfy-catalog.vercel.app",
    },
    {
        id: "leadzenor",
        name: "Leadzenor",
        tagline: "Lead Management Platform",
        category: "CRM / SaaS",
        year: "2025",
        status: "Live",
        color: "#10b981",
        overview: "Leadzenor is a CRM-style lead management platform built for small sales teams. It provides a centralized pipeline view, lead status tracking, follow-up reminders, and team-level analytics — all in a clean, fast interface.",
        challenge: "Sales teams were managing hundreds of leads in shared spreadsheets with no pipeline visibility. Leads were being lost due to missed follow-ups, and managers had no way to track team performance.",
        solution: "Designed and built a Kanban-style pipeline with drag-and-drop lead management, automated follow-up reminders via notifications, team role management, and a real-time analytics dashboard.",
        designDecisions: [
            "Kanban board as the primary view for intuitive pipeline visualization.",
            "Color-coded lead statuses for fast at-a-glance pipeline health.",
            "Minimal sidebar navigation to keep focus on the pipeline.",
        ],
        architecture: "React frontend with custom hooks for real-time state, Node.js/Express REST API, PostgreSQL with Prisma, Supabase for auth, and Docker for containerized deployment.",
        role: "Full-Stack Engineer & UI/UX Designer — designed the full product flow in Figma, built frontend and backend, and handled deployment.",
        outcome: "Reduced lead response time by 60% for active users. Currently used by 3+ sales teams with positive feedback on UX simplicity.",
        techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Docker", "Tailwind CSS"],
        images: ["/assets/Leadzenor_LandingPage.png", "/assets/Leadzenor_Dashboard.png"],
        liveUrl: "#",
    },
    {
        id: "karatrix",
        name: "Karatrix",
        tagline: "Jewellery ERP Platform",
        category: "ERP System",
        year: "2025",
        status: "In Use",
        color: "#a855f7",
        overview: "Karatrix is a purpose-built ERP system for jewellery businesses. It digitizes inventory management, billing, customer accounts, and sales reporting — replacing a fully manual physical ledger system.",
        challenge: "A jewellery business was tracking inventory across handwritten ledgers and disconnected spreadsheets. Billing was done manually with no digital records, making audits and reporting nearly impossible.",
        solution: "Built a comprehensive ERP with module-based architecture: Inventory (by metal type, weight, purity), Billing (GST-compliant invoicing), Customer Profiles, and a Sales Analytics dashboard.",
        designDecisions: [
            "Module-first architecture so the business can use only the features they need.",
            "Weight-based inventory tracking with custom fields for karatage and purity.",
            "Print-ready invoice templates for in-store billing.",
        ],
        architecture: "Next.js with full-stack API routes, PostgreSQL for relational inventory data, Prisma ORM with custom migrations, Docker for local deployment, and PDF generation for invoices.",
        role: "Sole architect and engineer — designed the database schema, built all modules, and deployed the system on-premise for the business.",
        outcome: "Eliminated manual ledger errors entirely. Business saves 15+ hours/week on billing and reporting. Real-time inventory tracking across all product categories.",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Tailwind CSS"],
        images: ["/assets/Karatrix_LandingPage.png", "/assets/Karatrix_Dashboard.png"],
        liveUrl: "#",
    },
    {
        id: "ip-erp",
        name: "IP ERP",
        tagline: "Enterprise Workflow Platform",
        category: "Enterprise ERP",
        year: "2025",
        status: "Live",
        color: "#3b82f6",
        overview: "IP ERP is a modular enterprise resource planning system built for a growing company. It centralizes task management, approval workflows, department-level reporting, and role-based access control across the organization.",
        challenge: "The organization lacked a unified system to manage operations. Tasks were assigned over WhatsApp, approvals were email-based, and there was no visibility into cross-department work — causing delays and accountability gaps.",
        solution: "Engineered a modular ERP with: Task Management with assignment and priority, Multi-step Approval Workflows, Department Dashboards, Role-Based Access (Admin / Manager / Employee), and Notification System for real-time updates.",
        designDecisions: [
            "Role-based access system designed first — determining what each user type can see and do.",
            "Workflow engine built as a reusable state machine to support any multi-step process.",
            "Compact, data-dense tables for managers vs. simplified views for employees.",
        ],
        architecture: "Next.js with TypeScript, REST API with role middleware, PostgreSQL with Prisma, GitHub Actions for CI/CD, and Vercel for staging and production deployments.",
        role: "Tech Lead — led architecture design, built the core workflow engine, and coordinated frontend component development.",
        outcome: "Streamlined operations across 5+ departments. Approval cycle time reduced by 45%. Full audit trail for all actions and decisions.",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "GitHub Actions", "Vercel", "Tailwind CSS"],
        images: ["/assets/Erp_LandinPage.png", "/assets/Erp_Dashboard.png"],
        liveUrl: "#",
    },
];

const CaseStudyCard = ({ study, index }: { study: typeof caseStudies[0]; index: number }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.article
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            {/* Top accent bar */}
            <div className="h-0.5 w-full" style={{ backgroundColor: study.color }} />

            {/* Header */}
            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div>
                        {/* Meta row */}
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                                style={{ color: study.color, borderColor: `${study.color}40`, backgroundColor: `${study.color}10` }}
                            >
                                {study.category}
                            </span>
                            <span className="text-gray-600 text-xs">{study.year}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                {study.status}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                            {study.name}
                        </h2>
                        <p className="text-gray-400 text-base">{study.tagline}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {study.liveUrl !== "#" && (
                            <a
                                href={study.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Live Project
                            </a>
                        )}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-white"
                            style={{ backgroundColor: `${study.color}20`, border: `1px solid ${study.color}40` }}
                        >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {expanded ? "Collapse" : "Read Case Study"}
                        </button>
                    </div>
                </div>

                {/* Overview */}
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    {study.overview}
                </p>

                {/* Screenshots - always visible */}
                {study.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-8">
                        {study.images.map((img, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-gray-900">
                                <img
                                    src={img}
                                    alt={`${study.name} screenshot ${i + 1}`}
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Expandable deep-dive */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-8 md:px-12 pb-10 pt-2 border-t border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                                {/* Challenge */}
                                <div>
                                    <h3 className="text-xs font-mono text-brand/70 tracking-widest uppercase mb-3">Challenge</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{study.challenge}</p>
                                </div>

                                {/* Solution */}
                                <div>
                                    <h3 className="text-xs font-mono text-green-400/70 tracking-widest uppercase mb-3">Solution</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{study.solution}</p>
                                </div>

                                {/* Design Decisions */}
                                <div>
                                    <h3 className="text-xs font-mono text-purple-400/70 tracking-widest uppercase mb-3">Design Decisions</h3>
                                    <ul className="space-y-2">
                                        {study.designDecisions.map((d, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                                <span className="text-brand mt-0.5 text-xs font-bold">→</span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Architecture */}
                                <div>
                                    <h3 className="text-xs font-mono text-blue-400/70 tracking-widest uppercase mb-3">Technical Architecture</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{study.architecture}</p>
                                </div>

                                {/* My Role */}
                                <div>
                                    <h3 className="text-xs font-mono text-yellow-400/70 tracking-widest uppercase mb-3">My Role</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{study.role}</p>
                                </div>

                                {/* Outcome */}
                                <div>
                                    <h3 className="text-xs font-mono text-emerald-400/70 tracking-widest uppercase mb-3">Outcome</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{study.outcome}</p>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <h3 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.techStack.map((tech, i) => (
                                        <span key={i} className="text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
};

const WorkPage = () => {
    const title = "Work – Ayush Kushwaha | Full-Stack Product Engineer";
    const description = "Deep-dive case studies of SaaS platforms, ERP systems, and digital products built by Ayush Kushwaha.";
    const canonical = typeof window !== "undefined" ? window.location.origin + "/work" : "/work";

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Helmet>

            <section className="relative min-h-screen bg-background text-white selection:bg-brand selection:text-white">
                {/* Ambient */}
                <div
                    className="pointer-events-none fixed inset-0 z-0"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 95, 38, 0.06) 0%, transparent 60%)" }}
                />

                {/* Header */}
                <motion.header
                    className="container max-w-7xl relative z-50 flex items-center justify-between pt-8 pb-4 mx-auto px-4 md:px-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link to="/">
                        <motion.img src="/assets/logo.png" alt="Logo" className="h-6 w-auto brightness-0 invert" whileHover={{ scale: 1.05 }} />
                    </Link>
                    <Link to="/">
                        <motion.button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.header>

                <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-8">

                    {/* Hero */}
                    <motion.div
                        className="mb-20 mt-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.p
                            className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Product Case Studies
                        </motion.p>
                        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light text-white mb-6 tracking-tight leading-none" style={{ fontFamily: "'Fraunces', serif" }}>
                            My <span className="italic font-bold text-brand">Work</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/40 max-w-2xl font-light">
                            Deep-dives into architecture, design decisions, and technical challenges behind each product I've built.
                        </p>
                    </motion.div>

                    {/* Case Studies */}
                    <div className="space-y-6 mb-32">
                        {caseStudies.map((study, index) => (
                            <CaseStudyCard key={study.id} study={study} index={index} />
                        ))}
                    </div>
                </div>

                <Contact />
            </section>
        </>
    );
};

export default WorkPage;
