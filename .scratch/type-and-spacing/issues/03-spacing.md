# Spacing by proximity: 8 / 16 / 32 / 48

Status: ready-for-agent
Blocked by: 02

The owner found spacing tight in places and inconsistent, but not too loose (`../spec.md`, Q10, Q14; docs/adr/0007's type and spacing amendment). The prototype's spacing layer is `app/prototype-spacing.css` on branch `prototype/type-and-spacing` (`git show 458cc8f:app/prototype-spacing.css`): every margin, padding and gap it changes, grouped by page with a reason. Fold each decision into the original rule in app/globals.css instead of overriding it.

## Change

- The rule: 8 (`--space-2`) inside one thing, 16 (`--space-4`) between things in a list and inside a card, 32 (`--space-6`) between sections, 48 (`--space-7`) under a page head and between big sections. 4, 12 and 24 stay only inside small labels, chips and pills, a field's inset, the map list's tap rows and the Place card's bottom bar, each with a one-line why.
- Update the spacing-scale comment in `:root` to say this.
- Two calls the prototype made on top of the rule: filters sit 32 over the list they filter (the Feed and the Guides list), not 48; the laptop Guide box is 20rem (ticket 02).
- The prototype's agent noted two things spacing alone doesn't fix; leave them, but say in Comments if they now look wrong: a Place card's icon box is a fixed 40px, so its icon looks far from the name; the Guides list is about 10% longer on a phone.

## Done when

- Old and new compared at 390px and 1440px on the map (list and a Place card), the Feed, the Guides list, the rabbit and sick Guides, the Starter Checklist, Seniors and both forms: gaps match the prototype, nothing overlaps or clips.
- `grep -c "var(--space-[135])" app/globals.css` is far lower than today (112), and each remaining one has a reason next to it.
- `npm run typecheck` and `npm run build` pass.
