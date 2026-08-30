# Compatibility contract

## Preserved `deep-copy@1.4.2` behavior

- `number`, `string`, and `boolean` roots are returned unchanged.
- Plain objects and dense arrays are recursively independent.
- Dates are recreated from their timestamp.
- Nested functions are retained by reference.
- A CommonJS require returns the callable; AMD receives the factory result;
  a classic browser script installs global `dcopy`.
- Enumerable string keys are visited using historical `for...in` semantics,
  including inherited enumerable values.
- Array values are appended in enumeration order, retaining the historical
  sparse/custom-key collapse behavior.
- Repeated non-cyclic references are copied independently.
- Nullish roots, symbol/bigint roots, Map, Set, RegExp, typed objects, and
  top-level functions retain the characterized legacy fallback behavior rather
  than being advertised as structured-clone support.

## Intentional deviations

- An edge to an active ancestor preserves the cycle in the output instead of
  recursing until `RangeError`.
- Dangerous string keys (`__proto__`, `constructor`, `prototype`) are defined
  as own enumerable data properties on object copies. This prevents a write
  from mutating the destination prototype.
- Traversal uses an explicit stack and enforces a 100,000 composite-node safety
  limit. Inputs above the limit throw `ERR_STACKLINE_DEEP_COPY_LIMIT`.

## Not promised

This package does not promise cloning of property descriptors, symbol keys,
custom prototypes, accessors without evaluation, Maps, Sets, RegExps, Errors,
Buffers, typed arrays, cross-realm built-ins, or proxy internals. Use a
structured-clone implementation when those semantics are required.
