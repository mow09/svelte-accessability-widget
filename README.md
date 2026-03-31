# svelte-accessibility-widget

A themeable, accessible Svelte 5 accessibility widget — floating FAB, sliding panel, built-in features, localStorage persistence, dark mode, and an easy API for adding your own features.

---

## Built-in features

| Feature | Category | Effect |
|---|---|---|
| Hoher Kontrast | Sehen | Smart color inversion |
| Graustufen | Sehen | Grayscale filter |
| Animationen | Sehen | Pauses all CSS animations & transitions |
| Schriftgröße | Lesen | 4-step font size stepper (100% → 150%) |
| Links hervorheben | Lesen | Adds outline + underline to all links |
| Abstände | Lesen | Increases letter & word spacing |
| Zeilenhöhe | Lesen | Sets line-height to 1.8 |
| Dyslexie-Schrift | Lesen | Loads & applies OpenDyslexic font |
| Großer Cursor | Motorik | Replaces cursor with a large SVG pointer |

All toggle states are saved to `localStorage` and CSS effects are re-applied automatically on every page load.

---

## Roadmap

Features planned for upcoming releases:

| Feature | Category | Description |
|---|---|---|
| 🔲 Zusätzlicher Kontrast | Sehen | Forces text to pure black/white with a contrasting background |
| 🔲 Bilder ausblenden | Sehen | Hides all images on the page |
| 🔲 Farben entsättigen | Sehen | Reduces color saturation for visual comfort |
| 🔲 ADHS-Modus | Fokus | Distraction-free browsing, hides decorative elements |
| 🔲 Screenreader-Hinweise | Navigation | Visual indicators for screen reader landmarks |

> Want a feature sooner? [Open an issue](../../issues) or add it yourself — it's just one file in `src/lib/features/`.

---

## Installation

```sh
npm install github:mow09/svelte-accessibility-widget
```

Then install the peer dependencies if you haven't already:

```sh
npm install svelte @lucide/svelte
```

> **Peer dependencies:** `svelte ^5.0.0`, `@lucide/svelte ^1.7.0`

---

## Basic usage

```svelte
<script>
  import { AccessibilityWidget } from 'svelte-accessibility-widget';
</script>

<AccessibilityWidget theme="indigo" position="bottom-right" />
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `ThemePreset \| Partial<ThemeConfig>` | `'indigo'` | Color preset or custom theme object |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | FAB position |
| `darkMode` | `boolean \| undefined` | `undefined` | Force dark/light or auto-detect |
| `persist` | `boolean` | `true` | Save toggle states to localStorage |
| `showBranding` | `boolean` | `false` | Show "Powered by" footer |
| `labels` | `Labels` | German defaults | Override any UI string |
| `features` | `FeatureConfig[]` | `[]` | Additional features to show in the panel |

---

## Theme presets

`'indigo'` · `'violet'` · `'emerald'` · `'rose'` · `'amber'` · `'slate'`

```svelte
<AccessibilityWidget theme="emerald" />
```

### Custom theme

```svelte
<AccessibilityWidget
  theme={{
    primary: '#0ea5e9',
    primaryHover: '#0284c7',
    primaryText: '#ffffff',
    background: '#ffffff',
    surface: '#f0f9ff',
    text: '#0c4a6e',
    border: '#bae6fd',
    muted: '#64748b'
  }}
/>
```

---

## Labels (i18n)

Defaults are German. Override any string:

```svelte
<AccessibilityWidget
  labels={{
    title: 'Accessibility',
    subtitle: 'Adjust the display to your needs',
    close: 'Close',
    reset: 'Reset all',
    hideToolbar: 'Hide toolbar'
  }}
/>
```

---

## Adding features

### With CSS — just pass a `css` string

The simplest way. The CSS is injected when the toggle is on and removed when off. State persists across reloads.

```svelte
<script>
  import { AccessibilityWidget } from 'svelte-accessibility-widget';
  import { Focus } from '@lucide/svelte';
</script>

<AccessibilityWidget
  features={[
    {
      id: 'focus-highlight',
      label: 'Fokus hervorheben',
      category: 'Sehen',
      size: 'sm',
      icon: Focus,
      css: `:focus { outline: 3px solid orange !important; outline-offset: 3px !important; }`
    }
  ]}
/>
```

Features are automatically grouped by `category`. A new category string creates a new section heading.

### With custom UI — `{#snippet extra()}`

For features that need sliders, steppers, or any custom Svelte component:

```svelte
<AccessibilityWidget>
  {#snippet extra()}
    <!-- your fully custom component here -->
  {/snippet}
</AccessibilityWidget>
```

### Custom branding footer

```svelte
<AccessibilityWidget showBranding={true}>
  {#snippet branding()}
    <a href="https://yoursite.com">Barrierefreiheit by YourBrand</a>
  {/snippet}
</AccessibilityWidget>
```

---

## `FeatureConfig` type

```ts
interface FeatureConfig {
  id: string;
  label: string;
  description?: string;
  icon?: Component;             // any Lucide icon component
  category?: string;            // groups features under a section heading
  size?: 'sm' | 'md' | 'lg';  // 'sm' = compact card (default), 'md'/'lg' = full-width row
  css?: string;                 // CSS injected when the toggle is active
}
```

---

## Exported APIs

```ts
import {
  // Main component
  AccessibilityWidget,

  // Primitive components (for custom feature UIs)
  FeatureCard,           // compact icon + label toggle card (sm)
  FeatureRow,            // full-width icon + label + toggle row (md/lg)

  // Built-in feature components
  HighContrast,
  Grayscale,
  PauseAnimations,
  FontSize,
  HighlightLinks,
  TextSpacing,
  LineHeight,
  DyslexiaFont,
  BigCursor,

  // Theme utilities
  presets,               // record of all ThemeConfig presets
  resolveTheme,          // resolveTheme(preset, isDark) → ThemeConfig

  // CSS utility
  injectStyle,           // injectStyle(id, css) — idempotent style tag injection
  removeStyle,           // removeStyle(id) — removes injected style tag
} from 'svelte-accessibility-widget';
```

---

## Tech stack

- **Svelte 5** — Runes (`$state`, `$derived`, `$props`, snippets)
- **TypeScript** — fully typed API
- **Tailwind CSS 4** — utility-first styling
- **Lucide Svelte** — icons

---

## Developing

```sh
npm install
npm run dev        # demo app at localhost:5173
npm run check      # TypeScript + Svelte diagnostics
npm run build      # build the library
```

Everything in `src/lib/` is the library. `src/routes/` is the demo app.
