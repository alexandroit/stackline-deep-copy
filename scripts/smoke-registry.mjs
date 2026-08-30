import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const metadata = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const registry = process.env.STACKLINE_REGISTRY
assert.match(registry || '', /^https?:\/\//, 'STACKLINE_REGISTRY is required')

function run (command, arguments_, cwd) {
  return spawnSync(command, arguments_, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, NO_UPDATE_NOTIFIER: '1', npm_config_registry: registry }
  })
}

for (const mode of ['scoped', 'alias']) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), `stackline-deep-copy-${mode}-`))
  try {
    const dependencies = mode === 'scoped'
      ? { [metadata.name]: metadata.version }
      : { 'deep-copy': `npm:${metadata.name}@${metadata.version}` }
    await writeFile(path.join(temporary, 'package.json'), `${JSON.stringify({ private: true, dependencies }, null, 2)}\n`)
    const installed = run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], temporary)
    assert.equal(installed.status, 0, installed.stdout + installed.stderr)
    assert.doesNotMatch(installed.stdout + installed.stderr, /warn|deprecated|invalid|extraneous/i)

    const key = mode === 'scoped' ? metadata.name : 'deep-copy'
    const executed = run(process.execPath, ['--input-type=commonjs', '-e', [
      `const dcopy=require(${JSON.stringify(key)});`,
      "const x={nested:{value:1}};x.self=x;const y=dcopy(x);",
      "if(y===x||y.nested===x.nested||y.self!==y)process.exit(1);"
    ].join('')], temporary)
    assert.equal(executed.status, 0, executed.stderr)

    const listed = run('npm', ['ls', '--all', '--json'], temporary)
    assert.equal(listed.status, 0, listed.stdout + listed.stderr)
    assert.deepEqual(JSON.parse(listed.stdout).problems || [], [])
    const audited = run('npm', ['audit', '--json'], temporary)
    assert.equal(audited.status, 0, audited.stdout + audited.stderr)
    assert.equal(JSON.parse(audited.stdout).metadata.vulnerabilities.total, 0)
  } finally {
    await rm(temporary, { force: true, recursive: true })
  }
}

console.log(`Clean direct and legacy-key alias installs passed against ${registry}.`)
