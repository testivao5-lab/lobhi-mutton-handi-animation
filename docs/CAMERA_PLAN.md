# CAMERA PLAN

## System
- Master timeline: Remotion `useCurrentFrame()` → `world.tick(f)` sets camera pose per frame.
- Paths: key arrays + beat times; monotone cubic warp `warpU()` → zero-speed endpoints, no straight blending, ~no wobble.
- Movement mix target: ~1/2 push-pull, ~1/3 crane, ~1/5 sideways track. Net travel EVERY shot.
- Never clip walls/props; keep faces visible; end at rest; reach subjects when the VO names them (word-proportional beats).

## StyleTest v5 (run in this dispatch) — 12s proof
| Seg | Frames | Move | Pos start→end | Look start→end | FG / MG / BG |
|---|---|---|---|---|---|
| S1 | 0-95 | sideways track (with walk) | (-17.5,2.7,9.5)→(-6.5,2.5,8.2) | (-12.5,1.5,-1)→(-3.5,1.6,-1.2) | lamp+barrel / Bolai walking+stalls / far row+fog |
| S2 | 96-178 | push | (-6.5,2.5,8.2)→(4.2,3.6,8.0) | →(6.5,2.0,-1) | crates / Bolai arrives / restaurant emerging |
| S3 | 179-244 | crane up+push | (4.2,3.6,8.0)→(11.6,2.7,6.4) | →(12.2,1.8,0.2) | hero handi / counter+Fatik / facade+chimney |
| S4 | 245-287 | crane down settle | (11.6,2.7,6.4)→(12.4,2.35,5.0) | →(12.0,1.55,0.4) | counter corner / Bolai proud+talking / signboard |

## Film-scale plan (90 shots / 15 scenes)
Every shot row gets: shot#, t_start/t_end (from sentence_times CUTS), location, cam start/end, move type,
speed, look-at, FG/MG/BG, character positions, visual event. Table fills as scene modules are built;
word-tied events confirmed against `sentence_times.json` before scene lock.
