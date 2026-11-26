# RENDER REPORT (cloud-only; GitHub Actions ubuntu-latest)

| Run | Composition | Result | Time | Notes |
|---|---|---|---|---|
| 45783644499 | TestClip v1 | ✅ | ~60s | SVG previz |
| 45784814064 | TestClip v2 | ✅ | ~60s | SVG previz |
| 45786988312 | TestClip v3 | ❌ | — | missing sprite (fixed d873be4) |
| 45787323971 | TestClip v3 | ✅ | ~90s | AI-painted (purged later) |
| 45796850300 | TestClip v4 | ✅ | ~90s | pure-code 2D |
| 45803137836 | StyleTest v5 | ✅ | 510s total | FIRST three.js software-WebGL render. 288 frames @1080p ≈ **1.7 s/frame** wall incl. setup+encode (2 workers, SwiftShader). Extrapolated full film (19,440 fr): ≈ 9.2 GPU-h wall → feasible as ~15 scene-chunk matrix jobs @ ≈ 40 min each. |

## Runner compute facts (honest, ADDENDUM §8H)
- ubuntu-latest: 4 vCPU, 16 GB RAM, NO GPU. WebGL via SwiftShader (software).
- Chrome Headless Shell 158 + `--gl=swangle` + `{"enable-unsafe-swiftshader": true}` = working software-WebGL recipe (documented for all scene renders).
