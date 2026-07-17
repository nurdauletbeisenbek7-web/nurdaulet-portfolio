'use client';

import { useEffect, useRef, useState } from 'react';

// Custom magnetic cursor. Hidden on touch devices. The "view" label
// swells when hovering anything marked [data-cursor="view"].
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let raf;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const t = e.target.closest('[data-cursor]');
      if (t) {
        setHovering(true);
        setLabel(t.getAttribute('data-cursor') || '');
      } else {
        setHovering(false);
        setLabel('');
      }
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move);
    tick();

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className={`cursor-ring ${hovering ? 'is-hover' : ''}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dot} className={`cursor-dot ${hovering ? 'is-hover' : ''}`} />
    </>
  );
}
