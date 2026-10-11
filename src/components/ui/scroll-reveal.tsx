"use client";
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react";

// Scroll-scrubbed reveals: progress is tied to the scroll position (not a one-off timer),
// smoothed by a spring so content keeps flowing as you move between sections.
// Reduced motion → everything renders in its final state.

const SCRUB = { stiffness: 90, damping: 26, mass: 0.8 }; // softer catch-up = a slower, smoother reveal

// Every scrubbed reveal starts as the element's top passes 95% down the viewport and is
// complete once its bottom passes 85% — i.e. the element is fully on screen, with room to spare.
// The end point must always come after the start for ANY element height (a reversed window
// plays the animation backwards); "end 85%" is always ≥ 10% of the viewport after "start 95%".
export const REVEAL_OFFSET: ["start 95%", "end 85%"] = ["start 95%", "end 85%"];

/* ── Words sharpen out of a blur as the paragraph scrolls into place ── */
const BlurWord = ({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: ReactNode }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span style={{ opacity, filter }} className="inline-block will-change-[opacity,filter]">
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
  const { scrollYProgress } = useScroll({ target: ref, offset: REVEAL_OFFSET });
  const progress = useSpring(scrollYProgress, SCRUB);
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
  const { scrollYProgress } = useScroll({ target: ref, offset: REVEAL_OFFSET });
  const progress = useSpring(scrollYProgress, SCRUB);
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
