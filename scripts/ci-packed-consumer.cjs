'use strict'

var assert = require('assert')
var fs = require('fs')
var os = require('os')
var path = require('path')
var spawnSync = require('child_process').spawnSync

var artifactDirectory = path.resolve(process.argv[2] || 'artifact')
var archives = fs.readdirSync(artifactDirectory).filter(function (entry) { return /\.tgz$/.test(entry) })
assert.strictEqual(archives.length, 1)
var workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'stackline-deep-copy-packed-'))

try {
  fs.writeFileSync(path.join(workspace, 'package.json'), JSON.stringify({ private: true }, null, 2) + '\n')
  var installed = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', path.join(artifactDirectory, archives[0])], {
    cwd: workspace,
    shell: process.platform === 'win32',
    stdio: 'inherit'
  })
  if (installed.error) throw installed.error
  if (installed.status !== 0) process.exit(installed.status || 1)

  var dcopy = require(path.join(workspace, 'node_modules', '@stackline', 'deep-copy'))
  var source = { nested: { value: 1 } }
  source.self = source
  var copy = dcopy(source)
  assert.notStrictEqual(copy, source)
  assert.notStrictEqual(copy.nested, source.nested)
  assert.strictEqual(copy.self, copy)

  var listed = spawnSync('npm', ['ls', '--all'], {
    cwd: workspace,
    shell: process.platform === 'win32',
    stdio: 'inherit'
  })
  if (listed.error) throw listed.error
  assert.strictEqual(listed.status, 0)
  process.stdout.write(JSON.stringify({ node: process.version, platform: process.platform, status: 'pass' }) + '\n')
} finally {
  if (typeof fs.rmSync === 'function') fs.rmSync(workspace, { force: true, recursive: true })
}
