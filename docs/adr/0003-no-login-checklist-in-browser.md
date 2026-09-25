# No login; Starter Checklist progress lives in the browser

Status: accepted (2026-09-25)

The Starter Checklist stores which items a Newcomer has ticked in `localStorage`. There are no accounts. A login adds a step before the Newcomer sees anything useful and makes us hold personal data, and neither is worth it for a prototype.

## Consequences

- Progress doesn't sync between devices and disappears if the browser's site data is cleared. The checklist must render correctly when storage is unavailable.
- No backend: the site is fully static on Vercel.
