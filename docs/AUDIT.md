## 1. Summary

Audited the bilingual Nawa Clinic landing page from default-branch commit `2f112be` and made three focused fix commits on `audit/senior-review`. No critical issues were verified. Fixed navigation reliability and keyboard focus, short-screen menu access, obscured hero copy, a tablet footer typography cascade, a shrinking directions target, and missing social metadata.

Engineering judgment scores (not Lighthouse or compliance certifications): **code 8/10 → 8.5/10; UI 7.5/10 → 8.5/10**. Existing strict typing, localized content, form validation, RTL styling, and reduced-motion behavior were already strong.

The stack is React 19 + TypeScript 6 + Vite 8 + Tailwind 4. The app is a single page with hash navigation; clinic content comes from `src/data/clinic.ts`, language state from React context/localStorage, and form state stays local until a user initiates WhatsApp. No backend submission occurs. Reviewed README, repository guidelines, configs, components, hooks, translations, and existing tests. No stack changes, new dependencies, business-copy changes, secret/environment changes, or CI/deployment changes.

## 2. Changes made

Paths/lines below refer to the final branch unless marked baseline; `docs/AUDIT.md` contains this report.

| Category | Severity | File(s) / evidence | Problem | Fix |
| --- | --- | --- | --- | --- |
| Navigation / usability | High | `src/index.css:1529`; baseline same selector at line 1527 | An expanded sticky mobile menu exceeded a 320px-high viewport; later actions could fall below the visible area. | Bound menu height to available viewport height and enable contained vertical scrolling. Regression checks use 768×320. |
| Runtime robustness | Medium | `src/components/Navbar.tsx:25`; baseline line 25 | Navbar constructed `IntersectionObserver` without the feature guard already present in the other hooks. Missing API throws during effect setup. | Preserve usable navigation/scroll behavior with a guarded fallback and listener cleanup; test with the API removed. |
| Keyboard accessibility | Medium | `src/components/Navbar.tsx:118`; `src/index.css:1442` | Selecting a mobile section link made its focused element inert; reveal-ready content could remain transparent when keyboard focus entered it. | Move focus to the destination section and show reveal containers on focus-within. Escape behavior remains supported. |
| Touch accessibility | Medium | `src/index.css:1254` | Directions icon flex item shrank to 43.6875px wide in English at 375px on production. | Reserve a minimum inline size of 44px. |
| Visual hierarchy | Medium | `src/index.css:2271`; baseline `.care-card` / `.appointment-card` at lines 538–546 | Positioned badges overlapped the illustration overline and caption at 375, 768 and 1440px in production. | Give badges their own grid rows below the artwork, with compact side-by-side placement on wide screens and stacked placement below 1200px. Layout tests assert no badge/panel overlap. |
| Typography | Medium | `src/index.css:2300`; baseline tablet `h2` rule at line 1675 | Unlayered tablet `h2` styling overrode layered footer heading sizes, making footer labels disproportionately large at 768px. | Restore a scoped 0.85rem footer heading size. |
| SEO / sharing | Medium | `index.html:10`; `src/i18n/LanguageProvider.tsx:26` | Baseline HTML had title/description but no Open Graph or Twitter metadata. | Add static build-generated social title/description/type/card tags using existing escaped clinic tokens; synchronize titles/descriptions after language switching. |

Focused commits:

- `a11y: keep mobile navigation reachable and preserve destination focus`
- `style: keep hero reassurance and footer typography readable`
- `fix: provide localized social sharing metadata`

## 3. UI/UX changes

The existing ivory, evergreen and apricot identity, original illustration, bilingual wording, primary WhatsApp CTA, and restrained motion remain. Separating the reassurance cards from the artwork makes every caption readable and gives the hero a clearer hierarchy. The footer now keeps the same compact label scale on tablets as on desktop. Short-screen users can scroll the open menu; keyboard users arrive at the selected section.

Production was opened in Chromium in **Arabic and English at 375, 768 and 1440px**. No horizontal overflow or runtime errors occurred in that review. Its JavaScript asset `index-BoDEUMUQ.js` matched the baseline production build exactly; no application-version difference was observed. Access required trusting only the supplied environment proxy CA's public-key fingerprint in the review browser; no application TLS or deployment settings changed. The external map surface rendered blank in automation, so actual map imagery was not verified.

Before/after hero screenshots are in `docs/audit/`:

