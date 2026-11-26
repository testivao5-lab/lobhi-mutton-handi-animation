# Production Status — লোভী মটন হান্ডি ওয়ালা

_Updated: 2026-11-26. This file is the execution report (master prompt §19). It is updated after every stage and never claims unverified work._

## Milestones

| # | Milestone | Status | Notes |
|---|-----------|--------|-------|
| 1 | GitHub repo + Actions pipeline | ✅ DONE | `testivao5-lab/lobhi-mutton-handi-animation`, public, workflows: validate / preview-render / scene-render / final-assembly |
| 2 | Story & scene breakdown (90 shots) | ✅ DONE | `src/data/shots.part{1,2}.json` — full dialogue transcribed; storyboard-estimate timing |
| 3 | Character design concepts (leads) | ✅ OWNER-APPROVED (3/11) | Bolai, Champa, Fatik locked (v1). Remaining 8 roles + crowd next round |
| 4 | Voice auditions | ✅ OWNER-APPROVED & LOCKED | Round 1 rejected (robotic); rounds 2–4: all 12 roles owner-selected. See docs/voice-bible.md + src/config/voices.ts |
| 5 | First animation test clip | 🏗 IN PROGRESS | TestClip composition built (walk/expressions/lip-sync w/ locked Bolai voice); rendering on GitHub Actions |
| 6 | Backgrounds & props | 🔜 PENDING | After design approvals |
| 7 | Full scene production | 🔜 PENDING | After test-clip approval |
| 8 | Final assembly + QC + release | 🔜 PENDING | |

## Verified facts (not assumptions)

- Repository created via API and accessible with admin permissions ✅
- Google Drive connector authorized; backup folder structure created ✅
- Render runs ONLY on GitHub Actions `ubuntu-latest` (free standard runners). Free public-repo Linux concurrency is 20 jobs; pipeline self-caps matrix at `max-parallel: 10`. Actual runner allocation is read from job status at run time — queued jobs are never counted as running.
- No credentials are committed. A secret scan runs on every push (`validate.yml`). The personal access token used for setup lives only in the local session and must be revoked/rotated by the owner after production.

## Honest constraints

- All shot timings are **storyboard estimates**. The recorded Bengali voice-over is the timing master; frame ranges and the SRT will be regenerated once VO audio exists (storyboard Part 7 — especially S15_SH87 and S15_SH90 which must be extended).
- Subtitles are never burned into the final MP4; the SRT is a separate deliverable.
- A successful GitHub push is not a successful Drive backup — each is verified independently and recorded in `docs/backup-manifest.json`.

## 2026-11-26 — STRICT RULE ENFORCED: ZERO generative AI
- Owner decree: NO generative AI ever (visuals/assets). Remotion code-drawn art ONLY (SVG/React).
- ALL AI-generated images purged from repo (character sprites, cutouts, painted BGs, handi ECU, model sheets).
- New pipeline: `src/components/characters/BolaiV3.tsx` (parametric code-drawn Bolai: 6 expressions, walk cycle, talk visemes, blink, tears) + `src/components/scenes/CodeScenes.tsx` (market 3-layer parallax, shop interior, counter fg, handi ECU — all SVG).
- TestClip v4 rebuilt pure-code; awaiting render + owner gate.
- Owner-selected VO voices remain locked (owner personally chose them; visual AI rule does not revoke voice selections).
