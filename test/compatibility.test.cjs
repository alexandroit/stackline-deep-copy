'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const dcopy = require('../index.js')

test('preserves self and mutual cycles without preserving unrelated aliases', () => {
  const root = { name: 'root' }
  const child = { parent: root }
  root.child = child
  root.self = root
  const shared = { value: 1 }
  root.left = shared
  root.right = shared

  const copy = dcopy(root)
  assert.notEqual(copy, root)
  assert.equal(copy.self, copy)
  assert.equal(copy.child.parent, copy)
  assert.notEqual(copy.left, shared)
  assert.notEqual(copy.right, shared)
  assert.notEqual(copy.left, copy.right)
})

test('retains nested function identity and copies dates by timestamp', () => {
  const callback = () => 'ok'
  const source = { callback, date: new Date(1234) }
  const copy = dcopy(source)
  assert.equal(copy.callback, callback)
  assert.notEqual(copy.date, source.date)
  assert.equal(copy.date.getTime(), 1234)
})

test('keeps classic dense-array ordering', () => {
  const copy = dcopy([{ value: 1 }, 2, 3])
  assert.deepEqual(copy, [{ value: 1 }, 2, 3])
  assert.notEqual(copy[0], undefined)
})
