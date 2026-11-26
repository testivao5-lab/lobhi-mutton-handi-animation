# ⛔ STRICT RULES — NEVER VIOLATE (owner decree, 2026-11-26)

## RULE 1 — NO GENERATIVE AI, EVER (ABSOLUTE)

**Generative AI is NEVER used in this production. Not for visuals, not for art, not for assets. Never.**

- Every character, background, prop, food item, effect and texture is **drawn 100% in code**
  (SVG shapes, gradients, paths, filters inside Remotion React/TypeScript).
- No AI-generated images anywhere in the pipeline — not as backgrounds, not as sprites,
  not as reference files in the repo. AI image files were purged from the repo on 2026-11-26.
- Previously approved AI design sheets are VOIDED as assets. Their locked design
  attributes (colors, outfits, features in `docs/character-bible.md`) remain as the
  written specification for the code-drawn art.

## RULE 2 — Remotion code-based animation (ABSOLUTE)

- All animation, motion, timing, camera, effects, compositing = **Remotion code**.
- No external editors, no pre-rendered video segments, no third-party render paths.
- Remotion is the only render engine for every frame (tests, scenes, final).

## RULE 3 — Cloud-only rendering

All rendering on GitHub Actions `ubuntu-latest`. Never render the film locally.

## RULE 4 — Voice is the timing master

Bengali VO (owner-selected & locked voices, `src/config/voices.ts`) drives the timeline.
(Voice selection was personally approved by the owner via locked battles.)

## RULE 5 — Approval gates

Designs (now code-drawn), test clips, backgrounds, major changes: owner approves first.
Selected = approved · Skipped = rejected · Silence = waiting.

## RULE 6 — Subtitles stay out of the video

Final MP4 is clean; `subtitles/lobhi-mutton-handi-bengali.srt` is a separate file.

---
_Violation of RULE 1 or RULE 2 is a production stopper. When in doubt: draw it in code._
