'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const dcopy = require('../index.js')

test('preserves the complete upstream source test contract', () => {
  assert.equal(dcopy(42), 42)
  assert.equal(dcopy('a'), 'a')
  assert.equal(dcopy(true), true)

  const object = { a: 0 }
  const objectCopy = dcopy(object)
  assert.deepEqual(objectCopy, object)
  objectCopy.a = 1
  assert.deepEqual(object, { a: 0 })

  const array = [0]
  const arrayCopy = dcopy(array)
  assert.deepEqual(arrayCopy, array)
  arrayCopy[0] = 1
  assert.deepEqual(array, [0])

  const date = new Date(2017, 0, 1)
  const dateCopy = dcopy(date)
  assert.deepEqual(dateCopy, date)
  dateCopy.setMonth(5)
  assert.equal(date.getMonth(), 0)
  assert.equal(dateCopy.getMonth(), 5)

  const nested = { object: { a: 0 }, array: [0], date, func: function () {} }
  const nestedCopy = dcopy(nested)
  assert.deepEqual(nestedCopy, nested)
  assert.notEqual(nestedCopy.object, nested.object)
  assert.notEqual(nestedCopy.array, nested.array)
  assert.notEqual(nestedCopy.date, nested.date)
  assert.equal(nestedCopy.func, nested.func)
})
