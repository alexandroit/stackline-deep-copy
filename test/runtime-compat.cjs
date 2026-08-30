'use strict'

var assert = require('assert')
var dcopy = require('../index.js')
var source = { list: [1, { value: 2 }], nested: { ok: true } }
source.self = source
var copy = dcopy(source)

assert.deepEqual(copy.list, source.list)
assert.notStrictEqual(copy.list, source.list)
assert.notStrictEqual(copy.list[1], source.list[1])
assert.notStrictEqual(copy.nested, source.nested)
assert.strictEqual(copy.self, copy)
process.stdout.write(JSON.stringify({ node: process.version, status: 'pass' }) + '\n')
