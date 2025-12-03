import type { ChangeEvent } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import type { FieldProps } from './field-props.js'
import { parseNumber } from './parse-number.js'

/**
 * Creates the fields object with props for each field
 */
export function createFieldsObject<
  T extends FieldValues,
  TNames extends readonly Path<T>[],
>(
  names: TNames,
  watchedValues: unknown[],
  createOnChange: (index: number) => (e: ChangeEvent<HTMLInputElement>) => void
): { [K in TNames[number]]: FieldProps<K> } {
  const result = {} as { [K in TNames[number]]: FieldProps<K> }
  for (let i = 0; i < names.length; i++) {
    const name = names[i] as TNames[number]
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
}
