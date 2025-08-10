import { motion } from "framer-motion";
import {
  LayoutGrid,
  PenTool,
  Search,
  Film,
  FlaskConical,
  Goal
} from "lucide-react";

type PillProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
};

const SkillPill: React.FC<PillProps> = ({ icon, label, color }) => (
  <motion.div
    className="rounded-full px-2 py-1.5 pr-4 flex items-center gap-2 bg-white/90 backdrop-blur text-sm text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors cursor-grab active:cursor-grabbing"
    drag
    dragSnapToOrigin
    dragConstraints={{
      top: -300,
      left: -400,
      right: 400,
      bottom: 300,
    }}
    dragElastic={0.2}
    dragTransition={{
      bounceStiffness: 600,
      bounceDamping: 20,
      power: 0.3,
      timeConstant: 200
    }}
    whileDrag={{
      scale: 1.05,
      rotate: 5,
      zIndex: 50,
      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
    }}
  >
    <span
      className="inline-flex items-center justify-center rounded-full size-8"
      style={{ backgroundColor: color }}
    >
      <span className="text-white">
        {icon}
      </span>
    </span>
    <span className="font-medium">{label}</span>
  </motion.div>
);

const About: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden w-full pt-40 pb-32 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container relative z-10 max-w-6xl mx-auto pb-28">
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
            className="text-center max-w-[790px] px-8 pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-thin text-foreground mb-6" style={{ lineHeight: "1.1" }}>
              I help startups and businesses boost{" "}
              
                conversions and user engagement
              
              {" "}
              through CRO-focused design, UX strategy, and modern web development.
            </h1>
          </motion.div>

          {/* Floating Skills Pills - Desktop Only */}
          <div className="hidden lg:block">
            {/* Left side pills with different rotations */}
            <div className="absolute -left-14 top-6 flex flex-col gap-10">
              <motion.div
                className="rotate-6"
                initial={{ opacity: 0, x: -100, rotate: 6 }}
                whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                <SkillPill icon={<LayoutGrid className="size-4" />} label="Design systems" color="#ff5f26" />
              </motion.div>
              <motion.div
                className="rotate-3 ml-8"
                initial={{ opacity: 0, x: -120, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              >
                <SkillPill icon={<PenTool className="size-4" />} label="UI/UX" color="#10b981" />
              </motion.div>
              <motion.div
                className="-rotate-6 ml-4"
                initial={{ opacity: 0, x: -80, rotate: -6 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              >
                <SkillPill icon={<Search className="size-4" />} label="Research" color="#3b82f6" />
              </motion.div>
            </div>

            {/* Right side pills with different rotations */}
            <div className="absolute -right-14 top-6 flex flex-col gap-10">
              <motion.div
                className="-rotate-6"
                initial={{ opacity: 0, x: 100, rotate: -6 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <SkillPill icon={<Film className="size-4" />} label="Animation" color="#22c55e" />
              </motion.div>
              <motion.div
                className="-rotate-3 mr-8"
                initial={{ opacity: 0, x: 120, rotate: -3 }}
                whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                <SkillPill icon={<FlaskConical className="size-4" />} label="Prototyping" color="#ec4899" />
              </motion.div>
              <motion.div
                className="rotate-6 mr-4"
                initial={{ opacity: 0, x: 80, rotate: 6 }}
                whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              >
                <SkillPill icon={<Goal className="size-4" />} label="Strategy" color="#f59e0b" />
              </motion.div>
            </div>
          </div>          {/* Mobile Skills Display */}
          <motion.div
            className="lg:hidden absolute top-full mt-12 left-1/2 transform -translate-x-1/2 w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <SkillPill icon={<LayoutGrid className="size-4" />} label="Design systems" color="#ff5f26" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <SkillPill icon={<PenTool className="size-4" />} label="UI/UX" color="#10b981" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <SkillPill icon={<Search className="size-4" />} label="Research" color="#3b82f6" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <SkillPill icon={<Film className="size-4" />} label="Animation" color="#22c55e" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <SkillPill icon={<FlaskConical className="size-4" />} label="Prototyping" color="#ec4899" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <SkillPill icon={<Goal className="size-4" />} label="Strategy" color="#f59e0b" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background section name */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
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