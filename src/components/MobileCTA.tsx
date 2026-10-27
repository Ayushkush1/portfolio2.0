"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import InquiryDialog from "./InquiryDialog";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

const WHATSAPP_NUMBER = "918738954475";
const WHATSAPP_MESSAGE = "Hi Ayush! I'm interested in discussing a project with you. Can we schedule a free intro call?";

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

// Phones only: a small "Let's talk" bubble in the corner, with Ayush's face.
// It shrinks to just the face while the page is scrolling and unfolds its label once scrolling
// stops; tapping it opens the two ways to get in touch. Shows after the hero and steps aside
// while the contact section (which has the same actions) is on screen.
const MobileCTA = () => {
    const pathname = usePathname();
    const [pastHero, setPastHero] = useState(false);
    const [contactInView, setContactInView] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [open, setOpen] = useState(false);
    const [inquiryOpen, setInquiryOpen] = useState(false);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setPastHero(window.scrollY > window.innerHeight * 0.85);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
            setScrolling(true);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setScrolling(false), 900);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    // Re-attach on every route: each page renders its own contact section
    useEffect(() => {
        setContactInView(false);
        setOpen(false);
        const contact = document.getElementById("contact");
        if (!contact) return;
        const io = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
        io.observe(contact);
        return () => io.disconnect();
    }, [pathname]);

    const visible = pastHero && !contactInView;
    useEffect(() => { if (!visible) setOpen(false); }, [visible]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const openWhatsApp = () => {
        track("whatsapp_click", { location: "mobile_bubble" });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, "_blank");
        setOpen(false);
    };

    const startProject = () => {
        setOpen(false);
        setInquiryOpen(true);
        track("inquiry_open", { location: "mobile_bubble" });
    };

    const toggle = () => {
        if (!open) track("contact_bubble_open");
        setOpen(!open);
    };

    const showLabel = open || !scrolling;

    return (
        <>
        {/* Lives outside the bubble so closing the menu doesn't unmount the open form */}
        <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} />
        <AnimatePresence>
            {visible && (
                <motion.div
                    data-bp-skip
                    className="safe-bottom fixed bottom-0 right-0 z-40 pr-4 md:hidden"
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: EASE.out }}
                >
                    {/* Tap anywhere else to close */}
                    {open && (
                        <button
                            type="button"
                            aria-label="Close contact options"
                            className="fixed inset-0 -z-10 cursor-default"
                            onClick={() => setOpen(false)}
                        />
                    )}

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                id="contact-bubble-menu"
                                className="absolute bottom-full right-4 mb-3 w-[264px] origin-bottom-right overflow-hidden rounded-3xl border border-white/15 bg-[hsl(222_47%_7%/0.92)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-xl"
                                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                                transition={spring}
                            >
                                <p className="px-3 pt-2 pb-3 text-[13px] leading-snug text-white/60">
                                    <span className="text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>Got an idea?</span>
                                    <br />
                                    I usually reply within 24 hours.
                                </p>
                                <button
                                    type="button"
                                    onClick={openWhatsApp}
                                    className="flex w-full items-center gap-3 rounded-2xl bg-brand px-3 py-3 text-left text-[15px] font-medium text-white active:scale-[0.98] transition-transform"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0">
                                        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.21 4.24-9.45 9.46-9.45 2.53 0 4.9.99 6.69 2.77a9.4 9.4 0 0 1 2.77 6.69c0 5.21-4.24 9.46-9.44 9.46zm8.04-17.5A11.3 11.3 0 0 0 12.05.67C5.78.67.68 5.77.67 12.04c0 2 .52 3.96 1.52 5.68L.57 23.6l6.03-1.58a11.33 11.33 0 0 0 5.44 1.39h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.33-8.04z" />
                                    </svg>
                                    Chat on WhatsApp
                                    <ArrowRight className="ml-auto h-4 w-4 -rotate-45" />
                                </button>
                                <button
                                        type="button"
                                        onClick={startProject}
                                        className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-[15px] text-white active:bg-white/5 transition-colors"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand/60 text-[11px] text-brand">+</span>
                                        Start a project
                                        <ArrowRight className="ml-auto h-4 w-4 -rotate-45 text-brand" />
                                    </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The bubble: face + online dot, label unfolds when the page is still */}
                    <motion.button
                        type="button"
                        layout
                        transition={spring}
                        onClick={toggle}
                        aria-expanded={open}
                        aria-controls="contact-bubble-menu"
                        aria-label={open ? "Close contact options" : "Let's talk: contact options"}
                        className="flex h-12 items-center rounded-full border border-white/15 bg-[hsl(222_47%_7%/0.8)] p-1.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_0_1px_hsl(var(--brand)/0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl"
                        style={{ borderRadius: 999 }}
                    >
                        <motion.span layout="position" className="relative block h-9 w-9 shrink-0">
                            <AnimatePresence initial={false} mode="popLayout">
                                {open ? (
                                    <motion.span
                                        key="close"
                                        className="absolute inset-0 flex items-center justify-center rounded-full bg-white/10"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <X className="h-4 w-4" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="face"
                                        className="absolute inset-0"
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.6, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/assets/ayush-avatar.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.span>
                        <AnimatePresence initial={false}>
                            {showLabel && (
                                <motion.span
                                    key="label"
                                    className="overflow-hidden whitespace-nowrap text-[15px] font-medium"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={spring}
                                >
                                    <span className="block pl-2.5 pr-3">{open ? "Close" : "Let's talk"}</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default MobileCTA;
