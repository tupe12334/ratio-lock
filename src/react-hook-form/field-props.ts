import type { ChangeEvent } from 'react'

/**
 * Field props returned for each field
 */
export interface FieldProps {
  /** Field name */
  name: string
  /** Field value */
  value: number
  /** Change handler */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
