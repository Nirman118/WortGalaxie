# WortGalaxie Roadmap

Public roadmap for the WortGalaxie vocabulary repository and web app.  
Updated monthly. Last updated: June 2026.

---

## Now — v0.1 (Current)

- [x] Interactive SVG word galaxy with pan, zoom, pinch
- [x] Vocabulary cards with type coding (noun/verb/adjective)
- [x] Example sentences with shuffle
- [x] Mini-Geschichte — bilingual side-by-side story
- [x] Wortdojo — drag-and-drop synonym/antonym challenge with confetti
- [x] Word Explorer terminal panel
- [x] AI Topic Generator (BYOK Anthropic Claude API)
- [x] localStorage caching of AI-generated topics
- [x] Dark and light mode
- [x] Open JSON vocabulary repository — 21 topics, A1–B2
- [x] JSON schema + CI validation via GitHub Actions
- [x] Offline-first, zero dependencies, zero tracking

---

## Month 1–2 — v0.2 · Data Expansion

**Goal: 50 topics, schema locked, contribution pipeline working**

- [ ] Expand all existing topics from 7 words to 20+ words
- [ ] Add 30 new topics across A1–B2 (5 per level minimum)
- [ ] Lock `schema.json` at v1.0.0 — no breaking changes after this
- [ ] `scripts/validate.js` — local validation tool
- [ ] `scripts/generate-index.js` — rebuilds `data/index.json`
- [ ] GitHub Actions CI — validates all JSON on every PR
- [ ] First external contributor PR merged
- [ ] GitHub Pages live at `yourusername.github.io/wortgalaxie`

---

## Month 2–3 — v0.3 · Discovery & Sharing

**Goal: People can find, share, and link to WortGalaxie**

- [ ] URL hash routing — `index.html#a2/schule` loads topic directly
- [ ] Share button — generates a shareable link per topic
- [ ] SEO metadata (Open Graph, Twitter card) for social sharing
- [ ] Topic search across all levels (not just current level)
- [ ] Keyboard navigation — full app usable without mouse
- [ ] Accessibility audit — WCAG 2.1 AA compliance pass

---

## Month 3–4 — v0.4 · My Words

**Goal: Users can save words and export their vocabulary**

- [ ] Star/save any word — persisted in localStorage
- [ ] "My Words" panel — shows all saved words, filterable by level/type
- [ ] Export to CSV, TXT, JSON
- [ ] Export to Anki `.apkg` format (basic card format)
- [ ] "Review mode" — flashcard loop through saved words
- [ ] Clear saved words option with confirmation

---

## Month 4–5 — v0.5 · Progress & Streaks

**Goal: Users come back daily**

- [ ] Per-topic completion tracking (Wortdojo score saved)
- [ ] Daily streak counter
- [ ] "Topics explored" milestone badges
- [ ] Level progress bar — X of Y topics explored per level
- [ ] "Continue where you left off" on app open

---

## Month 6 — v1.0 · Launch

**Goal: 100+ topics, 2,000+ words, public launch**

- [ ] 100 curated topics across A1–B2
- [ ] 2,000+ vocabulary entries with related forms
- [ ] Product Hunt launch
- [ ] r/LearnGerman and r/German community posts
- [ ] LinkedIn build-in-public post series
- [ ] VocabLens Chrome extension cross-promotion
- [ ] Teacher/educator outreach pack

---

## Beyond v1.0 (Community Roadmap)

Items that depend on community interest and contribution volume:

- C1 level topics
- Domain-specific vocabulary packs (medicine, law, technology, academia)
- Audio pronunciation (TTS or native speaker recordings)
- Conjugation tables for all verbs
- Mobile PWA with offline install
- Integration with VocabLens extension (saved words sync)
- Community leaderboard — who contributed the most topics

---

## What This Is Not (Scope Boundaries)

To keep WortGalaxie focused, the following are out of scope for the core project:

- **No user accounts** — privacy-first, everything stays on your device
- **No server-side processing** — GitHub Pages static hosting only
- **No paid features** — the app itself is and will remain free forever
- **No AI features without BYOK** — we will not proxy API keys server-side
- **No ads** — ever

---

*This roadmap is a public commitment, not a guarantee. Timelines shift based on contributor availability and real-world feedback. If you want to accelerate a specific milestone, open a PR or a Discussion.*
