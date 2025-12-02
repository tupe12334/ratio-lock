import type { FieldProps } from './field-props.js'

/**
 * Return type for useRatioLockField hook
 */
export interface UseRatioLockFieldReturn {
  /** Field props for each managed field */
  fields: Record<string, FieldProps>
  /** Current lock state */
  isLocked: boolean
  /** Lock the ratio */
  lock: () => void
  /** Unlock the ratio */
  unlock: () => void
  /** Toggle lock state */
  toggle: () => void
}
