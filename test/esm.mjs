import assert from 'node:assert/strict'
import dcopy from '../index.mjs'

const source = { nested: { value: 1 } }
const copy = dcopy(source)
assert.deepEqual(copy, source)
assert.notEqual(copy.nested, source.nested)
