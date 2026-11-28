import { useEffect, useRef, useState } from 'react'
import styles from './DesignPanel.module.css'
import {
  applyOverridesToDocument,
  buildExportPayload,
  DESIGN_CONTROLS,
  DESIGN_PANEL_META,
  DESIGN_PRESETS,
  loadPersistedOverrides,
  sanitizeOverrides,
  savePersistedOverrides,
  validateControlValue,
  type ControlDef,
  type DesignOverrides,
} from './designPanelSchema'

const GROUPS: Array<{
  id: ControlDef['group']
  title: string
  scopeLabel: string
}> = [
  { id: 'colors', title: '색상', scopeLabel: '전체 사이트' },
  { id: 'layout', title: '레이아웃 · 형태', scopeLabel: '전체 사이트' },
  { id: 'hero', title: '히어로 영역', scopeLabel: '홈 컴포넌트' },
  { id: 'sections', title: '논문 · Teaching', scopeLabel: '개별 컴포넌트' },
]

export default function DesignPanel() {
  const [open, setOpen] = useState(false)
  const [overrides, setOverrides] = useState<DesignOverrides>({})
  const [draftText, setDraftText] = useState<Record<string, string>>({})
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [statusIsError, setStatusIsError] = useState(false)
  const [fallbackJson, setFallbackJson] = useState<string | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const loaded = loadPersistedOverrides()
    setOverrides(loaded)
    applyOverridesToDocument(loaded)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        openerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    closeBtnRef.current?.focus()
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const commitOverrides = (next: DesignOverrides) => {
    const clean = sanitizeOverrides(next)
    setOverrides(clean)
    applyOverridesToDocument(clean)
    savePersistedOverrides(clean)
  }

  const updateControl = (control: ControlDef, raw: unknown) => {
    const validated = validateControlValue(control, raw)
    if (validated === null) return
    const next = { ...overrides }
    if (validated === control.defaultValue) {
      delete next[control.key]
    } else {
      next[control.key] = validated
    }
    commitOverrides(next)
  }

  const resetControl = (key: string) => {
    const next = { ...overrides }
    delete next[key]
    setDraftText((prev) => {
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
    commitOverrides(next)
  }

  const resetAll = () => {
    setDraftText({})
    setFallbackJson(null)
    setStatusMessage('모든 설정을 소스 기본값으로 초기화했습니다.')
    setStatusIsError(false)
    commitOverrides({})
  }

  const applyPreset = (presetOverrides: DesignOverrides, label: string) => {
    setDraftText({})
    setFallbackJson(null)
    commitOverrides(presetOverrides)
    setStatusMessage(`'${label}' 프리셋을 미리보기에 적용했습니다.`)
    setStatusIsError(false)
  }

  const handleCopyJson = async () => {
    const json = JSON.stringify(buildExportPayload(overrides), null, 2)
    try {
      await navigator.clipboard.writeText(json)
      setFallbackJson(null)
      setStatusMessage('설정 JSON을 클립보드에 복사했습니다. (소스 파일은 아직 변경되지 않았습니다.)')
      setStatusIsError(false)
    } catch {
      setFallbackJson(json)
      setStatusMessage('클립보드 접근에 실패했습니다. 아래 JSON을 직접 복사하거나 다운로드하세요.')
      setStatusIsError(true)
    }
  }

  const handleDownloadJson = () => {
    const json = JSON.stringify(buildExportPayload(overrides), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${DESIGN_PANEL_META.project}-design-settings.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setStatusMessage('JSON 파일을 다운로드했습니다. (소스 파일 반영은 별도 요청이 필요합니다.)')
    setStatusIsError(false)
  }

  const changedCount = Object.keys(overrides).length

  if (!open) {
    return (
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        onClick={() => setOpen(true)}
        aria-label="디자인 튜닝 패널 열기"
        aria-expanded={false}
      >
        <span>디자인 패널</span>
        {changedCount > 0 && <span className={styles.badge}>{changedCount}</span>}
      </button>
    )
  }

  return (
    <aside
      className={styles.panel}
      role="dialog"
      aria-label="디자인 튜닝 패널"
      aria-modal={false}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>디자인 패널 (개발 미리보기)</h2>
          <p className={styles.subtitle}>
            기준선: {DESIGN_PANEL_META.baseline} · 변경 {changedCount}건
          </p>
        </div>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={() => {
            setOpen(false)
            openerRef.current?.focus()
          }}
        >
          닫기
        </button>
      </div>

      <div className={styles.notice}>
        브라우저 저장은 현재 기기 미리보기 전용이며 소스 파일을 수정하지 않습니다.
        확정하려면 JSON을 복사하거나 저장해 전달하세요.
      </div>

      <div className={styles.body}>
        <section className={styles.group} aria-label="빠른 프리셋">
          <div className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>빠른 프리셋</h3>
            <span className={styles.scopeTag}>미리보기 비교</span>
          </div>
          <div className={styles.presetRow}>
            {DESIGN_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={styles.presetBtn}
                onClick={() => applyPreset(preset.overrides, preset.label)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </section>

        {GROUPS.map((group) => {
          const controls = DESIGN_CONTROLS.filter((c) => c.group === group.id)
          return (
            <section key={group.id} className={styles.group}>
              <div className={styles.groupHeader}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <span className={styles.scopeTag}>{group.scopeLabel}</span>
              </div>

              {controls.map((control) => {
                const isModified = control.key in overrides
                const currentValue = isModified
                  ? overrides[control.key]
                  : control.defaultValue

                if (control.type === 'color') {
                  const hex = String(currentValue)
                  const textVal = draftText[control.key] ?? hex
                  return (
                    <div key={control.key} className={styles.row}>
                      <div className={styles.rowTop}>
                        <label htmlFor={`dp-${control.key}`} className={styles.label}>
                          {control.label}
                        </label>
                        {isModified && (
                          <button
                            type="button"
                            className={styles.resetOne}
                            onClick={() => resetControl(control.key)}
                            aria-label={`${control.label} 초기화`}
                          >
                            초기화
                          </button>
                        )}
                      </div>
                      <div className={styles.colorControls}>
                        <input
                          type="color"
                          className={styles.colorPicker}
                          value={hex}
                          aria-label={`${control.label} 색상 선택`}
                          onChange={(e) => {
                            const val = e.target.value
                            setDraftText((prev) => {
                              const copy = { ...prev }
                              delete copy[control.key]
                              return copy
                            })
                            updateControl(control, val)
                          }}
                        />
                        <input
                          id={`dp-${control.key}`}
                          type="text"
                          className={styles.textInput}
                          value={textVal}
                          spellCheck={false}
                          onChange={(e) => {
                            const raw = e.target.value
                            setDraftText((prev) => ({ ...prev, [control.key]: raw }))
                            const valid = validateControlValue(control, raw)
                            if (valid !== null) {
                              updateControl(control, valid)
                            }
                          }}
                          onBlur={() => {
                            setDraftText((prev) => {
                              const copy = { ...prev }
                              delete copy[control.key]
                              return copy
                            })
                          }}
                        />
                      </div>
                    </div>
                  )
                }

                if (control.type === 'number') {
                  const num = Number(currentValue)
                  return (
                    <div key={control.key} className={styles.row}>
                      <div className={styles.rowTop}>
                        <div className={styles.labelWrap}>
                          <label htmlFor={`dp-${control.key}`} className={styles.label}>
                            {control.label}
                          </label>
                          {control.scopeNote && (
                            <span className={styles.note}>{control.scopeNote}</span>
                          )}
                        </div>
                        {isModified && (
                          <button
                            type="button"
                            className={styles.resetOne}
                            onClick={() => resetControl(control.key)}
                            aria-label={`${control.label} 초기화`}
                          >
                            초기화
                          </button>
                        )}
                      </div>
                      <div className={styles.numberControls}>
                        <input
                          type="range"
                          className={styles.slider}
                          min={control.min}
                          max={control.max}
                          step={control.step}
                          value={num}
                          aria-label={`${control.label} 슬라이더`}
                          onChange={(e) => updateControl(control, e.target.value)}
                        />
                        <input
                          id={`dp-${control.key}`}
                          type="number"
                          className={styles.numInput}
                          min={control.min}
                          max={control.max}
                          step={control.step}
                          value={num}
                          onChange={(e) => updateControl(control, e.target.value)}
                        />
                        <span className={styles.unit}>{control.unit}</span>
                      </div>
                    </div>
                  )
                }

                if (control.type === 'boolean') {
                  const checked = Boolean(currentValue)
                  return (
                    <div key={control.key} className={styles.row}>
                      <div className={styles.rowTop}>
                        <label className={styles.switchLabel}>
                          <span className={styles.label}>{control.label}</span>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={checked}
                            onChange={(e) => updateControl(control, e.target.checked)}
                          />
                        </label>
                        {isModified && (
                          <button
                            type="button"
                            className={styles.resetOne}
                            onClick={() => resetControl(control.key)}
                            aria-label={`${control.label} 초기화`}
                          >
                            초기화
                          </button>
                        )}
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={control.key} className={styles.row}>
                    <div className={styles.rowTop}>
                      <span className={styles.label}>{control.label}</span>
                      {isModified && (
                        <button
                          type="button"
                          className={styles.resetOne}
                          onClick={() => resetControl(control.key)}
                          aria-label={`${control.label} 초기화`}
                        >
                          초기화
                        </button>
                      )}
                    </div>
                    <div className={styles.segmented} role="group" aria-label={control.label}>
                      {control.options.map((opt) => {
                        const active = currentValue === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            className={`${styles.segBtn} ${active ? styles.segBtnActive : ''}`}
                            aria-pressed={active}
                            onClick={() => updateControl(control, opt.value)}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </section>
          )
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={handleCopyJson}>
            JSON 복사
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={handleDownloadJson}>
            저장
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={resetAll}>
            전체 초기화
          </button>
        </div>
        {statusMessage && (
          <p
            className={`${styles.status} ${statusIsError ? styles.statusError : ''}`}
            role="status"
          >
            {statusMessage}
          </p>
        )}
        {fallbackJson && (
          <textarea
            className={styles.fallbackBox}
            readOnly
            value={fallbackJson}
            aria-label="내보내기 JSON"
            onFocus={(e) => e.currentTarget.select()}
          />
        )}
      </div>
    </aside>
  )
}
