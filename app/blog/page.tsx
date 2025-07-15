import { getAllPosts } from '@/lib/mdx'
import BlogList from '@/components/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Isabel Moreno',
  description: 'Artículos técnicos sobre desarrollo web, diseño y tecnología',
}

export default function BlogPage() {
  const posts = getAllPosts()
  
  return <BlogList posts={posts} />
}