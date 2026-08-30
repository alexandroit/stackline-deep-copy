import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-deep-copy-direct-'))
let tarball

function run (command, arguments_, cwd) {
  return spawnSync(command, arguments_, { cwd, encoding: 'utf8', env: { ...process.env, NO_UPDATE_NOTIFIER: '1' } })
}

try {
  const packed = run('npm', ['pack', '--silent', '--json', '--ignore-scripts'], root)
  assert.equal(packed.status, 0, packed.stderr)
  const record = JSON.parse(packed.stdout.slice(packed.stdout.lastIndexOf('\n[') + 1))[0]
  tarball = path.join(root, record.filename)

  const paths = record.files.map((file) => file.path)
  for (const required of ['LICENSE', 'NOTICE', 'THIRD_PARTY_LICENSES.md', 'index.js', 'index.mjs', 'index.d.ts']) {
    assert.equal(paths.includes(required), true, `missing ${required}`)
  }
  assert.equal(paths.some((file) => /^(scripts|test|docs-site|release-candidate)\//.test(file)), false)

  await writeFile(path.join(temporary, 'package.json'), `${JSON.stringify({
    private: true,
    dependencies: { '@stackline/deep-copy': `file:${tarball}` }
  }, null, 2)}\n`)
  const installed = run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], temporary)
  assert.equal(installed.status, 0, installed.stdout + installed.stderr)
  assert.doesNotMatch(installed.stdout + installed.stderr, /warn|deprecated|invalid|extraneous/i)

  const commonjs = run(process.execPath, ['--input-type=commonjs', '-e', [
    "const dcopy=require('@stackline/deep-copy');",
    "const deep=require('@stackline/deep-copy/index.js');",
    "const x={nested:{value:1}};x.self=x;const y=dcopy(x);",
    "if(deep!==dcopy||y===x||y.nested===x.nested||y.self!==y)process.exit(1);"
  ].join('')], temporary)
  assert.equal(commonjs.status, 0, commonjs.stderr)

  const esm = run(process.execPath, ['--input-type=module', '-e', [
    "import dcopy from '@stackline/deep-copy';",
    "const x={nested:{value:1}};const y=dcopy(x);",
    "if(y===x||y.nested===x.nested)process.exit(1);"
  ].join('')], temporary)
  assert.equal(esm.status, 0, esm.stderr)

  const listed = run('npm', ['ls', '--all', '--json'], temporary)
  assert.equal(listed.status, 0, listed.stdout + listed.stderr)
  const tree = JSON.parse(listed.stdout)
  assert.deepEqual(tree.problems || [], [])

  const audited = run('npm', ['audit', '--json'], temporary)
  assert.equal(audited.status, 0, audited.stdout + audited.stderr)
  const audit = JSON.parse(audited.stdout)
  assert.equal(audit.metadata.vulnerabilities.total, 0)

  const manifest = JSON.parse(await readFile(path.join(temporary, 'node_modules', '@stackline', 'deep-copy', 'package.json'), 'utf8'))
  assert.equal(manifest.name, '@stackline/deep-copy')
  assert.deepEqual(manifest.dependencies, {})
} finally {
  if (tarball) await rm(tarball, { force: true })
  await rm(temporary, { force: true, recursive: true })
}

console.log('Clean packed scoped install, CJS/ESM, npm ls, and audit checks passed.')
