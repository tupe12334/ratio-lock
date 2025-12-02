import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useRatioLockField } from 'ratio-lock/react-hook-form'

interface FormData {
  width: number
  height: number
}

function RatioLockedFields() {
  const { control } = useFormContext<FormData>()
  const { fields, isLocked, toggle } = useRatioLockField<FormData>({
    control,
    names: ['width', 'height'],
    precision: 0,
  })

  return (
    <>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="rhf-width">Width (px)</label>
          <input type="number" id="rhf-width" min={1} {...fields.width} />
        </div>
        <div className="input-field">
          <label htmlFor="rhf-height">Height (px)</label>
          <input type="number" id="rhf-height" min={1} {...fields.height} />
        </div>
        <button
          type="button"
          className={`lock-button ${isLocked ? 'locked' : ''}`}
          onClick={toggle}
        >
          <span className="lock-icon">{isLocked ? '🔒' : '🔓'}</span>
          {isLocked ? ' Locked' : ' Unlocked'}
        </button>
      </div>
      <p
        style={{
          marginTop: '0.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
        }}
      >
        Form values: width={fields.width?.value}, height={fields.height?.value}
      </p>
    </>
  )
}

export function ReactHookFormExample() {
  const methods = useForm<FormData>({
    defaultValues: {
      width: 1920,
      height: 1080,
    },
  })

  const codeExample = `import { useForm, FormProvider } from 'react-hook-form'
import { useRatioLockField } from 'ratio-lock/react-hook-form'

interface FormData {
  width: number
  height: number
}

function ImageForm() {
  const methods = useForm<FormData>({
    defaultValues: { width: 1920, height: 1080 },
  })

  const { fields, isLocked, toggle } = useRatioLockField<FormData>({
    control: methods.control,
    names: ['width', 'height'],
    precision: 0,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="number" {...fields.width} />
        <input type="number" {...fields.height} />
        <button type="button" onClick={toggle}>
          {isLocked ? 'Unlock' : 'Lock'}
        </button>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}`

  return (
    <div className="example">
      <h2>React Hook Form Integration</h2>
      <p className="example-description">
        Use the <code>useRatioLockField</code> hook with React Hook Form.
        Seamlessly integrates with form validation and submission.
      </p>

      <div className="demo-section">
        <h3>Image Dimensions Calculator</h3>
        <FormProvider {...methods}>
          <form>
            <RatioLockedFields />
          </form>
        </FormProvider>
      </div>

      <div className="code-section">
        <h3>Code Example</h3>
        <div className="code-block">
          <code>{codeExample}</code>
        </div>
      </div>
    </div>
  )
}
