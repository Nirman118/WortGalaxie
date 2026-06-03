# Security Policy

## Overview

WortGalaxie is a client-side only application. It runs entirely in your browser with no backend server. This section documents what data is handled, what is stored, and how to report security concerns.

---

## API Key Handling

The optional AI Topic Generator requires an Anthropic API key. Here is exactly what happens with it:

| Action | Where |
|---|---|
| You type your key | Your browser only |
| Key is saved | `localStorage` under key `wg_api_key` — your device only |
| Key is used | Sent directly from your browser to `api.anthropic.com` — no proxy |
| Key is logged | Never |
| Key leaves your browser | Only in the direct HTTPS request to Anthropic |
| Key is in the source code | Never |

**If you accidentally commit an API key to this repository:**
1. Rotate it immediately at [console.anthropic.com](https://console.anthropic.com)
2. The old key is compromised and should be considered public from the moment of the commit
3. Open a private issue or email the maintainer

---

## What Data WortGalaxie Stores Locally

| Key | Content | When cleared |
|---|---|---|
| `wg_api_key` | Your Anthropic API key (if saved) | When you clear browser data, or click "Remove Key" |
| `wg_topic_v1_*` | AI-generated topic JSON (one key per topic) | When you clear browser data |

No cookies. No analytics. No tracking pixels. No external scripts loaded except Google Fonts.

---

## Content Security

The `index.html` file makes outbound requests to:
- `fonts.googleapis.com` — Google Fonts (CSS only, no JS)
- `api.anthropic.com` — Only when AI Topic Generator is used and a key is set

No other external domains are contacted.

---

## Reporting a Vulnerability

If you discover a security vulnerability in WortGalaxie:

1. **Do not open a public GitHub issue.**
2. Email: `security@yourdomain.com` (or open a private GitHub Security Advisory)
3. Include: description of the issue, steps to reproduce, potential impact
4. You will receive a response within 72 hours

We take security seriously even for a client-side project. Cross-site scripting (XSS) vulnerabilities in the vocabulary rendering or the AI response parsing would be treated as high priority.

---

## Scope

| In scope | Out of scope |
|---|---|
| XSS in rendered vocabulary data | Third-party services (Anthropic API security) |
| Insecure storage of API keys | User browser security settings |
| Data leakage to unintended third parties | Social engineering |
| Malicious JSON in `data/` folder triggering script execution | Theoretical attacks with no practical impact |

---

## Supported Versions

| Version | Supported |
|---|---|
| Latest on `main` branch | ✅ |
| Older tagged releases | ❌ — always use latest |
