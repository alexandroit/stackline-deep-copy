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
