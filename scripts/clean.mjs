import { rm } from 'node:fs/promises'

for (const directory of ['coverage', 'dist', 'site-dist']) {
  await rm(new URL(`../${directory}`, import.meta.url), { force: true, recursive: true })
}
