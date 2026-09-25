# A Google Sheet is the store; anyone can add data from the site

Status: accepted (2026-09-25). Amends the "no backend" consequence of 0003.

Data the team left for real people to fill in (Price Checks, a Senior's note on a Place, Senior Stories, confirming a Guide) could only be added by editing `content/*.ts`. For the demo, anyone should be able to add it from the site itself, at `/contribute`.

- Rows go to a Google Sheet through an Apps Script web app (`sheet/apps-script.gs`): `POST` appends a row, `GET` returns every tab as JSON. The site only knows its URL (`SHEET_API_URL`).
- `content/*.ts` stays the starting point. `lib/content.ts` lays the Sheet's rows over it, the newest row per Place, Senior or Guide winning.
- There is no review step and no login: a saved row shows on the site at once for the person who saved it, and for everyone else within 30 seconds.
- Anyone can write a Note (CONTEXT.md) by typing their name and hometown, with no review. The hometown is required because a Note signed by a real person from a real place is the product's "Being Human" argument, and it lets a Note vouch for Home Taste. A Note has its own tab in the Sheet and replaces the Senior's recommendation stored on a Place.
- A Price Check from the form is dated the month it was saved and credited to the name typed in, so 0001 still holds.

## Considered options

- MongoDB Atlas: rejected for the demo. It needs an admin page to see and fix rows, and the team already works in Google Sheets.
- Publishing the Sheet as CSV for reading plus a form for writing: rejected, two URLs to keep in step instead of one.
- Review before publishing: rejected for the demo. Add it before real Newcomers use the site: wrong prices cost trust (0001), and an open form invites spam.

## Consequences

- The site now has a server. Pages are regenerated at most every 30 seconds instead of being fully static.
- If the Sheet can't be reached, the site shows `content/*.ts` alone rather than failing.
- Anyone with the site can write to the Sheet. Fixing or removing a bad row is done by editing or deleting it in the Sheet.
