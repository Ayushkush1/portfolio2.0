"use client";
import React, { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';
import { LayoutGrid, PenTool, Search, Film, FlaskConical, Goal } from 'lucide-react';

/* ─── pill data ─────────────────────────────────────────────── */
const PILLS = [
  { icon: <LayoutGrid size={16} />, label: 'Design systems',  color: '#ff5f26', rotate:  6 },
  { icon: <PenTool    size={16} />, label: 'SaaS Builder',    color: '#10b981', rotate:  3 },
  { icon: <Search     size={16} />, label: 'Research',        color: '#3b82f6', rotate: -6 },
  { icon: <Film       size={16} />, label: 'Animation',       color: '#22c55e', rotate: -6 },
  { icon: <FlaskConical size={16} />, label: 'Prototyping',   color: '#ec4899', rotate: -3 },
  { icon: <Goal       size={16} />, label: 'Strategy',        color: '#f59e0b', rotate:  6 },
];

/* ─── static pill visual (no framer-motion) ─────────────────── */
const PillVisual: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ icon, label, color }) => (
  <div className="rounded-full px-2 py-1.5 pr-4 flex items-center gap-2 bg-white/90 backdrop-blur text-sm text-gray-900 shadow-lg border border-white/20 whitespace-nowrap select-none cursor-pointer">
    <span
      className="inline-flex items-center justify-center rounded-full size-8 flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-white">{icon}</span>
    </span>
    <span className="font-medium">{label}</span>
  </div>
);

/* ─── layout metadata for the six pills ─────────────────────── */
// Each entry: which side, CSS offsets inside the container, initial CSS rotate class
const LAYOUT: {
  side: 'left' | 'right';
  offsetClass: string;   // extra margin to match the original stagger
}[] = [
  { side: 'left',  offsetClass: ''       },   // 0 – rotate-6
  { side: 'left',  offsetClass: 'ml-8'   },   // 1 – rotate-3 ml-8
  { side: 'left',  offsetClass: 'ml-4'   },   // 2 – -rotate-6 ml-4
  { side: 'right', offsetClass: ''       },   // 3 – -rotate-6
  { side: 'right', offsetClass: 'mr-8'   },   // 4 – -rotate-3 mr-8
  { side: 'right', offsetClass: 'mr-4'   },   // 5 – rotate-6 mr-4
];

/* ─── main component ─────────────────────────────────────────── */
const FallingPillsArea: React.FC = () => {
  const containerRef        = useRef<HTMLDivElement>(null);
  const staticPillRefs      = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null));
  const physicsPillRefs     = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null));
  const canvasContainerRef  = useRef<HTMLDivElement>(null);
  const animFrameRef        = useRef<number>(0);

  const [started, setStarted] = useState(false);
  const startedRef = useRef(false); // ref for use inside event handlers

  const trigger = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
  };

  /* ── auto-fall when scrolled into view ─────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold: 0.75 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── physics engine ────────────────────────────────────────── */
  useEffect(() => {
    if (!started) return;
    if (!containerRef.current || !canvasContainerRef.current) return;

    const {
      Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint,
    } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const W = containerRect.width;
    const H = containerRect.height;
    if (W <= 0 || H <= 0) return;

    /* engine */
    const engine = Engine.create();
    engine.world.gravity.y = 0.9;

    /* invisible renderer (just drives the loop – canvas is hidden) */
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: { width: W, height: H, background: 'transparent', wireframes: false },
    });

    /* boundaries */
    const wall = { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 } };
    const floor     = Bodies.rectangle(W / 2, H + 25, W, 50, wall);
    const leftWall  = Bodies.rectangle(-25,   H / 2,  50, H, wall);
    const rightWall = Bodies.rectangle(W + 25, H / 2, 50, H, wall);

    /* one physics body per pill, seeded from the DOM rect */
    const pillBodies: Matter.Body[] = [];
    staticPillRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = r.left - containerRect.left + r.width  / 2;
      const y = r.top  - containerRect.top  + r.height / 2;

      const body = Bodies.rectangle(x, y, r.width, r.height, {
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 },
        restitution: 0.45,
        frictionAir: 0.018,
        friction: 0.25,
        angle: (PILLS[i].rotate * Math.PI) / 180,
      });

      /* small random horizontal nudge so they don't all fall straight down */
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: -(Math.random() * 1.5) });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      pillBodies.push(body);
    });

    /* mouse drag */
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.85, render: { visible: false } },
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, mouseConstraint, ...pillBodies]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    /* sync DOM elements to physics bodies each frame */
    const loop = () => {
      pillBodies.forEach((body, i) => {
        const el = physicsPillRefs.current[i];
        if (el) {
          el.style.left      = `${body.position.x}px`;
          el.style.top       = `${body.position.y}px`;
          el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        }
      });
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current?.contains(render.canvas)) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [started]);

  /* ── render ────────────────────────────────────────────────── */
  return (
    /*
     * Container extends ~70px on each side so it covers the pills that
     * sit at  -left-14 / -right-14  (= 56 px) outside the parent.
     * It is tall enough for the pills to fall and pile up.
     */
    <div
      ref={containerRef}
      className="hidden lg:block absolute overflow-visible"
      style={{ left: '-70px', right: '-70px', top: 0, height: '620px', zIndex: 10 }}
      onMouseMove={trigger}
    >
      {/* ── static layout (visible before physics) ─────────────── */}
      <div className={started ? 'invisible pointer-events-none' : ''}>
        {/* left column */}
        <div className="absolute top-24 flex flex-col gap-10" style={{ left: '14px' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              ref={el => { staticPillRefs.current[i] = el; }}
              className={LAYOUT[i].offsetClass}
              style={{ transform: `rotate(${PILLS[i].rotate}deg)` }}
            >
              <PillVisual {...PILLS[i]} />
            </div>
          ))}
        </div>

        {/* right column */}
        <div className="absolute top-24 flex flex-col gap-10" style={{ right: '14px' }}>
          {[3, 4, 5].map(i => (
            <div
              key={i}
              ref={el => { staticPillRefs.current[i] = el; }}
              className={LAYOUT[i].offsetClass}
              style={{ transform: `rotate(${PILLS[i].rotate}deg)` }}
            >
              <PillVisual {...PILLS[i]} />
            </div>
          ))}
        </div>
      </div>

      {/* ── physics-driven pill DOM clones ─────────────────────── */}
      {started && PILLS.map((pill, i) => (
        <div
          key={i}
          ref={el => { physicsPillRefs.current[i] = el; }}
          className="absolute"
          style={{ left: 0, top: 0, pointerEvents: 'none' }}
        >
          <PillVisual {...pill} />
        </div>
      ))}

      {/* ── invisible physics canvas (provides the render loop) ── */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default FallingPillsArea;

