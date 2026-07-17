'use client';

import { projects, flagship } from '@/data/projects';
import Reveal from '@/components/Reveal';

function Flagship() {
  const p = flagship;
  return (
    <Reveal className="flagship">
      <div className="flagship-head">
        <span className="flagship-flag" data-cursor="flagship">
          ★ Flagship
        </span>
        <span className="project-index">{p.index} / {String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="flagship-body">
        <div className="flagship-preview" data-cursor="view live">
          <PreviewFrame project={p} big />
          <a
            className="flagship-url"
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            {prettyUrl(p.url)} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="flagship-copy">
          <p className="project-category">{p.category}</p>
          <h3 className="flagship-title">{p.name}</h3>
          <p className="flagship-tagline">{p.tagline}</p>
          <p className="project-desc">{p.description}</p>

          <div className="flagship-metrics">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <b style={{ color: p.accent }}>{m.value}</b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div className="project-stack">
            {p.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            data-cursor="visit"
          >
            Open flagship <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectRow({ p, i }) {
  return (
    <Reveal as="article" className={`project-row ${p.flagship ? 'is-flagship' : ''}`}>
      <a
        className="project-row-main"
        href={p.url}
        target="_blank"
        rel="noreferrer"
        data-cursor={p.status === 'Live' ? 'open' : 'wip'}
      >
        <span className="project-index">{p.index}</span>

        <div className="project-preview">
          <PreviewFrame project={p} />
        </div>

        <div className="project-row-info">
          <p className="project-category">
            {p.category} <span>· {p.year}</span>
          </p>
          <h3 className="project-title">{p.name}</h3>
          <p className="project-tagline">{p.tagline}</p>
        </div>

        <p className="project-desc">{p.description}</p>

        <div className="project-row-end">
          <div className="project-stack">
            {p.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <span className={`project-status ${p.status === 'Live' ? 'is-live' : 'is-wip'}`}>
            <i /> {p.status}
          </span>
        </div>
      </a>
    </Reveal>
  );
}

// SVG "browser preview" built from the project name + accent.
// No external images needed; gives every card a distinct visual.
function PreviewFrame({ project, big = false }) {
  const initials = project.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`preview ${big ? 'preview-big' : ''}`}
      style={{ '--accent': project.accent }}
    >
      <div className="preview-chrome">
        <span /><span /><span />
        <em>{prettyHost(project.url)}</em>
      </div>
      <div className="preview-body">
        <div className="preview-mark" style={{ color: project.accent }}>
          {initials}
        </div>
        <div className="preview-lines">
          <i style={{ width: '72%' }} />
          <i style={{ width: '54%' }} />
          <i style={{ width: '63%' }} />
        </div>
        <div className="preview-chips">
          <i style={{ background: project.accent }} />
          <i />
          <i />
        </div>
      </div>
      <span className="preview-name">{project.name}</span>
    </div>
  );
}

function prettyUrl(u) {
  return u.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
function prettyHost(u) {
  try {
    return new URL(u).host.replace('www.', '');
  } catch {
    return u;
  }
}

export default function Projects() {
  const rest = projects.filter((p) => !p.flagship);
  return (
    <section id="work" className="projects section">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="section-label">
            [ 03 — Selected work ]
          </Reveal>
          <Reveal as="h2" className="display-2">
            8 production projects. <em>Real clients, live URLs.</em>
          </Reveal>
          <Reveal as="p" className="section-sub">
            From vanilla JS landings to a full-stack Next.js + OpenAI platform —
            every entry below opens to a real, deployed product.
          </Reveal>
        </div>

        <Flagship />

        <div className="project-list">
          {rest.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
