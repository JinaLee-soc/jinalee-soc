import { useEffect, useState } from 'react'

const STEPS = [0.85, 1, 1.15, 1.3, 1.45]
const STORAGE_KEY = 'jl-font-scale'

function applyScale(scale: number) {
  document.documentElement.style.fontSize =
    scale === 1 ? '' : `${125 * scale}%`
}

function nearestStep(value: number) {
  return STEPS.reduce((best, step) =>
    Math.abs(step - value) < Math.abs(best - value) ? step : best
  )
}

export default function TextSizeControl() {
  const [scale, setScale] = useState(1)

  // Sync with the value the pre-hydration script already applied.
  useEffect(() => {
    try {
      const saved = parseFloat(localStorage.getItem(STORAGE_KEY) || '')
      if (saved && saved > 0.5 && saved < 2 && saved !== 1) {
        const snapped = nearestStep(saved)
        setScale(snapped)
        applyScale(snapped)
      }
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  const update = (next: number) => {
    setScale(next)
    applyScale(next)
    try {
      if (next === 1) localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      /* localStorage unavailable */
    }
  }

  const idx = STEPS.indexOf(scale)
  const step = (delta: number) => {
    const next = STEPS[idx + delta]
    if (next) update(next)
  }

  return (
    <div className="text-size" role="group" aria-label="Text size">
      <span className="text-size__label" aria-hidden="true">
        Text size
      </span>
      <button
        type="button"
        className="text-size__btn"
        onClick={() => step(-1)}
        disabled={idx <= 0}
        aria-label="Decrease text size"
      >
        A−
      </button>
      <button
        type="button"
        className="text-size__btn text-size__value"
        onClick={() => update(1)}
        disabled={scale === 1}
        aria-label="Reset text size to default"
        title="Reset text size"
        aria-live="polite"
      >
        {Math.round(scale * 100)}%
      </button>
      <button
        type="button"
        className="text-size__btn"
        onClick={() => step(1)}
        disabled={idx >= STEPS.length - 1}
        aria-label="Increase text size"
      >
        A+
      </button>
    </div>
  )
}
