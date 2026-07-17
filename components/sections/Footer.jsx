'use client';

import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

// A "currently building / exploring" strip — phrased as directions and
// interests, not fabricated credentials. Visually fills the space under
// the big NB—26 mark with ML-coded language.
const building = [
  { tag: 'now', label: 'Shipping UBT BASE — AI exam-prep with LLM explainers' },
  { tag: 'stack', label: 'Next.js · OpenAI API · serverless functions · Vercel' },
  { tag: 'explore', label: 'RAG pipelines · function calling · evals for LLM apps' },
  { tag: 'next', label: 'Vector search · retrieval-grounded product features' },
];

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

      {/* currently-building strip */}
      <div className="container footer-building">
        {building.map((b, i) => (
          <Reveal as="div" key={i} className="footer-building-row" delay={i * 0.05}>
            <span className="footer-building-tag">{b.tag}</span>
            <span className="footer-building-label">{b.label}</span>
          </Reveal>
        ))}
      </div>

      <div className="footer-big" aria-hidden="true">
        NB—26
      </div>
    </footer>
  );
}
