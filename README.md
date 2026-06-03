# 🌌 WortGalaxie

> **An open, community-built German vocabulary repository with an interactive word-galaxy explorer.**

[![Topics](https://img.shields.io/badge/topics-21-7ec8ff?style=flat-square&logo=bookstack)](data/)
[![Levels](https://img.shields.io/badge/CEFR-A1%20→%20B2-3ecf70?style=flat-square)](data/schema.json)
[![License](https://img.shields.io/badge/license-MIT-f5c842?style=flat-square)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-c0a0ff?style=flat-square)](docs/CONTRIBUTING.md)
[![GitHub Pages](https://img.shields.io/badge/live%20demo-GitHub%20Pages-ff8060?style=flat-square)](https://yourusername.github.io/wortgalaxie)

---

## What is WortGalaxie?

WortGalaxie is a **free, offline-first German vocabulary explorer** built as a single HTML file with zero dependencies. Choose a topic, generate an interactive SVG word galaxy, read example sentences, study vocabulary cards, and test yourself with a drag-and-drop challenge — all in your browser, no account required.

The vocabulary data lives in **open JSON files** in this repository. Anyone can contribute new topics, expand existing ones, or fix errors via a pull request.

<p align="center">
  <img src="docs/assets/preview-dark.png" alt="WortGalaxie dark mode preview" width="720"/>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌐 **Interactive Word Galaxy** | SVG word web with pan, zoom, and pinch. Related forms orbit each word. |
| 📖 **Vocabulary Cards** | Type-coded cards (noun/verb/adjective) with articles, translations, and related forms. |
| 📚 **Mini-Geschichte** | Short German story using the topic vocabulary — German and English side by side. |
| 🎯 **Wortdojo Challenge** | Drag-and-drop synonym/antonym game with confetti on completion. |
| 🔍 **Word Explorer** | Click any word for a deep-dive: definitions, conjugations, related forms. |
| 🤖 **AI Topic Generator** | BYOK (bring your own key): generate any topic via Claude API, cached locally. |
| 🌙 **Dark & Light Mode** | Smooth theme switching, remembered across sessions. |
| 📦 **Offline First** | Works without internet after first load. Zero tracking. Zero ads. |

---

## 🚀 Quick Start

**Option 1 — Use it online:**
→ [wortgalaxie.github.io](https://yourusername.github.io/wortgalaxie) *(GitHub Pages — always latest)*

**Option 2 — Run locally:**
```bash
git clone https://github.com/yourusername/wortgalaxie.git
cd wortgalaxie
open index.html          # macOS
# or: double-click index.html in Windows Explorer
# or: xdg-open index.html on Linux
```
No build step. No npm install. No server. Just open the file.

---

## 📁 Repository Structure

```
wortgalaxie/
│
├── index.html                  # The complete app — single file, self-contained
│
├── data/                       # Open vocabulary repository
│   ├── index.json              # Master index: all topics, levels, word counts
│   ├── schema.json             # JSON schema — validate your contributions here
│   │
│   ├── a1/                     # Beginner (A1) topics
│   │   ├── begruessing.json
│   │   ├── familie.json
│   │   └── ...
│   ├── a2/                     # Elementary (A2)
│   ├── b1/                     # Intermediate (B1)
│   └── b2/                     # Upper-Intermediate (B2)
│
├── docs/
│   ├── CONTRIBUTING.md         # How to add or improve topics
│   ├── SECURITY.md             # Security policy and responsible disclosure
│   ├── ROADMAP.md              # 6-month public roadmap
│   └── assets/                 # Screenshots, preview images
│
├── scripts/
│   ├── validate.js             # Validate a topic JSON against the schema
│   └── generate-index.js       # Rebuild data/index.json from all topic files
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── new_topic.md        # Template for contributing a new vocabulary topic
│   │   └── word_correction.md
│   └── workflows/
│       └── validate-topics.yml # CI: validates all JSON on every PR
│
├── .gitignore
├── LICENSE                     # MIT
└── README.md
```

---

## 📊 Vocabulary Coverage

| Level | Topics | Words (approx) | Status |
|---|---|---|---|
| A1 · Beginner | 6 | ~42 | 🟡 Expanding |
| A2 · Elementary | 6 | ~42 | 🟡 Expanding |
| B1 · Intermediate | 5 | ~35 | 🟡 Expanding |
| B2 · Upper-Intermediate | 4 | ~28 | 🔴 Needs contributors |
| **Total** | **21** | **~147** | Growing weekly |

**Target by v1.0:** 100 topics × 20 words = 2,000 curated German entries across A1–B2.

---

## 🤝 Contributing a Topic

This is an **open vocabulary project** — contributions are the core of what makes it grow.

### Fastest way: GitHub Web Editor
1. Fork this repository
2. Copy `data/a2/schule.json` as a template
3. Create `data/[level]/[your_topic].json`
4. Submit a Pull Request

### Validate before submitting
```bash
node scripts/validate.js data/a2/your_topic.json
# Output: ✅ Valid — 18 words, 6 sentences, 5 synonym pairs
```

### What makes a good topic file?
- **15–20 words** mixing nouns, verbs, and adjectives
- **3–5 related forms** per word (conjugations, compounds, collocations)
- **6 natural sentences** that use the words in context
- **One short story** (4–6 sentences) using at least 8 vocabulary words
- **4–6 synonym/antonym pairs** for verbs and adjectives

→ Full guide: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 🔐 Security & API Keys

WortGalaxie has an optional AI Topic Generator powered by the Anthropic Claude API.

**Your API key is:**
- Stored only in your browser's `localStorage`
- Never sent to any server other than `api.anthropic.com` directly
- Never logged, never tracked
- Cleared when you clear browser data

**Never commit an API key to this repository.** The `.gitignore` blocks `.env` and `secrets.json` files. If you accidentally expose a key, rotate it immediately at [console.anthropic.com](https://console.anthropic.com).

→ Full security policy: [docs/SECURITY.md](docs/SECURITY.md)

---

## 🗺️ Roadmap

| Phase | Timeline | Goal |
|---|---|---|
| **v0.1** — Foundation | ✅ Now | 21 topics, AI generator, full UI |
| **v0.2** — Data expansion | Month 1–2 | 50 topics, schema locked, CI validation |
| **v0.3** — GitHub Pages | Month 2 | Live URL, SEO, share links per topic |
| **v0.4** — My Words | Month 3 | localStorage saved words, export to Anki/CSV |
| **v0.5** — Progress | Month 4 | Per-topic completion tracking, streaks |
| **v1.0** — Launch | Month 6 | 100+ topics, 2,000+ words, Product Hunt |

→ Detailed roadmap: [docs/ROADMAP.md](docs/ROADMAP.md)

---

## 🛠 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | Zero dependencies — runs anywhere, forever |
| Data | JSON files in Git | Free hosting, version history, community editable |
| AI (optional) | Anthropic Claude API | BYOK — user controls their own cost |
| Hosting | GitHub Pages | Free, CDN-backed, custom domain ready |
| CI | GitHub Actions | Auto-validates JSON on every PR |

---

## 📜 License

Code: [MIT License](LICENSE) — use it, modify it, ship it.

Vocabulary data (`data/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — share and adapt with attribution.

---

## 🙏 Acknowledgements

Built with ❤️ for German learners navigating the Blue Card, university applications, and Goethe certification.  
Companion project: **[VocabLens](https://github.com/yourusername/vocablens)** — a Chrome extension that brings WortGalaxie vocabulary to any webpage.

---

<p align="center">
  <sub>If WortGalaxie helped you learn a word today, consider starring ⭐ the repo or contributing a topic.</sub>
</p>
