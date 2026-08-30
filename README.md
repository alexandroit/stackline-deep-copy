# @stackline/deep-copy

A compatibility-first maintained continuation of `deep-copy@1.4.2` for legacy
CommonJS, AMD, and classic-browser consumers. It preserves the small upstream
contract while adding native ESM/types, safe dangerous-key writes, cycle
support, a bounded composite-node limit, and current release engineering.

Stackline maintains this package independently. It is not affiliated with or
endorsed by the original maintainer.

## Install

Direct scoped installation:

```sh
npm install @stackline/deep-copy
```

Identity-preserving migration under the historical dependency key:

```json
{
  "dependencies": {
    "deep-copy": "npm:@stackline/deep-copy@^1.0.0"
  }
}
```

Existing CommonJS imports remain unchanged:

```js
const dcopy = require('deep-copy')
const cloned = dcopy({ nested: { value: 1 } })
```

Native ESM and the scoped key are also supported:

```js
import dcopy from '@stackline/deep-copy'
```

Loading `index.js` as a classic browser script exposes `window.dcopy`. AMD
loaders receive the callable factory result.

## Contract

The upstream-observed behavior is preserved for numbers, strings, booleans,
plain objects, dense arrays, Dates, and nested functions. In particular,
non-cyclic repeated references are copied independently and inherited
enumerable string keys keep the historical traversal behavior.

Two intentional safety extensions apply:

- cycles point to the corresponding in-progress copy instead of overflowing
  the JavaScript call stack;
- `__proto__`, `constructor`, and `prototype` are written as own data
  properties instead of invoking a destination setter.

Traversal is iterative and stops before allocating more than 100,000 composite
nodes, throwing a `RangeError` with code `ERR_STACKLINE_DEEP_COPY_LIMIT`.

Map, Set, RegExp, typed arrays, symbol keys, descriptors, prototype retention,
and shared-reference preservation are not promised by the legacy default. See
`COMPATIBILITY_CONTRACT.md` for exact edge behavior.

## Supported runtimes

- CommonJS/AMD/classic global: Node.js 4.0.0 and later plus equivalent ES5
  browser environments with `Object.defineProperty`.
- Native ESM entry: runtimes that support `.mjs` (tested on current supported
  Node lines).
- Types: TypeScript 3.9 and current TypeScript.

## Security

This is a general-purpose copy helper, not a sanitizer. Getters and proxy traps
can execute during the legacy enumerable walk, and copying a value does not
make untrusted data safe. Report suspected vulnerabilities privately according
to `SECURITY.md`.

## License

MIT. The original copyright and attribution are preserved in `LICENSE`,
`NOTICE`, and `THIRD_PARTY_LICENSES.md`.
