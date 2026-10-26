"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InquiryDialog from "./InquiryDialog";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

const WHATSAPP_NUMBER = "918738954475";
const WHATSAPP_MESSAGE = "Hi Ayush! I'm interested in discussing a project with you. Can we schedule a free intro call?";

// Phones only: the way to hire stays one thumb-tap away. Slides up once the hero has been
// scrolled past and steps aside while the contact section (which has the same actions) is on screen.
const MobileCTA = () => {
    const pathname = usePathname();
    const [pastHero, setPastHero] = useState(false);
    const [contactInView, setContactInView] = useState(false);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setPastHero(window.scrollY > window.innerHeight * 0.85);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    // Re-attach on every route: each page renders its own contact section
    useEffect(() => {
        setContactInView(false);
        const contact = document.getElementById("contact");
        if (!contact) return;
        const io = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
        io.observe(contact);
        return () => io.disconnect();
    }, [pathname]);

    const openWhatsApp = () => {
        track("whatsapp_click", { location: "mobile_bar" });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, "_blank");
    };

    const visible = pastHero && !contactInView;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    data-bp-skip
                    className="safe-bottom fixed inset-x-0 bottom-0 z-40 px-4 pt-3 md:hidden pointer-events-none"
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "120%" }}
                    transition={{ duration: 0.5, ease: EASE.out }}
                >
                    <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-[hsl(222_47%_7%/0.75)] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl backdrop-saturate-200">
                        <button
                            type="button"
                            onClick={openWhatsApp}
                            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 text-[15px] font-medium text-white shadow-[0_0_20px_rgba(255,95,38,0.35)] active:scale-[0.98] transition-transform"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
                                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.21 4.24-9.45 9.46-9.45 2.53 0 4.9.99 6.69 2.77a9.4 9.4 0 0 1 2.77 6.69c0 5.21-4.24 9.46-9.44 9.46zm8.04-17.5A11.3 11.3 0 0 0 12.05.67C5.78.67.68 5.77.67 12.04c0 2 .52 3.96 1.52 5.68L.57 23.6l6.03-1.58a11.33 11.33 0 0 0 5.44 1.39h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.33-8.04z" />
                            </svg>
                            WhatsApp
                        </button>
                        <InquiryDialog>
                            <button
                                type="button"
                                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-[15px] text-white active:scale-[0.98] transition-transform"
                            >
                                Start a project
                                <ArrowRight className="h-4 w-4 -rotate-45 text-brand" />
                            </button>
                        </InquiryDialog>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileCTA;
