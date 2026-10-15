# Design QA — Caramelo Visual V9.1

- source visual truth path: `/mnt/data/a_wide_clean_colorful_ui_ux_montage_hero_image_l.png`
- implementation screenshot paths:
  - `/mnt/data/v91final/landing-1280.png`
  - `/mnt/data/v91final/landing-390.png`
  - `/mnt/data/v91final/audit-day1-question-1280.png`
  - `/mnt/data/v91final/audit-day1-result-1280.png`
  - `/mnt/data/v91final/final-390.png`
- combined comparison evidence:
  - `/mnt/data/v91qa/landing-comparison-v91.jpg`
  - `/mnt/data/v91qa/result-comparison-v91.jpg`
- automated browser viewports:
  - 1280 × 900 CSS px
  - 1366 × 768 CSS px
  - 390 × 900 CSS px
- source pixels: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 px wide
  - Day 1 result capture: 1280 px wide
- normalization: source subregions and implementation screens were placed side by side and normalized to comparable visual regions. The source is a multi-screen concept montage, so fidelity is judged on hierarchy, palette, imagery, density, result structure and interaction character rather than exact full-canvas pixel parity.
- states:
  - landing
  - Day 1 question
  - Day 1 result
  - mobile landing and final map
- browser evidence: GitHub Actions Quality Gate run `38776525112`, commit `6315969c6d06cc06278e6e3a0ea0f2c00145e254`
- primary interactions tested: complete Days 1–7 journey, 50-item Day 1, reload persistence, landing profile rail, neutral illustrated question panel, V9.1 result dashboard, four-tab profile-detail dialog, optional sound/phase UI, clipboard, optional photo, complementary/full reset, blocked storage, keyboard/focus and PDF.
- console/runtime errors: none in the passing browser run.

## Full-view comparison evidence

### Landing
The approved reference is led by a single authored illustration, warm paper, an oversized optimistic headline, a dark primary CTA and a concise benefit list.

V9.1 now reproduces the same information hierarchy and palette while using a sharper four-tile editorial mosaic built from the approved painterly profile assets. This is intentionally more modular than the single-poster reference but materially closer than the earlier enlarged low-resolution hero: the illustration region now reads as an editorial collage rather than one stretched raster, the headline/benefit/CTA hierarchy matches the concept, and the seven-profile rail reinforces the same visual system.

The mobile landing now separates brand and navigation into two rows, eliminating the crowded header seen in the previous V9 mobile capture. The seven profiles become a horizontal scroll-snap rail instead of a dense two-column stack.

### Question experience
The Day 1 illustrated panel remains visually meaningful but no longer exposes a profile title while the user is answering. Its visible label is now neutral — **“Escolha pelo que combina mais com você.”** — so the artwork does not prime the user toward one of the seven result identities.

This is both a UX and methodological improvement over V9.

### Day 1 result
The approved reference uses three major regions: axis values, compass/rings and primary profile. V9.1 retains this structure and keeps the compact result in a single primary desktop viewport.

The result comparison shows the same hierarchy even though the implementation keeps its validated product shell and persistent journey timeline. The compass remains centered in the ring visualization, profile copy remains calculated, and the full profile stays behind the dedicated four-tab dialog.

## Focused region comparison evidence

### Landing hero
Evidence: `/mnt/data/v91qa/landing-comparison-v91.jpg`.

The source has a single high-resolution character scene. V9.1 uses a four-tile painterly mosaic because the current production profile rasters are lightweight. The result preserves the source palette, warmth, illustrated character language, hierarchy and density without enlarging one low-resolution asset beyond its useful size.

This is an acceptable product adaptation for the MVP. A single purpose-built high-resolution hero remains a later art-only improvement.

### Result composition
Evidence: `/mnt/data/v91qa/result-comparison-v91.jpg`.

The structural match is strong: results title, metric stack, concentric rings with compass center, primary-profile block and full-profile action. The implementation uses more restrained card borders and keeps the persistent journey timeline. These are established product constraints rather than unresolved design drift.

## Required fidelity surfaces

### Fonts and typography
The reference uses a rounded editorial display treatment. Caramelo retains the established condensed display plus product sans for longer reading. V9.1 preserves strong scale contrast, appropriate wrapping and readable small text. No actionable P0/P1/P2 typography mismatch remains.

### Spacing and layout rhythm
Desktop question and result actions continue to fit validated 1280 × 900 and 1366 × 768 viewports. Mobile header overlap was corrected by using two explicit rows. Profile cards become a compact horizontal rail on narrow screens. No actionable P0/P1/P2 spacing or overflow issue remains.

