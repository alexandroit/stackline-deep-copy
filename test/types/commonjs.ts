import dcopy = require('../../index')

const input = { nested: { value: 1 } }
const output = dcopy(input)
const value: number = output.nested.value

void value
