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
  - landing desktop full-page capture: 1280 × 1555
  - Day 1 result: 1280 × 971
  - mobile landing/full journey capture: 390 px CSS width
- normalization: the approved source is a multi-screen concept montage, so the relevant source regions were cropped and fit beside the corresponding rendered implementation regions at a common comparison canvas. Fidelity is judged on hierarchy, palette, image treatment, information architecture, interaction character and responsive behavior rather than whole-canvas pixel identity.
- browser evidence: GitHub Actions Quality Gate run `38776525112`, commit `6315969c6d06cc06278e6e3a0ea0f2c00145e254`
- primary interactions tested: complete Days 1–7 flow, 50-item Day 1, V9.1 hero mosaic, mobile two-row topbar, mobile profile carousel, neutral assessment artwork copy, three-panel result, four-tab profile detail dialog, optional sound/phase UI, clipboard, optional photo, resets, blocked storage, keyboard/focus and PDF.
- console/runtime errors: none in the passing browser run.

## Full-view comparison evidence

### Landing — desktop
The approved concept uses an oversized optimistic headline on warm paper, a strong dark CTA, saturated editorial illustration and a highly visible presentation of the seven profiles.

V9.1 preserves that hierarchy while improving the weakest V9 fidelity surface: the large hero no longer enlarges one low-resolution raster across the entire panel. It now uses four real painterly assets in a balanced 2 × 2 composition, keeping the approved color/illustration density while materially improving perceived sharpness. The intro copy, four benefits, CTA cluster and seven-profile rail remain aligned to the approved concept.

The conceptual source still has a single authored hero illustration; the 2 × 2 image treatment is an intentional production compromise until final high-resolution hero art is available.

### Landing — mobile
The previous mobile header compressed brand and navigation into the same row. V9.1 moves them into two separate rows, shortens the visible sound label and preserves touch targets. The profile family becomes a horizontal scroll-snap carousel rather than a long two-column grid, reducing vertical travel and making the landing substantially more compact.

Browser validation explicitly checks that brand and navigation rectangles do not overlap at 390 px.

### Day 1 question
The approved question concept supports reflection without announcing a profile result before the user has completed the assessment. V9 previously used profile names inside the decorative question art. V9.1 removes that priming: the illustration remains, but the visible copy is now neutral — **“Escolha pelo que combina mais com você.”** — and the image alt text is also profile-neutral.

The phase-transition overlay remains intentionally above the first question for a short moment and continues to respect reduced-motion behavior.

### Day 1 result
The result continues to match the approved information architecture:
1. six axis values;
2. compass-centered rings;
3. calculated primary profile.

The desktop dashboard remains inside the primary viewport and the full profile opens into four tabs. Comparison evidence shows the same left-metrics / central-compass / right-profile reading order as the approved reference.

## Focused region comparison evidence

### Landing hero
Evidence: `/mnt/data/v91qa/landing-comparison-v91.jpg`.

The implementation now has much closer visual density and sharpness than the previous single enlarged raster. The dark translucent copy field is a pragmatic legibility layer over four distinct real image assets, not CSS-drawn illustration.

### Result
Evidence: `/mnt/data/v91qa/result-comparison-v91.jpg`.

The main result hierarchy is faithful: metrics are visually secondary to the central compass/rings and illustrated profile, while primary actions remain reachable without scrolling on validated desktop sizes.

## Required fidelity surfaces

### Fonts and typography
The implementation retains Caramelo's established condensed display face and product sans rather than copying the exact rounded source typeface. Hierarchy, scale, wrapping and optical emphasis are now close to the source. This remains an intentional product-system constraint, not an actionable mismatch.

### Spacing and layout rhythm
Desktop hero and result preserve the major source proportions. Compact desktop keeps primary question and result actions in the viewport. Mobile header overlap is fixed, and the profile rail becomes horizontally scrollable. No actionable P0/P1/P2 spacing issue remains.

### Colors and visual tokens
Warm paper, deep green/navy, cobalt blue, yellow, orange/caramel and soft profile tints remain consistent with the approved reference. The ring visualization and profile/result surfaces belong to the same system. No actionable P0/P1/P2 token mismatch remains.

