import type { Control, FieldValues, UseFormSetValue } from 'react-hook-form'

/**
 * Options for useRatioLockField hook.
 *
 * Note: `names` accepts `string[]` instead of `Path<T>[]` to avoid
 * IDE performance issues caused by react-hook-form's deep recursive types.
 * See: https://github.com/react-hook-form/react-hook-form/issues/7290
 */
export interface UseRatioLockFieldOptions<T extends FieldValues> {
  /** react-hook-form control object */
  control: Control<T>
  /** react-hook-form setValue function */
  setValue: UseFormSetValue<T>
  /** Field names to manage */
  names: string[]
  /** Decimal precision for calculated values */
  precision?: number
}
