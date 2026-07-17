'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="nav-logo" data-cursor="top">
          NB<span>/</span>
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-cursor="go">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta" data-cursor="say hi">
          <span className="nav-dot" />
          Available
        </a>
        <button
          className={`nav-burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`nav-overlay ${open ? 'is-open' : ''}`}>
        <div className="nav-overlay-inner">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${0.08 * i + 0.05}s` }}
            >
              <em>0{i + 1}</em>
              {l.label}
            </a>
          ))}
          <div className="nav-overlay-meta">
            {site.socials.slice(0, 3).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