### Image quality and asset fidelity
All major visible illustration surfaces use real raster/profile assets; functional journey and compass elements remain SVG UI assets. The desktop hero now avoids a single heavily enlarged raster.

The current profile assets are still lightweight MVP exports rather than final high-resolution illustration masters. This is P3: the app is visually coherent and readable, but a final art pass will further improve detail.

### Copy and content
Landing copy follows the approved concept while preserving product-specific routes and stats. Result content continues to come from the live instrument. Assessment imagery no longer exposes profile names before scoring, reducing unintended response priming.

### Accessibility and responsive behavior
- mobile brand/navigation overlap removed;
- navigation stays horizontally accessible on narrow screens;
- sound control remains labeled accessibly;
- assessment image alt text is profile-neutral;
- reduced-motion handling is preserved;
- keyboard/focus/contrast checks remain green;
- no browser exceptions in the full synthetic journey.

## Findings

No actionable P0, P1 or P2 finding remains for V9.1.

- [P3] Final hero artwork is still a four-image production collage instead of one high-resolution authored hero.
  - Location: landing visual panel.
  - Impact: the screen is sharper and visually strong, but the source concept remains more cohesive as a single illustration.
  - Follow-up: replace the collage with a dedicated high-resolution hero asset when the final art pack is produced.

- [P3] Communicator Influente still uses the clean Transformador Social raster as a temporary painterly fallback because the existing Communicator WebP is visually corrupted.
  - Location: seven-profile rail and any calculated Communicator profile result.
  - Impact: art duplication only; profile title, color, copy, scoring and result logic remain distinct.
  - Follow-up: replace `assets/profiles/comunicador-influente.webp` with a clean dedicated export and remove the fallback mapping.

- [P3] Existing profile rasters are optimized for MVP size.
  - Impact: mild softness remains in larger cards/monitors.
  - Follow-up: produce 640–1024 px clean exports using the same IDs/filenames.

## Comparison history

1. V9 established the approved landing/result architecture but still had visible softness in the enlarged desktop hero.
2. First V9.1 pass:
   - split mobile topbar into brand and navigation rows;
   - made the profile family a mobile horizontal carousel;
   - introduced neutral assessment-art wording;
   - replaced the single hero raster with a mosaic strategy.
3. Browser QA found the neutral question copy was being overwritten by the earlier V9 renderer. The V9 renderer itself was updated so both visible text and alt text are profile-neutral.
4. Visual QA found two remaining polish issues:
   - the first desktop mosaic tile still occupied half the full hero height and remained visibly soft;
   - switching the Communicator fallback to its simple SVG created a style mismatch with the painterly profile family.
5. Post-fix V9.1:
   - desktop hero now uses four equal image tiles, materially reducing enlargement softness;
   - Communicator returns to a clean painterly fallback so the art family stays visually coherent;
   - mobile keeps the more cinematic large-top / two-small-bottom mosaic where raster density is sufficient.
6. Final evidence:
   - Quality Gate run `38776525112`: audit ✅ browser ✅ preview-package ✅
   - complete Days 1–7 flow ✅
   - desktop 1280 × 900 ✅
   - compact desktop 1366 × 768 ✅
   - mobile 390 × 900 ✅
   - mobile header non-overlap assertion ✅
   - mobile profile carousel assertion ✅
   - neutral assessment-art assertion ✅
   - no uncaught browser exceptions ✅

## Implementation checklist

- [x] Sharpen desktop hero without introducing placeholder/code-drawn art.
- [x] Preserve a compact cinematic hero composition on mobile.
- [x] Fix mobile header overlap.
- [x] Shorten mobile sound affordance visually while preserving accessibility.
- [x] Convert seven profiles to mobile horizontal carousel.
- [x] Remove profile-label priming during Day 1 questions.
- [x] Keep result architecture and full-profile tabs stable.
- [x] Keep scoring, weights, axes and methodology unchanged.
- [x] Preserve complete desktop/mobile regression.
- [x] Compare source and implementation in combined visual evidence.

## Follow-up Polish

- P3: dedicated high-resolution landing hero.
- P3: dedicated clean Communicator Influente raster.
- P3: higher-resolution exports for all seven profile scenes.
- P3: physical-device review on a 13-inch notebook plus representative iPhone/Android before public pilot.

final result: passed
