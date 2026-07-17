'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

// Boot loader: counts 0→100 then wipes upward. Locks scroll while active.
export default function Loader({ onDone }) {
  const root = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    // Skip the boot animation on return visits within the same session.
    if (sessionStorage.getItem('nb_loaded')) {
      if (onDone) onDone();
      return;
    }
    sessionStorage.setItem('nb_loaded', '1');

    const obj = { v: 0 };
    document.documentElement.classList.add('is-loading');

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('is-loading');
        if (onDone) onDone();
      },
    });

    tl.to(obj, {
      v: 100,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: () => setN(Math.round(obj.v)),
    })
      .to(bar.current, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
      .to(counter.current, { y: -30, opacity: 0, duration: 0.3, ease: 'power3.in' })
      .to(
        root.current,
        { yPercent: -100, duration: 0.6, ease: 'power4.inOut' },
        '-=0.1'
      );

    return () => {
      tl.kill();
      document.documentElement.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div className="loader" ref={root}>
      <div className="loader-inner">
        <span className="loader-mark">NB · 2026</span>
        <span className="loader-count" ref={counter}>
          {String(n).padStart(3, '0')}
        </span>
        <div className="loader-bar">
          <div className="loader-bar-fill" ref={bar} />
        </div>
      </div>
    </div>
  );
}
