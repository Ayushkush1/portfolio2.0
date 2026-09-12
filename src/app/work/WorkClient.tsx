"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Contact from "@/components/Contact";
import { caseStudies } from "@/data/projects";
import Navbar from "@/components/Navbar";

const workIndicatorSections = [
    { id: "projects-list", label: "Projects" },
    { id: "contact", label: "Contact" }
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
                {/* Full-width fit — shows complete hero, crops from bottom only */}
                <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "40px" }}>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
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
    const projects = caseStudies.map(cs => ({
        id: cs.id,
        name: cs.name,
        category: cs.category,
        image: cs.images[0],
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
                <div className="mb-12 md:mb-20">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Selected products <br />
                        <span className="italic text-gray-400">
                            built to scale<span className="text-brand">.</span>
                        </span>
                    </motion.h1>
                </div>

                {/* Project pairs */}
                <div className="flex flex-col gap-16 md:gap-24">
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
                </div>
            </div>

            <Contact />
        </section>
    );
};

export default WorkClient;
