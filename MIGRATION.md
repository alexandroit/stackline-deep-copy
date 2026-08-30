# Migration

The safest drop-in migration preserves the historical dependency and import
key with an npm alias:

```json
"deep-copy": "npm:@stackline/deep-copy@^1.0.0"
```

Regenerate the lockfile with the repository's existing package manager, then
run the project's own tests. No import rewrite is required.

Before migrating code that relies on sparse arrays, inherited enumerable keys,
cycles, dangerous keys, or inputs beyond 100,000 composite nodes, read
`COMPATIBILITY_CONTRACT.md` and add a repository-specific fixture.
