// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  link?: string;
  github?: string;
  technologies?: string[];
  featured?: boolean;
}

// Tech stack types
export interface TechIcon {
  name: string;
  src: string;
  alt: string;
  category?: 'frontend' | 'backend' | 'tools' | 'design';
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  number?: string;
  description?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Animation types
export interface AnimationConfig {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  viewport?: any;
}