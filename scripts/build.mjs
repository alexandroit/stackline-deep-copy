import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const metadata = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))

execFileSync(process.execPath, ['--check', new URL('index.js', root).pathname], { stdio: 'inherit' })
execFileSync(process.execPath, ['--check', new URL('index.mjs', root).pathname], { stdio: 'inherit' })
await mkdir(new URL('dist/', root), { recursive: true })
await writeFile(new URL('dist/build-meta.json', root), `${JSON.stringify({
  name: metadata.name,
  runtimeDependencies: Object.keys(metadata.dependencies || {}).length,
  version: metadata.version
}, null, 2)}\n`)

console.log(`Validated ${metadata.name}@${metadata.version} runtime entries.`)
