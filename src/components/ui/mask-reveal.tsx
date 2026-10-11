"use client";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";

interface MaskRevealProps {
  as?: "h1" | "h2" | "h3" | "p";
  /** Each entry is one visual line; lines slide up from behind their own mask, staggered */
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

// Signature heading entrance: each line rises out of an invisible mask.
// Only transforms are animated, so MotionConfig's reduced-motion setting shows the text instantly.
const MaskReveal = ({ as = "h2", lines, className, style, delay = 0 }: MaskRevealProps) => {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        // Padding + negative margin keeps descenders and italic overhang inside the mask
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em] pr-[0.08em] -mr-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration: DURATION.slow, ease: EASE.out } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default MaskReveal;
