# The CU POP BUS logo on its Guide

Status: done

From `../spec.md` Q7, Q8. Reverses `.scratch/logos` (CU Pop Bus kept our own icon).

## Change

- public/logos/cu-pop-bus.jpg: the file the owner sent (`../cu-pop-bus-logo.jpg`), unaltered.
- lib/brands.ts: `Brand` gains `"pop"`; the notice names CU POP BUS too. Same off switch.
- content/guides.ts: `pop-bus` gets `brand: "pop"`.
- app/globals.css: the logo is a square picture on its own pink, not a mark on white: show it whole, rounded, filling the Guide icon on `/guides` and the eyebrow on the Guide page.
- `.scratch/logos/research.md` gets a line saying the owner supplied this logo.

## Done when

- `/guides` and `/guides/pop-bus` show the logo; with `NEXT_PUBLIC_TRANSIT_LOGOS=off` both fall back to the bus icon and the footer notice goes.
- `npm run typecheck` and `npm run build` pass.
