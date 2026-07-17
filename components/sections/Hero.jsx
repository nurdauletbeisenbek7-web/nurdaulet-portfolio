'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import HeroMotif from '@/components/HeroMotif';
import { site } from '@/data/site';

export default function Hero({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduced ? 0 : 0.1 });
      tl.from('.hero-eyebrow > *', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power4.out',
      })
        .from(
          '.hero-title .line-inner',
          { yPercent: 115, duration: 1, stagger: 0.09, ease: 'power4.out' },
          '-=0.4'
        )
        .from(
          '.hero-sub, .hero-meta, .hero-cta, .hero-motif',
          { opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" className="hero" ref={root}>
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
