// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import { promises } from 'fs'
import os from 'node:os'
import path from 'path'

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')
// const DIR = path.resolve(__dirname, '__snapshots__');

async function globalTearDown(): Promise<void> {
  // close the browser instance
  // eslint-disable-next-line no-underscore-dangle
  await (global.__BROWSER_GLOBAL__ as { close: () => Promise<void> }).close()

  // clean-up the wsEndpoint file
  await promises.rm(DIR, { recursive: true })
}

export default globalTearDown
