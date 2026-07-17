'use client';

import { useEffect, useRef, useState } from 'react';

// IntersectionObserver-based reveal — fires the instant an element enters
// the viewport, no GSAP scroll math needed. Faster perception than
// transform-based smooth-scroll + GSAP triggers combined.
export default function Reveal({
  children,
  as: Tag = 'div',
  y = 40,
  delay = 0,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply a tiny timeout to let the browser paint the position first,
          // then transition in.
          setTimeout(() => setVisible(true), delay * 1000);
          if (once) io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={visible ? undefined : { '--reveal-y': `${y}px` }}
    >
      {children}
    </Tag>
  );
}
