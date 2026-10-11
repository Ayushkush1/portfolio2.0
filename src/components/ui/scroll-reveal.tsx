"use client";
import { motion, MotionValue, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
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
   Each reveal measures its document position once (and again when the page resizes or
   after scrolling settles). While scrolling, progress comes from window.scrollY alone —
   no per-frame layout reads, which is what makes scroll-linked effects stutter. */
const trackers = new Set<{ measure: () => void; update: () => void }>();
let listening = false;
let settleTimer: ReturnType<typeof setTimeout> | null = null;

function listen() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  const updateAll = () => trackers.forEach((t) => t.update());
  const remeasureAll = () => { trackers.forEach((t) => t.measure()); updateAll(); };
  window.addEventListener("scroll", () => {
    updateAll();
    // Content above may have shifted (images, accordions): re-measure once scrolling settles
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(remeasureAll, 250);
  }, { passive: true });
  window.addEventListener("resize", remeasureAll);
  new ResizeObserver(remeasureAll).observe(document.body);
}

export function useRevealProgress(ref: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let top = 0;
    let bottom = 0;
    const tracker = {
      measure: () => {
        const r = el.getBoundingClientRect();
        top = r.top + window.scrollY;
        bottom = r.bottom + window.scrollY;
      },
      update: () => {
        const vh = window.innerHeight;
        const start = top - START * vh;
        const end = bottom - END * vh; // always > start: (bottom - top) + 0.10vh
        progress.set(Math.min(1, Math.max(0, (window.scrollY - start) / (end - start))));
      },
    };
    tracker.measure();
    tracker.update();
    trackers.add(tracker);
    listen();
    return () => { trackers.delete(tracker); };
  }, [ref, progress]);
  return progress;
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
    <Tag ref={ref as never} className={className} style={{ ...style, rotate, transformOrigin: "0% 50%" }} aria-label={text}>
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
  /** Corner radius kept on the clip while it opens, so edges match the card */
  radius?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const progress = useSpring(useRevealProgress(ref), SCRUB);
  const inset = useTransform(progress, [0, 1], [50, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% 0% ${v}% 0% round ${radius}px)`);
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
