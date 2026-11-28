export type ScopeKind = 'global' | 'component'

export type ControlDef =
  | {
      key: string
      label: string
      group: 'colors' | 'layout' | 'hero' | 'sections'
      scope: ScopeKind
      scopeNote?: string
      type: 'color'
      defaultValue: string
      cssVar: string
      syncNavBg?: boolean
    }
  | {
      key: string
      label: string
      group: 'colors' | 'layout' | 'hero' | 'sections'
      scope: ScopeKind
      scopeNote?: string
      type: 'number'
      defaultValue: number
      min: number
      max: number
      step: number
      unit: 'px' | 'rem' | '%'
      cssVar: string
    }
  | {
      key: string
      label: string
      group: 'colors' | 'layout' | 'hero' | 'sections'
      scope: ScopeKind
      scopeNote?: string
      type: 'boolean'
      defaultValue: boolean
      dataAttr: string
      whenToggled: string
    }
  | {
      key: string
      label: string
      group: 'colors' | 'layout' | 'hero' | 'sections'
      scope: ScopeKind
      scopeNote?: string
      type: 'enum'
      defaultValue: string
      options: Array<{ value: string; label: string }>
      dataAttr: string
    }

export type DesignValue = string | number | boolean
export type DesignOverrides = Record<string, DesignValue>

export const DESIGN_PANEL_META = {
  schemaVersion: 1,
  project: 'jinalee-academic-site',
  screen: 'site-global',
  baseline: 'no-ai-full-v2',
  storageKey: 'dp:jinalee-academic-site:site-global:v1',
} as const

export const DESIGN_CONTROLS: ControlDef[] = [
  // Global: Colors
  {
    key: 'theme.bg',
    label: '배경색',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#ffffff',
    cssVar: '--color-bg',
    syncNavBg: true,
  },
  {
    key: 'theme.surface',
    label: '표면 / 카드색',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#ffffff',
    cssVar: '--color-surface',
  },
  {
    key: 'theme.text',
    label: '기본 글자색',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#333330',
    cssVar: '--color-text',
  },
  {
    key: 'theme.textSecondary',
    label: '보조 글자색',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#6b6a64',
    cssVar: '--color-text-secondary',
  },
  {
    key: 'theme.border',
    label: '구분선 / 테두리',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#d7d6d0',
    cssVar: '--color-border',
  },
  {
    key: 'theme.accent',
    label: '링크 / 강조색',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#41413d',
    cssVar: '--color-accent',
  },
  {
    key: 'theme.primaryButton',
    label: '주요 버튼색 (CV)',
    group: 'colors',
    scope: 'global',
    type: 'color',
    defaultValue: '#41413d',
    cssVar: '--color-navy',
  },

  // Global: Layout & Shape
  {
    key: 'layout.maxWidth',
    label: '본문 최대 너비',
    group: 'layout',
    scope: 'global',
    type: 'number',
    defaultValue: 820,
    min: 720,
    max: 1160,
    step: 20,
    unit: 'px',
    cssVar: '--max-width-wide',
  },
  {
    key: 'layout.bodyFontSize',
    label: '본문 글자 배율',
    group: 'layout',
    scope: 'global',
    scopeNote: 'A-/A+ 조절과 별도 적용',
    type: 'number',
    defaultValue: 1,
    min: 0.85,
    max: 1.25,
    step: 0.05,
    unit: 'rem',
    cssVar: '--body-font-size',
  },
  {
    key: 'layout.sectionGap',
    label: '섹션 간격',
    group: 'layout',
    scope: 'global',
    type: 'number',
    defaultValue: 32,
    min: 20,
    max: 80,
    step: 4,
    unit: 'px',
    cssVar: '--section-gap',
  },
  {
    key: 'shape.controlRadius',
    label: '버튼·사진 모서리',
    group: 'layout',
    scope: 'global',
    type: 'number',
    defaultValue: 2,
    min: 0,
    max: 12,
    step: 1,
    unit: 'px',
    cssVar: '--control-radius',
  },

  // Component: Hero
  {
    key: 'hero.nameSize',
    label: '히어로 이름 크기',
    group: 'hero',
    scope: 'component',
    scopeNote: '데스크톱 기준 (>768px)',
    type: 'number',
    defaultValue: 1.75,
    min: 1.4,
    max: 3.2,
    step: 0.05,
    unit: 'rem',
    cssVar: '--hero-name-size',
  },
  {
    key: 'hero.headshotWidth',
    label: '프로필 사진 너비',
    group: 'hero',
    scope: 'component',
    scopeNote: '데스크톱 기준 (>768px)',
    type: 'number',
    defaultValue: 160,
    min: 130,
    max: 300,
    step: 10,
    unit: 'px',
    cssVar: '--hero-headshot-width',
  },
  {
    key: 'hero.headshotGrayscale',
    label: '사진 흑백 필터',
    group: 'hero',
    scope: 'component',
    type: 'number',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    cssVar: '--hero-headshot-grayscale',
  },
  {
    key: 'hero.showMotif',
    label: '배경 코퍼스 모티프 표시',
    group: 'hero',
    scope: 'component',
    type: 'boolean',
    defaultValue: false,
    dataAttr: 'data-dp-motif',
    whenToggled: 'visible',
  },

  // Component: Publications & Teaching
  {
    key: 'publications.badgeStyle',
    label: '논문 상태 뱃지',
    group: 'sections',
    scope: 'component',
    type: 'enum',
    defaultValue: 'neutral',
    options: [
      { value: 'neutral', label: '무채색' },
      { value: 'tinted', label: '블루' },
      { value: 'hidden', label: '숨김' },
    ],
    dataAttr: 'data-dp-badges',
  },
  {
    key: 'teaching.philosophyStyle',
    label: 'Teaching 철학 블록',
    group: 'sections',
    scope: 'component',
    type: 'enum',
    defaultValue: 'minimal',
    options: [
      { value: 'minimal', label: '좌측선만' },
      { value: 'outlined', label: '테두리' },
      { value: 'tinted', label: '배경색' },
    ],
    dataAttr: 'data-dp-philosophy',
  },
]

