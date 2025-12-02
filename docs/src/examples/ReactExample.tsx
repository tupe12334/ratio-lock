import { useRatioLock } from 'ratio-lock/react'

export function ReactExample() {
  const { values, setValue, isLocked, toggle, ratios } = useRatioLock(
    [1920, 1080],
    { precision: 0 }
  )

  const codeExample = `import { useRatioLock } from 'ratio-lock/react'

function ImageDimensionPicker() {
  const {
    values,    // [width, height]
    setValue,  // (index, value) => void
    isLocked,  // boolean
    toggle,    // () => void
    lock,      // () => void
    unlock,    // () => void
    ratios,    // [1, heightRatio]
  } = useRatioLock([1920, 1080], { precision: 0 })

  return (
    <div>
      <input
        type="number"
        value={values[0]}
        onChange={(e) => setValue(0, Number(e.target.value))}
      />
      <input
        type="number"
        value={values[1]}
        onChange={(e) => setValue(1, Number(e.target.value))}
      />
      <button onClick={toggle}>
        {isLocked ? 'Unlock' : 'Lock'}
      </button>
    </div>
  )
}`

  return (
    <div className="example">
      <h2>React Hook</h2>
      <p className="example-description">
        Use the <code>useRatioLock</code> hook for seamless React integration.
        Manages state automatically and provides memoized callbacks.
      </p>

      <div className="demo-section">
        <h3>Image Dimensions Calculator</h3>
        <div className="input-group">
          <div className="input-field">
            <label htmlFor="react-width">Width (px)</label>
            <input
              type="number"
              id="react-width"
              value={values[0]}
              min={1}
              onChange={e => setValue(0, Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="react-height">Height (px)</label>
            <input
              type="number"
              id="react-height"
              value={values[1]}
              min={1}
              onChange={e => setValue(1, Number(e.target.value))}
            />
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
        <p>
          Current ratio:{' '}
          <span className="ratio-display">
            {ratios[0].toFixed(2)} : {ratios[1].toFixed(2)}
          </span>
        </p>
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
