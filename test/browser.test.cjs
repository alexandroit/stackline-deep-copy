'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const source = fs.readFileSync(path.join(__dirname, '..', 'index.js'), 'utf8')

test('classic script exposes global dcopy', () => {
  const context = vm.createContext({})
  vm.runInContext(source, context)
  assert.equal(typeof context.dcopy, 'function')
  assert.equal(JSON.stringify(context.dcopy({ nested: { value: 1 } })), '{"nested":{"value":1}}')
})

test('AMD receives the callable factory result', () => {
  let exported
  const define = (factory) => { exported = factory() }
  define.amd = {}
  const context = vm.createContext({ define })
  vm.runInContext(source, context)
  assert.equal(typeof exported, 'function')
  assert.equal(JSON.stringify(exported({ value: 1 })), '{"value":1}')
})
