# CHARACTER RIG DOCUMENTATION (Char2D — src/components/characters/Char2D.tsx)

## Construction (skill house style, adapted to cast)
Flat shapes + hand-drawn ink band #351f22 (strokeW 4.2 base, deterministic jitter):
- **Head**: large rounded circle r30 (viewBox 200×330), skin per cast; hair fringe mass shifts with yaw.
- **Eyes**: calm half-lidded default (lid 0.42), blink cycle (f+seed*3)%103<4; wide/shocked variant.
- **Mouth**: small; visemes talkWide/talkMid/closed for dialogue; expression takes.
- **Torso**: pear-shaped two-tone (top colour + lower band), pocket patch, kurta/shirt/saree collar variants.
- **Limbs**: thin tapered 2-segment (upper/lower) with knee/elbow bend; dark disc hands (r6.8 #3a2a20).
- **Headwear**: gamcha/turban/cap/tophat/none. **Glasses** optional. **Belly** variant. **Female drape**.

## Anatomy contract (ADDENDUM §2)
- Joint hierarchy: hip→knee→ankle→foot-disc; shoulder→elbow→hand-disc (rotations from parent pivot only).
- Exactly 2 arms + 2 legs + 1 head on neck; no duplicated/disconnected parts; far limbs shade-shifted.
- Walk: thigh swing ±24° (sin p / sin p+π), knee bend max(0, sin(p+2.2))*30°, foot discs at ground line y≈299.
- Yaw clamp ±0.7 rad; face feature offset fx = turn*7; head squash 1-|turn|*0.12.
- Ground contact: 3D anchor Object3D at y=0 + contactShadow blob; feet projected per frame (no float).

## Cast palette table (locked attributes → code spec)
Bolai mustard kurta/cream dhoti/red gamcha/thick moustache/belly · Champa green saree red border ·
Subol blue kurta · Tapan grey shirt+glasses · Fatik dark-green kurta/maroon gamcha/stocky ·
Soumen child ochre kurta · Bhavesh turban elder · Prabhat violet kurta+glasses · Raybabu white coat+tophat ·
Daroga khaki uniform+cap · Food Officer light uniform+cap · Narrator dark kurta.

## Design package plan (ADDENDUM §3 — code-rendered sheets, before full production)
front / 3-4 / side(profile variant) / back-3-4 / back / expression sheet / mouth sheet / pose sheet /
height comparison / palette ref / rig joints — rendered via `character-previews.yml` as stills → contact sheet → owner gate.
