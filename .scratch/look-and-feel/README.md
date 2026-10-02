# Look and feel: why the site still doesn't feel right

Status: ready-for-agent (owner chose B on 2026-10-02)

## What the owner said

"รู้สึกยังไม่ถูกใจ" without knowing why. In a grilling session (2026-10-02) the cause narrowed down:
- the whole site, not one page;
- at first glance, while moving through it, and while reading;
- "เรียบร้อยแต่จืด, ค่อนข้างแออัด, เหมือนเอา element มาแปะๆ บนแผ่นกระดาษให้ทั่วๆ".

The target feel is Airbnb + Headspace. It is judged by the pitch's judges first, then by Newcomers on phones.

## Decisions

- **Q6, theme:** move on from the transit map. B "ใต้ร่มจามจุรี" won over A (the transit map as a trace, no boxes).
- **Q7, pictures:** illustration first; real photos only on Place cards.
- **Q8, density:** one thing stands out on each screen; secondary text is quieter. The ADR 0001 price label stays.
- **Q9, colour:** cream ground, softer category colours at 4.5:1 or more.
- **Q10, type:** Mitr for headings, IBM Plex Sans Thai Looped for text.
- **Q11, motion:** soft and small, off for reduced motion.
- **Q12, process:** prototype first.
- **Q13, cards:** may be used site-wide.
- **Q14:** B is the canopy.
- **Q15:** scenery drawn as SVG; people from Open Peeps (CC0).
- **Q16:** the prototype covered home, Guide and Feed (plus the checklist and the Guides list).
- **Q17:** the tagline is unchanged.

Recorded in docs/adr/0007.

## Prototype

- Branch: `prototype/look-and-feel` (commit f1a41e0).
- Build with `NEXT_PUBLIC_PROTOTYPE=1` and switch looks with `?look=O|A|B` or the ←/→ keys.
- Screenshots were sent to the owner in the session.

Verdict: B. Fold it into the real code properly; don't copy the prototype CSS as is.
