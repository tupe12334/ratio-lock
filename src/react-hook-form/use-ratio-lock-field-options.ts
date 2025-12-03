import type {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form'

/**
 * Options for useRatioLockField hook
 * @typeParam T - Form values type
 * @typeParam TNames - Tuple of field names for literal type inference
 */
export interface UseRatioLockFieldOptions<
  T extends FieldValues,
  TNames extends readonly Path<T>[] = Path<T>[],
> {
  /** react-hook-form control object */
  control: Control<T>
  /** react-hook-form setValue function */
  setValue: UseFormSetValue<T>
  /** Field names to manage */
  names: TNames
  /** Decimal precision for calculated values */
  precision?: number
}
