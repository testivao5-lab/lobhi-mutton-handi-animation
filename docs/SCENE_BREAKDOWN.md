# SCENE BREAKDOWN (maps canonical 90-shot DB → SKILL-style scene modules)

Canonical: `src/data/shots.part1/2.json` + `shots.ts` (90 shots, 15 scenes, 810s = 19,440 frames).
Acts: Intro 0:00-1:30, Act1-6 → 13:30 (extend S15_SH87/S15_SH90 for moral narration if VO runs long; never cut dialogue).

| Scene | Location (bible) | Shots | Key env kit | Status |
|---|---|---|---|---|
| S1 Intro village | B01 market | SH01-06 | stalls, lamps, far row | StyleTest proves style; module next |
| S2 Restaurant intro | B02 handi house | SH07-12 | facade, counter, handis | next |
| S3 Greed seeds | B02 interior | SH13-18 | counter, shelves, stove | pending |
| S4 cheap tactics | B02 interior/kitchen | SH13-24 | cooking area, adulteration props | pending |
| S5 customers sicken | B02 + home | SH25-36 | tables, chairs, home room | pending |
| S6 ceremony ruin | B05 tent | SH37-48 | feast setup | pending |
| S7 Tapan coerced | B02 | SH49-56 | office corner | pending |
| S8 Raybabu humiliated | B01/B02 | SH57-64 | — | pending |
| S9 officer visit | B02 | SH65-72 | display counter, ladle | pending |
| S10 test fail | B02/B08 office | SH73-78 | — | pending |
| S11 exposure | B07 square | SH79-84 | crowd | pending |
| S12 community harm | B01/B05 | SH85-86 | sick customers | pending |
| S13 trust lost | B07 | SH85-88 | — | pending |
| S14 consequence | B02 closed | SH89 | facade + notice | pending |
| S15 moral | B07 night | SH90 | lamp light, narrator | extended to fit narration |

Per-scene module contract: SceneID, start/end frame, location, cast, props, camera plan rows, animation plan,
audio refs, visual events, QC status — declared in each scene file header + PRODUCTION_MANIFEST.json.
