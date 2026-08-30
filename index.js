;(function (name, root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory()
  /* c8 ignore next 5 -- exercised in isolated AMD/global VM tests */
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    root[name] = factory()
  }
}('dcopy', this, function () {
  'use strict'

  var MAX_COMPOSITE_NODES = 100000

  function activeStore () {
    var weak = typeof WeakMap === 'function' ? new WeakMap() : null
    var sources = []
    var copies = []

    return {
      delete: function (source) {
        if (weak) {
          weak.delete(source)
          return
        }
        /* c8 ignore next 7 -- fallback for browsers without WeakMap */
        for (var index = sources.length - 1; index >= 0; index -= 1) {
          if (sources[index] === source) {
            sources.splice(index, 1)
            copies.splice(index, 1)
            return
          }
        }
      },
      get: function (source) {
        if (weak) return weak.get(source)
        /* c8 ignore next 4 -- fallback for browsers without WeakMap */
        for (var index = sources.length - 1; index >= 0; index -= 1) {
          if (sources[index] === source) return copies[index]
        }
      },
      set: function (source, copy) {
        if (weak) {
          weak.set(source, copy)
          return
        }
        /* c8 ignore next 2 -- fallback for browsers without WeakMap */
        sources.push(source)
        copies.push(copy)
      }
    }
  }

  function enumerableKeys (target) {
    var keys = []
    for (var key in target) keys.push(key)
    return keys
  }

  function add (copy, key, value) {
    if (copy instanceof Array) {
      copy.push(value)
      return copy[copy.length - 1]
    }

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      Object.defineProperty(copy, key, {
        configurable: true,
        enumerable: true,
        value: value,
        writable: true
      })
      return copy[key]
    }

    copy[key] = value
    return copy[key]
  }

  function dcopy (target) {
    if (/number|string|boolean/.test(typeof target)) return target
    if (target instanceof Date) return new Date(target.getTime())

    var rootCopy = target instanceof Array ? [] : {}
    var active = activeStore()
    var compositeNodes = 1
    var stack = [{
      copy: rootCopy,
      index: 0,
      keys: enumerableKeys(target),
      source: target
    }]

    if ((typeof target === 'object' && target !== null) || typeof target === 'function') {
      active.set(target, rootCopy)
    }

    while (stack.length !== 0) {
      var frame = stack[stack.length - 1]
      if (frame.index >= frame.keys.length) {
        if ((typeof frame.source === 'object' && frame.source !== null) || typeof frame.source === 'function') {
          active.delete(frame.source)
        }
        stack.pop()
        continue
      }

      var key = frame.keys[frame.index]
      frame.index += 1
      var value = frame.source[key]

      if (value instanceof Date) {
        add(frame.copy, key, new Date(value.getTime()))
      } else if (value instanceof Function) {
        add(frame.copy, key, value)
      } else if (value instanceof Array || value instanceof Object) {
        var ancestor = active.get(value)
        if (ancestor !== undefined) {
          add(frame.copy, key, ancestor)
          continue
        }

        compositeNodes += 1
        if (compositeNodes > MAX_COMPOSITE_NODES) {
          var error = new RangeError('deep-copy input exceeds the 100000 composite-node safety limit')
          error.code = 'ERR_STACKLINE_DEEP_COPY_LIMIT'
          throw error
        }

        var child = value instanceof Array ? [] : {}
        var destination = add(frame.copy, key, child)
        active.set(value, destination)
        stack.push({
          copy: destination,
          index: 0,
          keys: enumerableKeys(value),
          source: value
        })
      } else {
        add(frame.copy, key, value)
      }
    }

    return rootCopy
  }

  return dcopy
}))
