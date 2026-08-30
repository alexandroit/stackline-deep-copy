import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const output = new URL('../site-dist/', import.meta.url)
const metadata = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))

await rm(output, { force: true, recursive: true })
await mkdir(output, { recursive: true })
for (const filename of ['CHANGELOG.md', 'COMPATIBILITY_CONTRACT.md', 'LICENSE', 'MIGRATION.md', 'NOTICE', 'README.md', 'SECURITY.md', 'THIRD_PARTY_LICENSES.md']) {
  await cp(new URL(filename, root), new URL(filename, output))
}
for (const filename of ['app.js', 'index.html', 'llms-full.txt', 'llms.txt', 'robots.txt', 'sitemap.xml', 'styles.css']) {
  await cp(new URL(`docs-site/${filename}`, root), new URL(filename, output))
}
await writeFile(new URL('package-meta.json', output), `${JSON.stringify({
  name: metadata.name,
  version: metadata.version,
  repository: metadata.repository.url.replace(/^git\+/, '').replace(/\.git$/, ''),
  npm: `https://www.npmjs.com/package/${metadata.name}`
}, null, 2)}\n`)

console.log('Built package documentation site.')
