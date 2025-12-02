import { describe, it, expect } from 'vitest'
import { RatioLockError } from './ratio-lock-error.js'

describe('RatioLockError', () => {
  it('should create error with message', () => {
    const error = new RatioLockError('test message')
    expect(error.message).toBe('test message')
  })

  it('should have correct name', () => {
    const error = new RatioLockError('test')
    expect(error.name).toBe('RatioLockError')
  })

  it('should be instance of Error', () => {
    const error = new RatioLockError('test')
    expect(error).toBeInstanceOf(Error)
  })
})
