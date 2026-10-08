# Design QA — Caramelo Visual V8

- source visual truth paths:
  - `/mnt/data/caramelo_jornada_de_possibilidades.png`
  - `/mnt/data/a_wide_illustrated_infographic_poster_with_a_clean.png`
- implementation screenshot paths:
  - `/mnt/data/caramelo-browser-v8-final/landing-1280.png`
  - `/mnt/data/caramelo-browser-v8-final/audit-day1-question-1280.png`
  - `/mnt/data/caramelo-browser-v8-final/audit-day1-result-1280.png`
- combined comparison evidence:
  - `/mnt/data/qa-v8/home-comparison.jpg`
  - `/mnt/data/qa-v8/profile-comparison.jpg`
- viewport: 1280 × 900 CSS px for automated Chromium validation
- source pixels:
  - home concept: 941 × 1672
  - seven-profile concept board: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 × 1115
  - Day 1 result full-page capture: 1280 × 971
- normalization: comparisons use crops/scale normalized to the same visual height. The source files are conceptual/mobile art-direction references, so acceptance is based on hierarchy, palette, imagery, density and interaction character rather than pixel-identical geometry.
- state: landing, first Day 1 question, and calculated Day 1 result
- browser evidence: GitHub Actions Quality Gate run `37858091706`, commit `745ed34101c4ec2e8536d16fb4f644ebb8ed3fcb`
- primary interactions tested: complete Days 1–7 flow, 50-item Day 1, reload persistence, desktop and 390 px mobile, clipboard, optional photo, complementary/full reset, blocked storage, keyboard/focus, PDF generation and result-detail dialog
- console/runtime errors: none reported by the passing browser job

## Full-view comparison evidence

### Landing
The approved concept establishes a warm paper base, high-saturation Brazilian editorial illustration, a large optimistic headline, green primary CTA, colorful supporting motifs and an immediate feeling of discovery. The V8 landing now follows the same hierarchy: large optimistic headline, warmer and more colorful hero composition, illustration-led right panel, floating image cards, yellow/green/blue accents, compact stats and a strong green CTA.

The earlier V7 landing felt like a functional prototype because its visual panel was dominated by generic geometric color fields and left unused dark space. V8 replaces that impression with a full-height illustrated collage and a more inviting opening message.

### Question screen
The user requested that the content needed to answer remain visible without vertical scrolling. In the V8 desktop state, question context, four options and Back/Next actions fit inside the 1280 × 900 viewport. The option system also moves away from a generic white-card grid by using subtle green, blue, yellow and orange editorial tints while preserving legibility.

### Day 1 result
The previous result mixed a painterly profile card with a dark dashboard-like ring visualization and a large fixed compass that competed with the content. V8 reorganizes the result into a single primary viewport: illustrated profile card on the left, warm editorial ring visualization on the right, four quick-result cards below and primary actions at the bottom. Deeper axes, careers and action-plan content remain accessible through the `Ver detalhes` dialog.

The compass is deliberately compact on result views and moved to the bottom-right so it remains part of the journey language without obscuring the result.

## Focused region comparison evidence

### Hero region
Comparison: `/mnt/data/qa-v8/home-comparison.jpg`.

The V8 hero matches the source intent on the major fidelity surfaces: warm off-white canvas, saturated yellow/green/blue illustration, optimistic oversized title, green CTA and small supporting badges. Exact character pose and scene are intentionally adapted because the approved image is a conceptual composition rather than a production-ready desktop hero.

### Profile/result region
Comparison: `/mnt/data/qa-v8/profile-comparison.jpg`.

The profile art remains the dominant emotional anchor, with title, identity tags and related-area chips kept outside the image so they remain indexed to the calculated result. The graph now uses the same warm paper/green/blue/yellow family instead of a dark BI-dashboard surface.

## Required fidelity surfaces

### Fonts and typography
The approved concept uses a hand-drawn/editorial display voice. The product keeps Inter/Anton-derived product typography for long-form clarity, but V8 increases the emotional headline scale and keeps strong condensed/black hierarchy for profile and result headings. This is an intentional product adaptation. No actionable P0/P1/P2 typography mismatch remains.

### Spacing and layout rhythm
The main desktop question and result experiences now fit the primary viewport without requiring vertical scrolling to reach actions. Result information is grouped into a 2-column dashboard and detail dialog rather than a long linear report. Major cards use consistent radii, shadows and paper surfaces. No actionable P0/P1/P2 spacing issue remains.

