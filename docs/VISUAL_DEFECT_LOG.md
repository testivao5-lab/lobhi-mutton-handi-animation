# VISUAL DEFECT LOG

| ID | Scene | Frame | Category | Description | Severity | Source | Fix | Verified |
|---|---|---|---|---|---|---|---|---|
| D-001 | TestClip v3 render | — | missing asset | proud-closed sprite referenced but absent (render fail 45786988312) | critical | TestClip.tsx | fallback (d873be4) | ✅ rerun green |
| D-002 | all pre-v5 | — | style | flat SVG look rejected by owner (level-1) | critical | — | pivot to 3D house style | ✅ addendum |
| D-003 | (open) | — | QC | still/contact-sheet inspection pending for v5 | high | — | QC pass after render | ⏳ |

| D-004 | StyleTest v5 stills | all | rendering | Canvas empty in stills+video: world build state flip didn't re-run frame layout effect → composer.render never called; fonts delayRender without failsafe risked hang | critical | Stage.tsx | built-state re-render + 2.5s font failsafe (13b09e7) | ✅ stills show world |
| D-005 | StyleTest v5 stills | f144 | proportions | Characters ~12% too small vs 3D anchor (feet→head ratio used 330/308, actual SVG 330/273); adults 1.68m read small next to 2.2m doors | high | Stage.tsx, worlds.ts | ratio fixed + adult height 1.74/1.62/1.68 | ✅ verify in v5b stills |
| D-006 | StyleTest v5 stills | f144 | composition | open QC: Bolai arm/hand construction at close range; door dark-plane depth; Fatik occlusion by counter handis | medium | Char2D/kit | inspect v5b closeups before cast sheets | ⏳ |
| D-007 | StyleTest v5b stills | f200/f260 | prop scale | Counter handis ~1.1m oversized vs case; glass-case top bar floated without posts; hero handi dominated frame | medium | kit.ts foodCounter, worlds.ts | compact case + corner posts + handis 0.38-0.5 + hero 1.15 | ✅ verify v5c |
| D-008 | StyleTest v5c still | f260 | anatomy/joint | Legs detached from torso (hip pivot y208 vs torso bottom ~188) = floating hips; violates anatomy contract | critical | Char2D.tsx | hip pivots raised to y190, thigh/knee/ankle/foot re-chained (188/232/276/279) | ✅ verify v5d |
| D-009 | StyleTest v5c still | f260 | prop | Awning front bar floated mid-air (bar offset formula wrong) | medium | kit.ts awning | bar pinned to slat front edge (sin/cos of tilt) | ✅ verify v5d |
| D-010 | StyleTest v5c still | f260 | composition | Hero handi dominated frame right edge at 1.15 scale | low | worlds.ts | scale 0.95, reposition (16.3,0,0.5) | ✅ verify v5d |
