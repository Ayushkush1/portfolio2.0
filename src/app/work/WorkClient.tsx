"use client";

import { useEffect, useState, ViewTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    return (
        <div className="flex flex-col gap-4">
            {/* Shares its name with the case study hero, so the card morphs into it on navigation */}
            <ViewTransition name={`project-${id}`} share="project-morph" default="none">
            <Link
                href={`/work/${id}`}
                data-cursor="View"
                data-cursor-ring={`${name} · ${category}`}
                className={`group relative block cursor-none w-full overflow-hidden rounded-[24px] md:rounded-[40px] ${heightClass}`}
            >
                {/* Tall cover fills the card; crops from the bottom only */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px] md:rounded-[40px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 850px"
                        className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                </div>
            </Link>
            </ViewTransition>
            <Link href={`/work/${id}`} data-cursor="View" className="ml-3 flex items-start justify-between gap-4 cursor-none">
                <div className="min-w-0">
                    <h2 className="text-2xl font-normal text-white">
                        {name}
                    </h2>
                    <p className="text-xs md:text-[11px] font-medium tracking-[0.14em] md:tracking-[0.16em] uppercase text-white/65 md:text-white/55 mt-1">
                        {category}
                    </p>
                </div>
                {/* Phones: a tap-sized arrow says the card opens */}
                <span className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
            </Link>
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
            className={`flex flex-col gap-12 md:gap-10 w-full items-start ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Big card — 62% (phones: full width, stacked) */}
            <div className="w-full md:w-auto md:basis-[62%] md:shrink-0 md:grow-0">
                <ProjectCard
                    {...big}
                    heightClass="aspect-[4/5] md:aspect-auto md:h-[500px]"
                />
            </div>
            {/* Small card — 38% */}
            <div className="w-full md:w-auto md:flex-1">
                <ProjectCard
                    {...small}
                    heightClass="aspect-[4/3] md:aspect-auto md:h-[300px]"
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
        <main className="relative min-h-screen bg-background text-white">
            {/* Ambient glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 95, 38, 0.03) 0%, transparent 50%)" }}
            />

            <Navbar backTo="/" customIndicatorSections={workIndicatorSections} />

            <div id="projects-list" className="container relative z-10 pt-28 md:pt-32 pb-20 md:pb-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
                    <div>
                        <motion.h1
                            className="text-display md:text-5xl lg:text-6xl font-light text-white tracking-tight md:leading-[1.1]"
                            style={{ fontFamily: "var(--font-fraunces), serif" }}
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
                                className={`relative rounded-full px-4 md:px-5 py-2.5 md:py-2 text-sm font-medium transition-colors duration-300 cursor-none ${filter === f.id ? "text-white" : "text-gray-400 hover:text-white"}`}
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
                                    {f.count !== undefined && <span className="ml-1.5 text-xs opacity-70 md:opacity-60">{f.count}</span>}
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
                            className="flex flex-col gap-14 md:gap-24"
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
                                    <ProjectCard {...orphan} heightClass="aspect-[4/5] md:aspect-auto md:h-[500px]" />
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
        </main>
    );
};

export default WorkClient;
