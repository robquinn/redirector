import httpServer from './express/server'

// Modified server startup
const startServer = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    httpServer.listen(
      { port: process.env.PORT ?? process.env.SERVER__PORT ?? 80 },
      () => {
        console.log(
          `🚀 Server ready at http://${process.env.SERVER__HOSTNAME}:${
            process.env.PORT ?? process.env.SERVER__PORT ?? 80
          }/`,
        )
        resolve()
      },
    )
  })
}

;(async () => {
  await startServer()
})()
  .then(() => true)
  .catch((err) => {
    console.log('Server starting ERROR', err)
  })
