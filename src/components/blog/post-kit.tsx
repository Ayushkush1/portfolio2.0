"use client";
// Building blocks for blog posts. Posts are React components, so a post can mix ordinary prose with
// visual pieces (diagrams, logs, terminals) that plain Markdown can't express. Everything follows
// the site's language: Fraunces headings, mono labels, one orange accent, shared motion settings.
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Copy, Maximize2 } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import ImageLightbox from "@/components/ui/image-lightbox";
import { fadeUp, STAGGER } from "@/lib/motion";

const serif = { fontFamily: "var(--font-fraunces), serif" };

/* ── Text ─────────────────────────────────────────────────────────── */

/** A titled section. `id` feeds the table of contents and the navbar's section indicator. */
export const Section = ({ id, title, children }: { id: string; title: ReactNode; children: ReactNode }) => (
  <section id={id} className="scroll-mt-28 pt-14 md:pt-20">
    <motion.h2
      className="mb-6 md:mb-8 text-[1.9rem] leading-[1.15] md:text-[2.6rem] font-light tracking-tight text-white"
      style={serif}
      {...fadeUp()}
    >
      {title}
    </motion.h2>
    <div className="space-y-6">{children}</div>
  </section>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[17px] md:text-[18px] leading-[1.8] text-white/75 font-light">{children}</p>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="text-[20px] md:text-[24px] leading-[1.6] text-white/85 font-light" style={serif}>
    {children}
  </p>
);

/** Inline code */
export const C = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-white/90">{children}</code>
);

export const Strong = ({ children }: { children: ReactNode }) => <strong className="font-medium text-white">{children}</strong>;

/** A highlighted aside: a lesson, a gotcha, a note */
export const Callout = ({ label, children }: { label: string; children: ReactNode }) => (
  <motion.aside
    className="relative rounded-2xl border border-white/10 bg-white/[0.03] py-5 pl-6 pr-5 md:py-6 md:pl-8 md:pr-7"
    {...fadeUp()}
  >
    <span aria-hidden className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-brand" />
    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-brand">{label}</span>
    <div className="text-[16px] md:text-[17px] leading-[1.75] text-white/80 font-light">{children}</div>
  </motion.aside>
);

/** Bulleted list with brand markers */
export const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="relative pl-6 text-[17px] md:text-[18px] leading-[1.75] text-white/75 font-light">
        <span aria-hidden className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-brand" />
        {item}
      </li>
    ))}
  </ul>
);

/* ── Numbers ──────────────────────────────────────────────────────── */

export const StatStrip = ({ stats }: { stats: { value: string; label: string }[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
    {stats.map((s, i) => (
      <motion.div key={s.label} className="bg-background p-5 md:p-6" {...fadeUp(i * STAGGER)}>
        <div className="text-[2.1rem] md:text-[2.6rem] font-light leading-none tracking-tight text-white" style={serif}>
          {s.value}
        </div>
        <div className="mt-3 font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-white/55">{s.label}</div>
      </motion.div>
    ))}
  </div>
);

/* ── Code ─────────────────────────────────────────────────────────── */

const KEYWORDS =
  /\b(const|let|var|function|return|if|else|await|async|export|import|from|new|for|of|try|catch|finally|typeof|true|false|null|undefined|void|sudo|curl|bash)\b/;

// A deliberately tiny highlighter: comments, strings, keywords and numbers are all a post needs,
// and it saves shipping a syntax-highlighting library to every reader.
function highlight(line: string, lang: string) {
  // Line comments, plus /* … */ block comments that open and close on the same line
  const comment = lang === "bash" ? "#.*$" : "\\/\\/.*$|\\/\\*.*?\\*\\/";
  const re = new RegExp(
    `(${comment})|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|${KEYWORDS.source}|\\b(\\d[\\d_.]*)\\b`,
    "g",
  );
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1] ? "text-white/35 italic" : m[2] ? "text-emerald-300/90" : m[3] ? "text-brand" : "text-sky-300/90";
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label={copied ? "Copied" : "Copy code"}
      className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

/** Code block with a file name, light highlighting and a copy button */
export const Code = ({ code, title, lang = "ts", note }: { code: string; title: string; lang?: "ts" | "js" | "bash"; note?: string }) => {
  const text = code.trim();
  return (
    <motion.figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f17]" {...fadeUp()}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 pl-5 pr-2">
        <span className="truncate font-mono text-[12px] text-white/55">{title}</span>
        <CopyButton text={text} />
      </figcaption>
      {/* No data-lenis-prevent: these blocks only scroll sideways, so vertical wheel must keep moving the page.
          Lenis (vertical gestures only) already leaves purely sideways swipes to the browser. */}
      <pre className="overflow-x-auto px-5 py-4 text-[13px] md:text-[13.5px] leading-[1.75]">
        <code className="font-mono text-white/85">
          {text.split("\n").map((line, i) => (
            <span key={i} className="block min-h-[1.75em] whitespace-pre">
              {highlight(line, lang)}
            </span>
          ))}
        </code>
      </pre>
      {note && <p className="border-t border-white/10 px-5 py-3 text-[13px] text-white/50">{note}</p>}
    </motion.figure>
  );
};

/** A one-line shell command, styled as a terminal */
export const Terminal = ({ command, caption }: { command: string; caption?: string }) => (
  <motion.figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f17]" {...fadeUp()}>
    <div className="flex items-center justify-between border-b border-white/10 py-1.5 pl-4 pr-2">
      <span aria-hidden className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <CopyButton text={command} />
    </div>
    <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] md:text-[14px] leading-relaxed text-white/90">
      <span className="select-none text-brand">$ </span>
      {highlight(command, "bash")}
    </pre>
    {caption && <figcaption className="border-t border-white/10 px-5 py-3 text-[13px] text-white/50">{caption}</figcaption>}
  </motion.figure>
);

