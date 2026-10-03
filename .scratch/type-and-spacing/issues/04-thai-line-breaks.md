# Thai lines break only at spaces

Status: done

The browser breaks Thai between any two dictionary words, so lines split phrases ("กินเซเว่น ┃ เยอะ", "ยัง ┃ ไง"). The owner wants a line to break only at a space (`../spec.md`, Q17–Q19, Q21, Q22; docs/adr/0007's type and spacing amendment). The prototype did it on the client by editing text nodes (`git show 458cc8f:components/prototype/PhraseWrap.tsx`); the real version joins when text is rendered.

## What it does

- A helper in lib/ (e.g. `lib/thaiBreaks.ts`, `keepPhrases(text: string): string`) that, inside each whitespace-separated phrase, puts a word joiner (U+2060) before every character a Thai word can start with: consonants and ฯ (U+0E01–U+0E2F), leading vowels (U+0E40–U+0E44), ๆ (U+0E46) and Thai digits (U+0E50–U+0E59), only when the character before it is Thai. Never before a combining mark (U+0E31, U+0E34–U+0E3A, U+0E47–U+0E4E) or ำ, so no vowel or tone mark is pulled off its consonant.
- A phrase of more than 24 letters (Thai base characters plus Latin letters and digits) is left breakable between words, so it neither overflows nor breaks mid-word. Inside those, words from one list are still kept whole (Q22): start with แพ็กเกจ, มหิตลาธิเบศร, ใบอนุญาต, ศาลาพระเกี้ยว, สามย่าน, สามย่านมิตรทาวน์, จามจุรีสแควร์, and whatever a scan (below) turns up. One list, in the helper's file, with a comment saying how to add to it.
- Idempotent: joiners already in the text (content/guides.ts has hand-placed U+2060) are stripped first, then placed again. Remove the hand-placed U+2060 from content/guides.ts and its "keep them when editing" comment; keep U+00A0 (e.g. "สาย 1").
- Applied **only where text is shown**: every component that renders prose or titles (NoteCard, SeniorStory, GuideBlock and the Guide page's lede, the Guides list, WeekRoute, PlaceDetail and the map list, PageHead's lede, the help links, the forms' hints and status notes, the footer's fine print). Never in stored or sent text: not in content/ or the Sheet, not in form `value`s, hidden inputs, `href`s, ids, metadata (`<title>`, description), or anything compared or posted back. Comparisons (a Starter Checklist stop's title against a Guide's title) stay on the raw strings.
- Copying gives plain text back: a small client listener on `copy` strips U+2060 from the selection (mounted once in app/layout.tsx).
- Short titles balance (`text-wrap: balance`): the Starter Checklist stops, the Guides list titles, the map list's Place names, a Place card's Guide links and a step's action line (headings already do).
- `.lede`'s `text-wrap: pretty` and its comment ("balance on a paragraph breaks Thai words more often") no longer apply; drop or rewrite them.

## How to check

- The prototype's scan (19 pages at 390px and 1440px; flag a line break between two Thai letters, or a last line of 6 letters or fewer, after stripping U+2060) found 108 with today's breaks and 22 with phrases, all 22 in phrases over 24 letters. Re-run something like it (Playwright; Chromium is at /opt/pw-browsers) and use what it finds in long phrases to extend the word list.
- Find in page (Ctrl+F) still finds a word inside a joined phrase; if it doesn't in Chromium, say so in Comments rather than working around it.
- Screen readers: VoiceOver/NVDA ignore U+2060; no extra pauses (check one page with the Chromium accessibility tree: names have no U+2060 issue).

## Done when

- The scan's count with the real code is at or below the prototype's 22, and none of the remaining ones splits a word in the list.
- Posting a Note and a contribute form stores text without U+2060 (check the action's payload).
- `npm run typecheck` and `npm run build` pass.

## Comments

Done (2026-10-03).

**How it works.** `lib/thaiBreaks.ts`: `keepPhrases(text)` strips any joiners, splits at breakable whitespace (U+00A0 stays inside a phrase, so "สาย 1" is one), and inside each phrase of up to 24 letters puts U+2060 before every Thai word start after a Thai character, and after a dash or slash ("จันทร์–เสาร์", "7:00–19:00"; this replaces the hand-placed joiners around en dashes). A longer phrase only keeps the words in `KEEP_WHOLE` whole, and puts a zero-width space (U+200B) at each Thai edge of such a word: a joiner cuts the browser's dictionary run, and a run ending in half a word broke mid-word ("…สูงกว่าต่า" gave "สู┃งกว่า", "…ของมหา" gave "ขอ┃ง"). `stripJoiners` removes both. Used at render in every component listed above; `TelText` joins after its split, so numbers are still found and dialled as written; `PageHead` joins a string title or lede itself. Raw strings stay for keys, hrefs, ids, aria-labels, metadata, form values and the checklist/Guide title comparison. `components/PlainCopy.tsx` (mounted in app/layout.tsx) strips them on copy. The two `actions.ts` files strip them from what is posted too, in case pasted text keeps them. The hand-placed U+2060 are gone from content/ (guides.ts, and places.ts and seniors.ts too); this also fixes the Commons file name of the Samyan Mitrtown photo, which had picked one up. Short titles balance (one block next to `h1, h2, h3` in globals.css). `.lede` keeps `text-wrap: pretty` with a new comment: now that a lede breaks only at spaces, pretty keeps a short last phrase off a line of its own (it took the scan from 23 to 22).

**Word list:** แพ็กเกจ, มหิตลาธิเบศร, ใบอนุญาต, ศาลาพระเกี้ยว, สามย่าน, สามย่านมิตรทาวน์, จามจุรีสแควร์, plus from the scan: อาคาร, มหาลัย, ต่างจังหวัด, ส่วนต่าง, ข้าวราดแกง, โรงพยาบาล, โรงเรียนแพทย์, ผู้ให้บริการ, รูปคลื่นแตะจ่าย. "ไม่ได้" stays out: it also starts "ไม่ได้ยิน", and the zero-width space would allow "ไม่ได้┃ยิน".

**Scan** (the prototype's, on `next dev`, 19 pages at 390 and 1440, joiners and zero-width spaces stripped before checking):
- With the prototype's type (font D, the new scale and spacing, injected from 458cc8f's CSS, since tickets 01–03 aren't in yet): 108 before, **22** after.
- With today's type (Plex Looped and Mitr, the old scale): 132 before, 34 after.
- None of the remaining ones splits a word in the list. Each is a break between words in a phrase over 24 letters, or a short last line at a space ("จุฬาฯ ┃ ยังไง", "โทร ┃ 1669", "นั่ง ┃ BTS"). Run it again once 01–03 land.

**Checked:** copying the Seniors lede gives plain text. The price form and a Note post nothing with U+2060/U+200B (the request payload). `npm run typecheck`, `npm run build`. No hydration warnings.

**Find in page:** Ctrl+F itself (browser UI) couldn't be driven. `window.find` in headed Chromium (under Xvfb) finds "เซเว่น", "เยอะมาก", "พระเกี้ยว" and "สามย่าน" inside joined phrases, and across U+200B. Headless shell's `window.find` finds nothing, not even Latin text, so it can't tell.

**Screen readers, open:** Chromium's accessibility tree keeps U+2060 in names (65 of 121 Thai names on /guides/pop-bus, e.g. the heading "ขึ้นรถป๊อป"). VoiceOver and NVDA should skip it, since it is default-ignorable, but they couldn't be run here. One check with VoiceOver on a phone would settle it.

**Left as is:** a phrase split across elements still breaks at the element edge: "โน้ตที่" + the Place's name in the Feed's title, and "เริ่มจาก<b>สัปดาห์แรก</b>ก่อนก็ได้" on the map.