| View | Before | After |
| --- | --- | --- |
| English, 375px | [Before](audit/before-en-375.png) | [After](audit/after-en-375.png) |
| Arabic, 768px | [Before](audit/before-ar-768.png) | [After](audit/after-ar-768.png) |
| English, 1440px | [Before](audit/before-en-1440.png) | [After](audit/after-en-1440.png) |

## 4. Verification

Node 24.22.1; dependencies installed with `npm ci --cache /workspace/work/npm-cache`. Initial plain `npm ci` failed because the environment's default npm cache path was not writable/available. The workspace-cache retry passed without lockfile changes. Initial browser execution lacked Playwright's browser binary; installing Chromium into a workspace cache resolved it.

| Check | Baseline before edits | Final |
| --- | --- | --- |
| `npm run build` | Pass | Pass |
| `npx tsc -b` | Pass | Pass |
| `npm run lint` | Pass | Pass |
| `npm run test:browser` with workspace Playwright path | 22 checks pass after browser setup | 26 checks pass |
| `npm audit` | 13 moderate development findings; no high/critical | Unchanged; documented below |
| `npm audit --omit=dev` | No production vulnerabilities (same dependency tree) | 0 vulnerabilities |
| JS bundle | 270.79 kB / 84.74 kB gzip | Approximately 271 kB / 85 kB gzip |
| Production preview | Baseline build generated successfully | Responsive checks and localized social metadata pass; static HTML tokens replaced with escaped Arabic metadata |

Build, standalone type-check, lint and browser tests passed after **each of the three implementation batches**. Final tests cover both languages at 360, 375, 390, 768, 1024 and 1440px; menu Escape/inert behavior, short-screen scrolling and destination focus; blocked storage; absent IntersectionObserver; localized form errors; Arabic phone-digit normalization; intercepted WhatsApp handoffs; reduced motion; reveals; sampled text contrast; map dimensions/directions; no hero badge overlap; social metadata; and runtime errors. No WhatsApp message was sent. No fix required reverting. Screenshot assets were generated against the production preview as well as the live baseline.

## 5. Not fixed / recommended next steps

- **Development dependency advisory:** `package-lock.json:2803` locks `minimatch@10.2.6`, affected by [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). npm reports 13 moderate affected development packages through this dependency. The fix is 11.0.1, outside the parent packages' declared `^10` ranges (`package-lock.json:348`, `:1635`, `:2026`). No supported nonbreaking fix is offered for the full toolchain. Upgrade ESLint/typescript-eslint when their compatible releases adopt the fix; a forced major override needs separate compatibility evaluation. Production audit is clean.
- **Real clinic content and trust:** placeholders are explicit in `README.md`, `src/data/clinic.ts:47–49`, and social homepages at `:74–76`; figures at `:36–40` are fictional. Obtain approved clinic details, genuine evidence and the intended booking destination before a real-client launch. The WhatsApp number differs from the demo telephone; preserved as requested, rather than guessing the correct business details.
- **Map imagery:** verify Google Maps loading on real devices/network conditions. The iframe, lazy-loading attribute, reserved dimensions and directions link are verified (`src/components/LocationMap.tsx:37`); external imagery was blank during automation. Consider a deliberate load-map action/fallback with approved bilingual wording.
- **SEO:** add a designed social preview image and canonical/sitemap/robots policy once the permanent domain and indexability of this fictional demo are confirmed. Real medical-business structured data requires verified business information; none was fabricated. Social crawlers receive the default Arabic static metadata; separately indexable English URLs need a larger routing/rendering decision.
- **Performance:** no measured field LCP/CLS/INP claims. The small single-page bundle, inline SVG artwork, font `display=swap`, and lazy map provide a reasonable baseline. Measure on representative Jordan/Saudi mobile connections; consider self-hosted/subset fonts and deferring below-fold JavaScript if measurements justify it. No heavy dependency or speculative code splitting was added.
- **Architecture:** components are already separated by section. A future cleanup can consolidate layered and unlayered CSS to prevent more cascade surprises; a stylesheet rewrite was outside this focused audit.
- **Verification limits:** automated Chromium and manual screenshot inspection do not establish Safari/Firefox behavior or a complete screen-reader/WCAG audit. No production deployment, appointment delivery, external social destinations or real conversion rate was verified. Source inspection found no `any`, unsafe HTML injection, or tracked environment/secret files; this is not a forensic secret-history scan.
