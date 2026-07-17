'use client';

import { useEffect, useRef, useState } from 'react';

// Pure-CSS-transitioned boot loader. Counts 0→100, then wipes up.
// No GSAP — uses CSS transitions + JS state changes.
export default function Loader({ onDone }) {
  const root = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState('count'); // count -> fadeout -> wipe -> done

  useEffect(() => {
    // Skip on return visits within the same session.
    if (sessionStorage.getItem('nb_loaded')) {
      setPhase('done');
      if (onDone) onDone();
      return;
    }
    sessionStorage.setItem('nb_loaded', '1');
    document.documentElement.classList.add('is-loading');

    // Count 0→100 over ~1s
    const start = performance.now();
    const duration = 900;
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setN(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('fadeout');
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('is-loading');
    };
  }, [onDone]);

  // Phase transitions: fadeout counter → wipe up → done
  useEffect(() => {
    if (phase === 'fadeout') {
      const t = setTimeout(() => setPhase('wipe'), 250);
      return () => clearTimeout(t);
    }
    if (phase === 'wipe') {
      const t = setTimeout(() => {
        setPhase('done');
        document.documentElement.classList.remove('is-loading');
        if (onDone) onDone();
      }, 550);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div
      className={`loader ${phase === 'wipe' || phase === 'done' ? 'is-wiping' : ''}`}
      ref={root}
    >
      <div className="loader-inner">
        <span className="loader-mark">NB · 2026</span>
        <span className={`loader-count ${phase === 'fadeout' ? 'is-hidden' : ''}`} ref={counter}>
          {String(n).padStart(3, '0')}
        </span>
        <div className="loader-bar">
          <div className={`loader-bar-fill ${n >= 100 ? 'is-full' : ''}`} ref={bar} />
        </div>
      </div>
    </div>
  );
}
