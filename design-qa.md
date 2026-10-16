# Design QA — Caramelo Visual V9.1

- source visual truth path: `/mnt/data/a_wide_clean_colorful_ui_ux_montage_hero_image_l.png`
- implementation screenshot paths:
  - `/mnt/data/v91final/landing-1280.png`
  - `/mnt/data/v91/audit-day1-question-1280.png`
  - `/mnt/data/v91/audit-day1-result-1280.png`
  - `/mnt/data/v91/landing-390.png`
- combined comparison evidence:
  - `/mnt/data/v91qa/landing-comparison-v91.jpg`
  - `/mnt/data/v91qa/result-comparison-v91.jpg`
- automated browser viewports:
  - 1280 × 900 CSS px
  - 1366 × 768 CSS px
  - 390 × 900 CSS px
- source pixels: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 × 1555
  - Day 1 result capture: 1280 × 971
- normalization: source and implementation were compared through matched landing/result regions. The source is a conceptual multi-screen montage, therefore acceptance is based on hierarchy, major-region proportions, palette, imagery, information density and interaction character rather than exact pixel geometry.
- state:
  - landing
  - first Day 1 question
  - calculated Day 1 result
- browser evidence: GitHub Actions Quality Gate run `38776525112`, commit `6315969c6d06cc06278e6e3a0ea0f2c00145e254`
- primary interactions tested: full Days 1–7 journey, 50-item Day 1, reload persistence, landing profile rail, four-image hero mosaic, neutral illustrated question panel, V9 result dashboard, four-tab profile detail, optional sound/phase UI, clipboard, optional photo, complementary/full reset, blocked storage, keyboard/focus and PDF.
- console/runtime errors: none in the passing browser run.

## Full-view comparison evidence

### Landing
V9.1 is materially closer to the approved reference than V9. The hero now uses a balanced four-image editorial mosaic instead of enlarging a single low-resolution raster. This removes the strongest softness problem while keeping the same warm Brazilian art direction. The oversized optimistic headline, orange emphasis, dark CTA, benefit list and seven-profile introduction all remain aligned to the concept.

On mobile, the header was reorganized into two rows so brand and navigation no longer collide. The seven-profile rail becomes horizontally scrollable rather than compressing seven cards into an unreadable grid.

### Question experience
The illustrated side panel remains, but V9.1 removes profile-name exposure from the answering state. The visual now uses neutral copy — **“Escolha pelo que combina mais com você.”** — so the artwork supports engagement without priming the respondent toward a named profile.

This is both a UX and methodological improvement over V9.

### Day 1 result
The result keeps the concept-aligned three-region composition:
1. axis values;
2. compass/ring visualization;
3. illustrated primary profile.

The screen remains compact, readable and fits the validated desktop viewport. The full profile remains available through the four-tab detail experience instead of extending the page vertically.

## Focused region comparison evidence

### Hero
Evidence: `/mnt/data/v91qa/landing-comparison-v91.jpg`.

The source uses a large editorial illustration as its emotional anchor. V9.1 translates this with a four-tile mosaic using existing painterly assets. This improves perceived sharpness and visual rhythm while retaining the source palette and energy.

### Result
Evidence: `/mnt/data/v91qa/result-comparison-v91.jpg`.

The implementation matches the concept's core information architecture: metric summary, radial/compass visualization, profile card and profile-detail action. Spacing is somewhat more product-compact than the source, but this is intentional to preserve one-viewport readability.

## Required fidelity surfaces

### Fonts and typography
Hierarchy, wrapping and optical emphasis are consistent with the approved reference. The product keeps its established condensed display family rather than matching the concept typeface literally; this remains an intentional design-system choice. No actionable P0/P1/P2 typography issue remains.

### Spacing and layout rhythm
Desktop and compact-desktop views preserve one-viewport access to primary question/result actions. Mobile header overlap is resolved and profile cards now use horizontal scroll with snap. No actionable P0/P1/P2 layout issue remains.

### Colors and visual tokens
Warm paper, deep green/navy, orange, cobalt blue and yellow continue to map cleanly to the approved concept. No actionable P0/P1/P2 token mismatch remains.

### Image quality and asset fidelity
The major V9 softness issue is reduced by using a four-image mosaic rather than one enlarged raster. Existing painterly assets remain somewhat low-resolution, but no longer dominate the hero at a scale that makes softness feel like a defect.

The Communicator profile uses the clean painterly Transformador image as a temporary fallback rather than a corrupted raster. This is visually coherent but not yet semantically ideal.

### Copy and content
Landing copy follows the approved conceptual direction. Result content remains data-driven from the live instrument. Question illustration copy is now neutral and does not reveal profile labels during assessment.

## Findings

No actionable P0, P1 or P2 finding remains for V9.1.

- [P3] The seven profile images are still lightweight MVP raster assets.
  - Location: `assets/profiles/*.webp`.
  - Impact: mild softness in some crops.
  - Fix: replace with higher-resolution exports using the same filenames.

- [P3] Comunicador Influente temporarily reuses a clean Transformador Social painterly scene.
  - Impact: visual quality is acceptable, but the two profiles do not yet have fully distinct artwork.
  - Fix: replace `assets/profiles/comunicador-influente.webp` with a clean dedicated export and remove the fallback mapping.

- [P3] The hero mosaic intentionally reuses profile scenes rather than a dedicated hero illustration.
  - Impact: cohesive and sharp enough for MVP, but a bespoke hero could make the landing feel more campaign-level.
  - Fix: replace mosaic with one production-grade hero illustration only when a high-resolution final asset is available.

## Comparison history

1. V9 passed functional/design QA but retained visible large-screen raster softness and a mobile topbar that could feel crowded.
2. V9.1 introduced:
   - four-tile hero mosaic to reduce enlargement softness;
   - two-row mobile topbar;
   - horizontally scrollable profile rail on mobile;
   - neutral Day 1 question artwork/copy to avoid profile priming.
3. First V9.1 browser run failed because V9 rewrote the neutral question label after V9.1. The source V9 question copy was updated so the neutral behavior is stable.
4. Final evidence:
   - Quality Gate run `38776525112`: audit ✅ browser ✅ preview-package ✅
   - CI ✅
   - 1280 × 900 ✅
   - 1366 × 768 ✅
   - 390 × 900 ✅
   - complete Days 1–7 ✅
   - mobile brand/nav non-overlap ✅
   - mobile profile rail scroll ✅
   - no profile-name exposure in Day 1 illustrated question state ✅
   - no uncaught browser exceptions ✅

## Implementation checklist

- [x] Reduce large-screen hero softness without low-quality upscaling.
- [x] Keep visual direction close to approved concept.
- [x] Prevent profile-label priming during assessment.
- [x] Fix mobile header density and overlap.
- [x] Make seven-profile rail usable on mobile.
- [x] Preserve three-panel result architecture.
- [x] Preserve V8.1 motion/audio behavior.
- [x] Preserve scoring and methodology.
- [x] Pass full automated regression.

## Follow-up polish

- P3: dedicated high-resolution Communicator artwork.
- P3: higher-resolution seven-profile art family.
- P3: bespoke final hero illustration after the profile-art pack is finalized.
- P3: physical-device review before public pilot.

final result: passed
