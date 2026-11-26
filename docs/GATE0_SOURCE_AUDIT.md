# GATE 0 — SOURCE AUDIT & FILE MAP (V6 Control Brief §2 "Source audit")

Branch: `v6-rebuild` (V5 preserved: main @ `3932554`). Audited 2026-11-26. TSC clean.
Every area below cites exact files/lines; **V6-gap** = honest gap vs the Control Brief.

## 1. Character components & SVG construction
- `src/components/characters/Char2D.tsx` — the cast rig. Construction: ink width `INKW=4.2` (L38); `Eye()` L117–152 (brow path L147–149, half-lid overlay L131–141); `Mouth()` L154–188 (6 shapes incl. talkWide/talkMid); expression table `EXP` L190–199 (**7 expressions** vs required 12); torso pear path L258–281; head circle ~L330 (r30, squash L325); yaw feature offset `fx` L231–236.
- `src/components/characters/BolaiV3.tsx` — v4 legacy 2D-only rig, **superseded**, scheduled for deletion in V6.
- **V6-gap**: limbs are thin tapered quads (~8–12px) with single-piece upper+forearm (arm L254, L316 = one segment + disc hand); no elbow joint; audit finding "line-like appendages" CONFIRMED in source. Silhouette-first redesign required (Gate 2).

## 2. Rig / pivot / pose data
- Hips: rotate pivots `92 190` / `108 190` (L245, L294); thigh quads L246/L295; knee pivots `88 232`/`112 232` (L247, L296); ankle+foot disc y279 (L252, L298). Shoulders `84 118`/`116 118` (L253, L315). Walk phase math L210–219; blink L207.
- **V6-gap**: no elbow joint, no pose library beyond idle/walk/talk; required poses (reach/grip/lift/stir/serve/release/recoil/sit/kneel) absent. Docs: `docs/CHARACTER_RIG_DOCUMENTATION.md` L13–16 (to update after redesign).

## 3. Face expression components
- `EXP` table Char2D.tsx L190–199: neutral/happy/closed/greedy/shocked/regretful/proud.
- **V6-gap**: required 12 = neutral, happy, suspicious, angry, shocked, confused, afraid, guilty, sad, nervous, laughing, crying. Missing 8 + dedicated brow/cheek shape set.

## 4. Character→world transform & ground contact
- `src/three/Stage.tsx` L108–135: feet/head projection (L110–117), height ratio `330/273` (L118), top anchor `299/330` (L128), yaw clamp ±0.7 (L122), per-frame setChars L136.
- Contact shadows: `contactShadow()` `src/three/ink.ts` L209–228; blob per char `src/three/worlds.ts` L148–156 + shadow-follow tick L193–195.
- **V6-gap**: 2D feet are phase-animated, not IK-locked to ground plane → foot-slide risk on stop/start (QC planned).

## 5. Market geometry
- `src/three/worlds.ts` L18–101: ground+mud L23–28; far row (5 extruded boxes) L31–53; stalls ×3 L55–63 (kit `marketStall` L119–150); back wall L64–70; lamps L72–80 (`lampPost` kit L47–63); barrels/crates/sacks L82–98.
- **V6-gap**: audit-confirmed — repeated simple masses, large empty ground; needs designed street composition (varying depths, wires, carts, rooflines, restrained activity).

## 6. Restaurant exterior / interior
- Exterior: `facade()` kit L233–305 (extruded wall L239–242 w/ depth, cornice L244–247, panelled `doorUnit` L180–211, `windowUnit` L152–178 w/ reveal+sill, signboard canvas L249–268, awning L270–275, chimney L277–281); placed worlds.ts L104–125.
- Interior: **absent** — only a glow plane (worlds.ts L120–127). No kitchen, cooking station, tables.
- **V6-gap**: full interior/kitchen environment required (Gate 4/5), plinth/threshold/drainage details missing.

