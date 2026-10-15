# Design QA — Caramelo Visual V9

- source visual truth path: `/mnt/data/a_wide_clean_colorful_ui_ux_montage_hero_image_l.png`
- implementation screenshot paths:
  - `/mnt/data/caramelo-browser-v9-d77/landing-1280.png`
  - `/mnt/data/caramelo-browser-v9-d77/audit-day1-question-1280.png`
  - `/mnt/data/caramelo-browser-v9-d77/audit-day1-result-1280.png`
- combined comparison evidence:
  - `/mnt/data/v9qa/landing-comparison.jpg`
  - `/mnt/data/v9qa/result-comparison-d77.jpg`
- automated browser viewport: 1280 × 900 CSS px for desktop plus existing 1366 × 768 compact-desktop and 390 × 900 mobile regression states
- source pixels: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 × 1555
  - Day 1 result capture: 1280 × 971
- normalization: source subregions and implementation screens were fit into equal 1100 × 720 comparison regions. The source is a multi-screen conceptual montage, so fidelity is judged on screen hierarchy, proportions, palette, imagery, information density and interaction character rather than exact full-canvas pixel parity.
- state:
  - landing
  - Day 1 phase transition / first-question experience
  - calculated Day 1 result
- browser evidence: GitHub Actions Quality Gate run `38768646574`, commit `d77edfc4599a62218aa841c4b0afa9fe73f9cbfc`
- primary interactions tested: complete Days 1–7 flow, 50-item Day 1, reload persistence, landing profile rail, illustrated question panel, V9 result dashboard, four-tab profile-detail dialog, optional sound/phase UI, clipboard, optional photo, complementary/full reset, blocked storage, keyboard/focus and PDF.
- console/runtime errors: none in the passing browser run.

## Full-view comparison evidence

### Landing
The approved reference establishes a warm paper canvas, oversized optimistic headline, strong dark CTA, saturated Brazilian editorial illustration and a visual introduction to the seven profiles.

V9 now matches that architecture closely:
- headline hierarchy and orange emphasis follow the approved concept;
- supporting copy is shortened to the approved intent;
- four benefit statements appear directly under the introduction;
- the hero is illustration-led rather than a generic decorative panel;
- the three explanatory steps sit below the primary hero;
- all seven profiles are visible as an editorial rail with distinct color families.

The implementation deliberately preserves the existing Caramelo top navigation and journey/stat blocks because they are functional product elements already validated in prior rounds.

### Question experience
The concept uses an illustrated character/environment panel beside a compact question area. V9 adds a dedicated illustrated side panel to Day 1, rotates the scene according to the question index and keeps the four response options/action buttons in the primary desktop viewport.

The existing V8.1 chapter-transition overlay remains as an additional product interaction layer rather than replacing the underlying question state.

### Day 1 result
The approved reference uses three clear visual regions:
1. axis values;
2. compass/ring visualization;
3. primary-profile summary.

V9 now reproduces that information architecture directly. The result uses six axis bars on the left, a compass-centered ring visualization in the middle and an illustrated primary-profile card on the right. The heading is now **“Seus resultados”** to match the concept.

The full profile is no longer forced into the main result viewport. **Ver perfil completo** opens a four-tab detail experience: Visão geral, Seus traços, Áreas de atuação and Dicas práticas. This mirrors the second result/detail screen in the approved montage while keeping the summary screen compact.

## Focused region comparison evidence

### Hero
Evidence: `/mnt/data/v9qa/landing-comparison.jpg`.

The hierarchy, palette and composition now read as the same product family as the reference: dark green/navy headings and CTA, orange emphasis, warm off-white paper, large editorial illustration and profile/storytelling content below.

### Result
Evidence: `/mnt/data/v9qa/result-comparison-d77.jpg`.

The key structural match is now strong: six metric rows at left, concentric multicolor rings with compass center, primary profile at right and a direct profile-detail CTA. The implementation is slightly more card-based and compact than the source, which is acceptable for the existing 1280 × 900 application shell and persistent seven-day journey timeline.

## Required fidelity surfaces

### Fonts and typography
The source uses a rounded editorial/sans display system. Caramelo retains its established condensed display heading plus product sans for long-form readability. V9 improves size hierarchy and wrapping but does not replace the established typography system, an intentional product constraint. No actionable P0/P1/P2 mismatch remains.

### Spacing and layout rhythm
The source uses three major result columns and a two-column hero. V9 now follows those same major proportions. The question and result primary actions remain visible within validated desktop viewports. Mobile intentionally returns to a vertical flow rather than compressing the desktop montage. No actionable P0/P1/P2 spacing issue remains.

