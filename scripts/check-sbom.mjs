import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

const result = spawnSync('npm', ['sbom', '--omit=dev', '--sbom-format=cyclonedx'], {
  cwd: new URL('../', import.meta.url),
  encoding: 'utf8'
})
assert.equal(result.status, 0, result.stdout + result.stderr)
const sbom = JSON.parse(result.stdout)
assert.equal(sbom.bomFormat, 'CycloneDX')
assert.equal(sbom.metadata.component.name, 'deep-copy')
assert.equal(sbom.metadata.component.version, '1.0.0')
assert.deepEqual(sbom.components || [], [])

console.log('CycloneDX SBOM matches the one-node production closure.')
