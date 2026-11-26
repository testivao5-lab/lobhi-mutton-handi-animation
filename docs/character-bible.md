# Character Design Bible — Design Lock (storyboard Part 2)

Designs are locked. Any change (including costume changes required by the story) requires owner approval before implementation.

## Status

| Character | Design sheet | Approval |
|---|---|---|
| C01 Bolai | v1 (`public/characters/design/bolai-model-sheet-v1.png`) | ✅ **OWNER-APPROVED — LOCKED** |
| C02 Champa | v1 (`public/characters/design/champa-model-sheet-v1.png`) | ✅ **OWNER-APPROVED — LOCKED** |
| C05 Fatik | v1 (`public/characters/design/fatik-model-sheet-v1.png`) | ✅ **OWNER-APPROVED — LOCKED** |
| C03 Subol, C04 Tapan, C06 Soumen, C07 Bhavesh, C08 Prabhat, C09 Raybabu, C10 Daroga, C11 Food Officer, crowd variants | to be presented next round | ⏳ pending |

Note (known sheet artifact, recorded for honesty): Bolai v1's expression-row heads show grey-ish hair in some tiles; the lock is the front/side/three-quarter/back views + palette. Rigs (src/components/characters/Bolai.tsx) use black hair per the approved views.

## Locked specifications

| ID | Character | Key locks |
|---|---|---|
| C01 | বলাই Bolai | 38–42, slight belly, warm brown skin, round face, large eyes, thick black moustache, short black hair combed back; mustard-yellow half-sleeve shirt, off-white dhoti, red-checked gamcha (one shoulder), brown sandals. Expressions: happy, proud, greedy smirk, angry, suspicious, nervous, shocked, crying, regretful, humble. |
| C02 | চম্পা Champa | 34–38, oval face, large eyes, black bun; green saree with red border, red blouse, red bindi, bangles, small earrings. Expressions: normal, curious, worried, disappointed, angry, sad, supportive smile. |
| C03 | সুবল Subol | ~35, slim-medium, thin moustache; light blue shirt, dark brown trousers, white neck towel, simple sandals. Honest, calm. |
| C04 | তপন Tapan | ~23, slim, dark brown skin, messy black hair, clean-shaven; light green shirt, dark trousers, small waist towel. Confused / worried / frightened / restrained anger / determined. |
| C05 | ফটিক Fatik | 42–45, broad stocky, thick moustache, unkempt hair, narrow cunning eyes; dark green shirt, brown trousers, dark red neck gamcha, worn sandals. Slow deliberate gestures, head tilt, money-rubbing, side glances. |
| C06 | সৌমেন Soumen | 35–40, average, cream shirt, dark trousers, friendly face. |
| C07 | ভবেশ কাকা Bhavesh | 60–65, slightly bent, grey hair/moustache, white dhoti, light brown panjabi. |
| C08 | প্রভাত মশাই Prabhat | 55–60, grey hair, small spectacles, white panjabi + white dhoti, calm authoritative. |
| C09 | রায়বাবু Raybabu | 45–50, neat black hair, trimmed moustache, cream panjabi, maroon waistcoat, expensive watch. |
| C10 | দারোগা বাবু Daroga | Middle-aged, khaki uniform + cap, thick moustache, stern, brown belt. |
| C11 | খাদ্য আধিকারিক Food Officer | White/light blue formal shirt, dark trousers, ID card, white inspection gloves. |
| CROWD | Village customers A/B, elderly, female, young, ceremony guests, 2 children | Reusable variants; never duplicated identically in the same frame. |

## Rig rules

- Rigs are SVG components in `src/components/characters/`, parameterized by `Expression` and `MouthShape` (see `CharacterRig.tsx`).
- Palettes are locked in `CHARACTER_PALETTES` — code must read from there, never hardcode colors.
- Idle animation: breathing + irregular blinks + slight head movement, unique per character (never identical loops).
