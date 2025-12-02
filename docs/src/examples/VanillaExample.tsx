import { useEffect, useRef } from 'react'
import { RatioLock } from 'ratio-lock'

export function VanillaExample() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create the RatioLock instance
    const ratioLock = new RatioLock([1920, 1080], { precision: 0 })

    // Get DOM elements
    const widthInput =
      container.querySelector<HTMLInputElement>('#vanilla-width')
    const heightInput =
      container.querySelector<HTMLInputElement>('#vanilla-height')
    const lockButton =
      container.querySelector<HTMLButtonElement>('#vanilla-lock')
    const ratioDisplay =
      container.querySelector<HTMLSpanElement>('#vanilla-ratio')

    if (!widthInput || !heightInput || !lockButton || !ratioDisplay) return

    // Update UI based on state
    const updateUI = () => {
      const values = ratioLock.getValues()
      widthInput.value = String(values[0])
      heightInput.value = String(values[1])

      const ratios = ratioLock.getRatios()
      ratioDisplay.textContent = `${ratios[0].toFixed(2)} : ${ratios[1].toFixed(2)}`

      if (ratioLock.isLocked()) {
        lockButton.classList.add('locked')
        lockButton.innerHTML = '<span class="lock-icon">🔒</span> Locked'
      } else {
        lockButton.classList.remove('locked')
        lockButton.innerHTML = '<span class="lock-icon">🔓</span> Unlocked'
      }
    }

    // Event handlers
    widthInput.addEventListener('input', e => {
      const value = Number((e.target as HTMLInputElement).value)
      ratioLock.setValue(0, value)
      updateUI()
    })

    heightInput.addEventListener('input', e => {
      const value = Number((e.target as HTMLInputElement).value)
      ratioLock.setValue(1, value)
      updateUI()
    })

    lockButton.addEventListener('click', () => {
      ratioLock.toggle()
      updateUI()
    })

    // Initial render
    updateUI()
  }, [])

  const codeExample = `import { RatioLock } from 'ratio-lock'

// Create a RatioLock with initial values
const ratioLock = new RatioLock([1920, 1080], {
  precision: 0,  // Round to integers
  locked: false  // Start unlocked
})

// Lock the current ratio
ratioLock.lock()

// Now changing one value updates all proportionally
ratioLock.setValue(0, 3840)  // Set width to 3840
console.log(ratioLock.getValues())  // [3840, 2160]

// Get the current ratio
console.log(ratioLock.getRatios())  // [1, 0.5625]

// Unlock to modify independently
ratioLock.unlock()
ratioLock.setValue(1, 1000)  // Only height changes
console.log(ratioLock.getValues())  // [3840, 1000]`

  return (
    <div className="example">
      <h2>Vanilla JavaScript</h2>
      <p className="example-description">
        Use the core <code>RatioLock</code> class directly for
        framework-agnostic applications. Perfect for vanilla JS, Web Components,
        or any other framework.
      </p>

      <div className="demo-section">
        <h3>Image Dimensions Calculator</h3>
        <div ref={containerRef}>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="vanilla-width">Width (px)</label>
              <input
                type="number"
                id="vanilla-width"
                defaultValue="1920"
                min="1"
              />
            </div>
            <div className="input-field">
              <label htmlFor="vanilla-height">Height (px)</label>
              <input
                type="number"
                id="vanilla-height"
                defaultValue="1080"
                min="1"
              />
            </div>
            <button type="button" className="lock-button" id="vanilla-lock">
              <span className="lock-icon">🔓</span> Unlocked
            </button>
          </div>
          <p>
            Current ratio:{' '}
            <span className="ratio-display" id="vanilla-ratio">
              1.00 : 0.56
            </span>
          </p>
        </div>
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
