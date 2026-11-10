# Nawa Clinic — bilingual landing page

A polished, specialty-neutral medical clinic demo built with React 19, strict TypeScript, Vite, and Tailwind CSS v4. Arabic is the default language, with a complete English layout and persistent language preference. All clinic details and statistics are fictional.

## Run locally

Use a current Node.js LTS release supported by Vite 8 (Node 22.12+ or 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run lint       # ESLint
npm run build      # Strict TypeScript checks and production output in dist/
npm run preview    # Preview dist/ locally
```

## Customize for a client

Edit **`src/data/clinic.ts`** to change the clinic name, bilingual tagline and story, statistics, six services and their Lucide icons, phone, email, address, hours, WhatsApp destination and messages, map coordinates, and social links. `brand.primary` and `brand.accent` feed the CSS theme automatically. The medical illustration is generic and remains appropriate across specialties.

Update interface wording in the matching `ar` and `en` objects in **`src/i18n/translations.ts`**. TypeScript checks that both languages have the same keys. Typography, neutral colors, and rounded corners are theme tokens in **`src/index.css`**. Default HTML metadata and the SVG favicon are generated from the clinic configuration by Vite; the title, description, and theme color also update at runtime.

The `.example` email, zero-filled phone numbers, map location, sample figures, and social platform homepages are intentional placeholders. Replace them before using this for a real clinic. The form prepares a WhatsApp message; the visitor reviews and sends it there. It does not submit to a server or confirm an appointment.

## Browser checks

```sh
npx playwright install chromium  # One-time browser installation if needed
npm run test:browser
```

Checks cover both languages at 360, 390, 768, 1024, and 1440 pixels, direction and overflow, language persistence and blocked storage, mobile navigation and Escape, localized form errors, Arabic digit normalization, safe WhatsApp handoff, reduced motion, scroll reveals, core text contrast, map directions, and browser errors. Screenshots are written to the ignored `test-results/` directory. WhatsApp destinations are intercepted during tests; no messages are sent.

## Source organization

- `src/components/`: page sections, navigation, and shared visuals.
- `src/data/clinic.ts`: client-specific content and brand configuration.
- `src/i18n/`: typed dictionaries, language provider, and hook.
- `src/hooks/`: reduced-motion-aware scroll reveal.
- `tests/browser.mjs`: browser interaction and responsive checks.
- `DESIGN_NOTES.md`: five research references and the original visual direction.

The page uses original inline SVG/CSS artwork. Google Fonts supply Cairo and Plus Jakarta Sans with local fallbacks. The Google Maps iframe loads lazily and needs an internet connection; directions remain accessible through a separate link.
