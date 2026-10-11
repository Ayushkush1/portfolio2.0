"use client";
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react";
import { REVEAL_OFFSET, SCRUB } from "./scroll-reveal";

interface MaskRevealProps {
  as?: "h1" | "h2" | "h3" | "p";
  /** Each entry is one visual line; lines rise from behind their own mask, staggered */
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
  /** Shifts the reveal later in the scroll (0–1 of the reveal window) */
  delay?: number;
}

const Line = ({ progress, index, delay, children }: { progress: MotionValue<number>; index: number; delay: number; children: ReactNode }) => {
  const start = Math.min(delay + index * 0.12, 0.6);
  const y = useTransform(progress, [start, start + 0.55], ["115%", "0%"]);
  const rotate = useTransform(progress, [start, start + 0.55], [4, 0]);
  return (
    // Padding + negative margin keeps descenders and italic overhang inside the mask
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em] pr-[0.08em] -mr-[0.08em]">
      <motion.span className="block" style={{ y, rotate, transformOrigin: "0% 100%" }}>
        {children}
      </motion.span>
    </span>
  );
};

// Signature heading entrance, scrubbed to the scroll: each line rises out of an invisible mask
// and levels out as the heading travels up the viewport. Reduced motion → static heading.
const MaskReveal = ({ as = "h2", lines, className, style, delay = 0 }: MaskRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: REVEAL_OFFSET });
  const progress = useSpring(scrollYProgress, SCRUB);
  const Tag = as;

  if (reduce) {
    return (
      <Tag ref={ref as never} className={className} style={style}>
        {lines.map((line, i) => <span key={i} className="block">{line}</span>)}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {lines.map((line, i) => (
        <Line key={i} progress={progress} index={i} delay={delay}>{line}</Line>
      ))}
    </Tag>
  );
};

export default MaskReveal;
