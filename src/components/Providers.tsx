"use client";

import { useEffect } from "react";
import { MotionConfig, frame, cancelFrame } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenisInstance: any;
    let lenisStep: ((data: { timestamp: number }) => void) | null = null;

    const initSmoothScroll = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Touch screens keep native scrolling (Lenis doesn't smooth touch anyway): its native-scroll
      // listener would only add a forced layout to every scroll event on phones
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const Lenis = (await import("@studio-freight/lenis")).default;

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

      // Drive Lenis from Framer Motion's frame loop, in the "update" step — before any
      // render-step style writes. Scrolling with clean styles avoids a forced reflow inside
      // Lenis's scrollTo every frame (the main remaining source of scroll micro-stutter).
      // Scroll-linked effects read the scroll position through the shared tracker in
      // ui/scroll-reveal (no GSAP ScrollTrigger: it re-measured the page on every scroll).
      lenisStep = ({ timestamp }) => lenisInstance.raf(timestamp);
      frame.update(lenisStep, true);
    };

    initSmoothScroll();

    return () => {
      if (lenisStep) cancelFrame(lenisStep);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    // Honour the OS "reduce motion" setting for every Framer Motion animation
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
