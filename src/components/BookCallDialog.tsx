"use client";
import { cloneElement, isValidElement, ReactElement, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

// ── Google Calendar appointment schedule ─────────────────────────
// Google Calendar → Create → Appointment schedule (20 min, Google Meet video conferencing)
// → Open booking page → Share → "Website embed" → copy the iframe's src
// (looks like https://calendar.google.com/calendar/appointments/schedules/XXXX?gv=true).
// Paste it here. While it's empty, "Book a call" falls back to WhatsApp.
export const BOOKING_URL: string = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1C_WB6yqEs3Zv3EGiA_4qWqu_FNEPROHCwWL2ErF1rcJnI3X6rVEvqb4s4BcCDnZu_o150gBc3?gv=true";

const WHATSAPP_NUMBER = "918738954475";
const FALLBACK_MESSAGE = "Hi Ayush! I'd like to book a quick 20-minute intro call about a project.";

// Opens the booking page in a dialog; Google handles the slots, the invite and the Meet link.
const BookCallDialog = ({ children, location }: { children: ReactElement; location: string }) => {
    const [loaded, setLoaded] = useState(false);

    if (!BOOKING_URL) {
        const openWhatsApp = () => {
            track("whatsapp_click", { location: `${location}_book_call` });
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(FALLBACK_MESSAGE)}`, "_blank");
        };
        return isValidElement(children) ? cloneElement(children as ReactElement<{ onClick?: () => void }>, { onClick: openWhatsApp }) : children;
    }

    return (
        <Dialog onOpenChange={(open) => { if (open) track("book_call_open", { location }); else setLoaded(false); }}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                data-lenis-prevent
                className="w-[calc(100vw-32px)] sm:max-w-[1040px] rounded-3xl sm:rounded-[32px] border-white/10 bg-[#070b16]/95 backdrop-blur-xl px-6 md:px-8 text-left"
            >
                <DialogHeader className="text-left space-y-2">
                    <DialogTitle className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                        Book a 20-min call<span className="text-brand">.</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Pick a slot that suits you the Google Meet link arrives in your calendar invite.
                    </DialogDescription>
                </DialogHeader>

                {/* Google's booking page on a white card (it doesn't support a dark theme) */}
                <div className="relative h-[min(680px,68vh)] overflow-hidden rounded-[24px] bg-white">
                    {!loaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Loading available slots…
                        </div>
                    )}
                    <iframe
                        src={BOOKING_URL}
                        title="Book a call with Ayush Kushwaha"
                        className="h-full w-full border-0"
                        onLoad={() => setLoaded(true)}
                    />
                </div>

                <a
                    href={BOOKING_URL.replace("?gv=true", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
                >
                    Open in Google Calendar
                    <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </DialogContent>
        </Dialog>
    );
};

export default BookCallDialog;
