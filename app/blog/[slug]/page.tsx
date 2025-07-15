import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import BlogPost from '@/components/BlogPost'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug(params.slug)
  
  return {
    title: `${frontmatter.title} | Isabel Moreno`,
    description: frontmatter.excerpt,
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { frontmatter, mdxSource } = await getPostBySlug(params.slug)

  return <BlogPost frontmatter={frontmatter} mdxSource={mdxSource} />
}