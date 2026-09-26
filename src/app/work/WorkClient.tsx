"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import Contact from "@/components/Contact";
import ClientWebsites from "@/components/ClientWebsites";
import { caseStudies, clientWebsites } from "@/data/projects";
import Navbar from "@/components/Navbar";

const workIndicatorSections = [
    { id: "projects-list", label: "Projects" },
    { id: "websites", label: "Websites" },
    { id: "contact", label: "Contact" }
];

type Filter = "all" | "products" | "websites";
const FILTERS: { id: Filter; label: string; count?: number }[] = [
    { id: "all", label: "All" },
    { id: "products", label: "Products", count: caseStudies.length },
    { id: "websites", label: "Websites", count: clientWebsites.length },
];

/* ─── Single card ───────────────────────────────────────────── */
function ProjectCard({
    id,
    name,
    category,
    image,
    heightClass,
}: {
    id: string;
    name: string;
    category: string;
    image: string;
    heightClass: string;
}) {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4">
            <div
                className={`group relative block cursor-none w-full overflow-hidden ${heightClass}`}
                style={{ borderRadius: "40px" }}
                onClick={() => router.push(`/work/${id}`)}
            >
                {/* Tall cover fills the card; crops from the bottom only */}
                <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "40px" }}>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 62vw, 850px"
                        className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                </div>
            </div>
            <div className="ml-3">
                <h3 className="text-xl md:text-2xl font-normal text-white">
                    {name}
                </h3>
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50 mt-1">
                    {category}
                </p>
            </div>
        </div>
    );
}

/* ─── Row: big card left + small card right (alternates) ────── */
function ProjectRow({
    big,
    small,
    reverse = false,
}: {
    big: { id: string; name: string; category: string; image: string };
    small: { id: string; name: string; category: string; image: string };
    reverse?: boolean;
}) {
    return (
        <motion.div
            className={`flex gap-6 md:gap-10 w-full items-start ${reverse ? "flex-row-reverse" : "flex-row"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Big card — 62% */}
            <div style={{ flex: "0 0 62%" }}>
                <ProjectCard
                    {...big}
                    heightClass="h-[340px] md:h-[500px]"
                />
            </div>
            {/* Small card — 38% */}
            <div className="flex-1">
                <ProjectCard
                    {...small}
                    heightClass="h-[210px] md:h-[300px]"
                />
            </div>
        </motion.div>
    );
}

/* ─── Page ──────────────────────────────────────────────────── */
const WorkClient = () => {
    const [filter, setFilter] = useState<Filter>("all");

    // Deep link: /work#websites or /work#products opens that tab
    useEffect(() => {
        const syncFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            setFilter(hash === "websites" || hash === "products" ? hash : "all");
        };
        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);
        return () => window.removeEventListener("hashchange", syncFromHash);
    }, []);

    const selectFilter = (next: Filter) => {
        setFilter(next);
        history.replaceState(null, "", next === "all" ? "/work" : `/work#${next}`);
    };

    const projects = caseStudies.map(cs => ({
        id: cs.id,
        name: cs.name,
        category: cs.category,
        image: cs.cover ?? cs.images[0],
    }));

    // Pair up projects into rows
    const rows: [typeof projects[0], typeof projects[0]][] = [];
    for (let i = 0; i + 1 < projects.length; i += 2) {
        rows.push([projects[i], projects[i + 1]]);
    }
    // If odd number of projects, handle the last one as a full-width card
    const hasOrphan = projects.length % 2 !== 0;
    const orphan = hasOrphan ? projects[projects.length - 1] : null;

    return (
        <section className="relative min-h-screen bg-background text-white">
            {/* Ambient glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 95, 38, 0.03) 0%, transparent 50%)" }}
            />

            <Navbar backTo="/" customIndicatorSections={workIndicatorSections} />

            <div id="projects-list" className="container relative z-10 pt-32 pb-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
                    <div>
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Selected work <br />
                            <span className="italic text-gray-400">
                                built to perform<span className="text-brand">.</span>
                            </span>
                        </motion.h1>
                    </div>

                    {/* Filter tabs */}
                    <motion.div
                        role="tablist"
                        aria-label="Filter work"
                        className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                role="tab"
                                aria-selected={filter === f.id}
                                onClick={() => selectFilter(f.id)}
                                className={`relative rounded-full px-4 md:px-5 py-2 text-sm font-medium transition-colors duration-300 cursor-none ${filter === f.id ? "text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                {filter === f.id && (
                                    <motion.span
                                        layoutId="work-filter-pill"
                                        className="absolute inset-0 rounded-full bg-brand shadow-[0_0_20px_rgba(255,95,38,0.35)]"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {f.label}
                                    {f.count !== undefined && <span className="ml-1.5 text-xs opacity-60">{f.count}</span>}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    {filter !== "websites" && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-16 md:gap-24"
                        >
                            {rows.map(([big, small], i) => (
                                <ProjectRow
                                    key={big.id}
                                    big={big}
                                    small={small}
                                    reverse={i % 2 === 1}
                                />
                            ))}

                            {/* Orphan — full width if odd count */}
                            {orphan && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full md:w-[62%]"
                                >
                                    <ProjectCard {...orphan} heightClass="h-[340px] md:h-[500px]" />
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                {filter !== "products" && (
                    <motion.div
                        key="websites"
                        className={filter === "websites" ? "-mt-24 md:-mt-32" : ""}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ClientWebsites hideHeader={filter === "websites"} />
                    </motion.div>
                )}
            </AnimatePresence>

            <Contact />
        </section>
    );
};

export default WorkClient;
