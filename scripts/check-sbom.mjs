import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

const result = spawnSync('npm', ['sbom', '--omit=dev', '--sbom-format=cyclonedx'], {
  cwd: new URL('../', import.meta.url),
  encoding: 'utf8'
})
assert.equal(result.status, 0, result.stdout + result.stderr)
const sbom = JSON.parse(result.stdout)
assert.equal(sbom.bomFormat, 'CycloneDX')
// npm 10 derives `metadata.component.name` from the checkout directory even
// though the package identity is scoped. GitHub checks out this repository as
// `stackline-deep-copy`, while the release workspace is named `deep-copy`.
// Validate the stable package coordinates instead of that location-dependent
// display field.
assert.equal(sbom.metadata.component['bom-ref'], '@stackline/deep-copy@1.0.0')
assert.equal(sbom.metadata.component.purl, 'pkg:npm/%40stackline/deep-copy@1.0.0')
assert.equal(sbom.metadata.component.version, '1.0.0')
assert.deepEqual(sbom.components || [], [])
assert.deepEqual(sbom.dependencies, [
  { ref: '@stackline/deep-copy@1.0.0', dependsOn: [] }
])

console.log('CycloneDX SBOM matches the one-node production closure.')
