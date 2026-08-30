# Project Memory

- Package: `@stackline/deep-copy@1.0.0`
- Upstream baseline: `deep-copy@1.4.2`
- Decision: `GO`, state `PUBLISHED`, dated 2026-08-30
- License: MIT with original attribution preserved
- Runtime: Node.js 4+, CommonJS, ESM default bridge, AMD and classic global
- Production graph: exactly one root node and zero dependencies
- Main corrections: safe cycles, dangerous-key protection and a bounded
  100,000-node traversal limit

The canonical evidence lives in `decision.json`, `UPSTREAM_AUDIT.md`,
`VERIFICATION.md`, `ADOPTION_TARGETS.md` and `REGISTRY_HANDOFF.md`.

## Immutable release

Release commit `41b095347bb70f9e085bb6140ded5af11a8e05ff` passed main CI run
`33289760124` and CodeQL run `33289760103` before the artifact was built. The
accepted tarball `stackline-deep-copy-1.0.0.tgz` contains 16 files, is 6,511
bytes (17,170 unpacked), and has:

- SHA-1 `3e90529399d7bc74b0743b827745ebe69adca101`
- SHA-256 `f7e9fb617c0c9e94904a37b94ac116a6d9a2f4319923518ea2cf10cd5161a9b8`
- SHA-512 `e6a359b59c4f97c38f0a4b36ac4d5edc1e18bc02311e899c6f63b4a94a7821b83c40dd83b9ac1e2ba8dfcfbd5a962de7497820dae3638f8bbfda0fa89c575266`
- SRI `sha512-5qNZtZxPl8OPCks2rE1e3B4YvAIxHomcb2O0qUp4Ibg8QN2DuaweK6jfz71ali3nSXgg2uNjj4u/2g+onFdSZg==`

That artifact passed inventory, licenses, SBOM, source/full zero-finding audits,
Verdaccio publication/fetch, clean scoped and historical-key alias consumers,
then was published once to official npm at `2026-08-30T03:19:05.017Z`.
Registry propagation briefly delayed the full packument; the version endpoint
and exact tarball existed, and retrying the read completed verification without
republishing.

Annotated tag object `4f5216806d222652699cbc8686266b34b843a8ea`
(`stackline-v1.0.0`) points to the same release commit. Immutable GitHub release
`379169465` has ten exact assets. Tag CI `33290193682` and CodeQL
`33290193685` passed. Never rebuild, replace, republish, move, delete, recreate
or repoint version 1.0.0, its artifact, tag or release.

## Adoption coverage

The focused Webitel UI SDK pull request
<https://github.com/webitel/webitel-ui-sdk/pull/1714> preserves all source
imports through the exact historical-key npm alias and moves directly imported
helpers from peer to runtime dependencies. Its three-file change passed clean
install, alias/cycle smoke, 670 root tests, 175 API tests, typechecks, Biome and
production build. The unchanged target audit findings and the separately owned
legacy copies retained by `webitel-sdk` are disclosed.

The different-repository Google pprof-nodejs issue
<https://github.com/google/pprof-nodejs/issues/359> follows the repository's
issue-first contribution policy. It asks maintainers to choose the exact alias,
retention or another maintained provider for the direct heap-profiler test
dependency. No vulnerability claim was made.

Both contacts disclose replacement maintainership. Different-repository check
and release-local coverage pass. Incoming messages are read-only; record them
for owner review without replying, acknowledging or reacting.

## Documentation and availability

Standalone package documentation is published at
<https://alexandro.net/docs/vanilla/deep-copy/>. Its normalized 16-file
manifest SHA-256 is
`ff5a01a0daab53ca0b8ffaf90c71c1da4377877d64a3ef9fc65ea2bbe64b51cc`.
The deployment created a recoverable absence marker at
`/var/backups/stackline-docs/20260830T032512Z-deep-copy`; only the package
directory was written. The shared Nginx configuration, firewall, systemd
drop-in, private portal source and aggregate HTML were unchanged.

The authenticated catalog API initially rejected the unsupported `utility`
category with HTTP 500 and created no record. Reusing the exact payload with
the existing `node` category succeeded. English, Portuguese and French
snapshots, server-rendered home, live search, root/package robots and sitemaps,
and machine-readable references all pass. Branding remains Alexandro.Net with
homepage H1 `Open source package registry`.

Origin and Cloudflare HTTP/2 over IPv4 and IPv6 passed, HTTP redirects preserve
path/query, unknown HTTP hosts are rejected, and 100 IPv4 plus 20 IPv6 bounded
requests returned 200. `TcpExtListenDrops` stayed 694 and
`TcpExtListenOverflows` stayed zero. Nginx and systemd capacity settings remain
at the documented values.

## Canonical records

- Decision: `1P-i-TkoRDqgcd1FEHpEGoz3xQwnFoDJU`
- Project memory: `1SEYBCR2Ogye9SqlqDbmVCWDKHhhosRe_`
- Release verification: `12bApup_uUIp75SA6tTFbjtpDwcmIMd2h`
- Adoption targets: `120HP7wLv9DQQqx06gu6IREBIB6tNSdHU`
- Registry handoff: `1vW8ZAdm1JSo1xSa62dBjRIFMcQdwQWkN`
- Webitel pull-request event: `17aPI2SY11D14GrcIK1Fegi7JlXhJ7-gA`
- Google pprof-nodejs issue event: `1BeVgBDp-uwszH9eCEhLF3vuk3smTfypU`
