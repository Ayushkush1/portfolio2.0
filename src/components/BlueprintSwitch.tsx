"use client";
import { PencilRuler, X } from "lucide-react";
import { useEffect, useState } from "react";
import { blueprint, useBlueprint } from "@/lib/blueprint";
import { track } from "@/lib/analytics";

const SEEN_KEY = "ak-bp-seen";

// One small, self-explanatory entry point to Blueprint mode, sitting in the navbar's glass row.
// Off: ruler + "How it's built" (a blueprint-blue dot pulses until it's been tried once).
// On: the button takes the blueprint colour and becomes "Exit blueprint".
const BlueprintSwitch = () => {
    const on = useBlueprint();
    const [seen, setSeen] = useState(true);

    useEffect(() => {
        try { setSeen(localStorage.getItem(SEEN_KEY) === "1"); } catch { /* storage unavailable */ }
    }, []);

    const toggle = () => {
        const next = !on;
        blueprint.set(next);
        track("blueprint_toggle", { mode: next ? "blueprint" : "live" });
        if (!seen) {
            setSeen(true);
            try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* storage unavailable */ }
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={on}
            aria-label={on ? "Exit blueprint view" : "See how this site is designed and built"}
            title={on ? "Back to the live site (B)" : "See the design & engineering behind this site (B)"}
            className={`group relative inline-flex h-[38px] items-center justify-center gap-2 rounded-full border text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-500 w-[38px] md:w-auto md:px-4 ${
                on
                    ? "border-transparent bg-[hsl(var(--bp))] text-[hsl(222_84%_6%)] shadow-[0_0_24px_hsl(var(--bp)/0.45)]"
                    : "nav-glass border-white/20 bg-[hsl(222_47%_7%/0.5)] text-foreground backdrop-blur-xl backdrop-saturate-200 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/20"
            }`}
        >
            {on ? (
                <X className="h-4 w-4" strokeWidth={2.25} />
            ) : (
                <PencilRuler className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12" />
            )}
            <span className="hidden md:inline whitespace-nowrap">{on ? "Exit blueprint" : "How it's built"}</span>

            {/* First-visit invitation: a blueprint-blue dot until it's been tried once */}
            {!seen && !on && (
                <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--bp))] opacity-70 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--bp))]" />
                </span>
            )}
        </button>
    );
};

export default BlueprintSwitch;
