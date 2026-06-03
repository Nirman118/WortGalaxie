#!/usr/bin/env node
/**
 * WortGalaxie Topic Validator
 * Usage: node scripts/validate.js data/a2/schule.json
 *        node scripts/validate.js --all          (validates every topic file)
 */

const fs = require('fs');
const path = require('path');

const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2'];
const VALID_TYPES  = ['noun', 'verb', 'adjective', 'phrase'];
const VALID_ARTICLES = ['der', 'die', 'das', null];
const CHAPTER_PATTERN = /^[AB][12] · .+$/;
const ID_PATTERN = /^[a-z0-9_]+$/;

function validateTopic(filepath) {
  const errors = [];
  const warnings = [];

  // ── Load file ─────────────────────────────────────────
  let raw;
  try {
    raw = fs.readFileSync(filepath, 'utf-8');
  } catch (e) {
    return { ok: false, errors: [`Cannot read file: ${e.message}`], warnings: [] };
  }

  let topic;
  try {
    topic = JSON.parse(raw);
  } catch (e) {
    return { ok: false, errors: [`Invalid JSON: ${e.message}`], warnings: [] };
  }

  // ── Required top-level fields ─────────────────────────
  const required = ['id', 'level', 'topic', 'chapter', 'keys', 'words', 'sents', 'story', 'story_en'];
  for (const f of required) {
    if (topic[f] === undefined || topic[f] === null || topic[f] === '') {
      errors.push(`Missing required field: "${f}"`);
    }
  }
  if (errors.length) return { ok: false, errors, warnings };

  // ── Field format validation ────────────────────────────
  if (!ID_PATTERN.test(topic.id))
    errors.push(`"id" must be lowercase letters, numbers, underscores only. Got: "${topic.id}"`);

  if (!VALID_LEVELS.includes(topic.level))
    errors.push(`"level" must be one of A1/A2/B1/B2. Got: "${topic.level}"`);

  if (!CHAPTER_PATTERN.test(topic.chapter))
    errors.push(`"chapter" format must be "A2 · Category Name". Got: "${topic.chapter}"`);

  if (!Array.isArray(topic.keys) || topic.keys.length < 3)
    errors.push('"keys" must be an array with at least 3 search terms');

  // Check no book names in chapter (security/copyright)
  const forbiddenTerms = ['Netzwerk', 'Aspekte', 'Studio', 'Schritte', 'DaF', 'Kap.'];
  for (const term of forbiddenTerms) {
    if (topic.chapter.includes(term) || topic.topic.includes(term))
      errors.push(`Remove book/textbook reference "${term}" from chapter or topic name`);
  }

  // ── Words validation ───────────────────────────────────
  if (!Array.isArray(topic.words)) {
    errors.push('"words" must be an array');
  } else {
    if (topic.words.length < 5)
      errors.push(`"words" needs at least 5 entries. Found: ${topic.words.length}`);
    if (topic.words.length < 10)
      warnings.push(`"words" has only ${topic.words.length} entries — aim for 15–20 for a complete topic`);
    if (topic.words.length > 30)
      warnings.push(`"words" has ${topic.words.length} entries — consider splitting into two topics if > 30`);

    const typeCounts = { noun: 0, verb: 0, adjective: 0, phrase: 0 };
    topic.words.forEach((w, i) => {
      const prefix = `words[${i}] ("${w.g || '?'}")`;
      if (!w.g) errors.push(`${prefix}: missing "g" (German word)`);
      if (!w.e) errors.push(`${prefix}: missing "e" (English translation)`);
      if (!VALID_TYPES.includes(w.t)) errors.push(`${prefix}: "t" must be noun/verb/adjective/phrase. Got: "${w.t}"`);
      if (w.t === 'noun' && !VALID_ARTICLES.includes(w.a))
        errors.push(`${prefix}: noun must have "a" set to der/die/das. Got: "${w.a}"`);
      if ((w.t === 'verb' || w.t === 'adjective') && w.a !== null)
        warnings.push(`${prefix}: verbs/adjectives should have "a": null`);
      if (!Array.isArray(w.v) || w.v.length < 2)
        warnings.push(`${prefix}: should have at least 2 related forms in "v"`);
      if (w.t) typeCounts[w.t] = (typeCounts[w.t] || 0) + 1;
    });

    if (typeCounts.noun === 0) warnings.push('No nouns found — add at least 2–3 nouns');
    if (typeCounts.verb === 0) warnings.push('No verbs found — add at least 2–3 verbs');
  }

  // ── Sentences validation ───────────────────────────────
  if (!Array.isArray(topic.sents)) {
    errors.push('"sents" must be an array');
  } else {
    if (topic.sents.length < 3) errors.push(`Need at least 3 sentences. Found: ${topic.sents.length}`);
    if (topic.sents.length < 6) warnings.push(`Only ${topic.sents.length} sentences — aim for 6`);
    topic.sents.forEach((s, i) => {
      if (!s.g) errors.push(`sents[${i}]: missing "g" (German sentence)`);
      if (!s.e) errors.push(`sents[${i}]: missing "e" (English translation)`);
    });
  }

  // ── Story validation ───────────────────────────────────
  if (typeof topic.story === 'string' && topic.story.length < 100)
    warnings.push(`Story seems short (${topic.story.length} chars) — aim for 4–6 full sentences`);
  if (!topic.story_en)
    errors.push('Missing "story_en" — English translation of the story is required');

  // ── SA validation (optional but checked if present) ────
  if (topic.sa && Array.isArray(topic.sa)) {
    topic.sa.forEach((e, i) => {
      if (!e.w) errors.push(`sa[${i}]: missing "w" (word)`);
      if (!['verb', 'adjective'].includes(e.t))
        errors.push(`sa[${i}]: "t" must be "verb" or "adjective". Got: "${e.t}"`);
      if ((!e.syn || e.syn.length === 0) && (!e.ant || e.ant.length === 0))
        warnings.push(`sa[${i}] ("${e.w}"): has neither synonyms nor antonyms`);
    });
  }

  return { ok: errors.length === 0, errors, warnings, stats: {
    words: topic.words?.length || 0,
    sents: topic.sents?.length || 0,
    sa: topic.sa?.length || 0,
    storyWords: topic.story?.split(' ').length || 0,
  }};
}

