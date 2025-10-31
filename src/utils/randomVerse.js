import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../data/tafsir.json')

let verses = []

// ✅ Load tafsir data once when the module is imported
try {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  verses = JSON.parse(raw)
  console.log(`📖 Loaded ${verses.length} verses from tafsir.json`)
} catch (err) {
  console.error('❌ Failed to load tafsir.json:', err.message)
}

/**
 * Returns a random verse and tafsir.
 * @returns {{ ayah: string, reference: string, tafsir: string }}
 */
export function randomVerse() {
  if (!verses || verses.length === 0) {
    return {
      ayah: '“Indeed, Allah does not burden a soul beyond that it can bear.”',
      reference: 'Al-Baqarah, 2:286',
      tafsir:
        'Even in the hardest trials, Allah knows your limits and grants you the strength to endure.',
      image: null,
      audio: null,
      video: null,
    }
  }

  const randomIndex = Math.floor(Math.random() * verses.length)
  return verses[randomIndex]
}
