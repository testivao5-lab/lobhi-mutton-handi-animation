# ANIMATION PLAN

## Timing master
Voice-over (owner-locked voices) is the master. `docs/sentence_times.json` records per-sentence
start/end + shot binding; one global `CUTS` array holds real shot-transition frames; sentence
boundaries make the cut points; word-proportional beats place visual events (SKILL E).

## Determinism
Everything is driven by `useCurrentFrame()`; three.js scene state is set per frame in
`world.tick(f)` — zero wall-clock/accumulated state (ADDENDUM §4).

## Camera
Monotone-cubic warp `warpU()` (src/three/ink.ts) with zero-speed endpoints; net travel in
every shot; mix ≈ 1/2 push, 1/3 crane, 1/5 track (SKILL E / addendum §6). See CAMERA_PLAN.md.

## Character animation (2D cast in 3D world)
- Walk cycle: deterministic phase `f*0.27`, thigh swing ±24°, knee bend, arm counter-swing, bob; feet contact via anchor on ground plane (y=0), no slide while planted (2D feet recompute per frame from phase).
- Idle: breath bob ±1.6px, arm sway; talking: head nod (sin f/9) + gesture arm + 3-shape viseme cycle (talkWide/talkMid/closed).
- Turn-to-camera: yaw clamp ±0.7 rad; feature shift + squash on turn (never edge-on).
- Expressions: neutral/happy/closed/greedy/shocked/regretful/proud (Char2D EXP table).
- 12 principles applied: squash&stretch (talk scale), anticipation (pre-gesture lean), staging (camera beats), straight-ahead+pose-to-pose hybrid (paths keyed to VO words), follow-through (arm settle), slow-in/out (warpU), arc (bob), secondary action (blink, drape sway), timing (VO), exaggeration (expression takes), solid drawing (anatomy contract), appeal (cast palettes).

## Object interaction (ADDENDUM §3)
Contact rules: hands wrap prop handle at contact frame; prop moves only after contact; contact shadows
under every char/prop; weight via arm settle overshoot. Sitting/holding systems built per scene on shared rig.
