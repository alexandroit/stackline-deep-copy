# Adoption targets

Observed 2026-08-30. Release-local targets remain subject to a final live
deduplication and repository-policy read immediately before any public write.

## Migration PR candidate

`webitel/webitel-ui-sdk` directly declares `deep-copy@^1.4.2` and calls it in
`src/api/clients/calendars/calendars.js`. The proposed minimal migration keeps
the `deep-copy` key and imports unchanged through
`npm:@stackline/deep-copy@1.0.0`, regenerates only the existing lockfile, and
runs the repository's own gates plus a calendar-client clone fixture.

## Different-repository issue candidate

`google/pprof-nodejs` directly declares `deep-copy@^1.4.2` in
`devDependencies` and calls it in `ts/test/test-heap-profiler.ts` to copy
ordinary nested profile fixtures. This is a direct dev/test consumer rather
than production-runtime evidence. Its contribution policy expressly requires
an issue and maintainer approval before a change, making a repository-specific
dependency-maintenance decision appropriate. The issue must identify the exact
manifest/test paths, avoid security claims, mention the Google CLA only as
policy context, and disclose only that the contributor maintains the
replacement.

`haiwen/seahub` was rejected after live preflight because GitHub restricts new
issue creation in that repository. It must not be contacted through another
channel to fill this lane.

## Completed release-local coverage

- Pull request: <https://github.com/webitel/webitel-ui-sdk/pull/1714>, base
  `f773daa26d6f8a5dc32e931dd47c73909c5470f4`, head
  `55a3658a9acb5fb3e5108df107ec49c259254256`. It changes only the two
  manifests and root lockfile, keeps imports unchanged, and uses
  `deep-copy: npm:@stackline/deep-copy@1.0.0`. Clean install, alias/cycle smoke,
  root 670-test suite, API 175-test suite, typechecks, lint and build passed.
  The unchanged full audit count and separately owned `webitel-sdk` legacy
  peer copies are disclosed limitations.
- Issue: <https://github.com/google/pprof-nodejs/issues/359>, evidence commit
  `40ebcbc48a52a690f7a750f69de626ba0cc0f737`. It follows the repository's
  issue-first policy, identifies the exact dev manifest and heap-profiler test
  calls, offers retention and alternate-provider options, and makes no
  vulnerability claim.
- Both contacts disclose only that the contributor maintains the replacement.
  Final live GitHub deduplication passed immediately before each write.
- Different-repository check: **PASS**. Adoption coverage: **COMPLETE**.
  Incoming messages remain read-only; do not reply, acknowledge or react.
