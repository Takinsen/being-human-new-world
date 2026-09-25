# ตั้งหลัก MVP: spec

Pitch: Monday 2026-09-28. Terms follow `CONTEXT.md`; decisions in `docs/adr/`.

## Problem

From the meet-2 interviews (4 people): what Newcomers struggle with is "how" and "what's normal", not "where". Everyone had to look after themselves for the first time (4/4); commuting, fares and timing (3/4); finding food they like (3/4); loneliness (3/4). All four still call their hometown home.

## Scope (vertical slice)

- One Campus Area: Chulalongkorn University (Samyan, Banthat Thong, Siam, Chula soi) plus the commute routes in.
- Three categories, each with a map of Places, know-how cards and Guides:
  - Transportation
  - Everyday Food, including Home Taste
  - Living Alone
- A first-week Starter Checklist (7 items), progress stored in the browser.
- Two Seniors (บอส, แทน) with a Senior Story each, plus Help Links.
- Thai only. Mobile first. Next.js on Vercel. No login.

## Out of scope (mention in the pitch as next steps)

Study places, local slang/building names, English version, other campuses, a first-month checklist, contributions from more Seniors.

## Content ownership

- Team (unattributed): Guides and factual procedures.
- Seniors (attributed): favourite food, Home Taste, cautions, Senior Story.
- Every price shown needs a Price Check (ADR 0001).
