'use client';

import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="stack" className="skills section">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="section-label">
            [ 02 — Stack ]
          </Reveal>
          <Reveal as="h2" className="display-2">
            The toolset. <em>Each one earned on a real ship.</em>
          </Reveal>
        </div>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <Reveal
              as="article"
              key={s.name}
              delay={i * 0.04}
              className="skill-card"
            >
              <span className="skill-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              <p>{s.note}</p>
              <span className="skill-group">{s.group}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="marquee-wrap">
        <Marquee
          items={[
            'Next.js',
            'OpenAI API',
            'JavaScript',
            'Vercel',
            'Serverless',
            'REST API',
            'Python',
            'SQL',
            'HTML',
            'CSS',
          ]}
        />
      </div>
    </section>
  );
}
