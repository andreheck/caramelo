# Design QA — Caramelo Visual V9.1

- source visual truth path: `/mnt/data/a_wide_clean_colorful_ui_ux_montage_hero_image_l.png`
- implementation screenshot paths:
  - `/mnt/data/v91final/landing-1280.png`
  - `/mnt/data/v91final/audit-day1-question-1280.png`
  - `/mnt/data/v91final/audit-day1-result-1280.png`
  - `/mnt/data/v91final/landing-390.png`
  - `/mnt/data/v91final/final-390.png`
- combined comparison evidence:
  - `/mnt/data/v91qa/landing-comparison-v91.jpg`
  - `/mnt/data/v91qa/result-comparison-v91.jpg`
- CSS viewports covered by automated browser validation:
  - 1280 × 900
  - 1366 × 768
  - 390 × 900
- source pixels: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 × 1555
  - mobile landing capture: 390 px wide full-page
  - Day 1 result capture: 1280 px wide, 900-class viewport
- normalization: source subregions and implementation regions were aligned inside equal comparison canvases. The source is a multi-screen conceptual montage, so acceptance is based on visual hierarchy, information architecture, color, image treatment, density and interaction character rather than literal full-canvas pixel parity.
- states compared:
  - landing
  - first Day 1 question
  - calculated Day 1 result
  - mobile landing
- browser evidence: GitHub Actions Quality Gate run `38776525112`, commit `6315969c6d06cc06278e6e3a0ea0f2c00145e254`
- primary interactions tested: full Days 1–7 journey, 50-item Day 1, landing profile rail, neutral illustrated assessment panel, V9 result dashboard, four-tab profile detail, phase transition UI, optional sound, clipboard, optional photo, reset flows, degraded storage, keyboard/focus and PDF.
- console/runtime errors: none in the final passing browser run.

## Full-view comparison evidence

### Landing
The approved reference uses a warm editorial-paper field, oversized optimistic headline, dark high-contrast CTA, rich Brazilian illustration, compact benefit statements and immediate visual storytelling.

V9.1 now follows the same composition logic while preserving the production shell:
- the headline and orange emphasis align closely to the source;
- four benefit statements appear directly below the introduction;
- the right visual is now a balanced four-tile painterly mosaic instead of a single enlarged low-resolution raster;
- the hero copy sits on a translucent dark-green field, improving legibility without losing the editorial feel;
- the seven-profile showcase remains visible below the main onboarding explanation.

The implementation intentionally retains Caramelo's existing product navigation and progress ecosystem because those are functional application elements, not marketing-only artwork.

### Mobile landing
The mobile screenshot was checked separately because the desktop source montage does not define a complete mobile system.

V9.1 improves the narrow layout materially:
- brand occupies its own row;
- navigation moves to a separate horizontal row and no longer competes with the logo;
- profile cards become a horizontal snap carousel instead of shrinking into a dense grid;
- CTA hierarchy remains touch-friendly;
- the hero mosaic collapses into a mobile-friendly 2-row composition.

No persistent control overlaps the main content.

### Assessment question
The illustration panel remains present, but V9.1 removes profile-name signaling while the user is still answering. The panel now uses neutral copy — **“Escolha pelo que combina mais com você.”** — so the editorial image adds warmth without priming users toward a named profile.

Question actions remain inside the validated desktop viewport.

### Day 1 result
The approved result reference uses three strong regions:
1. metrics;
2. compass/rings;
3. primary-profile card.

The implementation reproduces this architecture directly. The center compass is integrated into the rings, the metric panel remains compact, and the primary profile is visually dominant without forcing secondary detail into the same screen.

The full profile opens in a four-tab dialog for Visão geral, Seus traços, Áreas de atuação and Dicas práticas, preserving the approved concept's deeper result layer.

## Focused region comparison evidence

### Landing hero
Evidence: `/mnt/data/v91qa/landing-comparison-v91.jpg`.

The main fidelity signals match:
- cream/off-white base;
- dark green/navy headline and CTA language;
- orange emphasis;
- illustration-led right side;
- compact secondary benefits;
- editorial rather than dashboard composition.

V9.1 improves perceived sharpness by using several smaller raster crops rather than enlarging one small image across the whole visual panel.

### Result composition
Evidence: `/mnt/data/v91qa/result-comparison-v91.jpg`.

The three-part result architecture now matches the source in both information order and visual emphasis. The implementation is more modular and card-based than the concept reference, which is acceptable because it must coexist with the persistent seven-day journey timeline and responsive application shell.

## Required fidelity surfaces

### Fonts and typography
The source uses a rounded editorial display system, while Caramelo retains its established condensed display plus product sans. Hierarchy, scale, emphasis and wrapping now communicate the same emotional weight. Exact typeface parity is an intentional product deviation, not an actionable mismatch.

