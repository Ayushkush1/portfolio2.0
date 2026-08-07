"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  useEffect(() => {
    let lenisInstance: any;
    
    const initSmoothScroll = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);
      
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    };

    initSmoothScroll();

    return () => {
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