export const DESIGN_PRESETS: Array<{
  id: string
  label: string
  overrides: DesignOverrides
}> = [
  {
    id: 'default',
    label: '현재 기본값 (풀 리디자인)',
    overrides: {},
  },
  {
    id: 'roomy',
    label: '조금 더 여유롭게',
    overrides: {
      'layout.maxWidth': 920,
      'layout.bodyFontSize': 1.05,
      'layout.sectionGap': 44,
      'hero.nameSize': 2.2,
      'hero.headshotWidth': 210,
      'teaching.philosophyStyle': 'outlined',
    },
  },
]

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/

export function validateControlValue(
  control: ControlDef,
  raw: unknown
): DesignValue | null {
  if (control.type === 'color') {
    if (typeof raw !== 'string') return null
    const trimmed = raw.trim()
    return HEX_COLOR_RE.test(trimmed) ? trimmed.toLowerCase() : null
  }
  if (control.type === 'number') {
    const num = typeof raw === 'number' ? raw : Number(raw)
    if (!Number.isFinite(num)) return null
    const clamped = Math.min(control.max, Math.max(control.min, num))
    const precision = control.step < 1 ? 2 : 0
    return Number(clamped.toFixed(precision))
  }
  if (control.type === 'boolean') {
    return typeof raw === 'boolean' ? raw : null
  }
  if (control.type === 'enum') {
    if (typeof raw !== 'string') return null
    return control.options.some((opt) => opt.value === raw) ? raw : null
  }
  return null
}

