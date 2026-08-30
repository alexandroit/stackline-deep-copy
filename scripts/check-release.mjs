import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const metadata = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
assert.equal(metadata.name, '@stackline/deep-copy')
assert.equal(metadata.version, '1.0.0')
assert.equal(metadata.license, 'MIT')
assert.equal(metadata.repository.url, 'git+https://github.com/alexandroit/stackline-deep-copy.git')
assert.equal(metadata.homepage, 'https://alexandro.net/docs/vanilla/deep-copy/')
assert.equal(metadata.publishConfig.access, 'public')
assert.equal(metadata.engines.node, '>=4.0.0')
assert.deepEqual(metadata.dependencies, {})

for (const filename of ['CHANGELOG.md', 'COMPATIBILITY_CONTRACT.md', 'LICENSE', 'MIGRATION.md', 'NOTICE', 'README.md', 'SECURITY.md', 'THIRD_PARTY_LICENSES.md']) {
  assert.equal(metadata.files.includes(filename), true, `${filename} is packed`)
}

console.log('Release identity, URLs, contract, and packed metadata passed.')