## 7. Handi / food / utensils / counter
- `handi()` kit L307–350: lathe body L309–317, rim L319–322, **brass** lid L323–329 (reference shows clay lids → V6 fix), knob L330–332, gloss band L334–340.
- `foodCounter()` kit L373–411 (post-v5c compact glass case). `riceSack` L352–371, `steelPlate` — (removed in v5c edit? verify) — plates exist in CounterFg 2D only.
- **V6-gap**: no soot/heat staining, no dough seal, no food surface (meat/gravy/potato), no steam particles, no ladle/plate/roti props, no interaction state machine (`resting→reach→grip→lid_lift→stir→serve→release`).

## 8. Materials & toon shading
- `src/three/ink.ts`: 3-band gradient map L46–57 (`[90,180,255]`); `toon()` L59–67; painted wear `addWear` L92–115; `signTexture` L118–140; palette `PAL` L15–44.
- **V6-gap**: material classes (plaster/brick/wood/iron/glass/terracotta/cloth) not yet differentiated — single toon+colour; needs material swatch pass + calibration chart.

## 9. Lighting / shadows / fog / DOF
- `lightingRig()` ink.ts L187–206: warm key upper-left L189–196 (shadow map 1024, bias −0.0008), hemisphere L201, bounce L202–205; per-location fog L188.
- `src/three/Stage.tsx` composer L74–80: RenderPass → BokehPass (focus follows look-at L94–101, aperture 0.00011/maxblur 0.0075) → OutputPass.
- **V6-gap**: no AO pass; band/fill calibration unverified (grey-ball test pending, Gate 5).

## 10. Camera path & shot definitions
- worlds.ts L158–162: 5 pos keys + 5 look keys, `beats` L162, `samplePath` lerp L173–177, tick L181–196, walkEnd 0.62 L189. `warpU()` monotone cubic `ink.ts` L231–249 (**unused in v5 path** — path is plain lerp; V6 must wire warpU per SKILL).
- **V6-gap**: camera-led single take; no shot system (establishing/medium/CU/OTS/insert/reaction/interior-exterior/reverse). `docs/CAMERA_PLAN.md` to be rebuilt shot-by-shot with word-timed beats.

## 11. Remotion composition / frame-driven animation
- `src/Root.tsx` L34–41 (StyleTest 288f); `Stage.tsx` L88–101 tick per `useCurrentFrame()`; deterministic (no wall-clock; seeded srand ink.ts L78–85).
- Audio: StyleTest single `<Audio>` S01_SH03 (StyleTest L96); `sentence_times.json` = **PLACEHOLDER timings** → must be re-timed from real VO audio before scene lock.

## 12. Debug overlay & render config
- `src/config/debug.ts` DEBUG_MODE=false (commit `edeee19`); StyleTest badge+meta-subtitle gated (StyleTest L74–86, L60–66).
- Render recipe: `--gl=swangle --chromium-flags='{"enable-unsafe-swiftshader": true}'` (.github/workflows/preview-render.yml L42; stills-check.yml L36).
- **V6-gap**: automated production-output scan (fails if debug pixels/badges) not yet implemented; NaN/bounds checks not yet implemented.

## 13. Tests, scripts, CI
- Workflows: validate.yml (typecheck+asset validation), preview-render.yml (dispatch: composition/frames), stills-check.yml, scene-render.yml, final-assembly.yml.
- Scripts: `scripts/validate_assets.py` (90 shots/810s), `scripts/generate_srt.py` (73 cues DRAFT).

## 14. Story DB & constants
- `src/data/shots.ts` + `shots.part1/2.json`: 90 shots/15 scenes/19,440f; `src/config/constants.ts` 1920×1080@24.
- Canonical script: `docs/source/script-original.md`; canonical timing: `uploads/new_script_lobhi_mutton_handi_wala.md`.

## Gate 0 conclusion (honest)
V5 source CONFIRMS the audit's central findings: line-like limbs (1-segment arms), 7/12 expressions,
no interior, primitive handi (no soot/seal/food), camera-led single take with plain-lerp (warpU unwired),
repeated-box market, beige-dominant palette. V6 rebuild required per brief — starting Gate 2
(character concepts, ONE character at a time) after Gate 0+1 approval.
