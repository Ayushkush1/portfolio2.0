"use client";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Copy, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import InquiryDialog from "@/components/InquiryDialog";
import BookCallDialog from "@/components/BookCallDialog";
import VariableProximity from "./VariableProximity";
import { track } from "@/lib/analytics";
import MaskReveal from "@/components/ui/mask-reveal";
import { STAGGER, fadeUp } from "@/lib/motion";

interface ContactProps {
    title?: string;
    description?: string;
}

const EMAIL = "ayushkushwaha381@gmail.com";
const TIME_ZONE = "Asia/Kolkata";

// X (Twitter) logo — lucide only ships the old bird
const XLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const socialLinks = [
    { label: "GitHub", href: "https://github.com/Ayushkush1", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/", icon: Linkedin },
    { label: "X", href: "https://x.com/kushwaha_ayush", icon: XLogo },
    { label: "Instagram", href: "https://www.instagram.com/awsm_ayush_/", icon: Instagram },
];

const serif = { fontFamily: "'Fraunces', serif" };

const SIGN_OFF = [
    { label: "Designed & built by", value: "Ayush Kushwaha" },
    { label: "Based in", value: "India · working worldwide" },
    { label: "Built with", value: "Next.js, Framer Motion & GSAP" },
    { label: "Copyright", value: "© 2026 Ayush Kushwaha" },
];

const label = "block text-xs md:text-[11px] font-medium uppercase tracking-[0.14em] md:tracking-[0.18em] text-white/60 md:text-white/40 mb-2";
// Title-block cell padding
const cell = "p-4 md:p-6";

const Contact = ({ title = "Let's Connect", description }: ContactProps) => {
    const ref = useRef<HTMLElement>(null);
    const [time, setTime] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Fit "Kushwaha" exactly to the width of the title block above it.
    // Width scales linearly with font size, so one measurement of the rendered name is enough.
    const nameBoxRef = useRef<HTMLDivElement>(null);
    const [nameSize, setNameSize] = useState<number | undefined>(undefined);
    useEffect(() => {
        const box = nameBoxRef.current;
        if (!box) return;
        const fit = () => {
            const name = box.lastElementChild as HTMLElement | null;
            if (!name || !name.offsetWidth) return;
            const current = parseFloat(getComputedStyle(box).fontSize);
            setNameSize((current * box.clientWidth) / name.offsetWidth);
        };
        fit();
        document.fonts?.ready.then(fit);
        const ro = new ResizeObserver(fit);
        ro.observe(box);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 15_000);
        return () => clearInterval(id);
    }, []);

    const openWhatsApp = () => {
        const phoneNumber = "918738954475";
        const message = "Hi Ayush! I'm interested in discussing a project with you. Can we schedule a free intro call?";
        track("whatsapp_click", { location: "contact" });
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    const copyEmail = async () => {
        track("email_click", { location: "footer_copy" });
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    // The homepage's default title closes in the site's two-tone serif voice;
    // other pages pass their own single-line title.
    const isDefault = title === "Let's Connect";
    const headingLines = isDefault
        ? [<>Let&apos;s build <span className="italic text-gray-400">something real<span className="text-brand">.</span></span></>]
        : [title];

    return (
        <section ref={ref} id="contact" aria-label="Contact" className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 text-foreground pt-20 md:pt-40">
            <div className="container relative z-10">
                {/* ── Closing line: headline left, actions right, one row ── */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <motion.span className={`${label} mb-5`} {...fadeUp()}>What&apos;s next</motion.span>
                        <MaskReveal
                            className={`font-light tracking-tight leading-[1.05] text-white ${
                                title.length > 30 ? "text-[2.2rem] md:text-5xl lg:text-6xl max-w-3xl" : "text-[2.6rem] md:text-6xl lg:text-[4.25rem] lg:whitespace-nowrap"
                            }`}
                            style={serif}
                            lines={headingLines}
                        />
                        {description && (
                            <motion.p className="mt-4 max-w-md text-muted-foreground leading-relaxed" {...fadeUp(0.1)}>
                                {description}
                            </motion.p>
                        )}
                    </div>

                    <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center shrink-0">
                        <motion.div className="group" whileHover="hover">
                            <Button
                                variant="hero"
                                size="lg"
                                className="group flex items-center relative overflow-hidden transition-all duration-300 hover:bg-[#ff4d1a] shadow-[0_0_20px_rgba(255,95,38,0.4)] hover:shadow-[0_0_30px_rgba(255,95,38,0.6)]"
                                onClick={openWhatsApp}
                            >
                                <div className="relative bg-white rounded-full p-2 flex items-center justify-center mr-2 group-hover:bg-orange-50 transition-colors duration-300 shadow-[0_0_15px_rgba(255,95,38,0.3)]">
                                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#ff5f26]/40 animate-pulse-ring" />
                                    <ArrowRight className="h-6 w-6 text-[#ff5f26] transition-all group-hover:rotate-0 -rotate-45 duration-300" />
                                </div>
                                <div className="relative overflow-hidden h-6 w-fit text-white">
                                    <motion.div
                                        className="flex flex-col items-center"
                                        variants={{ hover: { y: -24 } }}
                                        initial={{ y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <span className="w-full flex items-center justify-center">WhatsApp Chat</span>
                                        <span className="w-full flex items-center justify-center font-semibold">WhatsApp Chat</span>
                                    </motion.div>
                                </div>
                                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer [animation-delay:2s]" />
                            </Button>
                        </motion.div>

                        <InquiryDialog>
                            <button
                                type="button"
                                className="group flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 text-white transition-all duration-300 hover:border-brand/60 hover:bg-brand/10"
                            >
                                Start a project
                                <ArrowRight className="h-4 w-4 -rotate-45 text-brand transition-transform duration-300 group-hover:rotate-0" />
                            </button>
                        </InquiryDialog>
                    </motion.div>
                </div>

                {/* ── Title block: one sheet, rounded with the site's 40px card radius ── */}
                <motion.footer
                    {...fadeUp()}
                    data-bp-note="the footer is the drawing's title block"
                    data-bp-code="sheet 01 / 01 · rev 2026"
                    className="relative mt-14 md:mt-20 overflow-hidden rounded-3xl md:rounded-[40px] border border-white/10"
                >
                    {/* Row 1: status, time, response, back to top */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10 [&>*]:border-white/10 [&>*:nth-child(odd)]:border-r lg:[&>*]:border-r lg:[&>*:last-child]:border-r-0 [&>*:nth-child(-n+2)]:border-b lg:[&>*:nth-child(-n+2)]:border-b-0">
                        <div className={cell}>
                            <span className={label}>Status</span>
                            <span className="flex items-center gap-2 whitespace-nowrap text-base md:text-lg text-white" style={serif}>
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                Available <span className="hidden sm:inline italic text-gray-400">· 2 spots</span>
                            </span>
                        </div>
                        <div className={cell}>
                            <span className={label}>Local time</span>
                            <span className="whitespace-nowrap text-base md:text-lg text-white" style={serif}>
                                <span className="tabular-nums">{time ?? "--:--"}</span>
                                <span className="ml-2 text-sm text-white/55 md:text-white/45 font-sans">IST · India</span>
                            </span>
                        </div>
                        <div className={cell}>
                            <span className={label}>Response</span>
                            <span className="whitespace-nowrap text-base md:text-lg text-white" style={serif}>
                                Within <span className="italic text-gray-400"><span className="md:hidden">24h</span><span className="hidden md:inline">24 hours</span></span>
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={backToTop}
                            className={`${cell} group flex items-center justify-between text-left transition-colors duration-300 hover:bg-white/[0.03]`}
                        >
                            <span>
                                <span className={label}>Navigation</span>
                                <span className="whitespace-nowrap text-base md:text-lg text-white" style={serif}>Back to top</span>
                            </span>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                                <ArrowUp className="h-4 w-4" />
                            </span>
                        </button>
                    </div>

                    {/* Row 2: email (copy) + elsewhere */}
                    <div className="grid lg:grid-cols-[2fr_1fr] border-b border-white/10">
                        <div className="flex flex-col justify-between gap-8 p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                            <div>
                                <span className={label}>Say hello</span>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    aria-label={`Copy email address ${EMAIL}`}
                                    className="group flex w-full flex-col items-start gap-4 text-left sm:flex-row sm:items-center sm:justify-between"
                                >
                                    {/* Phones break the address before "@", never mid-word */}
                                    <span className="min-w-0 [overflow-wrap:anywhere] text-[1.75rem] leading-tight sm:text-3xl md:text-[2.6rem] font-light text-white transition-colors duration-300 group-hover:text-brand" style={serif}>
                                        {EMAIL.split("@")[0]}<wbr />@{EMAIL.split("@")[1]}
                                    </span>
                                    <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 group-hover:border-brand/60 group-hover:text-white">
                                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                        {copied ? "Copied" : "Copy"}
                                    </span>
                                </button>
                            </div>
                            <BookCallDialog location="footer">
                                <button
                                    type="button"
                                    className="group flex min-h-11 w-fit items-center gap-3 text-[15px] md:text-sm text-white/70 md:text-white/60 transition-colors duration-300 hover:text-white"
                                >
                                    Prefer talking? <span className="text-white" style={serif}>Book a 20-min call</span>
                                    <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </button>
                            </BookCallDialog>
                        </div>
                        <div className="p-5 md:p-8">
                            <span className={label}>Elsewhere</span>
                            <ul className="flex flex-col">
                                {socialLinks.map((link, i) => (
                                    <motion.li key={link.href} {...fadeUp(i * STAGGER)}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => track("social_click", { network: link.label, location: "footer" })}
                                            className="group flex min-h-12 items-center justify-between border-b border-white/[0.06] py-2 text-white/80 transition-colors duration-300 hover:text-white"
                                        >
                                            <span className="flex items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors duration-300 group-hover:border-brand/50 group-hover:bg-brand/10 group-hover:text-brand">
                                                    <link.icon className={link.icon === XLogo ? "h-3.5 w-3.5" : "h-4 w-4"} />
                                                </span>
                                                {link.label}
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Row 3: sign-off — who, where, with what, and the copyright */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 [&>*]:border-white/10 [&>*:nth-child(odd)]:border-r lg:[&>*]:border-r lg:[&>*:last-child]:border-r-0 [&>*:nth-child(-n+2)]:border-b lg:[&>*:nth-child(-n+2)]:border-b-0">
                        {SIGN_OFF.map((field) => (
                            <div key={field.label} className="px-5 py-4 md:px-6">
                                <span className={label}>{field.label}</span>
                                <span className="text-[15px] md:text-sm text-white/85 md:text-white/80" style={serif}>{field.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.footer>

                {/* ── The name signs the page: hero's face & shade, fitted edge-to-edge to the tiles above ── */}
                <div
                    ref={nameBoxRef}
                    aria-hidden="true"
                    className="pointer-events-none relative mt-8 md:mt-12 -mb-[0.16em] select-none text-[18vw] leading-[0.8] tracking-tighter text-foreground/[0.025]"
                    style={{ fontSize: nameSize }}
                >
                    <VariableProximity
                        label="Kushwaha"
                        fromFontVariationSettings="'wght' 800, 'opsz' 110"
                        toFontVariationSettings="'wght' 1000, 'opsz' 110"
                        containerRef={ref as React.MutableRefObject<HTMLElement | null>}
                        radius={350}
                        falloff="gaussian"
                        style={{ display: "inline-block", whiteSpace: "nowrap", fontFamily: '"Roboto Flex", sans-serif', lineHeight: 0.8 }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;
