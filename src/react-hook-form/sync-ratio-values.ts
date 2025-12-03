import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import type { RatioLock } from '../ratio-lock.js'
import { parseNumber } from './parse-number.js'

/**
 * Syncs watched values with ratio lock, propagating changes when locked
 */
export function syncRatioValues<T extends FieldValues>(
  watchedValues: unknown[],
  prevValues: number[],
  names: readonly Path<T>[],
  ratioLock: RatioLock,
  setFormValue: UseFormSetValue<T>
): number[] {
  const newValues = watchedValues.map((v, i) => parseNumber(v, names[i]))

  let changedIndex = -1
  for (let i = 0; i < newValues.length; i++) {
    if (newValues[i] !== prevValues[i]) {
      changedIndex = i
      break
    }
  }

  if (changedIndex !== -1 && ratioLock.isLocked()) {
    ratioLock.setValue(changedIndex, newValues[changedIndex])

    const updatedValues = ratioLock.getValues()
    for (let i = 0; i < names.length; i++) {
      if (i !== changedIndex) {
        const name = names[i]
        const value = updatedValues[i]
        if (name !== undefined && value !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setFormValue(name, value as any)
        }
      }
    }
    return updatedValues
  }

  ratioLock.setValues(newValues)
  return newValues
}
