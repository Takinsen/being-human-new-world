# Headings in Anuphan, text in IBM Plex Sans Thai, the wordmark in Mitr

Status: ready-for-agent

The owner picked font D in the prototype (see `../spec.md`, Q1, Q2, Q7, Q15, Q20, Q23, and docs/adr/0007's type and spacing amendment). Build it in the real code; the prototype is reference, not code to copy.

## Change

- app/layout.tsx: the Google Fonts link loads Anuphan (500, 600), IBM Plex Sans Thai (400, 500, 600, 700) and Mitr (500, for the wordmark only). IBM Plex Sans Thai Looped goes.
- app/globals.css `:root`: `--font` is IBM Plex Sans Thai (fallbacks "Noto Sans Thai", system-ui, sans-serif); `--font-head` is Anuphan (fallback IBM Plex Sans Thai). Add `--font-mark: "Mitr"` for the wordmark and the splash's name, and a `--w-head: 600` that every heading-face rule uses. Rewrite the comment on `--font-head` (Mitr's slashed zero no longer applies; numbers stay in `--font` because a price, a time or a number to call reads as text).
- `.wordmark` and `.splash-mark` use `--font-mark` at 500. Nothing else uses Mitr: `h1–h3`, `.step-say q`, `.guide-end p`, `.guide .mark-next`, `.guide-next a` and `.week-progress.is-complete` take `--font-head` at `--w-head`.
- Check the splash (components/SplashMotion.tsx) still lands the name on the wordmark: it measures the wordmark's font size.

## Done when

- `CSS.getPlatformFontsForNode` (or the DevTools "Rendered fonts" panel) shows Anuphan on headings, IBM Plex Sans Thai on text and Mitr only on the wordmark, on the map, the Feed, a Guide and the Starter Checklist.
- `npm run typecheck` and `npm run build` pass.
