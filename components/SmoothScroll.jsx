'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Lightweight JS smooth scroll: translate a wrapper with rAF lerp.
// Cheaper and more reliable than a full inertia library, and degrades
// gracefully (native scroll still works) if anything throws.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Skip on touch / coarse pointers — native momentum scroll is better there.
    const isTouch =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window;
    if (isTouch) return;

    const wrap = document.querySelector('[data-scroll-wrap]');
    const content = document.querySelector('[data-scroll-content]');
    if (!wrap || !content) return;

    let height = 0;
    let current = 0;
    let target = 0;
    let raf;

    const setHeight = () => {
      height = content.getBoundingClientRect().height;
      wrap.style.height = `${height}px`;
    };
    setHeight();
    window.addEventListener('resize', setHeight);

    const onScroll = () => {
      target = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      // Higher factor = snappier tracking, less lag behind the wheel/trackpad.
      current += (target - current) * 0.4;
      if (Math.abs(target - current) < 0.5) current = target;
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Recompute ScrollTrigger positions against our virtual scroll.
    ScrollTrigger.refresh();
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(refreshId);
    };
  }, []);

  return (
    <div data-scroll-wrap>
      <div data-scroll-content>{children}</div>
    </div>
  );
}
