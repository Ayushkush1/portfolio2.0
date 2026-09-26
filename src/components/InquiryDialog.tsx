"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "918738954475";

const PROJECT_TYPES = ["SaaS product", "Startup MVP", "CRM / ERP", "Website", "UI/UX design", "Other"];
const BUDGETS = ["Under ₹50K", "₹50K – ₹1.5L", "₹1.5L – ₹3L", "₹3L+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 – 3 months", "Flexible"];

function ChipGroup({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <fieldset>
            <legend className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">{label}</legend>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        aria-pressed={value === option}
                        onClick={() => onChange(value === option ? "" : option)}
                        className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                            value === option
                                ? "border-brand bg-brand text-white shadow-[0_0_20px_rgba(255,95,38,0.3)]"
                                : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:text-white"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </fieldset>
    );
}

const InquiryDialog = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState("");
    const [details, setDetails] = useState("");

    const canSend = name.trim().length > 0 && type !== "" && details.trim().length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSend) return;
        const lines = [
            `Hi Ayush! I'm ${name.trim()}.`,
            "",
            `Project: ${type}`,
            budget && `Budget: ${budget}`,
            timeline && `Timeline: ${timeline}`,
            "",
            details.trim(),
        ].filter((line) => line !== false && line !== undefined) as string[];
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                data-lenis-prevent
                className="max-h-[90vh] overflow-y-auto sm:max-w-[640px] rounded-[32px] sm:rounded-[32px] border-white/10 bg-[#070b16]/95 backdrop-blur-xl p-6 md:p-10 text-left"
            >
                <DialogHeader className="text-left space-y-2">
                    <DialogTitle
                        className="text-3xl md:text-4xl font-light tracking-tight text-white"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Start a project<span className="text-brand">.</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        A few quick details and your message opens in WhatsApp, ready to send.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-7">
                    <label className="block">
                        <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Your name</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Jane from Acme"
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-brand/60"
                        />
                    </label>

                    <ChipGroup label="What are we building?" options={PROJECT_TYPES} value={type} onChange={setType} />
                    <ChipGroup label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
                    <ChipGroup label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />

                    <label className="block">
                        <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Tell me about it</span>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            rows={4}
                            placeholder="What you're building, who it's for, and anything you already have (designs, a site, a deadline)."
                            className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-brand/60"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!canSend}
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-4 font-medium text-white shadow-[0_0_20px_rgba(255,95,38,0.35)] transition-all duration-300 hover:bg-[#ff4d1a] hover:shadow-[0_0_30px_rgba(255,95,38,0.55)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                    >
                        Send via WhatsApp
                        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </button>
                    {!canSend && (
                        <p className="-mt-4 text-center text-xs text-gray-500">Add your name, project type and a short brief to continue.</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InquiryDialog;
