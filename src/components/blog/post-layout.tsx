"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { useScrollProgress } from "@/components/ui/scroll-reveal";
import { formatPostDate, oneLineSize, splitTitle, type BlogPost } from "@/data/blog";
import { EASE } from "@/lib/motion";

const serif = { fontFamily: "var(--font-fraunces), serif" };

export interface PostSection {
  id: string;
  label: string;
}

/** Reading progress: a hairline across the top, driven by the site's layout-free scroll tracker */
const ProgressBar = ({ target }: { target: React.RefObject<HTMLElement | null> }) => {
  const progress = useScrollProgress(target, ["start", 0.2], ["end", 0.9]);
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand"
      style={{ scaleX: progress }}
    />
  );
};

/** Table of contents; the active entry follows the section in view (IntersectionObserver, no scroll math) */
const Toc = ({ sections }: { sections: PostSection[] }) => {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">On this page</span>
      <ol className="space-y-1 border-l border-white/10">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-[14px] leading-snug transition-colors duration-300 ${
                  on ? "border-brand text-white" : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                <span className={`font-mono text-[11px] pt-[3px] ${on ? "text-brand" : "text-white/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/** The heartbeat line under the title: draws itself once, like a monitor coming online */
const HeartbeatLine = () => {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 600 40" className="h-8 w-full max-w-xl text-brand" fill="none" aria-hidden preserveAspectRatio="none">
      <path d="M0 20 H600" stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
      <motion.path
        d="M0 20 H170 L188 20 L200 6 L214 34 L228 10 L240 20 H600"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE.out, delay: 0.35 }}
      />
    </svg>
  );
};

export default function PostLayout({
  post,
  sections,
  children,
}: {
  post: BlogPost;
  sections: PostSection[];
  children: ReactNode;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const title = splitTitle(post.title);
  const navItems = [...sections.map((s) => ({ href: `#${s.id}`, label: s.label, id: s.id })), { href: "#contact", label: "Contact", id: "contact" }];
  const indicator = [{ id: "top", label: "Blog" }, ...sections.map((s) => ({ id: s.id, label: s.label })), { id: "contact", label: "Contact" }];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-white selection:bg-brand selection:text-white">
      <ProgressBar target={articleRef} />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--brand) / 0.07) 0%, transparent 55%)" }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <Navbar backTo="/blog" customNavItems={navItems} customIndicatorSections={indicator} />

      <main className="relative z-10">
        {/* Header */}
        <header id="top" className="container pt-28 md:pt-36">
          <motion.div
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out }}
          >
            <Link href="/blog" className="text-brand hover:text-white transition-colors duration-300">Blog</Link>
            <span className="text-white/25">/</span>
            <span>{post.tags[0]}</span>
            <span className="text-white/25">·</span>
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
            <span className="text-white/25">·</span>
            <span>{post.readingMinutes} min read</span>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-5xl [container-type:inline-size] text-[2.35rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.4rem] font-light tracking-tight text-white"
            style={serif}
            initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE.out, delay: 0.1 }}
          >
            {title.main}
            <span className="text-brand">.</span>
            {title.sub && (
              <span className="mt-2 block whitespace-nowrap leading-[1.2] italic text-white/50" style={{ fontSize: oneLineSize(title.sub, "0.55em") }}>
                {title.sub}
              </span>
            )}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-white/65 font-light"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.out, delay: 0.25 }}
          >
            {post.subtitle}
          </motion.p>

          <div className="mt-6">
            <HeartbeatLine />
          </div>
        </header>

        {/* Cover: opens from a horizontal centre line, the same curtain the case-study images use */}
        <div className="container mt-8 md:mt-12">
          <motion.div
            className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-[20px] md:rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            initial={reduce ? false : { clipPath: "inset(50% 0% 50% 0% round 40px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 40px)" }}
            transition={{ duration: 1.3, ease: EASE.inOut, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.9, ease: EASE.out, delay: 0.3 }}
            >
              <Image src={post.cover} alt={`${title.main} cover`} fill priority sizes="100vw" className="object-cover object-top" />
            </motion.div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 md:pb-32">
          <article ref={articleRef} className="lg:col-span-8 xl:col-span-7 min-w-0">
            {children}

            {/* Author */}
            <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
              <div className="flex items-center gap-4 flex-1">
                <Image src="/assets/ayush-avatar.webp" alt="Ayush Kushwaha" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <span className="block text-[16px] font-medium text-white">Ayush Kushwaha</span>
                  <span className="text-[14px] text-white/55">Product Designer & Full-Stack Engineer</span>
                </div>
              </div>
              {post.project && (
                <Link
                  href={`/work/${post.project}`}
                  className="group inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors duration-300 hover:border-brand hover:bg-brand"
                >
                  View the case study
                  <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </Link>
              )}
            </div>
          </article>

          <aside className="hidden lg:block lg:col-span-4 xl:col-start-9 pt-20">
            <Toc sections={sections} />
          </aside>
        </div>
      </main>

      <Contact title="Need a system like this for your team?" />
    </div>
  );
}