/* ── Media ────────────────────────────────────────────────────────── */

/** Screenshot that opens full size, with a caption */
export const Figure = ({ src, alt, caption }: { src: string; alt: string; caption?: ReactNode }) => (
  <motion.figure {...fadeUp()}>
    <ImageLightbox src={src} alt={alt}>
      <button
        type="button"
        aria-label={`Open full size: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
      >
        <Image src={src} alt={alt} width={1560} height={908} sizes="(max-width: 1024px) 100vw, 760px" className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
    </ImageLightbox>
    {caption && <figcaption className="mt-3 text-[14px] leading-relaxed text-white/50">{caption}</figcaption>}
  </motion.figure>
);

/* ── Diagrams & product echoes ────────────────────────────────────── */

/**
 * The system in one picture: servers send a heartbeat to the dashboard, the dashboard emails the team.
 * The travelling pulses are CSS transform animations (composited, no layout), paused while off screen.
 */
export const HeartbeatDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const running = inView && !reduce;

  const nodes = [
    { kicker: "On every server", title: "Agent", body: "Zero-dependency Node.js, runs as a systemd service. Reads /proc, PM2 and systemd." },
    { kicker: "One place", title: "Dashboard", body: "Next.js 16 and PostgreSQL. Stores metrics, checks websites, decides what counts as an incident." },
    { kicker: "Your team", title: "Inbox", body: "One email when something breaks, another when it recovers, with the total downtime." },
  ];
  const links = ["heartbeat · 30s", "email alerts"];

  return (
    <motion.div ref={ref} className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-8" {...fadeUp()}>
      <div className="flex flex-col md:flex-row md:items-stretch gap-0">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            <div className="flex-1 rounded-2xl border border-white/10 bg-background p-5">
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">{n.kicker}</span>
              <span className="mt-2 block text-[1.6rem] font-light leading-none text-white" style={serif}>
                {n.title}
                {i === 1 && <span className="text-brand">.</span>}
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{n.body}</p>
            </div>
            {i < links.length && (
              <div className="relative flex shrink-0 items-center justify-center py-3 md:w-24 md:py-0" aria-hidden>
                {/* the wire */}
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10 md:left-0 md:top-1/2 md:h-px md:w-full md:translate-x-0 md:-translate-y-1/2" />
                {/* the pulse travelling along it */}
                <span className="absolute inset-0 overflow-hidden">
                  <span
                    className="blog-pulse absolute left-1/2 top-0 h-6 w-[3px] -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_hsl(var(--brand))] md:left-0 md:top-1/2 md:h-[3px] md:w-6 md:translate-x-0 md:-translate-y-1/2"
                    style={{ animationPlayState: running ? "running" : "paused", animationDelay: `${i * 0.6}s` }}
                  />
                </span>
                <span className="relative whitespace-nowrap rounded-full border border-white/10 bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/55">
                  {links[i]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-white/45">
        Websites are checked from the dashboard itself: status code, optional required text, response time, and the SSL certificate&apos;s expiry date.
      </p>
    </motion.div>
  );
};

/** What ServEye watches, and how it knows */
export const EventGrid = ({ items }: { items: { event: string; how: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
    {items.map((it, i) => (
      <motion.div key={it.event} className="bg-background p-5" {...fadeUp((i % 2) * STAGGER)}>
        <span className="block text-[15px] font-medium text-white">{it.event}</span>
        <span className="mt-1.5 block text-[14px] leading-relaxed text-white/55">{it.how}</span>
      </motion.div>
    ))}
  </div>
);

/** An echo of ServEye's own "Recent problems" card: fixed incidents, struck through */
export const IncidentLog = ({ items, fixed, total }: { items: { title: string; meta: string }[]; fixed: number; total: number }) => (
  <motion.div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1426]" {...fadeUp()}>
    <div className="flex items-start justify-between px-5 pt-5 md:px-6 md:pt-6">
      <div>
        <span className="block text-[15px] font-medium text-white">Recent problems</span>
        <span className="text-[13px] text-white/50">All clear</span>
      </div>
      <div className="text-right">
        <span className="text-[2rem] font-light leading-none text-white" style={serif}>
          {fixed}
          <span className="text-white/40">/{total}</span>
        </span>
        <span className="block text-[11px] text-white/45">fixed</span>
      </div>
    </div>
    <ul className="mt-4 divide-y divide-white/[0.06]">
      {items.map((it, i) => (
        <motion.li key={i} className="flex items-center gap-3 px-5 py-3.5 md:px-6" {...fadeUp(i * STAGGER)}>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] text-white/55 line-through decoration-white/30">{it.title}</span>
            <span className="text-[12px] text-white/40">{it.meta}</span>
          </span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