### Colors and visual tokens
Warm paper, deep green/navy, cobalt blue, warm yellow and orange/caramel are consistently present across the source and implementation. The result graph is no longer a dark analytics card and now belongs to the same visual system as the illustrations. No actionable P0/P1/P2 token mismatch remains.

### Image quality and asset fidelity
The implementation uses separate painterly raster assets for profile/hero scenes plus SVG only for functional journey/compass UI. The art direction is consistent with the reference and no CSS-drawn illustration substitutes were introduced.

Residual issue: the current raster profile files are intentionally lightweight MVP assets and become visibly soft when used as a large desktop hero. This is classified P3 because subject, palette, crop and hierarchy remain correct and no interaction is impaired. Higher-resolution replacements can use the same filenames without changing product logic.

### Copy and content
The landing now follows the approved high-level copy intent. Result-specific profile copy, axis values, motivators and suggested areas remain calculated from the live instrument rather than being baked into visual assets. This is a required intentional deviation from the static concept board.

## Findings

No actionable P0, P1 or P2 finding remains for the V9 homologation build.

- [P3] Hero/profile raster softness on large desktop.
  - Location: `assets/profiles/*.webp`, most visible in the landing hero.
  - Evidence: source reference retains more painterly detail than the enlarged MVP raster.
  - Impact: visual polish only.
  - Fix: replace the seven WebPs with 640–1024 px high-quality exports under the existing filenames.

- [P3] Communicator currently reuses the Transformador Social raster as a temporary clean fallback because the previous Communicator WebP rendered with visible corruption.
  - Location: `assets/profile-visuals.js` and V9 profile rail.
  - Impact: two profiles temporarily share one scene, but titles, colors, profile logic and copy remain distinct.
  - Fix: replace `assets/profiles/comunicador-influente.webp` with a clean dedicated export and remove the fallback mapping.

- [P3] The production top navigation keeps the existing functional product destinations instead of the exact marketing labels shown in the concept montage.
  - Impact: no task-flow issue; this is a product-information-architecture choice.
  - Follow-up: reconsider only when the landing becomes a public marketing page rather than an MVP test entry.

## Comparison history

1. V8.1 source-to-implementation review identified that the application was visually coherent but still read as a refined MVP rather than the approved multi-screen concept.
2. V9 first pass added:
   - approved landing headline/copy structure;
   - four benefit statements;
   - seven-profile showcase;
   - illustrated Day 1 question side panel;
   - three-column result architecture;
   - compass centered inside the result rings;
   - four-tab full-profile detail dialog.
3. First browser iteration found the seven-profile showcase was attached to a non-existent selector. Fixed by targeting the actual landing `.section-grid.three`.
4. Second browser iteration found the V8 result observer was replacing the V9 dialog while tab interaction occurred. Fixed by marking the dialog as V9-owned and teaching V8 not to overwrite it.
5. Visual inspection found the compass container existed but its 100% height did not resolve correctly inside the aspect-ratio center. Fixed by making the compass layer absolutely fill the result center.
6. Visual inspection also exposed corruption in the Communicator raster. V9 now uses a clean temporary raster fallback rather than displaying corrupted pixels.
7. The result heading was aligned to the approved source language: **Seus resultados**.
8. Final evidence:
   - Quality Gate run `38768646574`: audit ✅ browser ✅ preview-package ✅
   - complete Days 1–7 flow remains green;
   - landing V9 profile rail: 7 cards ✅
   - V9 question art present ✅
   - result axis summary: 6 metrics ✅
   - result compass center present ✅
   - full-profile dialog: 4 tabs and interaction ✅
   - no uncaught browser exceptions ✅

## Implementation checklist

- [x] Landing hierarchy aligned to approved concept.
- [x] Four approved benefit statements visible.
- [x] Seven-profile editorial rail visible.
- [x] Day 1 question gains meaningful illustration panel.
- [x] Primary question actions still fit desktop viewport.
- [x] Result reorganized into metrics / compass-rings / primary profile.
- [x] Result title aligned to approved wording.
- [x] Full profile opens as four-tab detail experience.
- [x] Result remains driven by real calculated data.
- [x] Scoring, weights, axes and methodology unchanged.
- [x] Desktop/mobile complete journey regression remains green.
- [x] Design QA comparison performed against combined source/implementation evidence.

## Follow-up Polish

- P3: replace the seven lightweight WebPs with higher-resolution clean exports.
- P3: restore a dedicated Communicator scene instead of the temporary Transformador fallback.
- P3: run physical-device review on a 13-inch notebook plus representative iPhone/Android before public pilot.

final result: passed
