import type { Control, FieldValues, Path } from 'react-hook-form'

/**
 * Options for useRatioLockField hook
 */
export interface UseRatioLockFieldOptions<T extends FieldValues> {
  /** react-hook-form control object */
  control: Control<T>
  /** Field names to manage */
  names: Path<T>[]
  /** Decimal precision for calculated values */
  precision?: number
}
