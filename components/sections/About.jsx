'use client';

import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <Reveal as="p" className="section-label">
          [ 01 — About ]
        </Reveal>

        <div className="about-grid">
          <Reveal as="h2" className="display-2 about-headline">
            A developer who doesn’t wait for permission — learns it, then ships it.
          </Reveal>

          <div className="about-copy">
            <Reveal as="p">
              In under a year I went from static HTML / CSS / JS to production apps
              built with <strong>Next.js</strong>, integrated with the{' '}
              <strong>OpenAI API</strong>, deployed on <strong>Vercel</strong>. No
              bootcamp, no hand-holding — just one rule: every concept I learn, I
              ship into a real product the same week.
            </Reveal>
            <Reveal as="p">
              That loop produced <strong>8 live projects in under a year</strong>,
              including a flagship AI exam-prep platform with instant grading,
              LLM-powered error explanations, and a progress dashboard — and six
              real business clients, from dental clinics to premium salons.
            </Reveal>
            <Reveal as="p" className="muted">
              I build full-stack: REST API integrations, serverless functions,
              click-to-chat flows, LLM-powered features. The trajectory is the
              point — and it’s still accelerating.
            </Reveal>

            <Reveal className="about-stats">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
