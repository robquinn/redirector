import { describe, expect, it, jest, beforeEach, afterAll } from '@jest/globals'
import isProd from '../../../src/server/utils/is-prod'

describe('isProd', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it('should return "false" in when "NODE_ENV" is "development"', () => {
    process.env.NODE_ENV = 'development'
    expect(isProd()).toBe(false)
  })

  it('should return "true" in when "NODE_ENV" is "production"', () => {
    process.env.NODE_ENV = 'production'
    expect(isProd()).toBe(true)
  })
})
