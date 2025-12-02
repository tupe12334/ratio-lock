import type { ChangeEvent } from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { useWatch, useFormContext } from 'react-hook-form'
import { RatioLock } from '../ratio-lock.js'
import type { UseRatioLockFieldOptions } from './use-ratio-lock-field-options.js'
import type { UseRatioLockFieldReturn } from './use-ratio-lock-field-return.js'
import type { FieldProps } from './field-props.js'

function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value
  }
  return 0
}

/**
 * React Hook Form integration for ratio-locked fields
 * @param options - Configuration options including control and field names
 * @returns Object with field props and lock controls
 */
export function useRatioLockField<T extends FieldValues>(
  options: UseRatioLockFieldOptions<T>
): UseRatioLockFieldReturn {
  const { control, names, precision } = options
  const { setValue: setFormValue } = useFormContext<T>()

  const watchedValues = useWatch({ control, name: names })

  const [ratioLock] = useState(() => {
    const initialValues = watchedValues.map(toNumber)
    return new RatioLock(initialValues, { precision })
  })

  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const values = watchedValues.map(toNumber)
    ratioLock.setValues(values)
  }, [watchedValues, ratioLock])

  const lock = useCallback(() => {
    ratioLock.lock()
    setIsLocked(true)
  }, [ratioLock])

  const unlock = useCallback(() => {
    ratioLock.unlock()
    setIsLocked(false)
  }, [ratioLock])

  const toggle = useCallback(() => {
    ratioLock.toggle()
    setIsLocked(ratioLock.isLocked())
  }, [ratioLock])

  const createOnChange = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      ratioLock.setValue(index, newValue)

      const newValues = ratioLock.getValues()
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        const value = newValues[i]
        if (name !== undefined && value !== undefined) {
          setFormValue(name, value as T[Path<T>])
        }
      }
    },
    [ratioLock, names, setFormValue]
  )

  const fields = useMemo(() => {
    const result: Record<string, FieldProps> = {}
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const watchedValue = watchedValues[i]
      if (name !== undefined) {
        const stringName = String(name)
        result[stringName] = {
          name: stringName,
          value: toNumber(watchedValue),
          onChange: createOnChange(i),
        }
      }
    }
    return result
  }, [names, watchedValues, createOnChange])

  return useMemo(
    () => ({
      fields,
      isLocked,
      lock,
      unlock,
      toggle,
    }),
    [fields, isLocked, lock, unlock, toggle]
  )
}
