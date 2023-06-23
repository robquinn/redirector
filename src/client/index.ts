import Client from './utils/client'

const runner = async (): Promise<void> => {
  const sc = new Client()
  await sc.init()
}

;(async () => {
  await runner()
})()
  .then(() => true)
  .catch((err) => {
    console.log('runner ERROR', err)
  })
