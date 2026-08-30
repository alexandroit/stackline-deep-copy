'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const dcopy = require('../index.js')

test('defines dangerous keys without mutating the destination prototype', () => {
  const source = {}
  Object.defineProperty(source, '__proto__', {
    enumerable: true,
    value: { polluted: true },
    writable: true
  })
  source.constructor = { marker: 1 }
  source.prototype = { marker: 2 }

  const copy = dcopy(source)
  assert.equal(Object.getPrototypeOf(copy), Object.prototype)
  assert.equal(Object.hasOwn(copy, '__proto__'), true)
  assert.deepEqual(copy.__proto__, { polluted: true })
  assert.deepEqual(copy.constructor, { marker: 1 })
  assert.deepEqual(copy.prototype, { marker: 2 })
  assert.equal({}.polluted, undefined)
})

test('retains documented getter evaluation without invoking destination setters', () => {
  let reads = 0
  const source = {}
  Object.defineProperty(source, 'value', {
    enumerable: true,
    get () {
      reads += 1
      return { ok: true }
    }
  })
  const copy = dcopy(source)
  assert.equal(reads, 1)
  assert.deepEqual(copy.value, { ok: true })
})

test('propagates source getter errors', () => {
  const source = {}
  Object.defineProperty(source, 'boom', {
    enumerable: true,
    get () { throw new Error('fixture failure') }
  })
  assert.throws(() => dcopy(source), /fixture failure/)
})

test('enforces the documented composite-node allocation limit', () => {
  const source = {}
  for (let index = 0; index < 100000; index += 1) source[index] = {}
  assert.throws(() => dcopy(source), (error) => {
    assert.equal(error.code, 'ERR_STACKLINE_DEEP_COPY_LIMIT')
    return true
  })
})
