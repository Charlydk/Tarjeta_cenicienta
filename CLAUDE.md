# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page invitation website for a quinceañera (15th birthday party) — themed as a **Cinderella allegory**. No build step, no package manager, no framework. Everything runs directly in the browser.

## Stack

- **HTML**: `index.html` — single file, all sections inline
- **CSS**: Tailwind CSS via CDN + `custom.css` for animations and component styles
- **JS**: Three vanilla JS modules loaded as plain `<script src>` tags at the bottom of `<body>`
- **Fonts**: Google Fonts (Great Vibes, Tangerine, Italianno)
- **Animations**: AOS (Animate On Scroll) via CDN
- **Particles**: tsParticles via CDN (imported but not yet configured)

## Running Locally

Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

No build, no compilation, no install step.

## Architecture

### Page Structure (`index.html`)

Sections flow top-to-bottom inside a single centered container (`max-w-screen-xl`):

| Section ID | Purpose |
|---|---|
| `portada` | Full-screen hero with looping video background |
| `recepcion` | Party venue details + Google Maps link |
| `countdown` | Live countdown to event date (`Apr 25, 2026 22:00:00`) |
| `confirmacion` | RSVP via WhatsApp |
| `dress-code-section` | Dress code instructions |
| `regalos` | Gift info (alias for transfer + physical chest) |
| `book` | Photo gallery with floating single image (slider commented out) |
| `footer` | Credits + developer contact |

The religious ceremony section (`#ceremonia-religiosa`) is commented out.

### JS Modules (`js/`)

- **`Preloader.js`**: Waits for `video#portada canplaythrough` event before fading in content. No DOM-ready wrapper — runs immediately on parse.
- **`Countdown.js`**: `setInterval` updating `#days`, `#hours`, `#minutes`, `#sec` every second. Target date hardcoded.
- **`Music.js`**: DOMContentLoaded wrapper. Manages welcome modal (play/no music), floating toggle button `#musicToggleButton`, and audio state (`isPlaying` flag). Modal hides body scroll until dismissed.

### CSS (`custom.css`)

Handles everything Tailwind can't inline: modal overlay, floating music button states (`.active`, `.playing`), slider animation (`@keyframes cambio`), scroll-bounce arrow, glow animation (`animar-brillo`), float animation (`animar-flote`), and the preloader spinner.

### Assets

```
assets/
  audio/   — background music (MP3)
  img/     — section icons, photos, decorative images
  video/   — hero background video (MP4)
```

## Theme: Cinderella (Cenicienta)

The current theme uses generic pink/purple quinceañera styling. The transformation target is a **Cinderella fairy-tale allegory**:

- **Color palette**: Midnight blue (`#0a1628`), royal blue (`#1a3a6b`), Cinderella blue (`#4a90d9`), gold (`#ffd700`), silver/pearl (`#e8e0f0`)
- **Typography**: Keep Great Vibes and Tangerine — they suit the fairy-tale aesthetic
- **Motifs**: glass slipper, pumpkin carriage, castle silhouette, stars, sparkles / fairy dust
- **Section icon images**: Replace generic images with Cinderella-themed illustrations
- **tsParticles**: Already imported — configure for golden sparkle / fairy dust effect
- **Music**: Replace with Cinderella-appropriate track
- **Section copy**: Rewrite in fairy-tale allegory language (la calabaza, el carruaje, la medianoche, etc.)
- **Video background**: Replace with night sky / castle / sparkles footage

## Key Details

- Event date: **25 de Abril de 2026, 22:00 hs** — hardcoded in `Countdown.js` and visible in `#recepcion`
- RSVP deadline: **20 de Abril** — in `#confirmacion`
- WhatsApp RSVP: `5493813651476`
- Developer WhatsApp: `5493813852485`
- Photo album: Google Photos link in `#book`
- Audio: `assets/audio/Veo_en_ti_la_luz-Chayanne.mp3` (currently Rapunzel-associated — should be replaced for Cinderella theme)
- The photo slider (`<ul>` with 22 photos) is commented out; only `foto_1.jpg` is active in `#book`

## Tailwind Config

Custom colors defined inline in `<script>` inside `<head>`:

```js
colors: {
  'accent-gold': '#ffd700',
  'theme-lila': '#EADCF8',
  'theme-pink': '#F8DCE8',
  // 'primary-purple', 'dark-gray', 'dark-purple' all map to #000000
}
```

`primary-pink` is NOT in the Tailwind config — it's referenced in HTML but defined via CSS variables or inherited. Check before renaming.
