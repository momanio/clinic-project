# Design Notes

## Research — 10 November 2026

Reviewed these five healthcare landing pages and their content hierarchy:

- [One Medical](https://www.onemedical.com/): leads with a direct care promise and appointment action; practical benefits make the next step clear.
- [Maven Clinic](https://www.mavenclinic.com/): separates complex services into approachable groups and places evidence near its proposition.
- [Parsley Health](https://www.parsleyhealth.com/): pairs a patient-centered headline with compact reassurance and distinct paths into care.
- [Family Practice](https://practice-health.framer.website/): prioritizes booking, service discovery, opening hours, and location; a useful model for reducing patient uncertainty.
- [Hospic](https://hospic.framer.website/): uses a strong hero, repeated booking opportunities, service cards, and a clear progression from introduction to contact.

Shared patterns include generous section spacing, concise copy, prominent appointment buttons, modular service cards, and trust cues close to decision points. The Framer gallery previews also informed the use of rounded surfaces and restrained transitions. These are general design observations, not assets or layouts to reproduce.

## Original direction

**Nawa / نواة — care that starts with you.** A fictional, specialty-neutral clinic in Amman. Warm ivory, deep evergreen, muted sage, and a small apricot accent create a calm, welcoming identity. Large Arabic typography, numbered section labels, fine borders, and generous whitespace give the page an editorial rhythm. A bespoke SVG clinic scene provides visual character without stock photography or downloaded design assets.

The composition starts in Arabic and mirrors naturally in English. Logical spacing, readable line lengths, and large touch targets guide the responsive layout. Gentle hover movement and one-time scroll reveals respect reduced-motion preferences. All sample numbers, contact details, and social destinations are clearly identified as demo content; no real patient testimonials or accreditation claims are invented.

## Implementation and customization

Clinic content, service icons, statistics, contact details, map coordinates, and brand colors live in `src/data/clinic.ts`. Interface copy lives in the matching Arabic/English dictionaries under `src/i18n/`. Tailwind v4 theme tokens in `src/index.css` define typography, colors, and radii; brand color tokens read the clinic configuration. The layout uses no raster assets. Google Fonts and the lazy Google Maps embed are the only visual third-party resources.
