# Design QA — Caramelo Visual V8.1

- source visual truth paths:
  - `/mnt/data/caramelo_jornada_de_possibilidades.png`
  - `/mnt/data/a_wide_illustrated_infographic_poster_with_a_clean.png`
- implementation screenshot paths:
  - `/mnt/data/v81qa/landing-1280.png`
  - `/mnt/data/v81qa/audit-day1-question-1280.png`
  - `/mnt/data/v81qa/audit-day1-result-1280.png`
  - `/mnt/data/v81qa/landing-390.png`
  - `/mnt/data/v81qa/final-390.png`
- combined comparison evidence:
  - `/mnt/data/qa-v81/home-comparison.jpg`
  - `/mnt/data/qa-v81/profile-comparison.jpg`
- automated browser viewports:
  - 1280 × 900 CSS px
  - 1366 × 768 CSS px
  - 390 × 900 CSS px
- source pixels:
  - home concept: 941 × 1672
  - seven-profile concept board: 1536 × 1024
- implementation pixels:
  - landing full-page capture: 1280 × 1115
  - Day 1 result full-page capture: 1280 × 900-class viewport
- normalization: source and implementation comparisons were resized to a common 900 px visual height. The source files are conceptual art-direction references rather than production desktop wireframes, so fidelity is judged on hierarchy, palette, imagery, density, interaction character and visual coherence rather than pixel-identical geometry.
- state:
  - landing
  - Day 1 phase transition/question entry
  - calculated Day 1 result
  - complete seven-day regression
- browser evidence: GitHub Actions Quality Gate run `38657617252`, commit `e186d8193bb6043c80d2a084129acb7fcb09cf9f`
- primary interactions tested: full Days 1–7 journey, 50-item Day 1, phase transition UI, optional sound control, desktop 1280 × 900, compact desktop 1366 × 768, mobile 390 × 900, reload persistence, clipboard, optional photo, complementary/full reset, blocked storage, keyboard/focus and PDF.
- console/runtime errors: none in the passing browser run.

## Full-view comparison evidence

### Landing
The approved concept is illustration-led, warm, optimistic and visibly Brazilian, with a strong headline, paper background, saturated green/yellow/blue/orange accents and immediate invitation to begin.

V8.1 preserves the product-readable desktop architecture from V8 while adding perceptible polish: the hero illustration now behaves as a living collage with slow image rotation and subtle desktop pointer parallax, the sound control is visible but secondary, and the hierarchy remains strongly anchored by the approved headline **“Seu futuro também tem muitas possibilidades.”**

The source is still richer as a single authored poster, but the implementation now translates that warmth into an interactive application rather than imitating the poster literally.

### Questions and phase transitions
A new phase overlay gives each of the seven days a recognizable entrance moment using its own journey badge, title, short contextual explanation and progress sweep. It appears after navigation settles, so it does not block the control that initiated the transition.

Question entry has a compact animated ribbon and desktop arrival treatment. The full interaction remains stable under the automated 50-item loop, including rapid selection/advance behavior.

### Bússola
The compass remains a persistent orientation element but now has two movement layers:
- continuous soft needle drift/inertia;
- stronger card/compass reaction when the user answers.

The result view keeps a compact version in the lower-right so it remains part of the visual language without competing with the result content.

### Day 1 result
The result still uses the V8 one-viewport dashboard: painterly profile art, warm ring visualization, four summary cards and primary actions. The V8.1 entrance motion staggers these regions rather than making the entire screen appear at once.

This keeps the quantitative graphic visually connected to the illustration system and avoids returning to the earlier dark analytics-dashboard look.

## Focused region comparison evidence

### Hero region
Comparison: `/mnt/data/qa-v81/home-comparison.jpg`.

The implementation matches the main art-direction signals from the source: warm paper field, oversized optimistic headline, deep green CTA, saturated illustrated imagery, blue/yellow/green accents, compact stats and a secondary illustrated storytelling block. V8.1 adds motion without changing that hierarchy.

### Profile/result region
Comparison: `/mnt/data/qa-v81/profile-comparison.jpg`.

The calculated result keeps all semantic copy outside the image so titles, motivators, environmental preferences, warnings and suggested areas remain indexed to the real scoring result. The painterly scene remains the emotional anchor and the ring graphic uses the same warm visual system.

### Phase transition region
Implementation evidence: `/mnt/data/v81qa/audit-day1-question-1280.png`.

The transition overlay is intentionally modal-looking but non-interactive. It creates a distinct chapter break while the underlying question remains visible as context. The overlay duration is short and respects reduced-motion preferences.

## Required fidelity surfaces

