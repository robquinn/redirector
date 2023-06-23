import { describe, expect, it } from '@jest/globals'
import cryptoHash from '../../../src/server/utils/crypto-hash'

describe('cryptoHash', () => {
  it('should return a "string" greater than length 0', () => {
    const hash = cryptoHash()
    expect(typeof hash).toBe('string')
    expect(hash.length > 0).toBeTruthy()
  })
})
