# Fix what the code review found in the readable-pages change

Status: ready-for-agent

The two-axis `/code-review` of `git diff 138ccff...HEAD` on `claude/youthful-newton-2zia7g` (2026-10-03) found the items below. The decisions behind the change are in `../README.md` (Q1–Q16) and in the 2026-10-02 amendments to docs/adr/0001, 0006 and 0007. Fix all of it in one pass, then build, screenshot the map list, a Place card (phone and wide), a Guide and the Feed, and run `/code-review` again against the commit before the fixes.

## Owner's decisions (2026-10-03)

- Keep the "บอกราคา" link on a Place card whose price nobody has checked yet (components/map/PlaceDetail.tsx, the `detail-bar`). It was added without being asked; the owner keeps it, since it's how a first price comes in.
- A Guide's "อัปเดตล่าสุด" line shows the **oldest** month among its prices, not the newest, so a price never looks fresher than it is (`GuideNeedToKnow` in components/GuideBlock.tsx; today Rabbit says ต.ค. 69 though the BTS fare is from ก.ย.).
- Giving a price's unit its own field is a separate ticket (02), not this one.

## Fix

Spec:
- **No full date anywhere on a Note.** components/TimeAgo.tsx sets `title={thaiDate(iso)}`; ADR 0007 (amended) says "never a full date". Remove the title. Keep `dateTime`.
- **Counting back** (`timeAgo` in lib/format.ts): "เมื่อวาน" should mean the previous calendar day in Bangkok time (UTC+7), not 24–48 hours ago; 360–364 days should read "ปีที่แล้ว", not "12 เดือนที่แล้ว". Keep the rest of the scale (see README Q8). Check the edges with a quick script, as before.
- **Old ADR wording.** docs/adr/0001's body still gives "ตรวจ ก.ย. 69 โดยพี่บอส" as the label, and the main bullet of docs/adr/0007 still says prices show "their source in one fine line". Mark each as replaced by the 2026-10-02 amendment (a short "(replaced: see the amendment below)"), don't rewrite history.

Standards:
- **ADR status lines.** docs/adr/0007's status line doesn't mention the readable-pages amendment; docs/adr/0006's doesn't count how many times it was amended on 2026-10-02. Follow ADR 0001's form ("amended … and three times on 2026-10-02").
- **Tracker layout** (docs/agents/issue-tracker.md, triage-labels.md): rename `.scratch/readable-pages/README.md` to `spec.md` and fix any pointers to it (ADR 0007's amendment says "see `.scratch/readable-pages/`", which still holds). Its `Status: done …` isn't one of the five roles; specs here don't need a Status line, so drop it.
- **Values outside the tokens** (header of app/globals.css: "Spacing, corners, tints and type come from the tokens"). New raw values: `border-radius: 4px` (`.price-strip`, `.fact-price`), `font-size` 0.8125rem / 1.375rem / 1.75rem / 1.875rem, `width: 28px`, `min-height: 52px`. Use an existing token where one fits; where none does and the value is wanted, add a named token to `:root` with a comment, rather than a raw value.
- **One yellow price, one place.** `.price-strip` and `.fact-price` now have the same body: keep one class. `FactValue` in components/GuideBlock.tsx repeats `Price`'s pending text ("ยังไม่รู้ราคาจริง รอคนไปดู") and hidden "ราคาปกติ " label: have the Guide box render its figure through the same piece `Price` uses (split out a figure-only part if needed), so the wording lives in one file. Same for "อัปเดตล่าสุด {month}", written in both Price.tsx and GuideBlock.tsx.
- **Class name.** When a price isn't checked, Price.tsx puts the "บอกราคา" link inside `<small className="price-updated">`; give that case its own class or element.
- **Rules overriding each other.** `.detail-head h2` is sized three times in app/globals.css (`--step-1` near the first `.detail-head`, `--step-2` in the later Place card block, then 1.875rem); keep one. `.detail-title .place-icon:has(.brand-logo)` now matches `.detail-title .place-icon` and its comment ("a little larger") is false; drop it or fix it. `.stop-group small` lost its main target (the summary line): narrow or drop it, checking `.stop-group .stop-tags small` still styles the tags. The comment over `.detail-guide, .feed-more a` should name where it's still used (`MarkDone`'s next card and the Feed's links).
- **Comments.** New rules with no "why" comment, where the reason isn't obvious: `.detail-h`, `.detail-write`, `.detail-empty`, `.detail-guides`, `.note-sign`, `.explorer-panel .detail-bar`. Match the file's habit, one short line.

Leave as is (looked at, not a problem): the Notes section's "ยังไม่มีใครเขียนถึงที่นี่" empty state; phone numbers in a Place's summary becoming links; the Place card's price at body size and the plainer icon (both are P2 as the owner chose it); CONTEXT.md's Price Check quoting "อัปเดตล่าสุด" (the entry did the same before).
