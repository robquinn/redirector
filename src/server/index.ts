import * as dotenv from 'dotenv'

import httpServer from './express/server'

dotenv.config()
// if (isProd()) {
//   dotenv.config({ path: '../../.env.production' }) // Load the environment variables
// } else {
//   dotenv.config({ path: '../../.env.development' })
// }
;(async () => {
  // Modified server startup
  const startServer = async (): Promise<void> => {
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: process.env.SERVER__PORT ?? 80 }, () => {
        console.log(
          `🚀 Server ready at http://${process.env.SERVER__HOSTNAME}:${
            process.env.SERVER__PORT ?? 80
          }/`,
        )
        resolve()
      })
    })
  }
  await startServer()
})()
  .then(() => true)
  .catch((err) => {
    console.log('Server starting ERROR', err)
  })
