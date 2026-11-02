// Tiny static-site build: wraps each page in src/pages with src/layout.html.
// Usage: node build.mjs   → writes index.html, classes.html, ... to the repo root.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

// ---- Studio details (update before launch) ----
const SITE = {
  site: 'https://www.warmestudio.com',      // production domain (placeholder)
  street: 'Clematis District',              // placeholder — replace with street address
  phone: '(561) 555-0142',                  // placeholder phone
  phoneRaw: '+15615550142',
  email: 'hello@warmestudio.com',           // placeholder email
};

const layout = readFileSync('src/layout.html', 'utf8');
const fill = (tpl, data) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in data ? data[k] : m));

for (const file of readdirSync('src/pages').filter(f => f.endsWith('.html'))) {
  const raw = readFileSync(`src/pages/${file}`, 'utf8');
  const meta = JSON.parse(raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->/)[1]);
  const content = raw.replace(/^<!--[\s\S]*?-->\s*/, '');
  const data = {
    ...SITE, ...meta,
    url: SITE.site + '/' + (file === 'index.html' ? '' : file),
    bodyClass: meta.hero ? 'has-hero' : '',
  };
  let html = fill(fill(layout, { ...data, content }), data);
  html = html.replaceAll(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`);
  writeFileSync(file, html);
  console.log('built', file);
}
