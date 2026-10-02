Status: done (2026-10-02) for everything below except "needs owner"

# UX/UI audit 7: three lenses, then re-audits until good

Round 1 had three auditors working in parallel. Their reports are kept beside this file:
- visual design and hierarchy: `ux-audit-7-visual.md`, V1–V15
- task flows and Thai copy: `ux-audit-7-flows.md`, U1–U14
- accessibility and responsive layout: `ux-audit-7-a11y.md`, A1–A4

Rounds 2 and 3 were fresh auditors checking the live build against the earlier findings and looking for regressions. Round 2 found R1–R10 and round 3 found N1–N7. A final pass then verified the round-3 fixes.

## What changed

- **Logo:** the wordmark's mark is a rain-tree leaf, and the favicon uses the same leaf (ADR 0007).
- **Look:**
  - The canopy is cropped rather than stretched, and grows at 64rem and wider.
  - Buttons use the canopy green (`--action`).
  - Seniors stories, the help block and the forms are cards.
  - The map list uses a dotted path and small price pills.
  - The welcome note is sunny.
  - Emergency options are drawn in the caution colour.
  - Each page has its own set of people (`s*`, `c*` in `public/people`).
- **Laptop and projector:** the Guides list and Notes use two columns, and the first week has its progress sticky on the left. The wordmark sits in the same place on every page.
- **First week:**
  - It starts with getting into Chula (`to-chula`).
  - A ticked station shows a ✓ and no strikethrough.
  - A finished week turns into a sunny card with two next steps.
  - After ticking a Guide, its one "next" card is the next station.
- **Flows:**
  - `/contribute` is reachable from a Place card (the place is pre-selected), from Seniors and from the footer.
  - The Note flow keeps its category.
  - Forms say what happens, and errors take focus.
  - A price's maximum can't be less than its minimum.
- **Thai text:** word joiners keep names and compounds whole (ลิ⁠โด้, ศาลา⁠พระ⁠เกี้ยว, สาม⁠ย่าน…).

## Needs owner

- U8: how a Newcomer reaches a Senior. Options are a "ถามรุ่นพี่" Note, or a voluntary contact such as the team's LINE OA.
- U2: pins for the ชวนชม first-aid room and the late pharmacy (B&W Drugs, ซอยจุฬาฯ 16). The coordinates must be checked on site.
- U7: canteen Places (iCanteen, the อาคารมหิตลาธิเบศร canteen), with coordinates.
- U9: a team contact to add to "พิมพ์ผิด บอกทีมที่…".
- U12: Guide prices (Rabbit, canteen) can't be checked from the form yet.
