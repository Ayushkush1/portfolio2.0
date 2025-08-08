import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section aria-label="Hero – UI/UX Designer" className="relative overflow-hidden">
      {/* Ambient brand light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 40%, hsl(var(--brand) / 0.25) 0%, transparent 60%)",
        }}
      />

      <header className="container relative z-10 flex items-center justify-between py-6">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/40"
          aria-label="Dominic home"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-brand" />
          <span className="text-sm font-medium">Dominic</span>
        </a>
        <button
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <div className="container relative z-10 grid min-h-[80vh] grid-cols-1 items-center gap-10 py-8 md:grid-cols-2">
        {/* Left copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="text-xs text-muted-foreground">Available for Work</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Brand & UI/UX Designer based in London
          </h1>
        </div>

        {/* Right side - portrait and bio */}
        <div className="flex flex-col items-start justify-center gap-6 md:items-end">
          <p className="max-w-sm text-sm text-muted-foreground md:text-right">
            Hi, I’m Dominic Wagner — a UI/UX and brand designer passionate about
            creating seamless digital experiences that connect and convert.
          </p>
          <Button variant="hero" size="lg" className="group">
            See my works
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Portrait */}
        <div className="pointer-events-none absolute right-0 top-20 hidden max-w-[520px] md:block">
          <img
            src="/lovable-uploads/c92ecd03-1561-4fbe-afc1-fe27e3e9fdbe.png"
            alt="UI/UX designer hero portrait with orange accent glasses"
            loading="lazy"
            className="h-auto w-[520px] rounded-xl object-cover shadow-[var(--shadow-elevate)]"
          />
        </div>

        {/* Oversized name */}
        <div className="pointer-events-none absolute bottom-[-1rem] left-0 w-full select-none text-[22vw] sm:text-[20vw] md:text-[16vw] leading-none font-extrabold tracking-tight text-foreground/5">
          Dominic
        </div>
      </div>
    </section>
  );
};

export default Hero;
