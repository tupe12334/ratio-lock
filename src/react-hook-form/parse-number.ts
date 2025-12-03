import { z } from 'zod'
import { RatioLockError } from '../ratio-lock-error.js'

const numberSchema = z.coerce.number()

/**
 * Parse and coerce a value to a number
 * @param value - Value to parse
 * @param fieldName - Field name for error messages
 * @returns Parsed number
 * @throws RatioLockError if value cannot be coerced to a number
 */
export function parseNumber(value: unknown, fieldName: string): number {
  const result = numberSchema.safeParse(value)
  if (result.success) {
    return result.data
  }
  throw new RatioLockError(
    `Expected a number for field "${fieldName}", got ${typeof value}: ${JSON.stringify(value)}`
  )
}
