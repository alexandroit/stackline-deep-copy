# Security policy

Supported releases receive security fixes on the latest published Stackline
line. Do not publish suspected vulnerability details in a public issue.

Use GitHub's private vulnerability reporting for
`alexandroit/stackline-deep-copy`. Include the affected version, input, runtime,
observed behavior, and a minimal reproduction. Maintainers will assess scope
before making any public claim.

`deep-copy` is not a sanitizer. Legacy getter/proxy evaluation is documented,
and downstream code must still validate untrusted input.
