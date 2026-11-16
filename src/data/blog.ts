// Blog post metadata. Kept apart from the post components so the sitemap, llms.txt and
// structured data can read it without importing any React. Each post's body lives in
// src/content/blog/<slug>.tsx and is registered in src/content/blog/index.ts.

export interface BlogPost {
  slug: string;
  title: string;
  /** One or two sentences: used for the card, meta description and social previews */
  description: string;
  /** Short line under the title on the post page */
  subtitle: string;
  /** YYYY-MM-DD */
  published: string;
  /** YYYY-MM-DD; defaults to `published` */
  updated?: string;
  readingMinutes: number;
  tags: string[];
  /** Hero image at the top of the post */
  cover: string;
  /** Designed card image for the blog index: the social preview at 2× (2400×1260) */
  thumbnail: string;
  /** 1200×630 social preview */
  ogImage: string;
  /** Case study this post is about, if any (its id in src/data/projects.ts) */
  project?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-serveye",
    title: "Building ServEye: one dashboard that watches every server and client site",
    subtitle: "How a 30-second heartbeat, a zero-dependency agent and a lot of restraint turned quiet outages into emails.",
    description:
      "How I designed and built ServEye, a self-hosted monitor for servers and client websites: a zero-dependency agent, reboot and PM2 detection, alerts the team can trust, and a dashboard you read in two seconds.",
    published: "2026-11-17",
    readingMinutes: 8,
    tags: ["Case study", "Monitoring", "Next.js", "Node.js", "DevOps"],
    cover: "/assets/ServEye_1.webp",
    thumbnail: "/assets/blog/building-serveye-card-b.webp",
    ogImage: "/assets/og/blog-building-serveye.jpg",
    project: "serveye",
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

/**
 * Font size that keeps a line of Fraunces italic on ONE line at any width: it scales with the
 * nearest `container-type: inline-size` ancestor (cqw), capped at the design size. Measured in
 * the page: at subtitle sizes (~20-40px) Fraunces' optical sizing makes it ~0.38em per character,
 * so 0.4 leaves a little room.
 */
export const oneLineSize = (text: string, cap: string) => `min(${cap}, ${(100 / (text.length * 0.4)).toFixed(2)}cqw)`;

/** Splits "Main title: the rest" for display as a headline plus a sentence-case second line */
export const splitTitle = (title: string) => {
  const [main, ...rest] = title.split(": ");
  const sub = rest.join(": ");
  return { main, sub: sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : "" };
};

/** "17 Nov 2026" */
export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
