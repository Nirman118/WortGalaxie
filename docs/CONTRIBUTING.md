# Contributing to WortGalaxie

Thank you for helping grow the open German vocabulary repository. Every topic file you contribute helps learners around the world.

---

## Ways to Contribute

| Type | Effort | Impact |
|---|---|---|
| Fix a typo or translation error | 2 min | ⭐ |
| Add related forms (`v` array) to existing words | 10 min | ⭐⭐ |
| Add synonym/antonym pairs (`sa` array) | 15 min | ⭐⭐ |
| Contribute a complete new topic (15–20 words) | 30–60 min | ⭐⭐⭐ |
| Review and improve an existing topic | 20 min | ⭐⭐ |

---

## Step-by-Step: Adding a New Topic

### 1. Fork and clone
```bash
git clone https://github.com/yourusername/wortgalaxie.git
cd wortgalaxie
git checkout -b topic/a2-kochen   # descriptive branch name
```

### 2. Copy the template
```bash
cp data/a2/schule.json data/a2/kochen.json
```

### 3. Edit the file

Open `data/a2/kochen.json` and fill in every field. Use `data/schema.json` as your reference.

**Naming rules:**
- `"id"`: lowercase, underscores only. Include level suffix only if the same topic exists at multiple levels: `tagesablauf_a1`, `tagesablauf_a2`
- `"chapter"`: format is always `"A2 · Topic Category"` — level first, then a clear English category label
- No book names, no textbook references anywhere in the data

**Word quality checklist:**
- [ ] Nouns always have `"a"` set to `"der"`, `"die"`, or `"das"`
- [ ] Verbs and adjectives have `"a": null`
- [ ] Each word has at least 2 entries in `"v"` (related forms)
- [ ] Related forms include real collocations, compounds, or conjugations — not just synonyms
- [ ] All German text uses correct Umlauts (ä, ö, ü, ß — not ae, oe, ue, ss)

**Story quality checklist:**
- [ ] 4–6 sentences, reads naturally — not like a vocabulary list
- [ ] At least 8 of the topic words appear in the story
- [ ] English translation matches exactly, not a paraphrase

### 4. Validate
```bash
node scripts/validate.js data/a2/kochen.json
```

Expected output:
```
✅ kochen — A2 · Cooking & Kitchen
   18 words (6 nouns, 8 verbs, 4 adjectives)
   6 sentences
   1 story (128 words)
   5 synonym/antonym pairs
   No schema errors found.
```

### 5. Update the index
```bash
node scripts/generate-index.js
# Rewrites data/index.json to include your new topic
```

### 6. Open a Pull Request

Title format: `[A2] Add topic: Kochen (Cooking & Kitchen)`

In the PR description, confirm:
- [ ] I validated the file with `node scripts/validate.js`
- [ ] I ran `node scripts/generate-index.js`
- [ ] The topic has at least 12 words
- [ ] No book names or copyrighted curriculum references in the data
- [ ] All translations are accurate (native speaker or verified)

---

## Quality Standards

### What we accept
- Topics relevant to everyday German life: food, work, travel, health, relationships, technology, culture, news
- Topics relevant to language exam preparation: describing people, expressing opinions, formal writing
- Specialised vocabulary with clear learner value: medicine, environment, economics (B2 level)

### What we don't accept
- Crude, offensive, or politically slanted content
- Content directly copied from copyrighted textbooks
- Topics with fewer than 10 words
- Files that fail schema validation
- Placeholder or AI-generated content submitted without human review

---

## Editing Existing Topics

Found a mistake? Great catch. Open a PR with just the change — no need to add more words or restructure the file.

Use the **Word Correction** issue template if you want to flag an error without fixing it yourself.

---

## Using AI to Draft Topics

AI (Claude, ChatGPT, etc.) can draft a topic JSON quickly. This is fine — we use it ourselves. But:

1. **Always review AI output before submitting.** AI models make grammatical errors in German, invent collocations that don't exist, and occasionally hallucinate definitions.
2. **Test it in WortGalaxie first.** Open `index.html`, paste your topic into the AI generator box (or temporarily add it to the DB), and verify every section renders correctly.
3. **Mark your PR** with the label `ai-drafted` so reviewers know to check carefully.

A great workflow: use the WortGalaxie AI Topic Generator to draft the JSON, review it, correct it, then commit it to the repo.

---

## Code of Conduct

Be kind, be accurate, be patient. This project exists to help people learn — that's it.

If you have questions, open a Discussion or tag @yourusername in your PR.
