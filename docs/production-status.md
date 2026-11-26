# Production Status — লোভী মটন হান্ডি ওয়ালা

_Updated: 2026-11-26. This file is the execution report (master prompt §19). It is updated after every stage and never claims unverified work._

## Milestones

| # | Milestone | Status | Notes |
|---|-----------|--------|-------|
| 1 | GitHub repo + Actions pipeline | ✅ DONE | `testivao5-lab/lobhi-mutton-handi-animation`, public, workflows: validate / preview-render / scene-render / final-assembly |
| 2 | Story & scene breakdown (90 shots) | ✅ DONE | `src/data/shots.part{1,2}.json` — full dialogue transcribed; storyboard-estimate timing |
| 3 | Character design concepts (leads) | ⏳ AWAITING APPROVAL | Model sheet pairs were shown; owner skipped selection — design direction being re-confirmed |
| 4 | Voice auditions | ✅ OWNER-APPROVED & LOCKED | Round 1 rejected (robotic); rounds 2–4: all 12 roles owner-selected. See docs/voice-bible.md + src/config/voices.ts |
| 5 | First animation test clip | 🔜 QUEUED | Rendered on GitHub Actions **after** design approvals |
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