### Colors and visual tokens
V8 consistently uses off-white paper, deep green, cobalt/royal blue, warm yellow and caramel. The result rings were moved from a dark blue dashboard treatment to a warm editorial panel so the quantitative graphic now belongs to the same system as the profile illustration and journey badges. No actionable P0/P1/P2 color mismatch remains.

### Image quality and asset fidelity
The seven profile scenes remain separate painterly WebP assets, with SVGs retained only as technical fallbacks and functional UI assets. The landing reuses those approved-direction painterly assets rather than replacing them with CSS illustration. The scenes are visually coherent with the conceptual references. No actionable P0/P1/P2 asset mismatch remains.

### Copy and content
Profile titles, summaries, motivators, environment, tension, dominant axis, related areas and action-plan content remain data-driven from the real calculated result. They are not baked into images. The V8 landing copy is shorter and more optimistic, while methodology/scoring copy remains unchanged.

### Accessibility and responsive behavior
The existing keyboard/focus/ARIA and contrast checks remain green. Reduced-motion handling is preserved. Rapid-click instability found by the mobile Chromium test was fixed by disabling transform-based hover/entry motion on narrow/touch layouts. The full 390 px journey passes.

## Findings

No actionable P0, P1 or P2 visual mismatch remains for the V8 homologation state.

- [P3] Painterly profile/hero assets are intentionally lightweight and can look slightly soft on large desktop displays.
  - Location: `assets/profiles/*.webp`.
  - Evidence: the conceptual references are higher-resolution and retain more brush/texture detail when enlarged.
  - Impact: minor; composition, color and subject remain clear at the card sizes used by the product.
  - Follow-up: replace each WebP with a higher-resolution export using the same filenames/IDs so no product logic changes.

- [P3] The seven painterly scenes still share a relatively similar warm/sunny environmental language.
  - Location: `assets/profiles/*.webp`.
  - Evidence: the approved board differentiates framing, pose and props more aggressively.
  - Impact: minor; profiles remain distinct through illustration subject, title, emblem, tags and calculated result copy.
  - Follow-up: diversify camera angle/setting in an art-only pass.

## Comparison history

1. V7 before this iteration:
   - landing felt functional rather than emotionally engaging;
   - fixed compass was visually heavy and could cover result content;
   - question transitions were minimal;
   - desktop questions/results could require more vertical travel;
   - ring visualization read as a dark analytics/BI card rather than part of the Caramelo illustration system.
2. V8 implementation:
   - illustrated/colorful home collage and revised optimistic headline;
   - spring/inertia compass with idle drift and per-answer nudge;
   - forward/back/stay question transitions and selection microfeedback;
   - desktop question and Day 1 result primary actions kept inside one viewport;
   - compact result dashboard plus detail dialog;
   - warm editorial ring visualization.
3. Browser QA found two implementation regressions during iteration:
   - first desktop viewport fit missed by ~26 px; height budget was tightened;
   - mobile options were unstable under transform animations; narrow-layout motion/hover transforms were disabled.
4. Post-fix evidence:
   - Quality Gate run `37858091706` passes audit, browser and preview-package;
   - desktop viewport assertions for questions and result pass;
   - 390 px complete journey passes with no uncaught exceptions.
5. Final visual polish:
   - home visual fills its complete panel;
   - result legend contrast improved;
   - result compass reduced and moved to bottom-right;
   - option-card color family made more consistent with the approved conceptual palette.

## Implementation checklist

- [x] More animated/inertial compass with continuous idle motion and per-answer movement.
- [x] Better question-to-question motion on desktop.
- [x] Reduced-motion and stable mobile/touch behavior.
- [x] Desktop primary question content and actions fit one viewport.
- [x] Desktop Day 1 result summary and actions fit one viewport.
- [x] Detailed result remains available without crowding the primary viewport.
- [x] Result graph restyled to warm Caramelo visual tokens.
- [x] Landing made more colorful, illustrative and optimistic.
- [x] Scoring and methodology left unchanged.
- [x] Full Days 1–7 regression passes at 1280 px and 390 px.
- [x] PDF, clipboard, reset and blocked-storage tests still pass.

## Follow-up polish

- P3: generate higher-resolution versions of the seven painterly scenes.
- P3: diversify the environments/poses of the profile illustration family.
- P3: after physical-device testing, consider additional mobile-only crop rules for unusually short/narrow screens.

final result: passed
