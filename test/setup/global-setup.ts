// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import { promises } from 'fs'
import os from 'os'
import path from 'path'
import puppeteer from 'puppeteer-extra'

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import jestPuppeteerConfig from '../../jest-puppeteer.config'

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

async function globalSetup(): Promise<void> {
  puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch(jestPuppeteerConfig.launch)
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  // eslint-disable-next-line no-underscore-dangle
  global.__BROWSER_GLOBAL__ = browser

  // use the file system to expose the wsEndpoint for TestEnvironments
  await promises.mkdir(DIR, { recursive: true })
  await promises.writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}

export default globalSetup
