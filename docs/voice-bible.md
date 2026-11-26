# Voice Bible — ✅ APPROVED & LOCKED (owner selections)

## Rules (master prompt §5)

- Owner selects every character voice. Selected = approved; skipped = rejected (a NEW option is generated; silence is never approval).
- After approval, the voice ID is locked here and never replaced without asking.
- Bengali VO audio is the timing master for the whole timeline.

## Approval history

| Round | Outcome |
|---|---|
| Round 1 (10 auditions, index 0) | Owner REJECTED all candidates as robotic/cheap-sounding → replaced entirely |
| Round 2 (10 auditions, conversational/emotional scripts, index 1) | Owner SELECTED 9 roles |
| Round 3 (2 auditions, index 0/2) | Owner SELECTED Champa + Food Officer |
| Round 4 (1 audition, index 2) | Owner SELECTED Soumen (missed in round 2 due to per-turn limit) |

## 🔒 Locked voices (owner-selected, never replace without asking)

| Role | Character | Voice ID | Language | Status |
|---|---|---|---|---|
| Narrator | — | `voice-10` | bn | ✅ owner-selected (round 2) |
| C01 | Bolai | `voice-11` | bn | ✅ owner-selected (round 2) |
| C02 | Champa | `voice-20` | bn | ✅ owner-selected (round 3) |
| C03 | Subol | `voice-15` | bn | ✅ owner-selected (round 2) |
| C04 | Tapan | `voice-14` | bn | ✅ owner-selected (round 2) |
| C05 | Fatik | `voice-13` | bn | ✅ owner-selected (round 2) |
| C06 | Soumen | `voice-22` | bn | ✅ owner-selected (round 4) |
| C07 | Bhavesh Kaka | `voice-16` | bn | ✅ owner-selected (round 2) |
| C08 | Prabhat Moshai | `voice-19` | bn | ✅ owner-selected (round 2) |
| C09 | Raybabu | `voice-17` | bn | ✅ owner-selected (round 2) |
| C10 | Daroga Babu | `voice-18` | bn | ✅ owner-selected (round 2) |
| C11 | Food Officer | `voice-21` | bn | ✅ owner-selected (round 3) |

Code mirror: `src/config/voices.ts`. Ceremony guest crowd voices (S11_SH62–64) will be auditioned separately if distinct guest voices are needed; default = Narrator-side crowd handling.

## Delivery notes

- Audition scripts used each character's own scripted lines with emotional peaks (begging, anger, fear, cunning) so the owner judged real acting range, not flat narration.
- Emotional delivery targets per character follow the storyboard expression library (e.g., Bolai: confident → greedy → trembling; Tapan: frightened whisper → determined truth-telling).
- Final dialogue timing uses the generated VO per line as the master; frame ranges and the SRT regenerate after the full VO pass.
