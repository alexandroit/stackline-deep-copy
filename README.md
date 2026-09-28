# @stackline/deep-copy

> Compatibility-first legacy deep copying with cycle support and safe property handling

[![npm version](https://img.shields.io/npm/v/@stackline/deep-copy.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/deep-copy)
[![license](https://img.shields.io/npm/l/@stackline/deep-copy.svg?style=flat-square)](https://github.com/alexandroit/stackline-deep-copy/blob/main/LICENSE)
[![GitHub repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-deep-copy)

**[Documentation](https://alexandro.net/docs/vanilla/deep-copy/)** |
**[npm](https://www.npmjs.com/package/@stackline/deep-copy)** |
**[Issues](https://github.com/alexandroit/stackline-deep-copy/issues)** |
**[Repository](https://github.com/alexandroit/stackline-deep-copy)**

**Package version:** `1.0.1`

## Why this package?

A compatibility-first maintained continuation of `deep-copy@1.4.2` for legacy
CommonJS, AMD, and classic-browser consumers. It preserves the small upstream
contract while adding native ESM/types, safe dangerous-key writes, cycle
support, a bounded composite-node limit, and current release engineering.

Stackline maintains this package independently. It is not affiliated with or
endorsed by the original maintainer.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/deep-copy@1.0.1` |
| Node.js runtime | `>=4.0.0` |
| CommonJS / primary entry | `./index.js` |
| ES module entry | `./index.mjs` |
| Type declarations | `./index.d.ts` |

<a id="supported-runtimes"></a>

### Supported runtimes

- CommonJS/AMD/classic global: Node.js 4.0.0 and later plus equivalent ES5
  browser environments with `Object.defineProperty`.
- Native ESM entry: runtimes that support `.mjs` (tested on current supported
  Node lines).
- Types: TypeScript 3.9 and current TypeScript.

## Installation

<a id="install"></a>

### Install

Direct scoped installation:

```sh
npm install @stackline/deep-copy
```

Identity-preserving migration under the historical dependency key:

```json
{
  "dependencies": {
    "deep-copy": "npm:@stackline/deep-copy@^1.0.1"
  }
}
```

## Usage

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

## Security

This is a general-purpose copy helper, not a sanitizer. Getters and proxy traps
can execute during the legacy enumerable walk, and copying a value does not
make untrusted data safe. Report suspected vulnerabilities privately according
to `SECURITY.md`.

## API Surface

<a id="contract"></a>

### Contract

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

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-deep-copy.git
cd stackline-deep-copy
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-deep-copy/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## Community and Support

Report reproducible package issues in the [issue tracker](https://github.com/alexandroit/stackline-deep-copy/issues). Use the [security policy](https://github.com/alexandroit/stackline-deep-copy/blob/main/SECURITY.md) for vulnerability reports.

- [Stackline / Alexandro.Net](https://alexandro.net/)
- [GitHub](https://github.com/alexandroit)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)
- [Reddit community: r/Stackline](https://www.reddit.com/r/Stackline/)

## License

MIT. The original copyright and attribution are preserved in `LICENSE`,
`NOTICE`, and `THIRD_PARTY_LICENSES.md`.
