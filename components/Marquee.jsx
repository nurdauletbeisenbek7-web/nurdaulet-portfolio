'use client';

// Pure-CSS seamless marquee. Duplicate content + translateX(-50%) loop.
export default function Marquee({ items = [], speed = 26, reverse = false }) {
  const content = (
    <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
      {items.map((t, i) => (
        <span key={i} className="marquee-item">
          {t}
          <i>✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="marquee"
      style={{ '--marquee-dir': reverse ? 'reverse' : 'normal' }}
      aria-hidden="true"
    >
      {content}
      {content}
    </div>
  );
}
