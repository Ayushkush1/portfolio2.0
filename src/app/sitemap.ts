import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { caseStudies } from '@/data/projects'
import { SITE_UPDATED, SITE_URL } from '@/lib/seo'

// lastModified uses real content dates (SITE_UPDATED, or a case study's own `updated`), never the
// build time: a date that changes on every deploy teaches Google to ignore lastmod entirely.
export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = caseStudies.map((project) => ({
    url: `${SITE_URL}/work/${project.id}`,
    lastModified: project.updated ?? SITE_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
    {
      url: `${SITE_URL}/blog`,
      // The blog index changes whenever a post is published or updated
      lastModified: blogPosts.map((p) => p.updated ?? p.published).sort().at(-1) ?? SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated ?? post.published,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
