'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const dcopy = require('../index.js')

test('copies a 25000-level object without call-stack recursion', () => {
  const source = {}
  let cursor = source
  for (let index = 0; index < 25000; index += 1) {
    cursor.next = {}
    cursor = cursor.next
  }
  cursor.root = source

  const copy = dcopy(source)
  let copyCursor = copy
  for (let index = 0; index < 25000; index += 1) copyCursor = copyCursor.next
  assert.equal(copyCursor.root, copy)
})

test('copies a broad graph deterministically', () => {
  const source = {}
  for (let index = 0; index < 10000; index += 1) {
    source[`key-${index}`] = { index, values: [index, index + 1] }
  }
  const copy = dcopy(source)
  assert.equal(Object.keys(copy).length, 10000)
  assert.deepEqual(copy['key-9999'], { index: 9999, values: [9999, 10000] })
})
