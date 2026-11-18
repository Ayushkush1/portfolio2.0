import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostLayout from "@/components/blog/post-layout";
import { postContent } from "@/content/blog";
import { blogPosts, getPost } from "@/data/blog";
import { JsonLd, breadcrumbJsonLd, PERSON_ID, SITE_URL, toSchemaDateTime } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

// Only the posts that exist are pages; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPost((await params).slug);
    if (!post) return { title: "Not Found" };
    const title = `${post.title} | Ayush Kushwaha`;
    const image = `${SITE_URL}${post.ogImage}`;
    return {
        title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        authors: [{ name: "Ayush Kushwaha", url: SITE_URL }],
        keywords: post.tags,
        openGraph: {
            type: "article",
            title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}`,
            publishedTime: post.published,
            modifiedTime: post.updated ?? post.published,
            authors: [SITE_URL],
            tags: post.tags,
            images: [{ url: image, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: post.description,
            creator: "@kushwaha_ayush",
            images: [image],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    const body = postContent[slug];
    if (!post || !body) notFound();

    const url = `${SITE_URL}/blog/${post.slug}`;
    // BlogPosting is the article type Google uses for blog posts (rich results, Discover, Top stories)
    const postingJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        image: [`${SITE_URL}${post.ogImage}`, `${SITE_URL}${post.cover}`],
        datePublished: toSchemaDateTime(post.published),
        dateModified: toSchemaDateTime(post.updated ?? post.published),
        inLanguage: "en",
        keywords: post.tags.join(", "),
        timeRequired: `PT${post.readingMinutes}M`,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        ...(post.project && { about: { "@id": `${SITE_URL}/work/${post.project}#work` } }),
    };

    const { Content, sections } = body;
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: post.title.split(": ")[0], path: `/blog/${post.slug}` },
            ])} />
            <JsonLd data={postingJsonLd} />
            <PostLayout post={post} sections={sections}>
                <Content />
            </PostLayout>
        </>
    );
}
