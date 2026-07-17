// Each skill is tagged with WHERE it was actually used — no filler.

export const skills = [
  { name: 'Next.js', note: 'UBT BASE · Wedding site', group: 'Framework' },
  { name: 'JavaScript', note: 'Every live project', group: 'Language' },
  { name: 'OpenAI API', note: 'UBT BASE · LLM explainers', group: 'AI' },
  { name: 'Vercel', note: 'UBT BASE · Delish · Wedding', group: 'Deploy' },
  { name: 'Serverless', note: 'API routes · Telegram bot', group: 'Backend' },
  { name: 'Python', note: 'Tooling · logic', group: 'Language' },
  { name: 'SQL', note: 'Data · queries', group: 'Data' },
  { name: 'HTML', note: 'All 8 projects', group: 'Markup' },
  { name: 'CSS', note: 'Responsive · animation', group: 'Styling' },
];

export const skillGroups = [...new Set(skills.map((s) => s.group))];
