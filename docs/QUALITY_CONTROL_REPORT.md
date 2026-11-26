# QUALITY CONTROL REPORT (ADDENDUM §13 — honest inspection log)

## What has been verified so far
- ✅ Code validation: `tsc --noEmit` clean on every commit; validate.yml green.
- ✅ Anatomy/joint contract encoded (CHARACTER_RIG_DOCUMENTATION.md); no duplicate/disconnected parts in Char2D construction (single torso, 2 arms, 2 legs, head on neck).
- ✅ Determinism: all motion from frame; warpU monotone cubic.
- ⏳ Still-frame inspection: PENDING — first contact sheet after StyleTest v5 render (half-scale stills at beats f0/48/96/144/192/240/287).
- ⏳ Contact-sheet QC: PENDING.
- ⏳ Preview playback check: PENDING.
- ⚠️ NOT yet inspected: full-video playback (does not exist yet).

## Defect checklist (30 categories) — live log in VISUAL_DEFECT_LOG.md
Perspective · anatomy · joints · limb deformation · proportions · char continuity · framing · camera collision ·
ground contact · object interaction · missing/broken geometry · depth · lighting · shadows · outlines · texture ·
env/prop continuity · colour · animation timing · stiffness · foot slide · floating objects · clipping ·
transitions · VO sync · audio · render defects · encode defects — all to be swept per scene.

## Known current issues
- BokehPass focus uniform updated per frame — needs still verification (blur quality on SwiftShader).
- Walk foot-plant precision on 2D cast is approximate (phase-based) — foot-slide sweep planned in QC pass 1.
