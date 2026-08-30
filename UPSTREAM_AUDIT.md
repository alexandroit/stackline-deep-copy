# `deep-copy` package decision

Observation date: 2026-08-29 (America/Toronto)  
Decision time: 2026-08-30T02:52:11Z  
Selection: effective unconsumed qualified-intake rank 1; original Scout intake
position 17; no user pin  
Target: `@stackline/deep-copy@1.0.0`  
Decision: **GO; all release and adoption gates passed, state PUBLISHED**
Reason: `STALE_ZERO_DEPENDENCY_LEGACY_UTILITY_WITH_REPRODUCIBLE_EDGE_DEFECTS_AND_TWO_DISTINCT_DIRECT_ADOPTION_PATHS`

## Evidence

- Upstream `deep-copy@1.4.2` was published 2018-01-11 under MIT and has one npm
  maintainer. Its non-archived source has not moved since commit
  `a50fb62d06c7d4825e16bada79b9ddbb8c3c2e9f` in 2018.
- Official downloads were 488,304 for 2026-08-23 through 2026-08-29. This is
  reach evidence only; direct use was separately verified from manifests and
  source imports.
- Exact tarball: 2,211 bytes; SHA-1
  `0622719257e4bd60240e401ea96718211c5c4697`; SHA-256
  `8b0aeca0c91757ddeb5f05c10325a845f6852299b783bb7dc6cb6e01f733342c`;
  SHA-512
  `57167043fd7e58640f9799c4ebbb8b861ecea9dae6a88d4e6b3aeb68ef416f0fccf01b7a32897f471cc303a37a660457a6c1bf5bd3e0523f04d4b1c7044ab619`.
- The complete upstream production closure is exactly the root. Exact-version
  OSV returned no record. The current alternative set does not preserve the
  combined Node 4, CommonJS, AMD, classic-global, Date, and nested-function
  contract without migration work.
- Reproducible defects include cycle overflow and `__proto__` destination-
  prototype mutation. Unsupported edge semantics are characterized rather
  than advertised as structured clone.
- Qualified adoption plan: a focused migration PR in active
  `webitel/webitel-ui-sdk`, and the contribution-policy-required maintainer
  decision issue in different active repository `google/pprof-nodejs`. Both
  directly declare and actually call the historical package. The Google target
  uses it in dev/test fixtures rather than at production runtime; it qualifies
  as direct maintenance evidence, not runtime-adoption evidence. Final policy
  and deduplication checks remain mandatory immediately before writing.
- `haiwen/seahub` was disqualified when live GitHub preflight showed that issue
  creation is restricted. No contact was made.

## Gate decision

Legal/provenance, real-current-problem, forward-necessity, differentiation,
compatibility-feasibility, maintenance-burden, adoption, evidence, and recursive
closure gates pass for implementation. Publication remains blocked until local
validation, source/full zero-finding audits, clean scoped and alias installs,
packed inventory/SBOM, hosted CI and CodeQL on the exact commit, Verdaccio byte
verification, and all remaining immutable release/documentation gates pass.

## Final state — 2026-08-30

Every named red gate passed. Exact release commit
`41b095347bb70f9e085bb6140ded5af11a8e05ff` passed required hosted CI and
CodeQL before artifact construction. The accepted 6,511-byte tarball has
SHA-256 `f7e9fb617c0c9e94904a37b94ac116a6d9a2f4319923518ea2cf10cd5161a9b8`;
Verdaccio and official npm returned those exact bytes, and official publication
occurred once at `2026-08-30T03:19:05.017Z`.

The annotated immutable `stackline-v1.0.0` tag and GitHub release point to the
same green commit. Tag CI and CodeQL passed. Package documentation, all three
localized catalog records, server-rendered home, search, robots, sitemap and
machine-readable references are verified at Alexandro.Net.

Release-local adoption coverage is complete: focused pull request
<https://github.com/webitel/webitel-ui-sdk/pull/1714> and different-repository
maintainer-decision issue <https://github.com/google/pprof-nodejs/issues/359>.
No user pin was involved. The release checkpoint is cleared.
