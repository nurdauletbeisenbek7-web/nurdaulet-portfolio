'use client';

import Reveal from '@/components/Reveal';

const steps = [
  {
    n: '01',
    title: 'Learn it',
    body:
      'Pick up the concept — REST API, serverless, LLM prompt design — from docs, not tutorials.',
  },
  {
    n: '02',
    title: 'Ship it',
    body:
      'Put it into a real project the same week. Production URL, real users, real feedback.',
  },
  {
    n: '03',
    title: 'Iterate',
    body:
      'Refine based on what actually breaks in production. The stack grows with every ship.',
  },
];

export default function Process() {
  return (
    <section className="process section">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="section-label">
            [ 04 — How I work ]
          </Reveal>
          <Reveal as="h2" className="display-2">
            The loop. <em>Learn → ship → repeat.</em>
          </Reveal>
        </div>

        <div className="process-grid">
          {steps.map((s, i) => (
            <Reveal as="div" key={s.n} className="process-step" delay={i * 0.06}>
              <span className="process-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
