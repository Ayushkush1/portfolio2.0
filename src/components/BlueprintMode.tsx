"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { blueprint, useBlueprint } from "@/lib/blueprint";

// Blueprint mode — "from first sketch to production", made literal.
// Flipping the switch lays the design + engineering layer over the live site:
// grid paper, the 12-column layout grid, section outlines, type specs on headings,
// wireframed images and handwritten notes explaining the decisions.
//
// Elements opt in to notes with:
//   data-bp-note="one primary action"     handwritten annotation
//   data-bp-code="<ViewTransition />"     optional code line under the note
//   data-bp-pos="left|right|top|bottom"   where the note sits (default: top)
// and out of image wireframes with data-bp-skip on a container.

type Kind = "heading" | "image" | "note";
interface Item { el: HTMLElement; kind: Kind; node: HTMLDivElement }

function headingSpec(el: HTMLElement) {
    const cs = getComputedStyle(el.querySelector("span span") as HTMLElement ?? el);
    const family = cs.fontFamily.split(",")[0].replace(/["']/g, "");
    const size = Math.round(parseFloat(cs.fontSize));
    const lh = cs.lineHeight === "normal" ? "auto" : Math.round(parseFloat(cs.lineHeight));
    return `${el.tagName} · ${family} ${size}/${lh} · ${cs.fontWeight}`;
}

function buildNode(item: Omit<Item, "node">): HTMLDivElement {
    const node = document.createElement("div");
    node.className = `bp-item bp-item-${item.kind}`;
    if (item.kind === "heading") {
        node.innerHTML = `<span class="bp-tag">${headingSpec(item.el)}</span>`;
    } else if (item.kind === "image") {
        node.innerHTML = `<svg class="bp-cross" preserveAspectRatio="none" viewBox="0 0 100 100"><line x1="0" y1="0" x2="100" y2="100"/><line x1="100" y1="0" x2="0" y2="100"/></svg><span class="bp-tag bp-size"></span>`;
    } else {
        const pos = item.el.dataset.bpPos ?? "top";
        node.dataset.pos = pos;
        const note = document.createElement("div");
        note.className = "bp-note";
        // Ink is masked for the write-in; the arrow sits outside the mask and draws itself
        const ink = document.createElement("div");
        ink.className = "bp-note-ink";
        const text = document.createElement("span");
        text.textContent = item.el.dataset.bpNote ?? "";
        ink.appendChild(text);
        if (item.el.dataset.bpCode) {
            const code = document.createElement("code");
            code.className = "bp-note-code";
            code.textContent = item.el.dataset.bpCode;
            ink.appendChild(code);
        }
        note.appendChild(ink);
        // Hand-drawn arrow pointing from the note toward the element
        note.insertAdjacentHTML("beforeend", `<svg class="bp-arrow" viewBox="0 0 60 40" fill="none"><path d="M4 6 C 22 4, 40 14, 52 32" /><path d="M42 30 L 52 32 L 50 22" /></svg>`);
        node.appendChild(note);
    }
    return node;
}

const BlueprintMode = () => {
    // Toggled from the navbar's BlueprintSwitch (or the B key) through the shared store
    const on = useBlueprint();
    const layerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => { blueprint.restore(); }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (on) root.dataset.blueprint = "on";
        else delete root.dataset.blueprint;
    }, [on]);

    // "B" toggles, unless the visitor is typing
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (e.key.toLowerCase() !== "b" || e.metaKey || e.ctrlKey || e.altKey) return;
            if (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
            blueprint.toggle();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Measure targets and keep the annotation layer glued to them while on
    useEffect(() => {
        const layer = layerRef.current;
        if (!on || !layer) return;
        // Keyed by kind + element so rescans only add/remove — existing notes don't replay their
        // write-in — and one element can carry both a type spec and a note
        const items = new Map<string, Item>();
        const ids = new WeakMap<HTMLElement, number>();
        let nextId = 0;
        const keyOf = (el: HTMLElement, kind: Kind) => {
            if (!ids.has(el)) ids.set(el, nextId++);
            return `${kind}:${ids.get(el)}`;
        };
        let raf = 0;

        const scan = () => {
            const main = document.querySelector("main") ?? document.body;
            const found: Omit<Item, "node">[] = [];
            main.querySelectorAll<HTMLElement>("h1, h2").forEach((el) => found.push({ el, kind: "heading" }));
            main.querySelectorAll<HTMLElement>("img").forEach((el) => {
                if (!el.closest("[data-bp-skip]")) found.push({ el, kind: "image" });
            });
            main.querySelectorAll<HTMLElement>("[data-bp-note]").forEach((el) => found.push({ el, kind: "note" }));

            const seen = new Set(found.map((f) => keyOf(f.el, f.kind)));
            items.forEach((item, key) => {
                if (!seen.has(key) || !item.el.isConnected) { item.node.remove(); items.delete(key); }
            });
            for (const f of found) {
                const key = keyOf(f.el, f.kind);
                if (items.has(key)) continue;
                const node = buildNode(f);
                layer.appendChild(node);
                items.set(key, { ...f, node });
            }
        };

        const place = () => {
            const vh = window.innerHeight;
            for (const { el, kind, node } of Array.from(items.values())) {
                const r = el.getBoundingClientRect();
                const visible = r.bottom > -200 && r.top < vh + 200 && r.width > 0 && (kind !== "image" || r.width > 120);
                node.style.display = visible ? "" : "none";
                if (!visible) continue;
                node.style.transform = `translate(${r.left}px, ${r.top}px)`;
                node.style.width = `${r.width}px`;
                node.style.height = `${r.height}px`;
                if (kind === "image") {
                    const size = node.querySelector<HTMLElement>(".bp-size");
                    const label = `IMG ${Math.round(r.width)}×${Math.round(r.height)}`;
                    if (size && size.textContent !== label) size.textContent = label;
                }
            }
            raf = requestAnimationFrame(place);
        };

        scan();
        place();
        // Content can mount late (lazy sections, hover previews, route changes): rescan often
        const rescan = window.setInterval(scan, 400);
        return () => {
            cancelAnimationFrame(raf);
            window.clearInterval(rescan);
            layer.querySelectorAll(".bp-item").forEach((n) => n.remove());
        };
    }, [on, pathname]);

    return (
        <>
            {/* Annotation layer — purely visual, never intercepts clicks */}
            <div ref={layerRef} aria-hidden="true" className="bp-layer">
                <div className="bp-paper" />
                <div className="bp-columns container">
                    {Array.from({ length: 12 }, (_, i) => <span key={i} style={{ transitionDelay: `${i * 30}ms` }} />)}
                </div>
                <div className="bp-legend">
                    <span>Blueprint</span> — layout grid, type specs &amp; design notes. Press <kbd>B</kbd> to switch back.
                </div>
            </div>
        </>
    );
};

export default BlueprintMode;
