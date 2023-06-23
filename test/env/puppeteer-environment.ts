/* eslint-disable import/no-import-module-exports */
import { promises } from 'fs'
import os from 'os'
import path from 'path'
import puppeteer from 'puppeteer'
import NodeEnvironment from 'jest-environment-node'
import { type Context } from 'node:vm'

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

class PuppeteerEnvironment extends NodeEnvironment {
  async setup(): Promise<void> {
    await super.setup()
    // get the wsEndpoint
    const wsEndpoint = await promises.readFile(
      path.join(DIR, 'wsEndpoint'),
      'utf8',
    )
    if (wsEndpoint == null) {
      throw new Error('wsEndpoint not found')
    }

    // connect to puppeteer
    this.global.__BROWSER_GLOBAL__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    })
  }

  async teardown(): Promise<void> {
    await super.teardown()
  }

  getVmContext(): Context | null {
    return super.getVmContext()
  }
}

module.exports = PuppeteerEnvironment
