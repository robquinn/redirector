import { type Page } from 'puppeteer'

const openAddon = async (page: Page): Promise<void> => {
  const port = process.env.SERVER__PORT
  const hostname = process.env.SERVER__HOSTNAME
  const redirectUrl = process.env.PORTAL__REDIRECT_URL
  const productionUrl = process.env.SERVER__PRODUCTION_URL
  const graphqlPathname = process.env.SERVER__GRAPHQL_PATHNAME

  await page.setRequestInterception(true)
  page.on('request', (request) => {
    ;(async () => {
      if (
        request.resourceType() === 'script' &&
        request.url() === `${productionUrl}/redirector.js`
      ) {
        await request.abort()
        return
      }
      if (request.url() === `${productionUrl}${graphqlPathname}`) {
        await request.continue({
          url: `http://${hostname}:${port}${graphqlPathname}`,
        })
        return
      }

      await request.continue()
    })()
      .then(() => true)
      .catch((err) => {
        console.log('request interception ERROR', err)
      })
  })

  await page.goto(`http://${hostname}:${port}`)

  await page.waitForFunction(
    `window.location.href.includes('${redirectUrl}')`,
    {
      timeout: 20000,
    },
  )

  await page.addScriptTag({
    url: `http://${hostname}:${port}/redirector.js`,
  })

  await new Promise((resolve) => {
    setTimeout(resolve, 7000)
  })
}

export default openAddon
