/**
 * Return type for the useRatioLock hook
 */
export interface UseRatioLockReturn {
  /** Current values */
  values: number[]
  /** Update a single value */
  setValue: (index: number, value: number) => void
  /** Update all values */
  setValues: (values: number[]) => void
  /** Current lock state */
  isLocked: boolean
  /** Lock the ratio */
  lock: () => void
  /** Unlock the ratio */
  unlock: () => void
  /** Toggle lock state */
  toggle: () => void
  /** Current ratios */
  ratios: number[]
}
