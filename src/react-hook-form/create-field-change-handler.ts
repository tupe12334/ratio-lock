import type { ChangeEvent } from 'react'
import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import type { RatioLock } from '../ratio-lock.js'

/**
 * Creates an onChange handler for a specific field index
 */
export function createFieldChangeHandler<T extends FieldValues>(
  index: number,
  ratioLock: RatioLock,
  names: readonly Path<T>[],
  setFormValue: UseFormSetValue<T>
): (e: ChangeEvent<HTMLInputElement>) => void {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    ratioLock.setValue(index, newValue)

    const newValues = ratioLock.getValues()
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const value = newValues[i]
      if (name !== undefined && value !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormValue(name, value as any)
      }
    }
  }
}
