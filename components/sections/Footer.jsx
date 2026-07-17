'use client';

import { site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="footer-logo" data-cursor="top">
          Nurdaulet<mark>.</mark>
        </a>
        <div className="footer-meta">
          <span>© {year} {site.name}</span>
          <span>{site.location}</span>
          <span>Built with Next.js · GSAP · Vercel</span>
        </div>
        <div className="footer-socials">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
      <div className="footer-big" aria-hidden="true">
        NB—26
      </div>
    </footer>
  );
}
