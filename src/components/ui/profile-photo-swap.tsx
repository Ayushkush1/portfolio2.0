"use client";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type AnimationEvent } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Profile photos for the Experience card.
// `position` is the object-position crop; `origin` is where the face lands in that crop —
// the reveal opens from there like a camera iris.
const PHOTOS = [
    {
        src: "/assets/ayush-portrait.webp",
        alt: "Ayush Kushwaha smiling in front of the mountains",
        position: "50% 30%",
        origin: { x: 54, y: 30 },
    },
    {
        src: "/assets/ayush-hills.webp",
        alt: "Ayush Kushwaha looking out over a valley and lake",
        position: "50% 28%",
        origin: { x: 41, y: 25 },
    },
    {
        src: "/assets/ayush-sunset.webp",
        alt: "Ayush Kushwaha sitting with a dog on a hilltop at sunset",
        position: "50% 70%",
        origin: { x: 53, y: 32 },
    },
];

const HOLD_MS = 5500; // how long each photo stays before the next one reveals
const REVEAL_MS = 1400;
const REVEAL_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const CLIP_RADIUS = 150; // % of the card's reference diagonal; clears every corner from any origin

/**
 * Photo stack where each new photo opens out of the subject's face as an expanding circle (with a brand-coloured
 * glow riding its edge) while the photo underneath sinks back. Only clip-path, transform and
 * opacity are animated, via the Web Animations API — no React re-renders per frame and no
 * layout reads during scroll. Auto-advance is driven by a hidden timer's CSS animation, so it
 * pauses itself while the card is off screen or the tab is hidden.
 */
export default function ProfilePhotoSwap() {
    const rootRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [active, setActive] = useState(0);
    const [previous, setPrevious] = useState<number | null>(null);
    const playing = useInView(rootRef, { amount: 0.35 });
    const reduceMotion = useReducedMotion();

    const advance = () => {
        setPrevious(active);
        setActive((active + 1) % PHOTOS.length);
    };

    // Layout effect, not effect: the new photo is raised to the top in the same commit, so the clip
    // must be applied before the browser paints, or it shows uncovered for a frame (a flicker)
    useLayoutEffect(() => {
        if (previous === null) return; // first paint: no reveal
        const layer = layerRefs.current[active];
        const incoming = imageRefs.current[active];
        const outgoing = imageRefs.current[previous];
        const ring = ringRef.current;
        const root = rootRef.current;
        if (!layer || !root) return;

        if (reduceMotion) {
            const fade = layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: "ease" });
            return () => fade.cancel();
        }

        const { origin } = PHOTOS[active];
        const timing = { duration: REVEAL_MS, easing: REVEAL_EASE };
        const at = `${origin.x}% ${origin.y}%`;
        const animations: Animation[] = [
            layer.animate(
                [{ clipPath: `circle(0% at ${at})` }, { clipPath: `circle(${CLIP_RADIUS}% at ${at})` }],
                timing,
            ),
        ];
        if (incoming) {
            animations.push(
                incoming.animate(
                    [{ transform: "scale(1.18) rotate(-3deg)" }, { transform: "none" }],
                    { duration: REVEAL_MS + 500, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
                ),
            );
        }
        if (outgoing) {
            animations.push(outgoing.animate([{ transform: "none" }, { transform: "scale(0.92)" }], timing));
        }
        if (ring) {
            // Size and place the ring to match the clip circle once per swap (offset* ignores the card's
            // rotate/scale transforms), then scale it in lockstep with the clip so it rides the edge
            const { offsetWidth: w, offsetHeight: h } = root;
            const diameter = 2 * (CLIP_RADIUS / 100) * Math.hypot(w, h) / Math.SQRT2;
            Object.assign(ring.style, { width: `${diameter}px`, height: `${diameter}px`, left: `${origin.x}%`, top: `${origin.y}%` });
            animations.push(
                ring.animate(
                    [
                        { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
                        { opacity: 1, offset: 0.5 },
                        { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
                    ],
                    timing,
                ),
            );
        }
        return () => animations.forEach((a) => a.cancel());
    }, [active, previous, reduceMotion]);

    const onTimerEnd = (e: AnimationEvent) => {
        if (e.animationName === "photo-progress") advance();
    };

    return (
        <div ref={rootRef} className="absolute inset-0 select-none">
            {PHOTOS.map((p, i) => (
                <div
                    key={p.src}
                    ref={(el) => { layerRefs.current[i] = el; }}
                    className="absolute inset-0 overflow-hidden"
                    style={{ zIndex: i === active ? 2 : i === previous ? 1 : 0 }}
                    aria-hidden={i !== active}
                >
                    <div ref={(el) => { imageRefs.current[i] = el; }} className="absolute inset-0 will-change-transform">
                        <Image
                            src={p.src}
                            alt={p.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                            style={{ objectPosition: p.position }}
                            draggable={false}
                        />
                    </div>
                </div>
            ))}

            {/* Glow that rides the reveal edge */}
            <div
                ref={ringRef}
                aria-hidden
                className="pointer-events-none absolute z-[3] rounded-full opacity-0"
                style={{
                    background:
                        "radial-gradient(circle closest-side, transparent 90%, hsl(var(--brand) / 0.55) 97%, transparent 100%)",
                }}
            />

            {/* Invisible timer: its CSS animation ending advances the slideshow (CSS animations
                still run under visibility:hidden, and pause themselves in background tabs) */}
            <span
                key={active}
                aria-hidden
                className="photo-progress invisible absolute h-px w-px"
                style={{ animationDuration: `${HOLD_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                onAnimationEnd={onTimerEnd}
            />
        </div>
    );
}
