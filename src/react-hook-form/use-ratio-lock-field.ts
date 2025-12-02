import type { ChangeEvent } from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { z } from 'zod'
import { RatioLock } from '../ratio-lock.js'
import { RatioLockError } from '../ratio-lock-error.js'
import type { UseRatioLockFieldOptions } from './use-ratio-lock-field-options.js'
import type { UseRatioLockFieldReturn } from './use-ratio-lock-field-return.js'
import type { FieldProps } from './field-props.js'

const numberSchema = z.coerce.number()

function parseNumber(value: unknown, fieldName: string): number {
  const result = numberSchema.safeParse(value)
  if (result.success) {
    return result.data
  }
  throw new RatioLockError(
    `Expected a number for field "${fieldName}", got ${typeof value}: ${JSON.stringify(value)}`
  )
}

/**
 * React Hook Form integration for ratio-locked fields
 * @param options - Configuration options including control, setValue, and field names
 * @returns Object with field props and lock controls
 */
export function useRatioLockField<T extends FieldValues>(
  options: UseRatioLockFieldOptions<T>
): UseRatioLockFieldReturn {
  const { control, setValue: setFormValue, names, precision } = options

  const watchedValues = useWatch({ control, name: names })

  const [ratioLock] = useState(() => {
    const initialValues = watchedValues.map((v, i) => parseNumber(v, names[i]))
    return new RatioLock(initialValues, { precision })
  })

  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const values = watchedValues.map((v, i) => parseNumber(v, names[i]))
    ratioLock.setValues(values)
  }, [watchedValues, ratioLock, names])

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setFormValue(name, value as any)
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
        result[name] = {
          name,
          value: parseNumber(watchedValue, name),
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