### Colors and visual tokens
Warm paper, deep green/navy, cobalt blue, warm yellow and orange/caramel remain consistent with the reference and across home, questions, compass, result and detail dialog. No actionable P0/P1/P2 token mismatch remains.

### Image quality and asset fidelity
V9.1 specifically addresses the largest visible image-quality issue from V9: the hero no longer enlarges one lightweight raster across the full desktop panel. The four-tile mosaic keeps each image nearer to its intended display size and therefore visibly sharper.

The current Communicator raster is still unsuitable, so the product uses the clean Transformador raster as a temporary painterly fallback instead of exposing corrupt pixels. This duplication is a P3 art-production issue, not a broken product state.

### Copy and content
Landing copy follows the approved concept intent. Result copy remains driven by actual calculated data. The Day 1 art no longer names profiles during answering, reducing unintended priming. No scoring or methodological interpretation was changed.

### Accessibility and motion
- sound remains optional and stateful;
- reduced-motion behavior remains supported;
- keyboard/focus and semantic tests remain green;
- no horizontal page overflow in tested viewports;
- mobile brand/nav regions do not overlap;
- the profile rail is touch-scrollable with scroll snapping;
- no uncaught browser exceptions were recorded.

## Findings

No actionable P0, P1 or P2 findings remain for V9.1.

- [P3] A single bespoke high-resolution hero would match the approved landing concept more literally than the current four-tile mosaic.
  - Location: landing hero.
  - Evidence: reference uses one authored character scene; implementation uses four painterly tiles.
  - Impact: art-direction fidelity only; hierarchy, palette and usability are already aligned.
  - Follow-up: generate a dedicated high-resolution landing illustration and swap it into the existing hero slot.

- [P3] Communicator Influente temporarily shares the Transformador Social painterly scene.
  - Location: profile rail and profile result image fallback.
  - Impact: result logic, copy, title and colors remain distinct, but the illustration family is not fully unique.
  - Follow-up: replace `assets/profiles/comunicador-influente.webp` with a clean dedicated export and remove the fallback mapping.

- [P3] Current profile rasters are optimized for MVP size rather than large marketing surfaces.
  - Location: `assets/profiles/*.webp`.
  - Impact: minor softness if reused at unusually large dimensions.
  - Follow-up: replace with 640–1024 px exports under the same filenames.

## Comparison history

1. V9 passed functional QA but still enlarged lightweight raster art on the hero and showed a cramped mobile topbar.
2. V9.1 first pass:
   - introduced a mosaic hero to avoid enlarging one low-resolution raster;
   - converted mobile header to brand/nav rows;
   - converted seven-profile mobile section to scroll-snap;
   - made Day 1 art label neutral;
   - restored a clean non-corrupt painterly fallback for Communicator.
3. First V9.1 browser run exposed that V9 itself was rewriting the neutral question-art label after the V9.1 layer. The fix was moved into `concept-v9.js` so the base question-art renderer itself remains neutral.
4. Final V9.1 run passed:
   - audit ✅
   - browser ✅
   - preview-package ✅
   - 1280 × 900 ✅
   - 1366 × 768 ✅
   - 390 × 900 ✅
   - complete Days 1–7 journey ✅
   - mobile header non-overlap ✅
   - mobile profile rail scrollability ✅
   - neutral assessment artwork ✅
   - result dialog/tabs ✅
   - clipboard/PDF/photo/resets/storage/keyboard/focus ✅
   - no uncaught browser exceptions ✅

## Implementation checklist

- [x] Hero image quality improved without stretching one lightweight raster.
- [x] Landing remains aligned with approved headline, benefits and CTA hierarchy.
- [x] Mobile topbar overlap resolved.
- [x] Seven-profile mobile section converted to compact horizontal rail.
- [x] Assessment illustration no longer exposes profile identities during answering.
- [x] Corrupt Communicator raster no longer shown.
- [x] Three-panel result architecture preserved.
- [x] Full-profile four-tab detail experience preserved.
- [x] Scoring, axes, weights and methodology unchanged.
- [x] Full browser regression and preview packaging pass.

## Follow-up Polish

- P3: dedicated high-resolution home hero.
- P3: dedicated clean Communicator Influente illustration.
- P3: higher-resolution profile art exports.
- P3: physical-device review before public pilot.

final result: passed