function validateAll() {
  const dataDir = path.join(__dirname, '..', 'data');
  const levels = ['a1', 'a2', 'b1', 'b2'];
  let totalFiles = 0, totalErrors = 0;

  for (const level of levels) {
    const levelDir = path.join(dataDir, level);
    if (!fs.existsSync(levelDir)) continue;
    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const filepath = path.join(levelDir, file);
      const result = validateTopic(filepath);
      totalFiles++;
      if (result.ok) {
        console.log(`✅ ${level}/${file} — ${result.stats.words} words, ${result.stats.sents} sentences`);
      } else {
        console.log(`❌ ${level}/${file}`);
        result.errors.forEach(e => console.log(`   ERROR: ${e}`));
        totalErrors += result.errors.length;
      }
      result.warnings.forEach(w => console.log(`   ⚠️  ${w}`));
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Validated ${totalFiles} files. ${totalErrors === 0 ? '✅ All valid.' : `❌ ${totalErrors} error(s) found.`}`);
  process.exit(totalErrors > 0 ? 1 : 0);
}

// ── Entry point ────────────────────────────────────────
const arg = process.argv[2];

if (!arg) {
  console.log('Usage:');
  console.log('  node scripts/validate.js data/a2/schule.json   # validate one file');
  console.log('  node scripts/validate.js --all                 # validate all files');
  process.exit(0);
}

if (arg === '--all') {
  validateAll();
} else {
  const result = validateTopic(arg);
  const filename = path.basename(arg);

  if (result.ok) {
    console.log(`\n✅ ${filename} is valid\n`);
    console.log(`   📊 ${result.stats.words} words · ${result.stats.sents} sentences · ${result.stats.sa} SA pairs · ${result.stats.storyWords} story words`);
  } else {
    console.log(`\n❌ ${filename} has ${result.errors.length} error(s)\n`);
    result.errors.forEach(e => console.log(`   ✗ ${e}`));
  }

  if (result.warnings.length > 0) {
    console.log(`\n⚠️  ${result.warnings.length} warning(s):`);
    result.warnings.forEach(w => console.log(`   △ ${w}`));
  }

  process.exit(result.ok ? 0 : 1);
}
