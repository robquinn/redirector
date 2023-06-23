import { describe, expect, it } from '@jest/globals'
import randomString from '../../../src/server/utils/random-string'

describe('randomString', () => {
  it('should return a "string" with length the same size as the input', () => {
    const str = randomString(10)
    expect(typeof str).toBe('string')
    expect(str).toHaveLength(10)
  })
})
