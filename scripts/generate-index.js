#!/usr/bin/env node
/**
 * WortGalaxie Index Generator
 * Rebuilds data/index.json from all topic files.
 * Run after adding or modifying any topic file.
 *
 * Usage: node scripts/generate-index.js
 */

const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const LEVELS   = ['a1', 'a2', 'b1', 'b2'];

function buildIndex() {
  const index = {
    schema_version: '1.0.0',
    generated_at: new Date().toISOString(),
    total_topics: 0,
    total_words: 0,
    levels: {}
  };

  for (const level of LEVELS) {
    const levelKey = level.toUpperCase();
    const levelDir = path.join(DATA_DIR, level);

    if (!fs.existsSync(levelDir)) {
      index.levels[levelKey] = [];
      continue;
    }

    const files = fs.readdirSync(levelDir)
      .filter(f => f.endsWith('.json'))
      .sort();

    const entries = [];

    for (const file of files) {
      const filepath = path.join(levelDir, file);
      let topic;
      try {
        topic = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      } catch (e) {
        console.error(`⚠️  Skipping ${file} — invalid JSON: ${e.message}`);
        continue;
      }

      const wordCount = Array.isArray(topic.words) ? topic.words.length : 0;
      const saCount   = Array.isArray(topic.sa)    ? topic.sa.length    : 0;

      entries.push({
        id:         topic.id,
        topic:      topic.topic,
        chapter:    topic.chapter,
        keys:       topic.keys || [],
        word_count: wordCount,
        sa_count:   saCount,
        has_story:  Boolean(topic.story),
        file:       `${level}/${file}`
      });

      index.total_words += wordCount;
    }

    index.levels[levelKey] = entries;
    index.total_topics += entries.length;
  }

  const outPath = path.join(DATA_DIR, 'index.json');
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf-8');

  console.log('\n✅ data/index.json rebuilt\n');
  console.log(`   Topics : ${index.total_topics}`);
  console.log(`   Words  : ${index.total_words}`);
  for (const [lvl, entries] of Object.entries(index.levels)) {
    const words = entries.reduce((a, e) => a + e.word_count, 0);
    console.log(`   ${lvl}     : ${entries.length} topics · ${words} words`);
  }
  console.log('');
}

buildIndex();
