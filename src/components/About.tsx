import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Layout, Palette, PanelsTopLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" aria-label="About Dominic – UI/UX Designer" className="relative border-t border-border/60">
      {/* Ambient brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 50% at 10% 20%, hsl(var(--brand)/0.12) 0%, transparent 60%)" }}
      />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Left column: intro */}
          <article className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-xs text-muted-foreground">About me</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              About Dominic – UI/UX Designer crafting thoughtful brands
            </h2>
            <p className="text-muted-foreground">
              I blend brand strategy with interface design to create cohesive, accessible products. From early research and
              wireframes to polished interfaces and design systems, I help teams ship experiences that feel effortless.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Brand Strategy</Badge>
              <Badge variant="secondary">UI/UX</Badge>
              <Badge variant="secondary">Design Systems</Badge>
              <Badge variant="secondary">Prototyping</Badge>
              <Badge variant="secondary">Accessibility</Badge>
            </div>
            <div className="pt-4">
              <Button variant="hero" size="lg" className="group">
                Get in touch
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Hero portrait – bolder & aesthetic */}
            <figure className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 sm:col-span-2 shadow-[var(--shadow-elevate)] backdrop-blur supports-[backdrop-filter]:bg-background/40 animate-enter">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]" style={{ background: "radial-gradient(80% 60% at 50% 0%, hsl(var(--brand)/0.22) 0%, transparent 60%)" }} />
              <img
                src="/lovable-uploads/78ad0bb8-e628-470a-8f21-94e2354f95fe.png"
                alt="Professional portrait of Dominic – UI/UX Designer"
                loading="lazy"
                className="h-[360px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />Dominic — UI/UX Designer
              </figcaption>
            </figure>

            {/* Gradient framed cards */}
            <div className="rounded-xl p-[1px] bg-[linear-gradient(135deg,hsl(var(--brand)/.45),hsl(var(--primary)/.3),transparent)] hover-scale animate-fade-in">
              <Card className="border-transparent bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette className="h-5 w-5 text-foreground/70" />
                    Brand Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Visual identity, art direction, and brand systems that scale across touchpoints.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl p-[1px] bg-[linear-gradient(135deg,hsl(var(--primary)/.35),hsl(var(--brand)/.4),transparent)] hover-scale animate-fade-in">
              <Card className="border-transparent bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layout className="h-5 w-5 text-foreground/70" />
                    Product UX/UI
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Research, flows, and interfaces focused on clarity, conversion, and delight.
                </CardContent>
              </Card>
            </div>

            <div className="sm:col-span-2 rounded-xl p-[1px] bg-[linear-gradient(135deg,hsl(var(--brand)/.45),hsl(var(--primary)/.35),transparent)] hover-scale animate-fade-in">
              <Card className="border-transparent bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PanelsTopLeft className="h-5 w-5 text-foreground/70" />
                    Design Systems
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Documented components, tokens, and guidelines that keep teams moving fast and consistently.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
