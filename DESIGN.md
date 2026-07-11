# Jina Lee Academic Site Design System

## 1. Atmosphere & Identity

The site is a quiet academic portfolio: editorial, spacious, and precise. Its signature is a restrained sage accent applied to navigation and actions, with serif display type for the scholar's name and a clear sans-serif reading layer for the rest of the interface.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Background | `--color-bg` | `#fafaf9` | Page and navigation background |
| Surface | `--color-surface` | `#ffffff` | Cards and content surfaces |
| Border | `--color-border` | `#e5e3df` | Navigation and control borders |
| Border/subtle | `--color-border-light` | `#f0ede9` | Section separators |
| Text/primary | `--color-text` | `#1a1917` | Body and headings |
| Text/secondary | `--color-text-secondary` | `#5a5650` | Navigation and supporting text |
| Text/muted | `--color-text-muted` | `#8a847c` | Labels and metadata |
| Accent | `--color-accent` | `#5b6e5a` | Links, focus, active states |
| Accent/hover | `--color-accent-hover` | `#47573a` | Interactive hover states |
| Accent/light | `--color-accent-light` | `#f0f3ef` | Soft interactive hover surface |

Accent is reserved for interactive elements and status cues. New controls must use existing tokens rather than introduce a new color.

## 3. Typography

| Level | Size | Weight | Usage |
|---|---:|---:|---|
| Hero name | `3.2rem` | 600 | Scholar name on the home page |
| Page title | `2rem` | 700 | Interior page headings |
| Section title | `1.625rem` | 600 | Major section headings |
| Body | `1rem` | 400 | Main reading text |
| Navigation | `0.875rem` | 500 | Header navigation |
| Label | `0.7rem` | 500 | Section labels |

- English sans: Inter with system fallbacks.
- English display: Source Serif 4 with Georgia fallbacks.
- Korean UI and prose: Pretendard Variable with Apple SD Gothic Neo and Noto Sans KR fallbacks.
- Mono labels: IBM Plex Mono.

## 4. Spacing & Layout

Spacing uses the existing 4px-based scale from `--space-1` through `--space-24`. The wide content container is `--max-width-wide` (1000px), the reading container is `--max-width` (760px), and the sticky header uses `--nav-height` (64px desktop, 56px mobile).

## 5. Components

### Header

- **Structure**: sticky `nav` with brand, text-size controls, language switch, page navigation, and mobile menu toggle.
- **Variants**: English and Korean locale; desktop and mobile navigation.
- **Spacing**: `--space-6` desktop gaps, `--space-2` mobile gaps, `--space-8` icon control size.
- **States**: default, hover, active page, focus-visible, expanded mobile menu.
- **Accessibility**: semantic navigation lists, keyboard-reachable links and buttons, localized labels, visible focus ring.
- **Motion**: 150ms color and border transitions only.

### Language switch

- **Structure**: a compact `Link` with a visible `KOR` or `ENG` destination code and a localized destination label for assistive technology.
- **Variants**: target English or Korean route, preserving the current page when a counterpart exists.
- **Spacing**: `--space-8` minimum hit area with `--space-1` vertical and `--space-2` horizontal padding.
- **States**: default, hover, focus-visible.
- **Accessibility**: localized `aria-label` and `title`; the link remains visible in both desktop and mobile headers. English codes use the mono token; Korean pages intentionally inherit Pretendard Variable for typographic consistency.
- **Motion**: 150ms color and background transitions only.

### Text size control

- **Structure**: labeled group with decrease, reset, and increase buttons.
- **States**: default, hover, focus-visible, disabled.
- **Accessibility**: localized group and button labels; disabled states expose unavailable limits.

### Link button

- **Structure**: text link or button with outline or filled treatment.
- **States**: default, hover, focus-visible, active.
- **Accessibility**: native link/button semantics and visible focus.

## 6. Motion & Interaction

Interactive color, border, and background changes use the existing 150ms ease transition. The header is sticky so the language switch remains available while reading. No layout properties are animated. Reduced-motion users receive the same final states without non-essential motion.

## 7. Depth & Surface

The system uses a mixed treatment: subtle borders for structure and a translucent, blurred sticky header to preserve context while scrolling. Cards and sections remain editorial and mostly border-led rather than shadow-heavy.

## 8. Accessibility Constraints & Accepted Debt

- Target WCAG 2.2 AA.
- Maintain visible focus indicators on every interactive control.
- Use native links for route changes and native buttons for state changes.
- Keep the language switch keyboard reachable and labeled even though its visual affordance is icon-only.
- Preserve readable Korean line wrapping and the user's text-size control.

No new accessibility debt is accepted by the language-switch change.
