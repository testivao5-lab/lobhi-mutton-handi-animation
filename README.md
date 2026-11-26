# লোভী মটন হান্ডি ওয়ালা — Bengali 2D Animated Short Film

Remotion + React + TypeScript production of a ~13–14 minute Bengali moral comedy-drama
(1920×1080, 24 FPS, H.264 MP4). **All rendering happens on GitHub Actions — never locally.**

## Quick links

- 📊 Production status: [`docs/production-status.md`](docs/production-status.md)
- 🎬 Shot database (90 shots, full dialogue): [`src/data/shots.part1.json`](src/data/shots.part1.json), [`src/data/shots.part2.json`](src/data/shots.part2.json)
- 🧑‍🎨 Character bible: [`docs/character-bible.md`](docs/character-bible.md)
- 🎙 Voice bible: [`docs/voice-bible.md`](docs/voice-bible.md)
- 🏞 Background bible: [`docs/background-bible.md`](docs/background-bible.md)
- 🫙 Props bible: [`docs/props-bible.md`](docs/props-bible.md)
- ✅ Continuity checklists: [`docs/continuity.md`](docs/continuity.md)
- 📝 Canonical source script: [`docs/source/script-original.md`](docs/source/script-original.md)
- 💬 Subtitles (separate deliverable, never burned in): [`subtitles/lobhi-mutton-handi-bengali.srt`](subtitles/lobhi-mutton-handi-bengali.srt)

## Commands

```bash
npm ci                 # install
npm run typecheck      # tsc
npm run validate:assets
npm run generate:srt   # draft SRT from shot data
npm run dev            # Remotion Studio (local preview only — no heavy rendering)
```

## CI/CD (GitHub Actions)

| Workflow | Purpose |
|---|---|
| `validate.yml` | typecheck, shot-data validation, **secret scan**, draft SRT generation |
| `preview-render.yml` | render any composition (dispatch: composition id + optional frame range) |
| `scene-render.yml` | parallel matrix scene rendering (max-parallel 10, standard free runners) |
| `final-assembly.yml` | concat scene MP4s, QC probe, upload artifact — **no burned-in subtitles** |

Run them from the Actions tab or via `gh workflow run`. Every heavy operation (full-resolution render, encoding, batch asset processing) runs here, never on a local machine.

## Approval gates (master prompt §17)

Character designs, character voices, test clips, and major backgrounds require explicit owner approval before they are locked. Selected voice = approved; skipped audition = rejected (new options are generated). Silence is never approval.

## Security

The repository is public. No tokens, keys or credentials are ever committed; `validate.yml` scans every push for credential-like strings. CI uses only the built-in `GITHUB_TOKEN` with minimal `contents: read` permissions.

## Production style (MASTER ADDENDUM 2026-11-26)
- SKILL.md house style MANDATORY: procedural 3D worlds (three.js, painted flat colours, ink #351f22, 3-band toon) + 2D flat-shaded cartoon cast projected inside the 3D world; camera moves in every shot; everything driven by the Remotion frame.
- ZERO generative AI images. All art is code (SVG, procedural geometry, canvas-painted textures).
- Rendering: GitHub Actions ubuntu-latest with --gl=swiftshader (software WebGL). VO (owner-locked) is timing master.
- Docs: docs/ART_DIRECTION_BIBLE.md, docs/CAMERA_PLAN.md, docs/CHARACTER_RIG_DOCUMENTATION.md, docs/ENVIRONMENT_BIBLE.md, docs/PROP_BIBLE.md, docs/SCENE_BREAKDOWN.md, docs/ANIMATION_PLAN.md, docs/QUALITY_CONTROL_REPORT.md, docs/RENDER_REPORT.md, docs/STRICT-RULES.md.