export function sanitizeOverrides(raw: unknown): DesignOverrides {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const record = raw as Record<string, unknown>
  const clean: DesignOverrides = {}
  for (const control of DESIGN_CONTROLS) {
    if (!(control.key in record)) continue
    const validated = validateControlValue(control, record[control.key])
    if (validated !== null && validated !== control.defaultValue) {
      clean[control.key] = validated
    }
  }
  return clean
}

export function applyOverridesToDocument(overrides: DesignOverrides) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  for (const control of DESIGN_CONTROLS) {
    const hasOverride = control.key in overrides
    const value = hasOverride ? overrides[control.key] : control.defaultValue

    if (control.type === 'color') {
      if (hasOverride && typeof value === 'string') {
        root.style.setProperty(control.cssVar, value)
        if (control.syncNavBg) {
          root.style.setProperty('--nav-bg', value)
        }
      } else {
        root.style.removeProperty(control.cssVar)
        if (control.syncNavBg) {
          root.style.removeProperty('--nav-bg')
        }
      }
    } else if (control.type === 'number') {
      if (hasOverride && typeof value === 'number') {
        root.style.setProperty(control.cssVar, `${value}${control.unit}`)
      } else {
        root.style.removeProperty(control.cssVar)
      }
    } else if (control.type === 'boolean') {
      if (hasOverride && value !== control.defaultValue) {
        root.setAttribute(control.dataAttr, control.whenToggled)
      } else {
        root.removeAttribute(control.dataAttr)
      }
    } else if (control.type === 'enum') {
      if (hasOverride && typeof value === 'string' && value !== control.defaultValue) {
        root.setAttribute(control.dataAttr, value)
      } else {
        root.removeAttribute(control.dataAttr)
      }
    }
  }
}

interface PersistedState {
  schemaVersion: number
  project: string
  screen: string
  baseline: string
  overrides: DesignOverrides
}

export function loadPersistedOverrides(): DesignOverrides {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(DESIGN_PANEL_META.storageKey)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (
      parsed.schemaVersion !== DESIGN_PANEL_META.schemaVersion ||
      parsed.project !== DESIGN_PANEL_META.project ||
      parsed.screen !== DESIGN_PANEL_META.screen ||
      parsed.baseline !== DESIGN_PANEL_META.baseline
    ) {
      window.localStorage.removeItem(DESIGN_PANEL_META.storageKey)
      return {}
    }
    return sanitizeOverrides(parsed.overrides)
  } catch {
    return {}
  }
}

export function savePersistedOverrides(overrides: DesignOverrides) {
  if (typeof window === 'undefined') return
  try {
    const clean = sanitizeOverrides(overrides)
    if (Object.keys(clean).length === 0) {
      window.localStorage.removeItem(DESIGN_PANEL_META.storageKey)
      return
    }
    const payload: PersistedState = {
      schemaVersion: DESIGN_PANEL_META.schemaVersion,
      project: DESIGN_PANEL_META.project,
      screen: DESIGN_PANEL_META.screen,
      baseline: DESIGN_PANEL_META.baseline,
      overrides: clean,
    }
    window.localStorage.setItem(
      DESIGN_PANEL_META.storageKey,
      JSON.stringify(payload)
    )
  } catch {
    // Storage unavailable or full; preview still works in memory.
  }
}

export function buildExportPayload(overrides: DesignOverrides) {
  const clean = sanitizeOverrides(overrides)
  const changes: Record<string, DesignValue> = {}
  const metadata: Record<string, { scope: ScopeKind; unit?: string }> = {}

  for (const control of DESIGN_CONTROLS) {
    if (!(control.key in clean)) continue
    changes[control.key] = clean[control.key]
    metadata[control.key] =
      control.type === 'number'
        ? { scope: control.scope, unit: control.unit }
        : { scope: control.scope }
  }

  return {
    schemaVersion: DESIGN_PANEL_META.schemaVersion,
    project: DESIGN_PANEL_META.project,
    screen: DESIGN_PANEL_META.screen,
    baseline: DESIGN_PANEL_META.baseline,
    changes,
    metadata,
  }
}
