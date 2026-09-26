"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clientWebsites } from "@/data/projects";

const PREVIEW_W = 500;
const PREVIEW_H = 307;

const ClientWebsites = ({ hideHeader = false }: { hideHeader?: boolean }) => {
    const [active, setActive] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Cursor-following preview (desktop only); springs keep it trailing smoothly
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.6 });
    const y = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.6 });

    const pointer = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        pointer.current = { x: e.clientX, y: e.clientY };
        const maxX = window.innerWidth - PREVIEW_W - 24;
        mouseX.set(Math.min(e.clientX + 32, maxX));
        mouseY.set(e.clientY - PREVIEW_H / 2);
    };

    // Scrolling with a still cursor fires no mouse events, so re-check what is under the pointer
    useEffect(() => {
        if (active === null) return;
        const onScroll = () => {
            const { x, y } = pointer.current;
            const row = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-site-index]");
            if (row && listRef.current?.contains(row)) {
                setActive(Number(row.dataset.siteIndex));
            } else {
                setActive(null);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [active]);

    return (
        <section
            id="websites"
            className="relative pt-8 md:pt-16 pb-24 md:pb-44 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
        >
            <div className="container relative z-10">
                {/* Section Header */}
                {!hideHeader && (
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 md:mb-20 text-center md:text-left">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Websites crafted <br />
                        <span className="italic text-gray-400">
                            for real businesses<span className="text-brand">.</span>
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-500 max-w-sm leading-relaxed md:text-right"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Marketing sites and landing pages for brands in travel, education, SaaS and more.
                    </motion.p>
                </div>
                )}

                {/* Index list */}
                <div
                    ref={listRef}
                    className="group/list border-t border-white/10"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setActive(null)}
                >
                    {clientWebsites.map((site, i) => (
                        <motion.a
                            key={site.id}
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${site.name} website`}
                            data-site-index={i}
                            onMouseEnter={(e) => {
                                pointer.current = { x: e.clientX, y: e.clientY };
                                setActive(i);
                            }}
                            className="group/row relative block cursor-none border-b border-white/10"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Brand line sweeps in along the divider on hover */}
                            <span className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100" />

                            <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[72px_1fr_240px_220px_52px] items-center gap-x-4 md:gap-x-6 py-6 md:py-8 transition-opacity duration-500 lg:group-hover/list:opacity-30 lg:group-hover/row:!opacity-100">
                                <span className="font-mono text-xs text-brand/60 transition-colors duration-300 group-hover/row:text-brand self-start pt-2 lg:self-center lg:pt-0">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="min-w-0">
                                    <h3
                                        className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:text-white lg:group-hover/row:translate-x-3"
                                        style={{ fontFamily: "'Fraunces', serif" }}
                                    >
                                        {site.name}
                                    </h3>
                                    {/* Mobile meta + thumbnail */}
                                    <p className="lg:hidden mt-2 text-[10px] font-medium tracking-[0.18em] uppercase text-white/50">
                                        {site.industry} <span className="text-brand/70 mx-1">/</span> {site.role}
                                    </p>
                                    <div className="lg:hidden relative mt-4 aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10">
                                        <Image
                                            src={site.image}
                                            alt={`${site.name} website`}
                                            fill
                                            sizes="(max-width: 1024px) 85vw, 1px"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>

                                <span className="hidden lg:block text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
                                    {site.industry}
                                </span>
                                <span className="hidden lg:block text-[11px] font-medium tracking-[0.18em] uppercase text-brand/70">
                                    {site.role}
                                </span>

                                <span className="self-start lg:self-center flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-500 group-hover/row:bg-brand group-hover/row:border-brand group-hover/row:text-white">
                                    <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover/row:rotate-0" />
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Floating preview — follows the cursor over the list on desktop */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
                style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
                aria-hidden="true"
            >
                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            className="absolute inset-0 overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1117] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {clientWebsites.map((site, i) => (
                                <Image
                                    key={site.id}
                                    src={site.image}
                                    alt=""
                                    fill
                                    sizes={`${PREVIEW_W}px`}
                                    className={`object-cover object-top transition-opacity duration-300 ${
                                        active === i ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 hidden md:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                Websites
            </motion.div>
        </section>
    );
};

export default ClientWebsites;
