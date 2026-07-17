// Single source of truth for all case studies.
// Descriptions for projects 2–8 are kept factual per brief — no invented detail.
// Project 1 (Educational Platform) is presented neutrally as "in development".

export const projects = [
  {
    id: '01',
    index: '01',
    name: 'UBT BASE',
    category: 'Flagship · AI Platform',
    year: '2025',
    flagship: true,
    tagline: 'AI exam-prep platform, built from scratch.',
    description:
      'A full exam-prep product shipped end-to-end. 20-question tests per subject, instant grading, and an LLM that explains every wrong answer. Server-side logic handles auth, scoring, and weak-topic tracking across a personal progress dashboard.',
    stack: ['Next.js', 'OpenAI API', 'Server-side logic', 'Vercel'],
    metrics: [
      { value: '20', label: 'Qs / subject' },
      { value: 'LLM', label: 'error explainers' },
      { value: 'Full', label: 'auth + dashboard' },
    ],
    url: 'https://ubtbase-92yo.vercel.app',
    status: 'Live',
    accent: '#C6FF3A',
  },
  {
    id: '02',
    index: '02',
    name: 'Dental Clinic Astana',
    category: 'Multi-page Business Site',
    year: '2025',
    tagline: 'Multi-page clinic site with 6 specialties.',
    description:
      'Multi-page site: home, services, doctors, prices, about, contact. 6 specialties, ~25 services, anchor-tab navigation between service groups, and click-to-call / click-to-chat WhatsApp entry points.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Click-to-chat'],
    metrics: [
      { value: '6', label: 'specialties' },
      { value: '~25', label: 'services' },
      { value: 'Multi', label: 'page' },
    ],
    url: 'https://nurdauletbeisenbek7-web.github.io/DENTALastana/services.html#orthodontics',
    status: 'Live',
    accent: '#5B8DEF',
  },
  {
    id: '03',
    index: '03',
    name: 'Beauty Salon SEN',
    category: 'Landing · Astana',
    year: '2025',
    tagline: 'Salon landing with tabbed pricing & booking.',
    description:
      'Landing for a salon in Astana. 8 service categories, tabbed pricing, salon history since 1993, gallery, reviews, and booking. Responsive, click-to-chat WhatsApp, Google Maps + 2GIS, OG / Twitter meta tags.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    metrics: [
      { value: '8', label: 'categories' },
      { value: '2', label: 'map integrations' },
      { value: 'OG', label: 'social meta' },
    ],
    url: 'https://nurdauletbeisenbek7-web.github.io/CEN_SALON/',
    status: 'Live',
    accent: '#FFB23E',
  },
  {
    id: '04',
    index: '04',
    name: 'Khanshaiym Salon',
    category: 'Premium Landing · Astana',
    year: '2025',
    tagline: 'Premium salon landing, 4.9 / 500+ clients.',
    description:
      'Premium landing: "why us", services, pricing, gallery, reviews, contacts. Rated 4.9 across 500+ clients. CSS marquee animation, OpenStreetMap, WhatsApp / Instagram contact paths.',
    stack: ['HTML', 'CSS', 'JavaScript', 'OpenStreetMap'],
    metrics: [
      { value: '4.9', label: 'rating' },
      { value: '500+', label: 'clients' },
      { value: 'Marquee', label: 'CSS anim' },
    ],
    url: 'https://nurdauletbeisenbek7-web.github.io/Khanshaiym/',
    status: 'Live',
    accent: '#FF6B9D',
  },
  {
    id: '05',
    index: '05',
    name: 'JOALI Spa & Relax',
    category: 'Spa · Almaty',
    year: '2025',
    tagline: 'Spa site with WhatsApp deep links.',
    description:
      'Therapist cards, procedure menu grouped by category, and reviews. WhatsApp deep links carry a pre-filled message so a tap opens a ready-to-send chat.',
    stack: ['HTML', 'CSS', 'JavaScript', 'WhatsApp deep link'],
    metrics: [
      { value: 'Deep', label: 'WA links' },
      { value: 'Pre-fill', label: 'messages' },
      { value: 'Cards', label: 'therapists' },
    ],
    url: 'https://nurdauletbeisenbek7-web.github.io/JOALI/',
    status: 'Live',
    accent: '#4FD1C5',
  },
  {
    id: '06',
    index: '06',
    name: 'Wedding Invitation',
    category: 'Reusable Template',
    year: '2025',
    tagline: 'Bilingual wedding template, RSVP + maps.',
    description:
      'Reusable invitation template: countdown timer, event schedule, dress code, gallery, and RSVP form. Bilingual KZ / RU, Google Calendar + Maps integration.',
    stack: ['Next.js', 'Vercel', 'RSVP', 'Bilingual'],
    metrics: [
      { value: 'KZ/RU', label: 'bilingual' },
      { value: 'RSVP', label: 'form' },
      { value: 'Maps', label: '+ calendar' },
    ],
    url: 'https://weeding-eta-sooty.vercel.app',
    status: 'Live',
    accent: '#C6FF3A',
  },
  {
    id: '07',
    index: '07',
    name: 'Delish',
    category: 'Café Site',
    year: '2025',
    tagline: 'Full café site, menu from real spec sheets.',
    description:
      'Full café website. Menu built from the client’s real spec sheets — item names, prices, and categories pulled directly from source, not invented.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    metrics: [
      { value: 'Real', label: 'spec sheets' },
      { value: 'Full', label: 'menu' },
      { value: 'Vercel', label: 'hosted' },
    ],
    url: 'https://delish-iota.vercel.app/',
    status: 'Live',
    accent: '#FFB23E',
  },
  {
    id: '08',
    index: '08',
    name: 'Educational Platform',
    category: 'In Development',
    year: '2025',
    flagship: false,
    tagline: 'Currently in development.',
    description:
      'An educational platform currently in development. Public preview is unavailable because the host (Render) blocks the page via robots.txt — so it’s listed here as work in progress rather than as a finished case study.',
    stack: ['Render', 'In development'],
    metrics: [
      { value: 'WIP', label: 'in development' },
      { value: '—', label: 'preview blocked' },
      { value: 'robots.txt', label: 'host policy' },
    ],
    url: 'https://nashen1.onrender.com',
    status: 'In development',
    accent: '#5B8DEF',
  },
];

export const flagship = projects.find((p) => p.flagship);
export const liveProjects = projects.filter((p) => p.status === 'Live');
