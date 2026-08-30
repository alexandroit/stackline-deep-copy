const dcopy = require('@stackline/deep-copy')

const source = { nested: { value: 1 } }
const copy = dcopy(source)
copy.nested.value = 2

console.log(source.nested.value, copy.nested.value)
