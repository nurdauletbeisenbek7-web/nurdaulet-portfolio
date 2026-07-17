'use client';

import { useEffect, useRef } from 'react';

// Animated hero background: a rotating wireframe globe of nodes + links,
// drawn on a single canvas with rAF. Pauses when offscreen.
export default function HeroMotif() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w, h, dpr;
    const N = 60; // nodes (kept modest — link check is O(N²) per frame)
    const nodes = Array.from({ length: N }, () => {
      // random point on a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      return { theta, phi };
    });

    let rotY = 0;
    let rotX = 0.4;
    let raf;
    let running = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const project = (node) => {
      const { theta, phi } = node;
      // rotate around Y then X
      const x = Math.sin(phi) * Math.cos(theta + rotY);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta + rotY);
      const y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
      return { x, y: y2, z: z2 };
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;

      const pts = nodes.map(project);

      // links between close nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < 0.32) {
            const a = (1 - d / 0.32) * 0.35 * ((pts[i].z + 1) / 2);
            ctx.strokeStyle = `rgba(198,255,58,${a.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(cx + pts[i].x * R, cy + pts[i].y * R);
            ctx.lineTo(cx + pts[j].x * R, cy + pts[j].y * R);
            ctx.stroke();
          }
        }
      }

      // nodes
      pts.forEach((p) => {
        const depth = (p.z + 1) / 2; // 0..1
        const r = 0.6 + depth * 1.8;
        ctx.beginPath();
        ctx.arc(cx + p.x * R, cy + p.y * R, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${(0.15 + depth * 0.6).toFixed(3)})`;
        ctx.fill();
      });

      if (!reduced) {
        rotY += 0.0022;
        rotX += 0.0005;
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="hero-motif" aria-hidden="true" />;
}
