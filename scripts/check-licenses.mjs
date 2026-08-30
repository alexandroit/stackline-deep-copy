import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const license = await readFile(new URL('../LICENSE', import.meta.url), 'utf8')
const notice = await readFile(new URL('../NOTICE', import.meta.url), 'utf8')
const thirdParty = await readFile(new URL('../THIRD_PARTY_LICENSES.md', import.meta.url), 'utf8')

assert.match(license, /Copyright \(c\) Simeon Velichkov/)
assert.match(license, /Permission is hereby granted, free of charge/)
assert.match(notice, /not affiliated with or endorsed by the original maintainer/i)
assert.match(thirdParty, /zero production dependencies/i)
assert.match(thirdParty, /deep-copy@1\.4\.2/)

console.log('Original MIT attribution and zero-dependency license evidence passed.')
