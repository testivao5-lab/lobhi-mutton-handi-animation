#!/usr/bin/env python3
"""Generate the draft Bengali SRT + shot index from the central shot database.

Timing source: storyboard estimates. Once the recorded Bengali voice-over
exists, re-run with measured durations — the VO audio is the timing master
(storyboard Part 7). The SRT is a SEPARATE deliverable; subtitles are never
burned into the final MP4.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
CHARS_PER_SECOND = 14.0
MAX_LINE = 46


def load_shots():
    shots = []
    for p in ("src/data/shots.part1.json", "src/data/shots.part2.json"):
        data = json.loads((ROOT / p).read_text(encoding="utf-8"))
        shots.extend(data["shots"])
    return shots


def fmt(ts: float) -> str:
    ms = int(round(ts * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def wrap2(text: str) -> str:
    if len(text) <= MAX_LINE:
        return text
    mid = len(text) // 2
    best = None
    for delta in range(mid):
        for i in (mid - delta, mid + delta):
            if 0 < i < len(text) and text[i] in " \u0964,!?-\u2014":
                best = i
                break
        if best is not None:
            break
    if best is None:
        best = mid
    return text[:best].strip() + "\n" + text[best:].strip()


def main():
    shots = load_shots()
    subs = []
    for shot in shots:
        span = shot["end"] - shot["start"]
        lines = list(shot.get("dlg") or [])
        if shot.get("nar"):
            lines.append({"sp": "NAR", "t": shot["nar"]})
        if not lines:
            continue
        weights = [max(len(l["t"]), 10) for l in lines]
        total = sum(weights)
        cursor = shot["start"] + 0.25
        for line, w in zip(lines, weights):
            est = max(1.0, len(line["t"]) / CHARS_PER_SECOND)
            dur = min(max((span - 0.5) * w / total, 0.8), est)
            dur = max(dur, 0.8)
            subs.append((cursor, cursor + dur, line["sp"], line["t"]))
            cursor += dur

    out = ROOT / "subtitles" / "lobhi-mutton-handi-bengali.srt"
    out.parent.mkdir(exist_ok=True)
    blocks = [f"{i}\n{fmt(a)} --> {fmt(b)}\n{wrap2(t)}\n" for i, (a, b, _sp, t) in enumerate(subs, 1)]
    out.write_text("\n".join(blocks), encoding="utf-8")
    print(f"Wrote {len(subs)} subtitle cues -> {out.relative_to(ROOT)}")

    idx = ["# Shot Index (auto-generated from shot database — do not edit by hand)", "",
           "| Shot | Scene | Time | Location | Dialogue / narration (truncated) |",
           "|---|---|---|---|---|"]
    for s in shots:
        pieces = [l["t"][:28] + ("\u2026" if len(l["t"]) > 28 else "") for l in (s.get("dlg") or [])]
        if s.get("nar"):
            pieces.append("NAR: " + s["nar"][:28] + "\u2026")
        idx.append(f"| {s['id']} | {s['scene']} | {s['start']}-{s['end']}s | {s['loc']} | {' / '.join(pieces)} |")
    (ROOT / "docs" / "shot-index.md").write_text("\n".join(idx) + "\n", encoding="utf-8")
    print(f"Wrote shot index ({len(shots)} shots) -> docs/shot-index.md")


if __name__ == "__main__":
    main()
