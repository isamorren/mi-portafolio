import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  prev?: string
  next?: string
  slug: string
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrismPlus, { defaultLanguage: 'js' }]],
    },
  })

  return {
    slug: realSlug,
    frontmatter: {
      ...data,
      slug: realSlug,
    } as PostMeta,
    mdxSource,
  }
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory)
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        ...data,
        slug,
      } as PostMeta
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export function getPostSlugs() {
  const files = fs.readdirSync(postsDirectory)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}