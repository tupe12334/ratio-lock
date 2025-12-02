import type { RatioLockOptions } from './ratio-lock-options.js'
import { RatioLockError } from './ratio-lock-error.js'

/**
 * A class for managing n numbers with locked ratios.
 * When the ratio is locked, changing one value automatically adjusts
 * all other values to maintain their proportional relationships.
 */
export class RatioLock {
  private _values: number[]
  private _ratios: number[]
  private _locked: boolean
  private _precision: number | undefined

  /**
   * Creates a new RatioLock instance
   * @param initialValues - Initial values for the ratio lock
   * @param options - Configuration options
   */
  constructor(initialValues: number[], options: RatioLockOptions) {
    if (initialValues.length < 2) {
      throw new RatioLockError('RatioLock requires at least 2 values')
    }

    this._values = [...initialValues]
    this._locked = options.locked === true
    this._precision = options.precision
    this._ratios = this.calculateRatios(initialValues)
  }

  private calculateRatios(values: number[]): number[] {
    const baseValue = values[0]
    if (baseValue === 0) {
      return values.map(() => 1)
    }
    return values.map(v => v / baseValue)
  }

  private applyPrecision(value: number): number {
    if (this._precision === undefined) {
      return value
    }
    return Number(value.toFixed(this._precision))
  }

  /**
   * Lock the current ratio
   */
  lock(): void {
    this._ratios = this.calculateRatios(this._values)
    this._locked = true
  }

  /**
   * Unlock the ratio
   */
  unlock(): void {
    this._locked = false
  }

  /**
   * Toggle lock state
   */
  toggle(): void {
    if (this._locked) {
      this.unlock()
    } else {
      this.lock()
    }
  }

  /**
   * Set a value at the given index
   * @param index - Index of the value to set
   * @param value - New value
   */
  setValue(index: number, value: number): void {
    if (index < 0 || index >= this._values.length) {
      throw new RatioLockError(`Index ${index} is out of bounds`)
    }

    if (this._locked) {
      const ratio = this._ratios[index]
      const baseValue = ratio !== 0 ? value / ratio : 0

      this._values = this._ratios.map(r => this.applyPrecision(baseValue * r))
    } else {
      const newValues = [...this._values]
      newValues[index] = value
      this._values = newValues
    }
  }

  /**
   * Set all values (recalculates ratio if locked)
   * @param values - New values
   */
  setValues(values: number[]): void {
    if (values.length !== this._values.length) {
      throw new RatioLockError(
        `Expected ${this._values.length} values, got ${values.length}`
      )
    }

    this._values = [...values]
    if (this._locked) {
      this._ratios = this.calculateRatios(values)
    }
  }

  /**
   * Get current values
   */
  getValues(): number[] {
    return [...this._values]
  }

  /**
   * Get current ratios
   */
  getRatios(): number[] {
    return [...this._ratios]
  }

  /**
   * Check if ratio is locked
   */
  isLocked(): boolean {
    return this._locked
  }
}
