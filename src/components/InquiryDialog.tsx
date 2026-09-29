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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { track } from "@/lib/analytics";

const WHATSAPP_NUMBER = "918738954475";

const PROJECT_TYPES = ["SaaS product", "Startup MVP", "CRM / ERP", "Website", "UI/UX design", "Other"];
const BUDGETS = ["Under ₹50K", "₹50K – ₹1.5L", "₹1.5L – ₹3L", "₹3L+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 – 3 months", "Flexible"];

const LABEL = "mb-2 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/50";
const FIELD = "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-brand/60";

function SelectField({
    label,
    placeholder,
    options,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <span className={LABEL}>{label}</span>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    aria-label={label}
                    className={`${FIELD} h-12 ring-offset-0 focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-gray-600 [&>svg]:text-brand [&>svg]:opacity-80`}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="z-[100] rounded-2xl border-white/10 bg-[#0b1020] text-white">
                    {options.map((option) => (
                        <SelectItem
                            key={option}
                            value={option}
                            className="rounded-xl py-2.5 text-sm focus:bg-brand/15 focus:text-white"
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
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
            ...(budget ? [`Budget: ${budget}`] : []),
            ...(timeline ? [`Timeline: ${timeline}`] : []),
            "",
            details.trim(),
        ];
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        // GA4's recommended lead event, so it can be marked as a key event (conversion)
        track("generate_lead", { project_type: type, budget: budget || "not given", timeline: timeline || "not given" });
        window.open(url, "_blank", "noopener,noreferrer");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(next) => { if (next) track("inquiry_open"); setOpen(next); }}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                data-lenis-prevent
                className="w-[calc(100vw-32px)] sm:max-w-[600px] rounded-[32px] sm:rounded-[32px] border-white/10 bg-[#070b16]/95 backdrop-blur-xl p-6 md:p-8 text-left"
            >
                <DialogHeader className="text-left space-y-2">
                    <DialogTitle
                        className="text-3xl font-light tracking-tight text-white"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Start a project<span className="text-brand">.</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        A few quick details and your message opens in WhatsApp, ready to send.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className={LABEL}>Your name</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Jane from Acme"
                                className={`${FIELD} h-12`}
                            />
                        </label>
                        <SelectField label="What are we building?" placeholder="Choose a type" options={PROJECT_TYPES} value={type} onChange={setType} />
                        <SelectField label="Budget" placeholder="Optional" options={BUDGETS} value={budget} onChange={setBudget} />
                        <SelectField label="Timeline" placeholder="Optional" options={TIMELINES} value={timeline} onChange={setTimeline} />
                    </div>

                    <label className="block">
                        <span className={LABEL}>Tell me about it</span>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            rows={3}
                            placeholder="What you're building, who it's for, and anything you already have."
                            className={`${FIELD} resize-none py-3`}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!canSend}
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-3.5 font-medium text-white shadow-[0_0_20px_rgba(255,95,38,0.35)] transition-all duration-300 hover:bg-[#ff4d1a] hover:shadow-[0_0_30px_rgba(255,95,38,0.55)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                    >
                        Send via WhatsApp
                        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InquiryDialog;
