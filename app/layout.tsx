import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://isabelmoreno.dev'),
  title: {
    default: 'Isabel Moreno - Full Stack Developer & Creative Technologist',
    template: '%s | Isabel Moreno'
  },
  description: 'Portfolio de Isabel Moreno, desarrolladora full stack especializada en crear experiencias digitales poéticas donde la tecnología se encuentra con el arte.',
  keywords: ['desarrolladora full stack', 'web developer', 'React', 'Next.js', 'TypeScript', 'diseño web', 'UX/UI', 'portfolio', 'desarrollo web creativo'],
  authors: [{ name: 'Isabel Moreno' }],
  creator: 'Isabel Moreno',
  publisher: 'Isabel Moreno',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    url: 'https://isabelmoreno.dev',
    siteName: 'Isabel Moreno Portfolio',
    title: 'Isabel Moreno - Full Stack Developer & Creative Technologist',
    description: 'Diseño experiencias digitales con alma. Entre el código y la emoción, construyo belleza funcional.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Isabel Moreno - Developer Portfolio',
      type: 'image/jpeg',
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isabel Moreno - Full Stack Developer',
    description: 'Diseño experiencias digitales con alma. Entre el código y la emoción, construyo belleza funcional.',
    images: ['/og-image.jpg'],
    creator: '@isabelmoreno'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6667AB" />
        <link rel="canonical" href="https://isabelmoreno.dev" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
