import { useState, useCallback, useMemo } from 'react'
import { RatioLock } from '../ratio-lock.js'
import type { RatioLockOptions } from '../ratio-lock-options.js'
import type { UseRatioLockReturn } from './use-ratio-lock-return.js'

/**
 * React hook for managing numbers with locked ratios
 * @param initialValues - Initial values for the ratio lock
 * @param options - Configuration options
 * @returns Object with values, lock controls, and update functions
 */
export function useRatioLock(
  initialValues: number[],
  options: RatioLockOptions
): UseRatioLockReturn {
  const [ratioLockInstance] = useState(
    () => new RatioLock(initialValues, options)
  )
  const [values, setValuesState] = useState(() => ratioLockInstance.getValues())
  const [isLocked, setIsLocked] = useState(() => ratioLockInstance.isLocked())
  const [ratios, setRatios] = useState(() => ratioLockInstance.getRatios())

  const setValue = useCallback(
    (index: number, value: number) => {
      ratioLockInstance.setValue(index, value)
      setValuesState(ratioLockInstance.getValues())
    },
    [ratioLockInstance]
  )

  const setValues = useCallback(
    (newValues: number[]) => {
      ratioLockInstance.setValues(newValues)
      setValuesState(ratioLockInstance.getValues())
      setRatios(ratioLockInstance.getRatios())
    },
    [ratioLockInstance]
  )

  const lock = useCallback(() => {
    ratioLockInstance.lock()
    setIsLocked(true)
    setRatios(ratioLockInstance.getRatios())
  }, [ratioLockInstance])

  const unlock = useCallback(() => {
    ratioLockInstance.unlock()
    setIsLocked(false)
  }, [ratioLockInstance])

  const toggle = useCallback(() => {
    ratioLockInstance.toggle()
    setIsLocked(ratioLockInstance.isLocked())
    setRatios(ratioLockInstance.getRatios())
  }, [ratioLockInstance])

  return useMemo(
    () => ({
      values,
      setValue,
      setValues,
      isLocked,
      lock,
      unlock,
      toggle,
      ratios,
    }),
    [values, setValue, setValues, isLocked, lock, unlock, toggle, ratios]
  )
}