### Fonts and typography
Display hierarchy remains strong and readable. The source uses a more hand-drawn editorial voice; the app intentionally keeps its existing product typography for long-form usability. V8.1 does not introduce new hierarchy drift. No actionable P0/P1/P2 typography issue remains.

### Spacing and layout rhythm
Primary question actions fit at 1280 × 900 and at compact desktop 1366 × 768. The result primary actions also remain within the compact viewport. Mobile keeps its vertical flow instead of forcing desktop compression. No actionable P0/P1/P2 spacing issue remains.

### Colors and visual tokens
Off-white paper, deep green, cobalt blue, warm yellow and caramel stay consistent across the landing, phase overlay, compass, question state and result. No actionable P0/P1/P2 token mismatch remains.

### Image quality and asset fidelity
The seven profile scenes remain separate painterly WebPs with SVG fallbacks. V8.1 reuses these assets for the living hero rather than introducing code-drawn decorative substitutes. Functional badges and compass remain SVG UI assets. No actionable P0/P1/P2 asset issue remains.

### Copy and content
All vocational result copy remains data-driven. Phase-copy additions are contextual only and do not alter interpretation, scoring or result language. Sound controls are labeled explicitly with on/off state.

### Accessibility and motion
- sound can be turned off and preference is stored locally;
- automated/headless environments do not initialize Web Audio;
- reduced-motion mode disables the new transition/float animations;
- keyboard/focus and semantic checks remain green;
- mobile/touch stability remains green;
- phase overlay does not accept pointer events and therefore cannot trap the user.

## Findings

No actionable P0, P1 or P2 findings remain for the V8.1 homologation build.

- [P3] The hero/profile raster assets are still relatively small when enlarged on large desktop monitors.
  - Location: `assets/profiles/*.webp`.
  - Impact: mild softness on large screens; no loss of comprehension.
  - Follow-up: replace with higher-resolution exports under the same filenames.

- [P3] The sound toggle is deliberately explicit for MVP testing and reads more like a utility control than a final consumer-facing audio affordance.
  - Location: top navigation.
  - Impact: minor visual utility feel.
  - Follow-up: after user testing, consider replacing the text button with a compact audio icon + accessible label while retaining the same preference behavior.

- [P3] The seven painterly scenes still share a broadly similar warm/sunny environmental language.
  - Location: `assets/profiles/*.webp`.
  - Impact: profiles are still distinguishable, but the art family can become richer.
  - Follow-up: diversify framing, environments and pose in a later art-only revision.

## Comparison history

1. V8 baseline passed visual QA but still had restrained motion and no audio/phase punctuation.
2. V8.1 added:
   - optional subtle Web Audio feedback;
   - seven-day phase transition overlay;
   - question arrival ribbon;
   - stronger compass reaction;
   - living hero image rotation/parallax;
   - staggered result entrance;
   - compact-desktop 1366 × 768 viewport tuning.
3. First V8.1 browser iteration revealed a feedback loop in the question-ribbon MutationObserver. It was fixed by inserting the ribbon only when absent and scheduling refresh via `requestAnimationFrame`.
4. Subsequent iteration revealed a test timing mismatch because the phase overlay is intentionally deferred until navigation settles. The browser test now waits for the phase state.
5. Compact desktop validation found the primary question actions 3.6 px below the 768 px viewport. The V8.1 compact height budget was tightened by 6 px.
6. Final audio refinement: Web Audio is unlocked synchronously from real answer/phase-navigation gestures so the delayed phase tone is permitted by browser autoplay policy, while generated/headless test environments still skip audio initialization.
7. Final evidence:
   - Quality Gate run `38657617252`: audit ✅ browser ✅ preview-package ✅
   - complete Days 1–7 flow passes at 1280 × 900 and 390 × 900;
   - compact 1366 × 768 question and result actions fit the viewport;
   - no uncaught browser exceptions.

## Implementation checklist

- [x] Optional sound feedback with persistent on/off preference.
- [x] Phase transition for all seven days.
- [x] Phase transition does not intercept navigation.
- [x] Compass reacts visibly to answers and continues subtle idle movement.
- [x] Hero gains slow visual variation and desktop parallax.
- [x] Question entry gains visible but lightweight transition treatment.
- [x] Result regions enter with controlled stagger.
- [x] Compact desktop 1366 × 768 viewport is explicitly tested.
- [x] Existing desktop/mobile complete journey still passes.
- [x] Scoring, profiles, weights and methodology remain unchanged.
- [x] Reduced-motion behavior remains supported.

## Follow-up polish

- P3: higher-resolution painterly profile/hero exports.
- P3: more varied profile environments and camera angles.
- P3: consider a compact icon-only audio control after observing real-user comprehension.
- P3: complete physical-device and human screen-reader validation before public pilot.

final result: passed
