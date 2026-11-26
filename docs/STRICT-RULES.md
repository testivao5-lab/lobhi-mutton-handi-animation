# ⛔ STRICT RULES — NEVER VIOLATE (owner decree, current as of 2026-11-26 evening)

## RULE 1 — 2D CODE-BASED ANIMATION ONLY (ABSOLUTE, supersedes the 3D addendum)
- **The 3D skill (`animated-3d-story-video` / SKILL.md) is REMOVED from the plan entirely** —
  owner verdict: implementing it degraded quality. Do not reintroduce three.js, 3D worlds,
  SwiftShader/WebGL pipelines, or the SKILL's vertical-video/camera rules.
- Production is **2D animation, 100% code-based, inside Remotion (React + TypeScript)**:
  characters, scenes, props, effects = hand-authored SVG/React components animated by code.
- Every motion, timing, camera-like framing move, transition and effect = Remotion code.
  No external editors, no pre-rendered segments.

## RULE 2 — NO GENERATIVE AI, EVER
- No AI-generated images/videos anywhere (characters, backgrounds, props, textures).
- Web photo references for observation are allowed; production art is authored in code.

## RULE 3 — DESIGN FIRST, THEN ANIMATION (owner directive, current)
- Show **character designs and ALL designs** (cast concept sheets, environment designs,
  prop sheets) and get explicit owner approval BEFORE building animation.
- One character at a time: 3 concept directions → owner picks → rig + expression/walk
  preview → owner approves → lock. Locked designs never change silently.

## RULE 4 — Cloud-only rendering
GitHub Actions ubuntu-latest only. Local ffmpeg/heavy render absent by design.

## RULE 5 — Voice is the timing master
Owner-locked voices (docs/voice-bible.md) drive the timeline; never cut dialogue.

## RULE 6 — Subtitles separate
Never burned into MP4; separate Bengali SRT.

## RULE 7 — Approval gates & Drive backup
Skipped = rejected; silence = waiting. Drive backup after every milestone with versioned names.

---
_Supersedes: the "CRITICAL MASTER ADDENDUM" 3D directive and V6 Control Brief's 3D sections._
_Still in force from the V6 brief: approval-first workflow (§4), no debug overlays in production
output (§8), honest QC reporting (§13), design-before-production._
