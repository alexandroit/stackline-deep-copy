'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const upstream = require('deep-copy-upstream')
const maintained = require('../index.js')

function snapshot (value) {
  return JSON.stringify(value, (key, entry) => entry instanceof Date
    ? { $date: entry.toISOString() }
    : entry)
}

test('matches upstream for ordinary nested data', () => {
  const fixture = {
    bool: false,
    date: new Date('2024-01-02T03:04:05.000Z'),
    list: [1, { ok: true }, [3]],
    nil: null,
    number: 12,
    object: { a: 'b' },
    text: 'value',
    undef: undefined
  }
  assert.equal(snapshot(maintained(fixture)), snapshot(upstream(fixture)))
})

test('matches legacy inherited-key, sparse-array, and alias behavior', () => {
  const prototype = { inherited: { value: 1 } }
  const fixture = Object.create(prototype)
  fixture.own = { value: 2 }
  const legacy = upstream(fixture)
  const copy = maintained(fixture)
  assert.deepEqual(copy, legacy)
  assert.equal(Object.hasOwn(copy, 'inherited'), true)

  const sparse = []
  sparse[2] = 'third'
  sparse.extra = 'custom'
  assert.deepEqual(maintained(sparse), upstream(sparse))

  const shared = { value: 1 }
  const aliasCopy = maintained({ left: shared, right: shared })
  assert.notEqual(aliasCopy.left, aliasCopy.right)
  assert.deepEqual(aliasCopy, upstream({ left: shared, right: shared }))
})

test('matches characterized legacy fallbacks outside the promised surface', () => {
  for (const value of [null, undefined, Symbol('x'), 1n, /x/g, new Map([[1, 2]]), new Set([1])]) {
    assert.deepEqual(maintained(value), upstream(value))
  }

  function Example () { this.value = 1 }
  assert.deepEqual(maintained(new Example()), upstream(new Example()))

  function rootFunction () {}
  rootFunction.value = { nested: true }
  assert.deepEqual(maintained(rootFunction), upstream(rootFunction))
})
