# Verification

The complete local package gate is:

```sh
npm ci
npm run verify
```

It covers upstream and differential behavior, circular references, deep-entry
and module interop, malformed inputs, dangerous keys, stress limits, browser
execution, Node 4 through current, TypeScript 3.9/current declarations,
publint, Are the Types Wrong, packed consumers, inventory, license, SBOM,
production closure, documentation and both production/full audits.

## Release verification — 2026-08-30

- Source commit: `41b095347bb70f9e085bb6140ded5af11a8e05ff`
- Main CI `33289760124`: success, including Node 4/6 Docker, Node 8-26,
  Windows, macOS and source attribution
- Main CodeQL `33289760103`: success
- Tag CI `33290193682`: success
- Tag CodeQL `33290193685`: success
- Production closure: one node, zero runtime/optional/peer/bundled dependencies,
  zero OSV findings and exact SBOM match
- Accepted artifact: 6,511 bytes, 16 files, 17,170 unpacked bytes; SHA-256
  `f7e9fb617c0c9e94904a37b94ac116a6d9a2f4319923518ea2cf10cd5161a9b8`
- Verdaccio: exact artifact and scoped/alias consumers pass
- Official npm: published once at `2026-08-30T03:19:05.017Z`; signed metadata,
  exact tarball, clean scoped and alias consumers pass
- GitHub release: immutable, ten exact assets at
  <https://github.com/alexandroit/stackline-deep-copy/releases/tag/stackline-v1.0.0>

The first Verdaccio CLI invocation omitted the required `./` prefix and npm
interpreted the tarball name as Git shorthand; it failed before any write.
The official artifact remained unpublished and the exact same bytes then
published successfully with the explicit relative path. Official npm's full
packument propagated after the version/tarball endpoints; read retry completed
verification and no republish occurred.

## Adoption verification

- Webitel UI SDK PR: <https://github.com/webitel/webitel-ui-sdk/pull/1714>
- Exact base/head: `f773daa26d6f8a5dc32e931dd47c73909c5470f4` /
  `55a3658a9acb5fb3e5108df107ec49c259254256`
- Target change: two manifests and root lockfile, 28 additions / 7 deletions
- Root: 137 files passed, 2 skipped; 670 tests passed, 3 skipped; typecheck,
  Biome, production build and alias/cycle smoke pass
- API services: 13 files / 175 tests pass; typecheck, declaration build and
  Biome pass
- UI datalist/chats: clean installs, package tests, typechecks and Biome pass
- Full npm audit remains the exact pre-change count of ten; no replacement
  dependency is introduced
- Google pprof-nodejs issue:
  <https://github.com/google/pprof-nodejs/issues/359>, no target mutation
- Different-repository check: PASS; coverage: COMPLETE

## Production documentation

The private portal repository's complete test suite passed before the
standalone package deployment. The catalog API verified `en`, `pt` and `fr`
snapshots and the server-rendered home. Package/root metadata, search, robots,
sitemaps and `llms` references pass ordinary public DNS.

Availability checks pass through origin and Cloudflare IPv4/IPv6. HTTP remains
redirect-only with path/query preserved; unknown hosts receive the configured
immediate rejection. Nginx retains rlimit 65535, 8192 worker connections,
`multi_accept on` and 30-second keepalive; systemd retains LimitNOFILE 65536.
The bounded request probe did not increase listen drops or overflows.
