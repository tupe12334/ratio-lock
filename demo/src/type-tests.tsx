/**
 * Type tests for ratio-lock library
 * Run with: pnpm typecheck
 */
import { useForm } from 'react-hook-form'
import { useRatioLockField } from 'ratio-lock/react-hook-form'
import type { UseRatioLockFieldOptions } from 'ratio-lock/react-hook-form'

interface SimpleForm {
  width: number
  height: number
}

export function TestSimpleForm() {
  const { control, setValue } = useForm<SimpleForm>({
    defaultValues: { width: 100, height: 100 },
  })
  const { fields, isLocked, toggle, lock, unlock } = useRatioLockField({
    control,
    setValue,
    names: ['width', 'height'],
  })
  return { fields, isLocked, toggle, lock, unlock }
}

interface NestedForm {
  dimensions: { width: number; height: number }
  name: string
}

export function TestNestedForm() {
  const { control, setValue } = useForm<NestedForm>({
    defaultValues: { dimensions: { width: 100, height: 100 }, name: 'test' },
  })
  return useRatioLockField({
    control,
    setValue,
    names: ['dimensions.width', 'dimensions.height'],
  })
}

export function TestWithPrecision() {
  const { control, setValue } = useForm<SimpleForm>({
    defaultValues: { width: 100, height: 100 },
  })
  return useRatioLockField({
    control,
    setValue,
    names: ['width', 'height'],
    precision: 2,
  })
}

export function TestOptionsType() {
  const { control, setValue } = useForm<SimpleForm>({
    defaultValues: { width: 100, height: 100 },
  })
  const options: UseRatioLockFieldOptions<SimpleForm> = {
    control,
    setValue,
    names: ['width', 'height'],
  }
  return useRatioLockField(options)
}
