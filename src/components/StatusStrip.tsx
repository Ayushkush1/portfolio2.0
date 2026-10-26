"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { clientWebsites } from "@/data/projects";
import { STAGGER, fadeUp } from "@/lib/motion";
import BookCallDialog from "./BookCallDialog";

// ── Edit these to keep the strip honest ─────────────────────────
const AVAILABILITY = { lead: "Taking new", accent: "projects" };
const RESPONSE = { lead: "Within", accent: "24 hours" };
const TIME_ZONE = "Asia/Kolkata";
const TIME_ZONE_LABEL = "IST · India";

const serif = { fontFamily: "'Fraunces', serif" };

// The business case at a glance — availability, local time, response time and who already
// trusts the work — set in the site's own type: small spaced caps over Fraunces values.
const StatusStrip = () => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: TIME_ZONE });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 1_000);
        return () => clearInterval(id);
    }, []);

    const label = "block text-xs md:text-[11px] font-medium uppercase tracking-[0.14em] md:tracking-[0.16em] text-white/60 md:text-white/55 mb-2 md:mb-3";
    const value = "text-xl md:text-2xl font-light text-white leading-tight";
    const cell = "lg:border-l lg:border-white/10 lg:pl-8 first:border-l-0 first:pl-0";

    return (
        // Generous top margin keeps the strip below the fold, so the hero owns the first screen.
        // Hidden on phones: the footer carries the same status, and the sticky bar handles contact.
        <section aria-label="Availability" className="relative bg-background mt-16 md:mt-20 hidden md:block">
            <div className="container">
                <div
                    data-bp-note="the business case, before the scroll"
                    data-bp-code="Intl.DateTimeFormat(IST) · live"
                    data-bp-pos="bottom"
                    className="grid grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr_auto] items-end gap-x-6 md:gap-x-8 gap-y-7 md:gap-y-10 border-y border-white/10 py-8 md:py-12"
                >
                    <motion.div className={cell} {...fadeUp()}>
                        <span className={label}>Status</span>
                        <span className={`${value} flex items-center gap-3`} style={serif}>
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span>
                                {AVAILABILITY.lead} <span className="italic text-gray-400">{AVAILABILITY.accent}</span>
                            </span>
                        </span>
                    </motion.div>

                    <motion.div className={cell} {...fadeUp(STAGGER)}>
                        <span className={label}>Local time</span>
                        <span className={value} style={serif}>
                            {/* Rendered after mount so server and client markup match */}
                            <span className="tabular-nums">{time ?? "--:--:--"}</span>
                            <span className="ml-2 text-sm font-normal text-white/45 font-sans">{TIME_ZONE_LABEL}</span>
                        </span>
                    </motion.div>

                    <motion.div className={cell} {...fadeUp(STAGGER * 2)}>
                        <span className={label}>Response</span>
                        <span className={value} style={serif}>
                            {RESPONSE.lead} <span className="italic text-gray-400">{RESPONSE.accent}</span>
                            <span className="text-brand">.</span>
                        </span>
                    </motion.div>

                    <motion.div className={`${cell} col-span-2 lg:col-span-1`} {...fadeUp(STAGGER * 3)}>
                        <span className={label}>Trusted by</span>
                        <span className="text-[15px] md:text-sm leading-relaxed text-white/75 md:text-white/70">
                            {clientWebsites.map((site, i) => (
                                <span key={site.id}>
                                    {site.name}
                                    {/* Non-breaking space keeps each separator with the name before it */}
                                    {i < clientWebsites.length - 1 && <span className="text-brand">{" · "}</span>}
                                </span>
                            ))}
                        </span>
                    </motion.div>

                    <motion.div className="col-span-2 lg:col-span-1" {...fadeUp(STAGGER * 4)}>
                        <BookCallDialog location="status_strip">
                        <button
                            type="button"
                            className="group flex h-11 md:h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-5 md:px-4 text-[15px] md:text-sm text-white transition-all duration-300 hover:border-brand/60 hover:bg-brand/10"
                        >
                            Book a 20-min call
                            <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-brand transition-transform duration-300 group-hover:rotate-0" />
                        </button>
                        </BookCallDialog>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StatusStrip;
