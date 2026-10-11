"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clientWebsites } from "@/data/projects";
import { track } from "@/lib/analytics";
import MaskReveal from "@/components/ui/mask-reveal";
import { ScrollBlurText } from "@/components/ui/scroll-reveal";
import { DURATION, EASE, fadeUp } from "@/lib/motion";

const PREVIEW_W = 500;
const PREVIEW_H = 307;
const PREVIEW_GAP = 80; // clears the 120px cursor lens (see CursorDot)

// `limit` shows only the first N sites (the homepage shows a shortlist; /work shows all)
const ClientWebsites = ({ hideHeader = false, limit }: { hideHeader?: boolean; limit?: number }) => {
    const sites = limit ? clientWebsites.slice(0, limit) : clientWebsites;
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
        mouseX.set(Math.min(e.clientX + PREVIEW_GAP, maxX));
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
                    <MaskReveal
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                        lines={[
                            "Websites crafted",
                            <span key="l2" className="italic text-gray-400">
                                for real businesses<span className="text-brand">.</span>
                            </span>,
                        ]}
                    />
                    <ScrollBlurText
                        className="text-gray-500 max-w-sm leading-relaxed md:text-right"
                        text="Marketing sites and landing pages for brands in travel, education, SaaS and more."
                    />
                </div>
                )}

                {/* Index list */}
                <div
                    ref={listRef}
                    className="group/list border-t border-white/10"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setActive(null)}
                >
                    {sites.map((site, i) => (
                        <motion.a
                            key={site.id}
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${site.name} website`}
                            onClick={() => track("website_visit", { site: site.name })}
                            data-site-index={i}
                            data-cursor="Visit"
                            data-cursor-icon="external"
                            data-cursor-ring={`${site.name} · ${site.industry}`}
                            onMouseEnter={(e) => {
                                pointer.current = { x: e.clientX, y: e.clientY };
                                setActive(i);
                            }}
                            className="group/row relative block cursor-none border-b border-white/10"
                            {...fadeUp(i * 0.05)}
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
                data-bp-skip
                className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
                style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
                aria-hidden="true"
            >
                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            data-bp-note="a live preview trails the cursor"
                            data-bp-code="useSpring(mouseX, { stiffness: 220 })"
                            data-bp-pos="bottom"
                            className="absolute inset-0 overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1117] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
                            transition={{ duration: DURATION.fast, ease: EASE.out }}
                        >
                            {sites.map((site, i) => (
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
        </section>
    );
};

export default ClientWebsites;
