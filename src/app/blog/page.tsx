import { Metadata } from 'next';
import BlogIndex from "@/components/blog/blog-index";
import { blogPosts } from "@/data/blog";
import { JsonLd, breadcrumbJsonLd, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

const description =
  "Build stories and engineering notes from the products I design and ship: architecture, UX decisions and the details that made them work.";

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: "Blog | Ayush Kushwaha",
  description,
  openGraph: {
    title: "Blog | Ayush Kushwaha",
    description,
    url: "https://ayushkushwaha.com/blog",
    images: [
      {
        url: `https://ayushkushwaha.com${blogPosts[0]?.ogImage ?? "/assets/og-image.jpg"}`,
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ayush Kushwaha",
    description,
    images: [`https://ayushkushwaha.com${blogPosts[0]?.ogImage ?? "/assets/og-image.jpg"}`],
  }
};

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Ayush Kushwaha's blog",
    description,
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}#post`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ])} />
      <JsonLd data={blogJsonLd} />
      <BlogIndex />
    </>
  );
}
