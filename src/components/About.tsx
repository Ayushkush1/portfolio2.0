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
  <div className="rounded-full px-3 py-2 flex items-center gap-2 bg-white/90 backdrop-blur text-sm text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors">
    <span
      className="inline-flex items-center justify-center rounded-full size-6"
      style={{ backgroundColor: color }}
    >
      <span className="text-white">
        {icon}
      </span>
    </span>
    <span className="font-medium">{label}</span>
  </div>
);

const About: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Hello Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-12 bg-border"></span>
            <span className="text-xl font-serif text-muted-foreground italic tracking-wide">Hello!</span>
            <span className="h-px w-12 bg-border"></span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative flex items-center justify-center">
          {/* Central Text */}
          <div className="text-center max-w-[790px] px-8 pt-4">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-thin text-foreground mb-6">
              I help startups and businesses boost{" "}
              conversions and user engagement
              {" "}
              through CRO-focused design, UX strategy, and modern web development.
            </h1>
          </div>

          {/* Floating Skills Pills - Desktop Only */}
          <div className="hidden lg:block">
            {/* Left side pills with different rotations */}
            <div className="absolute -left-14 top-4 flex flex-col gap-10">
              <div className="rotate-6">
                <SkillPill icon={<LayoutGrid className="size-4" />} label="Design systems" color="#ff5f26" />
              </div>
              <div className="rotate-3 ml-8">
                <SkillPill icon={<PenTool className="size-4" />} label="UI/UX" color="#10b981" />
              </div>
              <div className="-rotate-6 ml-4">
                <SkillPill icon={<Search className="size-4" />} label="Research" color="#3b82f6" />
              </div>
            </div>

            {/* Right side pills with different rotations */}
            <div className="absolute -right-14 top-4 flex flex-col gap-10">
              <div className="-rotate-6">
                <SkillPill icon={<Film className="size-4" />} label="Animation" color="#22c55e" />
              </div>
              <div className="-rotate-3 mr-8">
                <SkillPill icon={<FlaskConical className="size-4" />} label="Prototyping" color="#ec4899" />
              </div>
              <div className="rotate-6 mr-4">
                <SkillPill icon={<Goal className="size-4" />} label="Strategy" color="#f59e0b" />
              </div>
            </div>
          </div>

          {/* Mobile Skills Display */}
          <div className="lg:hidden absolute top-full mt-12 left-1/2 transform -translate-x-1/2 w-full max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <SkillPill icon={<LayoutGrid className="size-4" />} label="Design systems" color="#ff5f26" />
              <SkillPill icon={<PenTool className="size-4" />} label="UI/UX" color="#10b981" />
              <SkillPill icon={<Search className="size-4" />} label="Research" color="#3b82f6" />
              <SkillPill icon={<Film className="size-4" />} label="Animation" color="#22c55e" />
              <SkillPill icon={<FlaskConical className="size-4" />} label="Prototyping" color="#ec4899" />
              <SkillPill icon={<Goal className="size-4" />} label="Strategy" color="#f59e0b" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
