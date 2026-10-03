# Thai lines break only at spaces

Status: ready-for-agent

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
