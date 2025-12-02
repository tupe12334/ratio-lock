/**
 * Performance test - progressively complex forms
 */
import { useForm } from 'react-hook-form'
import { useRatioLockField } from 'ratio-lock/react-hook-form'

interface FlatForm {
  a: number
  b: number
  c: number
  d: number
  e: number
}

export function TestFlat() {
  const { control, setValue } = useForm<FlatForm>()
  return useRatioLockField({ control, setValue, names: ['a', 'b', 'c'] })
}

interface NestedForm {
  group: { a: number; b: number }
}

export function TestNested() {
  const { control, setValue } = useForm<NestedForm>()
  return useRatioLockField({
    control,
    setValue,
    names: ['group.a', 'group.b'],
  })
}

interface DeepForm {
  l1: { l2: { l3: { a: number; b: number } } }
}

export function TestDeep() {
  const { control, setValue } = useForm<DeepForm>()
  return useRatioLockField({
    control,
    setValue,
    names: ['l1.l2.l3.a', 'l1.l2.l3.b'],
  })
}

interface ComplexForm {
  user: { profile: { age: number }; settings: { theme: string } }
  dimensions: { width: number; height: number; depth: number }
  items: { quantity: number; price: number }[]
}

export function TestComplex() {
  const { control, setValue } = useForm<ComplexForm>()
  return useRatioLockField({
    control,
    setValue,
    names: ['dimensions.width', 'dimensions.height', 'dimensions.depth'],
  })
}
