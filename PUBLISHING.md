# Publishing

Publication is operator-driven from one exact hosted-green commit. Run the
complete local gate, push the untagged release candidate, and wait for CI and
CodeQL on that commit. Build one immutable artifact only after both are green.

Publish and byte-verify that artifact against Verdaccio first, then publish the
same bytes once to official npm as `alex360qc`. Only after official registry
verification create `stackline-v1.0.0` and the immutable GitHub release at the
same commit. Verify tag workflows, package documentation, all catalog locales,
search, robots, sitemap, and machine-readable references before recording the
release as complete.
