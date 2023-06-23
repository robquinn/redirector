/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-dsiable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-underscore-dangle */
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals'

import { type ChildProcess, exec } from 'child_process'
import kill from 'tree-kill'
import openAddon from '../utils/open-addon'

const devSeverReady = async (process): Promise<void> => {
  console.log('Waiting for development server to finish loading...')
  await new Promise<void>((resolve) => {
    process.stdout.on('data', (data: string) => {
      if (data.includes(`Server ready`)) {
        resolve()
      }
    })
  })
}
const removedDistDirectory = async (process): Promise<void> => {
  console.log('Waiting to close process that deletes "dist" directory...')
  await new Promise<void>((resolve) => {
    process.stdout.on('data', (data: string) => {
      if (data.includes(`rimraf dist`)) {
        resolve()
      }
    })
  })
}
jest.setTimeout(180000)

describe(`Local setup`, () => {
  let page
  let devServerProcess
  beforeAll(async () => {
    devServerProcess = exec('npm run dev')
    page = await global.__BROWSER_GLOBAL__.newPage()

    await page.setViewport({
      width: 900,
      height: 900,
      deviceScaleFactor: 1,
    })

    await devSeverReady(devServerProcess)

    await openAddon(page)
  })

  afterAll(async () => {
    const removeDistProcess = exec('npm run rimraf:dist')
    await removedDistDirectory(removeDistProcess)
    const processes = [removeDistProcess, devServerProcess]
    console.log('Closing processes.')
    processes.forEach((p: ChildProcess) => {
      kill(p.pid as number, 'SIGKILL')
    })
  })

  it('should be members page', async () => {
    const titleSelector =
      '#block-yui_3_17_2_1_1555459462589_78545 > div > div > h1'
    const expectedTitleValue = 'Russ Lyon Foundation Members Area'
    const container = await page.$(titleSelector)
    const value = await page.evaluate(
      (el: HTMLElement) => el?.textContent,
      container,
    )
    expect(value).toBe(expectedTitleValue)
  })
})
