import type { ChangeEvent } from 'react'

/**
 * Field props returned for each field
 * @typeParam TName - The literal field name type
 */
export interface FieldProps<TName extends string = string> {
  /** Field name */
  name: TName
  /** Field value */
  value: number
  /** Change handler */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
