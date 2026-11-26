# ART DIRECTION BIBLE (SKILL.md house style — MANDATORY across all 15 scenes)

## Ink
- ONE outline colour everywhere: **#351f22**. Inverted hull (backside scaled clone) + edge lines (EdgesGeometry, opacity ~0.55). Slightly varying thickness (hull 0.025-0.08 per material class) = hand-drawn feel.

## Shading & light
- **3-band toon gradient** (DataTexture [90,180,255], nearest filter) on every MeshToonMaterial.
- **Warm key light upper-LEFT** (#ffe2b0, casts shadows, 1024 map) + hemisphere fill (#fff2d8/#b98a54 0.85) + soft bounce.
- Per-location fog (B01/B02: #f7c268 26→88). Light vignette overlay (radial, rgba(53,31,34,0.34)).
- DOF: BokehPass focused at look-at distance each frame (aperture 0.00011, maxblur 0.0075).

## Depth staging
- Near-camera foreground object (blurred by bokeh), sharp midground characters, soft background — per shot.
- Labels live INSIDE the world: painted signboards, menu boards, banners on poles. NEVER floating pills.

## Palette (painted flat colours + procedural wear)
Plaster cream/ochre/rose/sage · wood family #5e3a18→#a8743e · terracotta #b5562d (+hi #d97f45) ·
brass #caa53d · awning stripes #c6402f/#f3e4c8 · mud #d9b478 · road #c09058 · sky #ffe0a8.
Wear: stains/chips/scratches via seeded srand() — deterministic, never Math.random().

## Composition (16:9 adapted)
- 55° vertical FOV; frame width ≈ 2*(distance*tan(27.5°))*16/9 — recomputed for landscape (skill's 9:16 numbers NOT reused).
- Safe frame: keep heads ≥ 60px from edge at 1080p; contact shadows ground every character.

## Transitions
- 0.4s dip to cream (#f3e4c8) at location changes ONLY; continuous camera moves connecting subjects otherwise.
- No wipes/templates/unrelated motion graphics.

## Consistency law (ADDENDUM §5)
First approved frames = benchmark. Any new scene compared against them (construction, detail, perspective,
light, outline, shadow, composition, depth, animation, render quality) before production continues.
