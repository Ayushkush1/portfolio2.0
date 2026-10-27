"use client";
import { motion, MotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import InquiryDialog from "@/components/InquiryDialog";
import BookCallDialog from "@/components/BookCallDialog";
import VariableProximity from "./VariableProximity";
import { track } from "@/lib/analytics";
import MaskReveal from "@/components/ui/mask-reveal";
import { SCRUB, useRevealProgress } from "@/components/ui/scroll-reveal";
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
    { label: "LinkedIn", note: "Work & experience", handle: "Ayush Kushwaha", href: "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/", icon: Linkedin },
    { label: "GitHub", note: "Code & experiments", handle: "@Ayushkush1", href: "https://github.com/Ayushkush1", icon: Github },
    { label: "Instagram", note: "Life & design", handle: "@awsm_ayush_", href: "https://www.instagram.com/awsm_ayush_/", icon: Instagram },
    { label: "X", note: "Thoughts & updates", handle: "@kushwaha_ayush", href: "https://x.com/kushwaha_ayush", icon: XLogo },
];

// Social cells: a soft brand glow follows the pointer (position fed in as CSS variables)
const followPointer = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const serif = { fontFamily: "var(--font-fraunces), serif" };

const label = "block text-xs md:text-[11px] font-medium uppercase tracking-[0.14em] md:tracking-[0.18em] text-white/60 md:text-white/40 mb-2";

const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split("@");

