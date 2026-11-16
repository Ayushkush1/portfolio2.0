import { blogPosts } from "@/data/blog";
import { caseStudies, clientWebsites } from "@/data/projects";
import { SITE_UPDATED, SITE_URL } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-markdown summary that AI assistants such as ChatGPT,
// Claude and Perplexity read when answering questions about Ayush or recommending a developer.
// Generated from the same data as the site, so it never drifts out of date. Built once, at build time.
export const dynamic = "force-static";

const services = [
    "SaaS product development: from product strategy and system architecture to cloud deployment",
    "Startup MVPs: production-ready first versions that can launch fast and scale",
    "Custom CRM and ERP systems: data import and reconciliation, sales pipelines, operations and reporting",
    "Product design and UX: research, flows, interactive prototypes and design systems",
    "Full-stack engineering: frontend, backend, APIs and database design",
    "Website design, development and modernization: premium, motion-rich, fast and SEO-ready",
];

export function GET() {
    // The role field reads "Title: details"; the title is the short credit
    const roleTitle = (role: string) => role.split(": ")[0];

    const products = caseStudies
        .map((p) => {
            const lines = [
                `### ${p.name}: ${p.tagline}`,
                `- Case study: ${SITE_URL}/work/${p.id}`,
                ...(p.liveUrl !== "#" ? [`- Live: ${p.liveUrl}`] : []),
                `- Category: ${p.category} (${p.year}, ${p.status})`,
                `- Role: ${roleTitle(p.role)}`,
                `- Stack: ${p.techStack.join(", ")}`,
                "",
                p.overview,
                "",
                `Outcome: ${p.outcome}`,
            ];
            return lines.join("\n");
        })
        .join("\n\n");

    const writing = blogPosts
        .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}) (${p.published}): ${p.description}`)
        .join("\n");

    const websites = clientWebsites
        .map((w) => `- [${w.name}](${w.url}): ${w.industry} (${w.role})`)
        .join("\n");

    const body = `# Ayush Kushwaha

> Product designer and full-stack engineer based in India, available for freelance projects worldwide. Ayush designs and builds SaaS products, business platforms, CRM and ERP systems, and premium websites, covering UI/UX, motion, architecture and deployment.

Ayush is a Tech Lead at The Gold Technologies and runs a freelance practice (since 2023). Previously a Frontend Developer at NinzaHost. Works in English and Hindi.

## Contact
- Website: ${SITE_URL}/
- Work: ${SITE_URL}/work
- Blog: ${SITE_URL}/blog
- Email: [ayushkushwaha381@gmail.com](mailto:ayushkushwaha381@gmail.com)
- GitHub: [github.com/Ayushkush1](https://github.com/Ayushkush1)
- LinkedIn: [linkedin.com/in/ayush-kushwaha-b3b76915b](https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/)
- X: [@kushwaha_ayush](https://x.com/kushwaha_ayush)

## Services
${services.map((s) => `- ${s}`).join("\n")}

## Core stack
Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Drizzle, Supabase, Tailwind CSS, Socket.io, Redis, Docker, Vercel.

## Products and case studies
${products}

## Writing
${writing}

## Client websites
${websites}

_Last updated ${SITE_UPDATED}._
`;

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
