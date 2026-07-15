import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    lang: z.enum(['zh', 'en']).optional(),
    translationId: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: ['*.yaml', '*.yml'], base: 'src/data/projects' }),
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    repo: z.string(),
    homepage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    stars: z.number().optional(),
    forks: z.number().optional(),
    license: z.string().optional(),
    icon: z.string().optional(),
    links: z.array(z.string()).optional(),
  }),
});

const adopterCollection = defineCollection({
  loader: glob({ pattern: ['*.yaml', '*.yml'], base: 'src/data/adopters' }),
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    logo: z.string(),
    subtitle: z.string(),
    subtitleEn: z.string().optional(),
    tags: z.array(z.string()).optional(),
    tagsEn: z.array(z.string()).optional(),
    scenario: z.string(),
    scenarioEn: z.string().optional(),
    delivery: z.string(),
    deliveryEn: z.string().optional(),
    outcome: z.string(),
    outcomeEn: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
  adopter: adopterCollection,
};
