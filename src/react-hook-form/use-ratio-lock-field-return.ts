import type { FieldProps } from './field-props.js'

/**
 * Return type for useRatioLockField hook
 * @typeParam TNames - Union of field name literals
 */
export interface UseRatioLockFieldReturn<TNames extends string = string> {
  /** Field props for each managed field */
  fields: { [K in TNames]: FieldProps<K> }
  /** Current lock state */
  isLocked: boolean
  /** Lock the ratio */
  lock: () => void
  /** Unlock the ratio */
  unlock: () => void
  /** Toggle lock state */
  toggle: () => void
}
