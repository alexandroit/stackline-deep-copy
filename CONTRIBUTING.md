# Contributing

Open a focused issue or pull request with a minimal reproduction and the exact
runtime. Run `npm ci` and `npm run verify` before proposing a change.

Compatibility changes require a differential fixture against
`deep-copy@1.4.2`, an explicit contract decision, packed direct and npm-alias
consumer checks, and browser/runtime coverage. Do not broaden security claims
beyond the tested evidence.
