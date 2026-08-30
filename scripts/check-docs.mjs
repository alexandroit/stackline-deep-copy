import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

for (const filename of ['index.html', 'llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml', 'package-meta.json']) {
  const text = await readFile(new URL(`../site-dist/${filename}`, import.meta.url), 'utf8')
  assert.doesNotMatch(text, /(localhost|127\.0\.0\.1|verdaccio|Stackline package registry)/i)
}

const html = await readFile(new URL('../site-dist/index.html', import.meta.url), 'utf8')
assert.match(html, /<title>@stackline\/deep-copy \| Alexandro\.Net<\/title>/)
assert.match(html, /Alexandro\.Net/)
assert.match(html, /@stackline\/deep-copy/)

console.log('Documentation branding, public URLs, and machine-readable files passed.')
