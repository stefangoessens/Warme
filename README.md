# Wärme — Infrared Hot Yoga · West Palm Beach

Static marketing site for Wärme: Home, Classes (with weekly schedule), Membership, About and Franchise.

## Structure

```
index.html, classes.html, …   ← built pages (deploy these + /assets)
assets/css/styles.css          ← design system (brand tokens at the top)
assets/js/main.js              ← header, mobile menu, reveal, schedule data, form handling
assets/img/                    ← optimized WebP crops of the brand imagery
src/layout.html                ← shared <head>, header, mobile menu, footer
src/pages/*.html               ← page content (JSON meta comment on line 1)
build.mjs                      ← tiny build: wraps src/pages with src/layout.html
```

## Editing

1. Edit content in `src/pages/*.html` (or the shared chrome in `src/layout.html`).
2. Run `node build.mjs` (Node 18+, no dependencies) to regenerate the root `.html` files.
3. Open `index.html` in a browser, or serve the folder with any static host
   (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3…).

## Before launch — placeholders to replace

| What | Where |
| --- | --- |
| Domain, street address, phone, email | `SITE` object at the top of `build.mjs` |
| Prices, intro offer, founding-member terms, policies | `src/pages/membership.html`, `src/pages/index.html` |
| Class schedule | `week` object in `assets/js/main.js` |
| Social links | footer in `src/layout.html` |
| Forms (join, franchise inquiry, newsletter) | Front-end only today (`data-demo`). Point them at your provider (e.g. Mindbody / Momence / Mariana Tek booking, HubSpot, Formspree) |
| Franchise legal copy & FDD details | `src/pages/franchise.html` — have franchise counsel review |
| Privacy / Terms / Waiver links | footer in `src/layout.html` |

## Brand

| Token | Hex |
| --- | --- |
| Red Glow | `#D21F2B` |
| Garnet | `#8E1B22` |
| Oxblood | `#4E0E12` |
| Black Cherry | `#1E0809` |
| Bone | `#EDE3D8` |

Type: **Jost** (display, wide-tracked caps) + **EB Garamond** (text & italics), via Google Fonts.
The wordmark and monogram are inline SVG symbols in `src/layout.html` (also `assets/img/logo.svg`, `favicon.svg`).