No P0/P1/P2 typography issue remains.

### Spacing and layout rhythm
Desktop hero, question and result regions use proportions close to the source. Primary actions remain inside 1280 × 900 and 1366 × 768 validation viewports. Mobile uses a dedicated vertical rhythm and avoids forcing desktop geometry into 390 px.

No P0/P1/P2 spacing issue remains.

### Colors and visual tokens
Warm paper, deep green/navy, cobalt blue, yellow and orange/caramel are consistently carried through the landing, timeline, question states and results. The result visualization no longer reads as a generic dark BI dashboard.

No P0/P1/P2 token issue remains.

### Image quality and asset fidelity
The hero uses actual painterly raster assets, not CSS-drawn illustration approximations. Functional compass and timeline elements remain SVG.

V9.1 improves the visible sharpness of the landing by using a four-tile image mosaic instead of enlarging a single small raster.

Residual limitation: the current profile WebPs are still MVP-sized exports. At very large display sizes they are softer than the source montage.

This remains P3 because subject, crop, palette and hierarchy are correct and no task is impaired.

### Copy and content
Landing wording now matches the approved concept's tone more closely. Vocational result text remains generated from the actual scoring result.

V9.1 also removes profile-name language from the question illustration while the user is answering, which protects the assessment experience from unnecessary priming.

No P0/P1/P2 content issue remains.

### Accessibility and responsive behavior
- core palette contrast continues to pass automated checks;
- skip-link and keyboard focus remain valid;
- reduced-motion support remains active;
- optional audio remains controllable;
- mobile brand/nav overlap is explicitly tested;
- the mobile profile rail is horizontally scrollable with snap behavior;
- no uncaught browser errors occur during the complete automated journey.

## Findings

No actionable P0, P1 or P2 finding remains for V9.1.

- [P3] Profile raster source files remain relatively small.
  - Location: `assets/profiles/*.webp`.
  - Evidence: the approved montage carries more high-frequency painterly detail on close inspection.
  - Impact: mild softness on high-density/large desktop displays.
  - Follow-up: replace with 640–1024 px clean exports under the same filenames.

- [P3] Communicator Influente still uses the Transformador Social painterly scene as a temporary clean fallback.
  - Location: V9.1 visual mapping.
  - Impact: two profiles share an image even though titles, colors, scoring and copy remain distinct.
  - Follow-up: generate/import a dedicated clean Communicator scene and remove the fallback mapping.

- [P3] The production top navigation intentionally differs from the marketing-style navigation shown in the concept montage.
  - Impact: none on the core journey.
  - Follow-up: revisit only if the landing later becomes a public marketing page rather than the MVP entry screen.

## Comparison history

1. V9 matched the approved concept structurally but still enlarged a single lightweight raster too aggressively in the hero.
2. V9.1 replaced that treatment with a four-tile painterly mosaic, preserving real illustration assets while improving visible sharpness.
3. Mobile QA showed the brand and navigation needed a cleaner hierarchy. V9.1 now uses two rows on narrow screens and gives the profile showcase a horizontal snap rail.
4. The Day 1 illustration previously exposed a profile title while the user was answering. V9.1 removes that label and uses neutral assessment copy instead.
5. A clean painterly fallback is retained for Communicator Influente until its dedicated raster can be replaced.
6. Final browser validation:
   - Quality Gate run `38776525112`
   - audit ✅
   - browser ✅
   - preview-package ✅
   - Days 1–7 complete ✅
   - desktop 1280 × 900 ✅
   - compact desktop 1366 × 768 ✅
   - mobile 390 × 900 ✅
   - mobile header no overlap ✅
   - mobile profile rail scrollable ✅
   - neutral question-art copy ✅
   - no uncaught browser exceptions ✅

## Implementation checklist

- [x] Hero composition moved closer to the approved editorial concept.
- [x] Hero no longer depends on one heavily enlarged raster.
- [x] Seven-profile showcase preserved.
- [x] Mobile topbar separated into brand and navigation rows.
- [x] Mobile profile cards converted to a compact horizontal rail.
- [x] Assessment art kept visually rich but semantically neutral.
- [x] Result remains metrics → rings/compass → primary profile.
- [x] Full-profile dialog remains available.
- [x] Existing V8.1 sound, phase transitions and compass motion preserved.
- [x] Scoring, weights, axes and methodology unchanged.
- [x] Full automated journey remains green.

## Follow-up polish

- P3: generate higher-resolution final profile artwork.
- P3: create a dedicated Communicator Influente illustration.
- P3: perform physical-device review on a 13-inch notebook plus representative iPhone/Android before any public pilot.

final result: passed