// One letter of the footer email: rises out of its line's mask, scrubbed to the scroll
const EmailChar = ({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) => {
    const start = (index / total) * 0.45;
    const y = useTransform(progress, [start, start + 0.55], ["110%", "0%"]);
    return (
        // Per-letter delays turn the hover colour change into a left-to-right sweep (see .email-char)
        <motion.span className="email-char inline-block" style={{ y, transitionDelay: `${index * 14}ms`, animationDelay: `${index * 18}ms` }}>
            {char}
        </motion.span>
    );
};

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

    // The email is fitted edge to edge the same way (on phones its two lines share one size)
    const emailBoxRef = useRef<HTMLButtonElement>(null);
    const [emailSize, setEmailSize] = useState<number | undefined>(undefined);
    useEffect(() => {
        const box = emailBoxRef.current;
        if (!box) return;
        const fit = () => {
            const text = box.firstElementChild as HTMLElement | null;
            if (!text || !text.offsetWidth) return;
            const current = parseFloat(getComputedStyle(box).fontSize);
            setEmailSize((current * box.clientWidth) / text.offsetWidth);
        };
        fit();
        document.fonts?.ready.then(fit);
        const ro = new ResizeObserver(fit);
        ro.observe(box);
        return () => ro.disconnect();
    }, []);

    const reduceMotion = useReducedMotion();
    const emailProgress = useSpring(useRevealProgress(emailBoxRef), SCRUB);


    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIME_ZONE });
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
            setTimeout(() => setCopied(false), 2200);
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

                {/* ── Footer: the email is the stage, then where else to find me ── */}
                <motion.footer {...fadeUp()} className="relative mt-20 md:mt-32 border-t border-white/10 pt-10 md:pt-14">
                    <div className="flex items-center justify-between gap-4">
                        <span className={`${label} !mb-0 transition-colors duration-300 ${copied ? "!text-brand" : ""}`} aria-live="polite">
                            {copied ? "Copied to clipboard ✓" : <>Say hello <span className="normal-case tracking-normal">—</span> <span className="md:hidden">tap</span><span className="hidden md:inline">click</span> to copy</>}
                        </span>
                        <BookCallDialog location="footer">
                            <button
                                type="button"
                                className="group hidden sm:flex min-h-11 items-center gap-2.5 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                            >
                                Prefer talking? <span className="text-white" style={serif}>Book a 20-min call</span>
                                <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                        </BookCallDialog>
                    </div>

                    {/* The address, fitted to the full width; letters rise in, sweep orange on hover, hop when copied */}
                    <button
                        ref={emailBoxRef}
                        type="button"
                        onClick={copyEmail}
                        aria-label={`Copy email address ${EMAIL}`}
                        data-bp-note="fitted edge to edge — click copies"
                        data-bp-code="fontSize = size × box ÷ text"
                        className={`group mt-3 block w-full text-left font-light leading-[1.05] tracking-tight text-white text-[2rem] sm:text-6xl ${copied ? "email-copied" : ""}`}
                        style={{ ...serif, fontSize: emailSize }}
                    >
                        <span aria-hidden="true" className="inline-block whitespace-nowrap">
                            {[EMAIL_USER, `@${EMAIL_DOMAIN}`].map((part, lineIdx) => (
                                <span key={part} className="block sm:inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                                    {part.split("").map((char, i) => {
                                        const index = lineIdx === 0 ? i : EMAIL_USER.length + i;
                                        return reduceMotion ? (
                                            <span key={i} className="email-char inline-block">{char}</span>
                                        ) : (
                                            <EmailChar key={i} char={char} index={index} total={EMAIL.length} progress={emailProgress} />
                                        );
                                    })}
                                </span>
                            ))}
                        </span>
                        {/* Hover: the letters sweep into brand colour and a hairline draws in beneath them */}
                        <span aria-hidden="true" className="mt-2 block h-px w-full origin-left scale-x-0 bg-brand/70 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:scale-x-100" />
                    </button>

                    <BookCallDialog location="footer">
                        <button
                            type="button"
                            className="group mt-5 flex sm:hidden min-h-11 items-center gap-2.5 text-[15px] text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            Prefer talking? <span className="text-white" style={serif}>Book a 20-min call</span>
                            <ArrowUpRight className="h-4 w-4 text-brand" />
                        </button>
                    </BookCallDialog>

                    {/* Elsewhere: an index row, in the same language as the websites list */}
                    <ul className="mt-10 md:mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
                        {socialLinks.map((link, i) => (
                            <motion.li
                                key={link.href}
                                className="border-b border-white/10 lg:border-b-0 [&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
                                {...fadeUp(i * STAGGER)}
                            >
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseMove={followPointer}
                                    onClick={() => track("social_click", { network: link.label, location: "footer" })}
                                    className="group relative block overflow-hidden px-1 pt-5 pb-8 md:px-6 md:pt-8 md:pb-14"
                                >
                                    {/* Soft brand glow that follows the pointer inside the cell */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--brand) / 0.13), transparent 70%)" }}
                                    />
                                    {/* The network's mark, oversized and cropped by the cell's corner; straightens and warms on hover */}
                                    <link.icon
                                        aria-hidden="true"
                                        strokeWidth={0.75}
                                        className="pointer-events-none absolute -bottom-5 -right-4 h-20 w-20 md:-bottom-8 md:-right-6 md:h-32 md:w-32 rotate-[-14deg] text-white/[0.06] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-110 group-hover:text-brand/25"
                                    />

                                    {/* The name rolls up into its italic, brand-coloured twin. The gap between the two
                                        copies keeps the first one's descenders (the g in Instagram) fully out of view. */}
                                    <span className="relative block h-[1.4em] overflow-hidden text-2xl md:text-[2.5rem] font-light leading-[1.15] tracking-tight" style={serif}>
                                        <span className="flex flex-col gap-[0.5em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[1.65em]">
                                            <span className="block text-white/85">{link.label}</span>
                                            <span aria-hidden="true" className="block italic text-brand">{link.label}</span>
                                        </span>
                                    </span>

                                    {/* What it's for, rolling over to the handle on hover (phones show the handle) */}
                                    <span className="relative -mt-1 block h-[1.5em] overflow-hidden text-xs md:text-sm leading-[1.5]">
                                        <span className="flex flex-col gap-[0.5em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-y-[2em]">
                                            <span className="hidden md:block italic text-white/45" style={serif}>{link.note}</span>
                                            <span className="block truncate text-white/50 md:text-white/70">{link.handle}</span>
                                        </span>
                                    </span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Sign-off */}
                    <div className="grid grid-cols-[1fr_auto] items-center gap-y-1 border-t border-white/10 py-5 text-sm text-white/45 lg:border-t-0 sm:flex sm:justify-between">
                        <span>© 2026 Ayush Kushwaha</span>
                        <button
                            type="button"
                            onClick={backToTop}
                            className="group row-span-2 inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-white sm:order-3"
                        >
                            Back to top
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                                <ArrowUp className="h-4 w-4" />
                            </span>
                        </button>
                        <span className="sm:order-2">
                            It&apos;s <span className="tabular-nums italic text-white/80" style={serif}>{time ?? "--:--"}</span> in India
                        </span>
                    </div>
                </motion.footer>

                {/* ── The name signs the page: hero's face & shade, fitted edge-to-edge to the container ── */}
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
                        style={{ display: "inline-block", whiteSpace: "nowrap", fontFamily: 'var(--font-roboto-flex), sans-serif', lineHeight: 0.8 }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;
