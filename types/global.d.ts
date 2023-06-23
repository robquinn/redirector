import { type Browser } from 'puppeteer'

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, vars-on-top, no-var
  var __BROWSER_GLOBAL__: Browser
}
