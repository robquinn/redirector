import * as crypto from 'crypto'

const cryptoHash = (): string => {
  const currentDate = new Date().valueOf().toString()
  const random = Math.random().toString()
  return crypto
    .createHash('sha256')
    .update(currentDate + random)
    .digest('hex')
}

export default cryptoHash
