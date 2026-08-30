import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const candidates = [
  process.execPath,
  '/home/xandrobr/.nvm/versions/node/v8.17.0/bin/node',
  '/home/xandrobr/.nvm/versions/node/v10.24.1/bin/node',
  '/home/xandrobr/.nvm/versions/node/v12.22.12/bin/node',
  '/home/xandrobr/.nvm/versions/node/v14.21.3/bin/node',
  '/home/xandrobr/.nvm/versions/node/v16.20.2/bin/node',
  '/home/xandrobr/.nvm/versions/node/v18.20.8/bin/node',
  '/home/xandrobr/.nvm/versions/node/v20.20.2/bin/node',
  '/home/xandrobr/.nvm/versions/node/v22.23.0/bin/node',
  '/home/xandrobr/.nvm/versions/node/v24.19.0/bin/node',
  '/home/xandrobr/.nvm/versions/node/v26.8.1/bin/node'
]

const unique = [...new Set(candidates.filter(existsSync))]
for (const executable of unique) {
  const result = spawnSync(executable, ['test/runtime-compat.cjs'], {
    cwd: new URL('../', import.meta.url),
    encoding: 'utf8'
  })
  assert.equal(result.status, 0, result.stdout + result.stderr)
  process.stdout.write(result.stdout)
}

assert.ok(unique.length >= 1)
