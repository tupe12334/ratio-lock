# ratio-lock

A TypeScript library for managing n numbers with locked ratios. When the ratio is locked, changing one value automatically adjusts all other values to maintain their proportional relationships.

## Features

- **Pure TypeScript core** - Framework-agnostic logic that can be used anywhere
- **React bindings** - Ready-to-use hooks for React applications
- **react-hook-form integration** - Seamless integration with react-hook-form
- **Lock/unlock ratio** - Toggle ratio locking on and off
- **N numbers support** - Works with any number of values
- **Configurable precision** - Control decimal precision for calculated values

## Installation

```bash
npm install ratio-lock
# or
yarn add ratio-lock
# or
pnpm add ratio-lock
```

## Usage

### Pure TypeScript

```typescript
import { RatioLock } from 'ratio-lock'

// Initialize with values
const ratioLock = new RatioLock([100, 200, 300])

// Lock the current ratio (1:2:3)
ratioLock.lock()

// Update the first value - others will adjust proportionally
ratioLock.setValue(0, 200)
// Result: [200, 400, 600]

// Unlock to allow independent changes
ratioLock.unlock()

// Now values can change independently
ratioLock.setValue(1, 500)
// Result: [200, 500, 600]
```

### React Hook

```tsx
import { useRatioLock } from 'ratio-lock/react'

function ResolutionPicker() {
  const { values, setValue, isLocked, lock, unlock, toggle } = useRatioLock([
    1920, 1080,
  ])

  return (
    <div>
      <input
        type="number"
        value={values[0]}
        onChange={e => setValue(0, Number(e.target.value))}
      />
      <span>×</span>
      <input
        type="number"
        value={values[1]}
        onChange={e => setValue(1, Number(e.target.value))}
      />
      <button onClick={toggle}>{isLocked ? '🔒' : '🔓'}</button>
    </div>
  )
}
```

### react-hook-form Integration

```tsx
import { useForm } from 'react-hook-form'
import { useRatioLockField } from 'ratio-lock/react-hook-form'

function ImageResizeForm() {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: { width: 1920, height: 1080 },
  })

  const { fields, isLocked, toggle } = useRatioLockField({
    control,
    setValue,
    names: ['width', 'height'],
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...fields.width} />
      <input type="number" {...fields.height} />
      <button type="button" onClick={toggle}>
        {isLocked ? '🔒' : '🔓'}
      </button>
      <button type="submit">Resize</button>
    </form>
  )
}
```

## API

### `RatioLock` Class

#### Constructor

```typescript
new RatioLock(initialValues: number[], options?: RatioLockOptions)
```

#### Options

| Option      | Type      | Default     | Description                             |
| ----------- | --------- | ----------- | --------------------------------------- |
| `precision` | `number`  | `undefined` | Decimal precision for calculated values |
| `locked`    | `boolean` | `false`     | Initial lock state                      |

#### Methods

| Method                   | Description                                   |
| ------------------------ | --------------------------------------------- |
| `lock()`                 | Lock the current ratio                        |
| `unlock()`               | Unlock the ratio                              |
| `toggle()`               | Toggle lock state                             |
| `setValue(index, value)` | Set a value at the given index                |
| `setValues(values)`      | Set all values (recalculates ratio if locked) |
| `getValues()`            | Get current values                            |
| `getRatios()`            | Get current ratios                            |
| `isLocked()`             | Check if ratio is locked                      |

### React Hooks

#### `useRatioLock(initialValues, options?)`

Returns an object with:

- `values: number[]` - Current values
- `setValue(index, value)` - Update a single value
- `setValues(values)` - Update all values
- `isLocked: boolean` - Current lock state
- `lock()` - Lock the ratio
- `unlock()` - Unlock the ratio
- `toggle()` - Toggle lock state
- `ratios: number[]` - Current ratios

#### `useRatioLockField(options)` (react-hook-form)

Options:

- `control` - react-hook-form control object
- `setValue` - react-hook-form setValue function
- `names: string[]` - Field names to manage
- `precision` - (optional) Decimal precision for calculated values

Returns an object with field props and lock controls.

## Use Cases

- **Image/video resolution pickers** - Maintain aspect ratio while resizing
- **Recipe scaling** - Scale ingredients proportionally
- **Financial calculators** - Maintain percentage distributions
- **Design tools** - Lock proportions for shapes and layouts
- **Audio mixing** - Maintain relative volume levels

## License

MIT
