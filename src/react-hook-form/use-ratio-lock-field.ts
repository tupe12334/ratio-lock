import { useCallback, useState, useMemo, useEffect, useRef } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { RatioLock } from '../ratio-lock.js'
import type { UseRatioLockFieldOptions } from './use-ratio-lock-field-options.js'
import type { UseRatioLockFieldReturn } from './use-ratio-lock-field-return.js'
import { parseNumber } from './parse-number.js'
import { syncRatioValues } from './sync-ratio-values.js'
import { createFieldChangeHandler } from './create-field-change-handler.js'
import { createFieldsObject } from './create-fields-object.js'

/**
 * React Hook Form integration for ratio-locked fields
 * @param options - Configuration options including control, setValue, and field names
 * @returns Object with field props and lock controls
 */
export function useRatioLockField<
  T extends FieldValues,
  TNames extends readonly Path<T>[],
>(
  options: UseRatioLockFieldOptions<T, TNames>
): UseRatioLockFieldReturn<TNames[number]> {
  const { control, setValue: setFormValue, names, precision } = options
  const watchedValues = useWatch({ control, name: names })

  const [ratioLock] = useState(() => {
    const initialValues = watchedValues.map((v, i) => parseNumber(v, names[i]))
    return new RatioLock(initialValues, { precision })
  })

  const [isLocked, setIsLocked] = useState(false)
  const prevValuesRef = useRef<number[]>(
    watchedValues.map((v, i) => parseNumber(v, names[i]))
  )

  useEffect(() => {
    prevValuesRef.current = syncRatioValues(
      watchedValues,
      prevValuesRef.current,
      names,
      ratioLock,
      setFormValue
    )
  }, [watchedValues, ratioLock, names, setFormValue])

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
    (index: number) =>
      createFieldChangeHandler(index, ratioLock, names, setFormValue),
    [ratioLock, names, setFormValue]
  )

  const fields = useMemo(
    () => createFieldsObject(names, watchedValues, createOnChange),
    [names, watchedValues, createOnChange]
  )

  return useMemo(
    () => ({ fields, isLocked, lock, unlock, toggle }),
    [fields, isLocked, lock, unlock, toggle]
  ) as UseRatioLockFieldReturn<TNames[number]>
}
