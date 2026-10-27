"use client";
import { frame, motion, MotionValue, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CSSProperties, ReactNode, RefObject, useEffect, useRef } from "react";

// Scroll-scrubbed reveals: progress is tied to the scroll position (not a one-off timer),
// smoothed by a spring so content keeps flowing as you move between sections.
// Reduced motion → everything renders in its final state.

const SCRUB = { stiffness: 90, damping: 26, mass: 0.8 }; // softer catch-up = a slower, smoother reveal

// Every scrubbed reveal starts as the element's top passes 95% down the viewport and is
// complete once its bottom passes 85% — i.e. the element is fully on screen, with room to spare.
// The end point must always come after the start for ANY element height (a reversed window
// plays the animation backwards); "end 85%" is always ≥ 10% of the viewport after "start 95%".
export const REVEAL_OFFSET: ["start 95%", "end 85%"] = ["start 95%", "end 85%"];
const START = 0.95; // element top  at 95% of the viewport → progress 0
const END = 0.85;   // element bottom at 85% of the viewport → progress 1

/* ── Shared, layout-free scroll tracking ──────────────────────────
   Every scroll-linked effect on the site goes through here (instead of Framer's useScroll or
   GSAP ScrollTrigger, which re-measure the page on every scroll and force a synchronous
   layout each frame). Each tracker measures its document position once (and again when the
   page resizes or after scrolling settles); while scrolling, progress comes from one read of
   window.scrollY per event, shared by all trackers. */
type Tracker = { measure: (scrollY: number) => void; update: (scrollY: number, vh: number) => void };
const trackers = new Set<Tracker>();
let listening = false;
let settleTimer: ReturnType<typeof setTimeout> | null = null;

function listen() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  const updateAll = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    trackers.forEach((t) => t.update(y, vh));
  };
  const remeasureAll = () => {
    const y = window.scrollY;
    trackers.forEach((t) => t.measure(y));
    updateAll();
  };
  window.addEventListener("scroll", () => {
    // Read in Framer's batched read step (before any style writes in the frame), so reading
    // scrollY never forces a layout; once per frame however many scroll events arrive
    frame.read(updateAll);
    // Content above may have shifted (images, accordions): re-measure once scrolling settles
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(remeasureAll, 250);
  }, { passive: true });
  window.addEventListener("resize", remeasureAll);
  new ResizeObserver(remeasureAll).observe(document.body);
}

/** A point in the scroll: which edge of the element meets which fraction down the viewport */
export type ScrollEdge = [edge: "start" | "end", viewport: number];

/**
 * Progress 0 → 1 as the element travels between two scroll points — the layout-free
 * equivalent of Framer's useScroll({ target, offset }). E.g. Framer's
 * ["start end", "end start"] is [["start", 1], ["end", 0]].
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, from: ScrollEdge, to: ScrollEdge) {
  const progress = useMotionValue(0);
  const [fromEdge, fromVp] = from;
  const [toEdge, toVp] = to;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let top = 0;
    let bottom = 0;
    const tracker: Tracker = {
      measure: (scrollY) => {
        const r = el.getBoundingClientRect();
        top = r.top + scrollY;
        bottom = r.bottom + scrollY;
      },
      update: (scrollY, vh) => {
        const start = (fromEdge === "start" ? top : bottom) - fromVp * vh;
        const end = (toEdge === "start" ? top : bottom) - toVp * vh;
        const p = end > start ? (scrollY - start) / (end - start) : scrollY >= end ? 1 : 0;
        progress.set(Math.min(1, Math.max(0, p)));
      },
    };
    tracker.measure(window.scrollY);
    tracker.update(window.scrollY, window.innerHeight);
    trackers.add(tracker);
    listen();
    return () => { trackers.delete(tracker); };
  }, [ref, progress, fromEdge, fromVp, toEdge, toVp]);
  return progress;
}

// Reveal window: starts as the element's top passes 95% down the viewport and completes once
// its bottom passes 85%. The end always comes after the start, for any element height.
export function useRevealProgress(ref: RefObject<HTMLElement | null>) {
  return useScrollProgress(ref, ["start", START], ["end", END]);
}

/* ── Words sharpen out of a blur as the paragraph scrolls into place ── */
const BlurWord = ({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: ReactNode }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [8, 0]);
  // No filter at all once a word is sharp: settled words cost nothing to paint while scrolling
  const filter = useTransform(blur, (b) => (b < 0.15 ? "none" : `blur(${b.toFixed(1)}px)`));
  return (
    <motion.span style={{ opacity, filter }} className="inline-block">
      {children}
    </motion.span>
  );
};

export const ScrollBlurText = ({
  text,
  as = "p",
  className,
  style,
  wordClassName = "mr-[0.25em]",
}: {
  text: string;
  as?: "p" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
  wordClassName?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSpring(useRevealProgress(ref), SCRUB);
  // The whole block also settles from a slight tilt, pivoting on its left edge
  const rotate = useTransform(progress, [0, 0.6], [2.5, 0]);
  const Tag = motion[as];
  const words = text.split(" ");

  if (reduce) {
    const Static = as;
    return <Static ref={ref as never} className={className} style={style}>{text}</Static>;
  }

  return (
    <Tag ref={ref as never} className={className} style={{ ...style, rotate, transformOrigin: "0% 50%" }}>
      {/* Screen readers and AI agents read the sentence whole (aria-label isn't permitted on a <p>);
          the animated word spans below are hidden from them */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        // Overlapping windows give a soft, staggered wave instead of word-by-word steps
        const start = (i / words.length) * 0.75;
        return (
          <span key={i} aria-hidden="true" className={wordClassName}>
            <BlurWord progress={progress} range={[start, start + 0.25]}>{word}</BlurWord>
          </span>
        );
      })}
    </Tag>
  );
};

/* ── Image opens from a horizontal centre line, zooming out as it settles ── */
export const CurtainReveal = ({
  children,
  className,
  style,
  radius = 40,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Corner radius kept on the clip while it opens, so edges match the card.
      A parent's --card-radius wins, so the card can change it per breakpoint. */
  radius?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const progress = useSpring(useRevealProgress(ref), SCRUB);
  const inset = useTransform(progress, [0, 1], [50, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% 0% ${v}% 0% round var(--card-radius, ${radius}px))`);
  const scale = useTransform(progress, [0, 1], [1.18, 1]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? style : { ...style, clipPath }}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export { SCRUB };
