"""Assemble RENTO_PRODUCT_DESIGN_STANDARD.md from approved chapter transcript."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPT = Path(
    r"C:\Users\Александр\.cursor\projects\c-Users-Desktop-Projects-rento\agent-transcripts"
    r"\fa30ca56-3729-4a28-88e1-949875c1299e\fa30ca56-3729-4a28-88e1-949875c1299e.jsonl"
)
OUT_DIR = ROOT / "docs" / "design"
OUT_FILE = OUT_DIR / "RENTO_PRODUCT_DESIGN_STANDARD.md"


def load_chapters() -> dict[int, str]:
    chapters: dict[int, str] = {}
    for line in TRANSCRIPT.open(encoding="utf-8"):
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        if obj.get("role") != "assistant":
            continue
        content = obj.get("message", {}).get("content", [])
        if not content:
            continue
        text = content[0].get("text", "") if isinstance(content[0], dict) else ""
        if not text.startswith("# RENTO PRODUCT DESIGN STANDARD v1.0"):
            continue
        match = re.search(r"## Chapter (\d+) — ", text)
        if not match:
            continue
        chapters[int(match.group(1))] = text
    return chapters


def normalize_chapter(text: str, num: int) -> str:
    text = re.sub(r"^# RENTO PRODUCT DESIGN STANDARD v1\.0\s*\n+", "", text, count=1)
    text = re.sub(r"\*\*Status:\*\*[^\n]*", "**Status:** APPROVED", text, count=1)
    text = text.replace(
        "Draft for Design Council review",
        "Initial standard adoption — APPROVED",
    )
    text = text.replace(
        "Review type:** Editorial revision — approved with minor additions integrated",
        "Review type:** Editorial revision — APPROVED",
    )
    text = re.sub(
        r"\n\*Awaiting editorial review\. Chapter \d+ will not be authored until instructed\.\*\s*",
        "\n",
        text,
    )
    text = re.sub(
        r"\n---\s*\n## Editorial Integration Summary.*?(?=\n---\s*\n## Chapter |\Z)",
        "\n",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"\nAwaiting further editorial review\. Chapter \d+ will not be authored until instructed\.\s*",
        "\n",
        text,
    )
    text = text.replace("[REDACTED]", "").strip()
    return text.strip() + "\n"


FRONT_MATTER = """# RENTO PRODUCT DESIGN STANDARD

**Version:** 1.0  
**Status:** APPROVED — Official Internal Standard  
**Product:** Rento — Mobile-first long-term rental marketplace (Romania)  
**Production:** https://rentonow.ro  
**Document path:** `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`  
**Effective date:** 2026-07-03  
**Governance:** Design Council  

---

## Document Purpose

This document is the **official internal Product Design Standard** for Rento. It defines long-term product philosophy, experience principles, visual language, structure, governance, and behavioral systems that govern all present and future design decisions.

This standard is **not** implementation documentation. It does not specify code, frameworks, APIs, or visual tokens. Implementation artifacts must comply with this standard.

**Authority order:** Immutable domain rules (documented in product architecture) → this standard → pattern specifications → screen-level exceptions (Chapter 5 Exception Policy).

---

## Table of Contents

### Approved Chapters (v1.0)

| Ch. | Title | Section | Status |
|-----|-------|---------|--------|
| 1 | [Product Philosophy](#chapter-1--product-philosophy) | Foundation | APPROVED |
| 2 | [Experience Principles](#chapter-2--experience-principles) | Foundation | APPROVED |
| 3 | [Brand Experience & Visual Identity](#chapter-3--brand-experience--visual-identity) | Brand Experience | APPROVED |
| 4 | [Layout & Information Architecture](#chapter-4--layout--information-architecture) | Structure | APPROVED |
| 5 | [Product Design Decision Framework](#chapter-5--product-design-decision-framework) | Governance | APPROVED |
| 6 | [Typography & Reading System](#chapter-6--typography--reading-system) | Visual Language | APPROVED |
| 7 | [Color Meaning & Semantic Color System](#chapter-7--color-meaning--semantic-color-system) | Visual Language | APPROVED |
| 8 | [Spatial System & Layout Rhythm](#chapter-8--spatial-system--layout-rhythm) | Visual Language | APPROVED |
| 9 | [Motion & Interaction System](#chapter-9--motion--interaction-system) | Motion & Interaction | APPROVED |
| 10 | [Navigation System](#chapter-10--navigation-system) | Navigation | APPROVED |
| 11 | [Component Philosophy & Component System](#chapter-11--component-philosophy--component-system) | Design System | APPROVED |
| 12 | [Form System & Data Collection Experience](#chapter-12--form-system--data-collection-experience) | Forms & Data Collection | APPROVED |

### Planned (not yet authored)

| Ch. | Title |
|-----|-------|
| 13+ | Future chapters per design standard roadmap (e.g., Search Experience System) |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-03 | Initial consolidation — Chapters 1–12 approved and assembled |

---

"""


def main() -> None:
    chapters = load_chapters()
    if len(chapters) != 12:
        raise SystemExit(f"Expected 12 chapters, got {len(chapters)}")

    parts = [
        FRONT_MATTER,
        "---\n\n# RENTO PRODUCT DESIGN STANDARD v1.0 — Approved Chapters\n\n",
    ]
    for num in range(1, 13):
        parts.append(normalize_chapter(chapters[num], num))
        if num < 12:
            parts.append("\n\n---\n\n")

    document = "".join(parts).rstrip() + "\n"
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(document, encoding="utf-8")
    print(f"Written: {OUT_FILE}")
    print(f"Size: {OUT_FILE.stat().st_size} bytes")
    print(f"Lines: {len(document.splitlines())}")


if __name__ == "__main__":
    main()
