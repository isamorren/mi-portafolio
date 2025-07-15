import BlogList from '@/components/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Isabel Moreno',
  description: 'Artículos técnicos sobre desarrollo web, diseño y tecnología',
}

// Definir manualmente los posts ya que ahora son páginas MDX
const posts = [
  {
    title: "Introducción a Next.js 14: El futuro del desarrollo web",
    date: "2025-01-15",
    excerpt: "Descubre las nuevas características de Next.js 14 y cómo pueden mejorar tu flujo de desarrollo con el App Router, Server Components y más.",
    tags: ["Next.js", "React", "Web Development"],
    slug: "introduccion-nextjs-14"
  },
  {
    title: "Optimización de rendimiento en React: Técnicas avanzadas",
    date: "2025-01-10",
    excerpt: "Aprende técnicas avanzadas para optimizar el rendimiento de tus aplicaciones React, desde memoización hasta lazy loading y code splitting.",
    tags: ["React", "Performance", "JavaScript"],
    slug: "optimizacion-rendimiento-react"
  },
  {
    title: "TypeScript: Mejores prácticas y patrones avanzados",
    date: "2025-01-05",
    excerpt: "Domina TypeScript con estas mejores prácticas y patrones avanzados que mejorarán la calidad y mantenibilidad de tu código.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    slug: "typescript-mejores-practicas"
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function BlogPage() {
  return <BlogList posts={posts} />
}