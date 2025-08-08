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

          {/* Right column: focus areas */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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
            <Card className="border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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
            <Card className="border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 sm:col-span-2">
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
    </section>
  );
};

export default About;
