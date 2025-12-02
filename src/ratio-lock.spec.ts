import { describe, it, expect } from 'vitest'
import { RatioLock } from './ratio-lock.js'
import { RatioLockError } from './ratio-lock-error.js'

describe('RatioLock', () => {
  describe('constructor', () => {
    it('should create instance with initial values', () => {
      const ratioLock = new RatioLock([100, 200, 300], {})
      expect(ratioLock.getValues()).toEqual([100, 200, 300])
    })

    it('should throw RatioLockError if less than 2 values provided', () => {
      expect(() => new RatioLock([100], {})).toThrow(RatioLockError)
      expect(() => new RatioLock([100], {})).toThrow(
        'RatioLock requires at least 2 values'
      )
    })

    it('should initialize unlocked by default', () => {
      const ratioLock = new RatioLock([100, 200], {})
      expect(ratioLock.isLocked()).toBe(false)
    })

    it('should initialize locked if option is set', () => {
      const ratioLock = new RatioLock([100, 200], { locked: true })
      expect(ratioLock.isLocked()).toBe(true)
    })
  })

  describe('lock/unlock/toggle', () => {
    it('should lock the ratio', () => {
      const ratioLock = new RatioLock([100, 200], {})
      ratioLock.lock()
      expect(ratioLock.isLocked()).toBe(true)
    })

    it('should unlock the ratio', () => {
      const ratioLock = new RatioLock([100, 200], { locked: true })
      ratioLock.unlock()
      expect(ratioLock.isLocked()).toBe(false)
    })

    it('should toggle the lock state', () => {
      const ratioLock = new RatioLock([100, 200], {})
      expect(ratioLock.isLocked()).toBe(false)
      ratioLock.toggle()
      expect(ratioLock.isLocked()).toBe(true)
      ratioLock.toggle()
      expect(ratioLock.isLocked()).toBe(false)
    })
  })

  describe('setValue', () => {
    it('should set value independently when unlocked', () => {
      const ratioLock = new RatioLock([100, 200, 300], {})
      ratioLock.setValue(1, 500)
      expect(ratioLock.getValues()).toEqual([100, 500, 300])
    })

    it('should maintain ratio when locked', () => {
      const ratioLock = new RatioLock([100, 200, 300], {})
      ratioLock.lock()
      ratioLock.setValue(0, 200)
      expect(ratioLock.getValues()).toEqual([200, 400, 600])
    })

    it('should maintain ratio when updating non-first value', () => {
      const ratioLock = new RatioLock([100, 200, 300], {})
      ratioLock.lock()
      ratioLock.setValue(1, 400)
      expect(ratioLock.getValues()).toEqual([200, 400, 600])
    })

    it('should throw RatioLockError for out of bounds index', () => {
      const ratioLock = new RatioLock([100, 200], {})
      expect(() => ratioLock.setValue(5, 100)).toThrow(RatioLockError)
      expect(() => ratioLock.setValue(5, 100)).toThrow(
        'Index 5 is out of bounds'
      )
      expect(() => ratioLock.setValue(-1, 100)).toThrow(RatioLockError)
      expect(() => ratioLock.setValue(-1, 100)).toThrow(
        'Index -1 is out of bounds'
      )
    })

    it('should apply precision when set', () => {
      const ratioLock = new RatioLock([100, 200, 300], { precision: 2 })
      ratioLock.lock()
      ratioLock.setValue(0, 333)
      const values = ratioLock.getValues()
      expect(values[0]).toBe(333)
      expect(values[1]).toBe(666)
      expect(values[2]).toBe(999)
    })
  })

  describe('setValues', () => {
    it('should set all values', () => {
      const ratioLock = new RatioLock([100, 200], {})
      ratioLock.setValues([300, 600])
      expect(ratioLock.getValues()).toEqual([300, 600])
    })

    it('should throw RatioLockError if wrong number of values', () => {
      const ratioLock = new RatioLock([100, 200], {})
      expect(() => ratioLock.setValues([100, 200, 300])).toThrow(RatioLockError)
      expect(() => ratioLock.setValues([100, 200, 300])).toThrow(
        'Expected 2 values, got 3'
      )
    })

    it('should recalculate ratios when locked', () => {
      const ratioLock = new RatioLock([100, 200], { locked: true })
      ratioLock.setValues([100, 300])
      expect(ratioLock.getRatios()).toEqual([1, 3])
    })
  })

  describe('getRatios', () => {
    it('should return current ratios', () => {
      const ratioLock = new RatioLock([100, 200, 300], {})
      ratioLock.lock()
      expect(ratioLock.getRatios()).toEqual([1, 2, 3])
    })

    it('should handle zero base value', () => {
      const ratioLock = new RatioLock([0, 100, 200], {})
      ratioLock.lock()
      expect(ratioLock.getRatios()).toEqual([1, 1, 1])
    })
  })
})
