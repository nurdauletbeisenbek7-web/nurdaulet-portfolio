'use client';

import { useEffect, useRef, useState } from 'react';
import HeroMotif from '@/components/HeroMotif';
import { site } from '@/data/site';

export default function Hero({ ready }) {
  const root = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    // Short delay to let the loader wipe finish.
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <section id="top" className={`hero ${visible ? 'is-ready' : ''}`} ref={root}>
      <HeroMotif />

      <div className="hero-grid">
        <div className="hero-eyebrow">
          <span>{site.location}</span>
          <span>Portfolio / 2026</span>
        </div>

        <h1 className="hero-title">
          <span className="line">
            <span className="line-inner">Nurdaulet</span>
          </span>
          <span className="line">
            <span className="line-inner">Beisenbek<mark>.</mark></span>
          </span>
        </h1>

        <p className="hero-sub">{site.statusLine}</p>

        <div className="hero-meta">
          <div>
            <b>8</b>
            <span>production projects</span>
          </div>
          <div>
            <b>&lt;1 yr</b>
            <span>vanilla JS → Next.js + LLM</span>
          </div>
          <div>
            <b>6</b>
            <span>real business clients</span>
          </div>
        </div>

        <div className="hero-cta">
          <a href="#work" className="btn-primary" data-cursor="view">
            View work <span aria-hidden="true">↘</span>
          </a>
          <a href="#contact" className="btn-ghost" data-cursor="write">
            Start a project
          </a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
