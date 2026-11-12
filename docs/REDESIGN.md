# Nawa orbital UI redesign

## Scope

React 19 / TypeScript / Vite 8 / Tailwind v4 retained. The original Cairo / Plus Jakarta Sans fonts retain `display=swap`. No dependencies added. Content dictionaries, clinic data, contact logic, links, metadata and build configuration are unchanged. No Cloudflare configuration was present in the source checkout; the existing Vite `dist/` output remains unchanged in structure.

- Hero: warm mesh, organic outlines, separate text / SVG / badge depth layers, pointer response, existing localized statistics count up once. Original statistic labels and demo disclosure retained.
- About: arch-shaped sage illustration, drifting orbital graphic, quieter editorial value rows and staggered reveals.
- Services: vertical cards beside a sticky introduction with a six-step orbital indicator. Normal document scrolling and all existing service WhatsApp links remain usable. Mobile and reduced-motion modes use an unpinned layout.
- Contact, map, footer: warm paper surfaces, softer radii and shadows, rounded transitions; original form and lazy map retained.
- Navigation and actions: blurred sticky header with scaled-down branding and booking button; transform-only CTA sheen, card lift and opacity glow.

## Motion implementation

`useParallax` caches section geometry through ResizeObserver and resize events. Passive scroll/pointer events schedule a single requestAnimationFrame; scrolling reads no element geometry and only writes transforms. Mobile movement is quarter strength. Pointer input is fine-pointer-only and horizontal response mirrors in RTL. Offscreen layers are skipped. Cleanup and live reduced-motion changes cancel movement.

`useActiveStep` uses IntersectionObserver for story progress. The existing reveal hook drives opacity / transform reveals and staggered value cards. `AnimatedStat` preserves an accessible final value and cleans up frame callbacks. Reduced motion displays the final values and disables parallax, sticky storytelling and hover movement.

## Validation

- `npm run build`: passed (TypeScript and production Vite build).
- `npm run lint`: passed.
- Content/config preservation: source diff confirms no changes in clinic data, translations, form logic, destinations, package manifests or Vite configuration.
- `npm run test:browser`: attempted, blocked before tests could execute. The Playwright Chromium download returned invalid ZIP data. System Chromium also failed at startup with `socket() failed: Operation not permitted`. A separate browser could not reach the local preview (connection refused).
- Responsive visual QA, keyboard/form browser regression checks, contrast measurement and Lighthouse score remain unverified. No 90+ score is claimed.

Browser suite supports an optional system browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

Before merging, run the existing browser suite and inspect Arabic and English at 320, 390, 768, 1024 and 1440px, with normal/reduced motion. Inspect service stickiness on short screens and verify all booking, phone and map destinations.
