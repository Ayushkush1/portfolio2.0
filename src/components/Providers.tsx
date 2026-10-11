"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, frame, cancelFrame } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let lenisInstance: any;
    let lenisStep: ((data: { timestamp: number }) => void) | null = null;
    
    const initSmoothScroll = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const Lenis = (await import("@studio-freight/lenis")).default;
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);
      
      lenisInstance = new Lenis({
        // Distance-based smoothing (like adam-ewa.pl): the page glides toward the target
        // with continuous momentum, so scroll-scrubbed reveals flow between sections
        lerp: 0.1,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);

      // Drive Lenis from Framer Motion's frame loop, in the "update" step — before any
      // render-step style writes. Scrolling with clean styles avoids a forced reflow inside
      // Lenis's scrollTo every frame (the main remaining source of scroll micro-stutter).
      lenisStep = ({ timestamp }) => lenisInstance.raf(timestamp);
      frame.update(lenisStep, true);
      gsap.ticker.lagSmoothing(0);
    };

    initSmoothScroll();

    return () => {
      if (lenisStep) cancelFrame(lenisStep);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on route change since Next.js does soft navigation
    const timeout = setTimeout(async () => {
      try {
        const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
        ScrollTrigger.refresh();
      } catch (e) {
        // ignore
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    // Honour the OS "reduce motion" setting for every Framer Motion animation
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
