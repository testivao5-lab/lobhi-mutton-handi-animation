# RENDER REPORT (cloud-only; GitHub Actions ubuntu-latest)

| Run | Composition | Result | Time | Notes |
|---|---|---|---|---|
| 45783644499 | TestClip v1 | ✅ | ~60s | SVG previz |
| 45784814064 | TestClip v2 | ✅ | ~60s | SVG previz |
| 45786988312 | TestClip v3 | ❌ | — | missing sprite (fixed d873be4) |
| 45787323971 | TestClip v3 | ✅ | ~90s | AI-painted (purged later) |
| 45796850300 | TestClip v4 | ✅ | ~90s | pure-code 2D |
| (this dispatch) | StyleTest v5 | ⏳ | TBD | FIRST three.js software-WebGL render → benchmark |

## Runner compute facts (honest, ADDENDUM §8H)
- ubuntu-latest: 4 vCPU, 16 GB RAM, NO GPU. WebGL via SwiftShader (software).
- Benchmark from StyleTest v5 run to be recorded here (s/frame at 1080p) → drives chunking strategy
  for the 19,440-frame film (target: matrix-parallel scene chunks, npm cache, artifacts).
