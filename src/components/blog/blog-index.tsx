"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { CurtainReveal } from "@/components/ui/scroll-reveal";
import { blogPosts, formatPostDate, oneLineSize, splitTitle, type BlogPost } from "@/data/blog";
import { EASE, fadeUp } from "@/lib/motion";

const serif = { fontFamily: "var(--font-fraunces), serif" };

const indicator = [
  { id: "posts", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const Meta = ({ post }: { post: BlogPost }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
    <time dateTime={post.published}>{formatPostDate(post.published)}</time>
    <span className="text-white/25">·</span>
    <span>{post.readingMinutes} min read</span>
  </div>
);

/** The newest post, shown large: cover opens like the site's case-study cards */
const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    data-cursor="Read"
    data-cursor-ring={`${post.title.split(": ")[0]} · ${post.readingMinutes} min`}
    className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center md:cursor-none"
  >
    {/* Same proportions as the designed thumbnail (1200×630), so nothing of it is cropped */}
    <CurtainReveal className="relative lg:col-span-7 aspect-[40/21] overflow-hidden rounded-[20px] md:rounded-[2rem] border border-white/10 bg-white/5 [--card-radius:20px] md:[--card-radius:32px]">
      <Image
        src={post.thumbnail}
        alt={`${splitTitle(post.title).main}: ${splitTitle(post.title).sub}`}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </CurtainReveal>
    <motion.div className="lg:col-span-5" {...fadeUp(0.1)}>
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        Latest
      </span>
      <Meta post={post} />
      <h2 className="mt-4 [container-type:inline-size] text-[1.9rem] leading-[1.12] md:text-[2.6rem] font-light tracking-tight text-white" style={serif}>
        {splitTitle(post.title).main}
        <span className="text-brand">.</span>
        <span
          className="mt-2 block whitespace-nowrap leading-snug italic text-white/50"
          style={{ fontSize: oneLineSize(splitTitle(post.title).sub, "0.62em") }}
        >
          {splitTitle(post.title).sub}
        </span>
      </h2>
      <p className="mt-5 text-[16px] md:text-[17px] leading-relaxed text-white/65 font-light">{post.description}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70">{t}</span>
        ))}
      </div>
      <span className="mt-8 inline-flex items-center gap-3 text-[15px] text-white">
        Read the story
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-brand group-hover:bg-brand">
          <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </span>
    </motion.div>
  </Link>
);

/** Older posts: a ruled list in the style of the client-websites rows */
const PostRow = ({ post, index }: { post: BlogPost; index: number }) => (
  <motion.li {...fadeUp(index * 0.05)}>
    <Link
      href={`/blog/${post.slug}`}
      className="group/row relative grid grid-cols-1 md:grid-cols-[72px_1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-white/10 py-8"
    >
      <span className="hidden md:block font-mono text-xs text-brand/60 group-hover/row:text-brand">{String(index + 2).padStart(2, "0")}</span>
      <span>
        <span className="block text-[1.6rem] md:text-[2rem] font-light leading-tight text-gray-300 group-hover/row:text-white transition-colors duration-500" style={serif}>
          {post.title.split(": ")[0]}
        </span>
        <span className="mt-2 block text-[15px] text-white/55">{post.description}</span>
      </span>
      <Meta post={post} />
    </Link>
  </motion.li>
);

export default function BlogIndex() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = blogPosts;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--brand) / 0.05) 0%, transparent 50%)" }}
      />
      <Navbar backTo="/" customIndicatorSections={indicator} />

      <main id="posts" className="container relative z-10 pt-28 md:pt-36 pb-20 md:pb-28">
        <header className="mb-14 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.h1
            className="text-display md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white"
            style={serif}
            initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE.out }}
          >
            Notes from <br />
            <span className="italic text-gray-400">
              the build<span className="text-brand">.</span>
            </span>
          </motion.h1>
          <motion.p
            className="max-w-sm text-[16px] leading-relaxed text-white/60 font-light"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
          >
            How the products on this site were designed and built: architecture, UX decisions, and the details that made them work.
          </motion.p>
        </header>

        {featured && <FeaturedPost post={featured} />}

        {rest.length > 0 && (
          <ol className="mt-20 md:mt-28 border-t border-white/10">
            {rest.map((post, i) => (
              <PostRow key={post.slug} post={post} index={i} />
            ))}
          </ol>
        )}
      </main>

      <Contact title="Let's Talk" description="Have a topic you want me to write about?" />
    </div>
  );
}
