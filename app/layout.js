import './globals.css';
import { site } from '@/data/site';

export const metadata = {
  metadataBase: new URL('https://nurdaulet-portfolio.vercel.app'),
  title: `${site.name} — ${site.statusLine}`,
  description:
    'Full-stack developer. 8 production projects in under a year — from vanilla JS to Next.js + OpenAI API. Flagship: UBT BASE, an AI exam-prep platform.',
  keywords: [
    'Nurdaulet Beisenbek',
    'full-stack developer',
    'Next.js',
    'OpenAI API',
    'Vercel',
    'AI products',
    'portfolio',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.statusLine}`,
    description:
      '8 production projects in under a year — from vanilla JS to Next.js + OpenAI API.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Full-stack developer`,
    description:
      '8 production projects in under a year — from vanilla JS to Next.js + OpenAI API.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
