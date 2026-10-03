# A Guide is called คู่มือ, not วิธี

Status: ready-for-agent

The owner renamed the Guide's Thai label (see `../spec.md`, Q1, and CONTEXT.md's **Guide (คู่มือ)**). Change every user-facing "วิธี" that names a Guide; keep "วิธี" where it only means "how".

## Change

- components/TabBar.tsx: the tab label `วิธี` → `คู่มือ`.
- app/guides/page.tsx: metadata title `วิธี | ตั้งหลัก` → `คู่มือ | ตั้งหลัก`; PageHead title `วิธี` → `คู่มือ`; the lede "…พี่ๆ เขียนวิธีไว้ให้แล้ว" → "…พี่ๆ เขียนคู่มือไว้ให้แล้ว".
- app/guides/[id]/page.tsx: the fallback title `วิธี | ตั้งหลัก` → `คู่มือ | ตั้งหลัก`; the back link `วิธีทั้งหมด` → `คู่มือทั้งหมด`.
- components/WeekRoute.tsx and components/map/PlaceDetail.tsx: `อ่านวิธี` → `อ่านคู่มือ`.
- app/contribute/ContributeForms.tsx: `ลองทำตามวิธีแล้ว` → `ลองทำตามคู่มือแล้ว`, `วิธีไหน` → `คู่มือไหน`, `เลือกวิธี` → `เลือกคู่มือ`, the error `เลือกก่อนว่าวิธีไหน` → `เลือกก่อนว่าคู่มือไหน`.
- app/contribute/actions.ts: `เลือกวิธีแล้วใส่ชื่อเราด้วย` → `เลือกคู่มือแล้วใส่ชื่อเราด้วย`.
- content/places.ts: the caution `ดูในวิธี "ไม่สบาย ไปไหนดี"` → `ดูในคู่มือ "ไม่สบาย ไปไหนดี"`.
- Anything else a grep for `วิธี` turns up in app/, components/, lib/, content/, data/ and sheet/ that names a Guide (as opposed to "how"); check data/ and sheet/ for seed rows or Apps Script copy too.

## Keep

- app/layout.tsx's description "วิธีใช้ชีวิตแถวจุฬาฯ ที่แผนที่ไม่ได้บอก": plain "how".
- The URL `/guides`, ids, code names (`guide`, `GuideBlock` …). Code and docs stay in English and keep "Guide".
- Guide content where "วิธี" means "how" inside a sentence (e.g. a step saying "วิธีเติมเงิน…"), if any: leave it.

## Done when

- `grep -rn "วิธี" app components lib content data sheet` shows only "how" uses, each one looked at.
- `npm run typecheck` and `npm run build` pass.
- The tab bar still fits at 360px wide (four labels, "สัปดาห์แรก" the longest): screenshot it.
