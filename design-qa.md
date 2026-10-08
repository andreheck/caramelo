# Design QA — Caramelo Visual V7

- source visual truth path: `/mnt/data/a_wide_illustrated_infographic_poster_with_a_clean.png`
- implementation screenshot path: `/mnt/data/caramelo-browser-v7-painterly/audit-day1-result-1280.png`
- combined comparison: `/mnt/data/caramelo-v7-design-qa-comparison-final.jpg`
- viewport: 1280 px wide browser capture
- source pixels: 1536 × 1024
- implementation pixels: 1280 × 1461
- density normalization: both images normalized to 900 px height in the combined comparison; conceptual art-direction comparison, not pixel-identical state comparison
- state: source is the seven-profile concept board; implementation is a single calculated Day 1 result for `Construtor Organizado`
- browser evidence: GitHub Actions Quality Gate run `37787920538`, commit `763cab5e37a500e884a24f4630064d7c2699595f`
- primary interactions covered: full Days 1–7 journey, desktop/mobile, clipboard, optional photo, resets, blocked storage, keyboard/focus, PDF
- console/runtime errors: none reported by the passing browser job

## Full-view comparison evidence

The source establishes the art direction rather than an exact application screen: warm paper base, saturated Brazilian editorial illustration, rounded profile color families, strong profile titles, characteristic iconography, short identity descriptors, and related-area chips. V7 adapts those traits into the existing Caramelo result architecture rather than reproducing the seven-column poster.

The first V7 pass used flat vector profile scenes and was visibly weaker than the painterly source. The revised pass replaces those as the primary assets with separate WebP editorial scenes and keeps SVGs only as technical fallbacks. The revised implementation now has a warmer, more illustrative profile block and materially closes the source/implementation art-direction gap.

## Required fidelity surfaces

### Fonts and typography
The source uses a hand-drawn/editorial display voice while the app uses a more controlled condensed display/sans hierarchy. This is an intentional product adaptation for long-form result legibility. Profile title size, weight, and hierarchy are sufficiently prominent. No actionable P0/P1/P2 mismatch remains.

### Spacing and layout rhythm
The result keeps generous paper-colored margins, rounded containers, soft shadows, and a clear progression from profile summary → profile art → characteristics → quantitative rings. The profile illustration has enough visual weight without displacing the result explanation. No actionable P0/P1/P2 issue found.

### Colors and visual tokens
Warm off-white, green, yellow/caramel, and blue correspond well to the reference family. The implementation uses these colors more systematically as product tokens, which is appropriate. No actionable P0/P1/P2 issue found.

### Image quality and asset fidelity
Primary profile art is now painterly WebP rather than handcrafted SVG approximation. Each profile has a separate asset, while SVG remains a loading fallback and is also used appropriately for functional icons, timeline badges, and the compass. The source concept is richer and more portrait-led, but the implementation retains the same editorial warmth at the card size used by the product. No actionable P0/P1/P2 issue remains for this homologation build.

### Copy and content
Profile title, summary, motivator, environment, tension, dominant axis, and career/area suggestions remain data-driven from the calculated result. They are not baked into the image. This follows the intended concept and preserves methodology separation.

## Findings

No P0, P1, or P2 visual mismatch remains in the compared result state.

- [P3] The painterly profile scenes still share a relatively similar warm/sunny environmental language across the family.
  - Location: `assets/profiles/*.webp`.
  - Evidence: the source concept differentiates the seven portraits more aggressively by pose, framing, local palette, and scene props.
  - Impact: minor; profiles remain distinguishable by scene, title, emblem, tags, and result copy.
  - Follow-up: in a later art-only pass, increase scene diversity while keeping file IDs and data integration unchanged.

## Open Questions

- The source is a seven-profile concept montage, whereas the implementation screenshot shows one live profile result. Exact poster-to-screen pixel fidelity is therefore not a valid acceptance criterion; this QA judges art direction and result-card integration.

## Comparison history

1. Earlier V7 pass: flat SVG scenes were the primary profile art. Finding: P2 image fidelity drift versus the painterly source.
2. Fix: separate painterly WebP scenes became the primary profile images; SVG scenes remain only as technical fallbacks. Profile image column width was adjusted to give the scene more presence.
3. Post-fix evidence: `audit-day1-result-1280.png` from commit `763cab5e...` and combined comparison `caramelo-v7-design-qa-comparison-final.jpg`. The P2 finding is resolved.

## Implementation checklist

- [x] Separate art per vocational profile.
- [x] Profile copy and suggested areas indexed from result data.
- [x] Profile characteristic emblem retained as SVG UI.
- [x] SVG journey badges integrated.
- [x] Dynamic layered SVG compass integrated.
- [x] Micro-transitions/glow with reduced-motion support.
- [x] Desktop and mobile browser regression suite passes.
- [x] Preview package generated by GitHub Actions.

## Follow-up polish

- P3: diversify the seven painterly scenes further in a later art-only revision.
- P3: consider one additional mobile-only crop rule per profile if physical-device testing shows faces/props being clipped on unusually narrow screens.

final result: passed
