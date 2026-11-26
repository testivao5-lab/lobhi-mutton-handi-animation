#!/usr/bin/env python3
"""Structural validation of the shot database — QC gate 1 (runs on every push)."""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
errors: list[str] = []

shots = []
for p in ("src/data/shots.part1.json", "src/data/shots.part2.json"):
    try:
        data = json.loads((ROOT / p).read_text(encoding="utf-8"))
        shots.extend(data["shots"])
    except Exception as e:  # noqa: BLE001
        errors.append(f"{p}: {e}")

if len(shots) != 90:
    errors.append(f"expected 90 shots, found {len(shots)}")

ids = [s.get("id") for s in shots]
if len(set(ids)) != len(ids):
    errors.append("duplicate shot ids")

for i, s in enumerate(shots):
    sid = s.get("id", f"#{i}")
    if s.get("end", 0) <= s.get("start", 0):
        errors.append(f"{sid}: end <= start")
    if s.get("start") != round(s.get("start", 0)) or s.get("end") != round(s.get("end", 0)):
        errors.append(f"{sid}: non-integer seconds")

scene_of: dict[int, list[dict]] = {}
for s in shots:
    scene_of.setdefault(s["scene"], []).append(s)
for sc, group in sorted(scene_of.items()):
    group = sorted(group, key=lambda x: x["start"])
    for a, b in zip(group, group[1:]):
        if a["end"] != b["start"]:
            errors.append(f"scene {sc}: gap/overlap between {a['id']} and {b['id']}")
    if group[0]["start"] * 24 % 1 != 0:
        errors.append(f"scene {sc}: non-frame-aligned start")

# Known dialogue sanity: these storyboard shots must carry dialogue/narration.
must_speak = [
    "S01_SH03", "S01_SH04", "S01_SH05", "S01_SH06", "S01_SH07",
    "S02_SH10", "S03_SH11", "S03_SH12", "S03_SH13", "S03_SH14",
    "S04_SH15", "S04_SH16", "S04_SH17", "S04_SH18", "S04_SH19", "S04_SH20",
    "S05_SH21", "S05_SH22", "S05_SH24", "S05_SH25", "S05_SH26", "S05_SH27",
    "S06_SH28", "S06_SH30", "S06_SH31", "S06_SH32", "S06_SH33", "S06_SH34",
    "S07_SH35", "S07_SH36", "S07_SH38", "S07_SH39", "S07_SH40", "S07_SH41", "S07_SH42",
    "S08_SH44", "S08_SH45",
    "S09_SH47", "S09_SH48", "S09_SH49", "S09_SH50", "S09_SH51",
    "S10_SH53", "S10_SH54", "S10_SH55", "S10_SH56", "S10_SH57",
    "S11_SH60", "S11_SH62", "S11_SH63", "S11_SH64", "S11_SH65",
    "S12_SH66", "S12_SH67", "S12_SH69", "S12_SH70", "S12_SH72",
    "S13_SH74", "S13_SH75", "S13_SH76", "S13_SH77", "S13_SH78",
    "S14_SH79", "S14_SH80", "S14_SH81",
    "S15_SH84", "S15_SH85", "S15_SH86", "S15_SH87", "S15_SH88", "S15_SH89", "S15_SH90",
]
have = {s["id"] for s in shots if s.get("dlg") or s.get("nar")}
for sid in must_speak:
    if sid not in have:
        errors.append(f"{sid}: storyboard requires dialogue/narration but none found")

total = (shots[-1]["end"] - shots[0]["start"]) if shots else 0
print(f"shots: {len(shots)} | total storyboard span: {total}s ({total / 60:.1f} min)")
if errors:
    print("ERRORS:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("Shot database OK.")
