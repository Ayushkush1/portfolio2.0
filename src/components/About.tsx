import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  LayoutGrid,
  PenTool,
  Search,
  Film,
  FlaskConical,
  Goal
} from "lucide-react";
import FallingPillsArea from "./FallingPillsArea";


/* ── simple pill badge for mobile marquee ────────────────────── */
const PillBadge: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <div className="rounded-full px-1.5 py-1 pr-3 flex items-center gap-1.5 bg-white/90 backdrop-blur text-xs text-gray-900 shadow-lg border border-white/20 whitespace-nowrap select-none">
    <span className="inline-flex items-center justify-center rounded-full size-7 flex-shrink-0" style={{ backgroundColor: color }}>
      <span className="text-white">{icon}</span>
    </span>
    <span className="font-medium">{label}</span>
  </div>
);

const WordReveal = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] mb-[0.1em] text-center">
      {children}
    </motion.span>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: textScrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "end 65%"],
  });

  const statementText = "I help startups turn ideas into market-ready MVPs, boosting conversions and user engagement through scalable architecture, product strategy, and modern full-stack development.";
  const words = statementText.split(" ");

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} id="about" className="relative flex items-center justify-center overflow-hidden w-full pt-10 pb-12 md:pt-40 md:pb-32 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container relative z-10 md:max-w-6xl mx-auto pb-10 md:pb-28">
        {/* Hello Badge */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3">
            <motion.span
              className="h-px w-12 bg-border"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-xl font-serif text-muted-foreground italic tracking-wide">Hello!</span>
            <motion.span
              className="h-px w-12 bg-border"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative flex items-center justify-center">
          {/* Central Text */}
          <motion.div
            className="text-center md:max-w-[790px] px-6 py-8 md:px-8 md:py-4 md:bg-transparent bg-white/5 backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none rounded-[2.5rem] md:rounded-none shadow-2xl md:shadow-none"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h1 ref={textRef} className="text-[1.7rem] md:text-5xl lg:text-5xl font-thin text-foreground mb-0 md:mb-6 flex flex-wrap justify-center text-center" style={{ lineHeight: "1.2" }}>
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <WordReveal key={i} progress={textScrollYProgress} range={[start, end]}>
                    {word}
                  </WordReveal>
                );
              })}
            </h1>
          </motion.div>

          {/* Falling Skills Pills - Desktop Only (physics on hover) */}
          <FallingPillsArea />
        </div>

        {/* Mobile Skills Display - Marquee */}
        <div className="lg:hidden mt-12 relative w-screen -ml-[calc((100vw-100%)/2)] overflow-hidden py-4">
          <div className="flex flex-col gap-4">
            {/* First Row */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <motion.div
                className="flex gap-3 px-0"
                animate={{ x: [0, -500] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[1, 2, 3].map((i) => (
                  <div key={`r1-${i}`} className="flex gap-4">
                    <PillBadge icon={<LayoutGrid className="size-4" />} label="Design systems" color="#ff5f26" />
                    <PillBadge icon={<PenTool className="size-4" />} label="SaaS Builder" color="#10b981" />
                    <PillBadge icon={<Search className="size-4" />} label="Research" color="#3b82f6" />
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Second Row */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <motion.div
                className="flex gap-3 px-0"
                animate={{ x: [-500, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {[1, 2, 3].map((i) => (
                  <div key={`r2-${i}`} className="flex gap-4">
                    <PillBadge icon={<Film className="size-4" />} label="Animation" color="#22c55e" />
                    <PillBadge icon={<FlaskConical className="size-4" />} label="Prototyping" color="#ec4899" />
                    <PillBadge icon={<Goal className="size-4" />} label="Strategy" color="#f59e0b" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Background section name */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        About
      </motion.div>
    </section>
  );
};

export default About;