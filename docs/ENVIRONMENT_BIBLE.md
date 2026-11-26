# ENVIRONMENT BIBLE (procedural 3D worlds — `src/three/worlds.ts` + `src/three/kit.ts`)

All locations live in ONE scene at x-offsets (SKILL D) so the camera can travel and
light/fog switch per location. Painted flat colours with procedural wear. NO cardboard
side-on buildings: every facade is extruded (depth 1.6-2.2) with real window reveals,
sills, panelled doors, cornices, awnings, chimneys.

## B01 — Village market street (x -20 … 0)
- Mud ground + central road strip (z 2.6), 3 stalls (fruit x-14.5, fish x-7.5, sweets x-0.5)
- Back wall row z-6.4; far building row z-12.5 (5 extruded blocks, fog-softened)
- Lamps x-11.2/x3.4/x16.4; barrels, crates, rice sacks
- Fog `#f7c268` 26→88; ground mud `#d9b478`

## B02 — মটন হান্ডি হাউস restaurant (x 4 … 16) — SPECIAL ATTENTION
- Facade w11 h6.2 d2.2 cream plaster; signboard canvas text; 2 windows w/ reveals+sills;
  panelled door (opens 0.5 rad in test); awning over door; cornice; chimney
- Street food counter (glass case + 3 handis) x13.9; hero steaming handi x15.4
- Interior: warm glow through door; full interior (tables, cooking area) built in scene work

## Pending locations (per 90-shot DB): B03 river ghat, B04 Bolai home interior,
B05 ceremony tent, B06 Daroga station, B07 village square, B08 officer office, B09 night street.
Each gets: facade/room builder reuse, own fog colour, own light rig temperature.
