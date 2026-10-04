# Place card: photos to swipe, and a tidier layout

Status: needs-info (waiting on network access to Wikimedia Commons)

The owner wants the Place card (the card in the map's sheet, e.g. ส้มตำเจ๊อ้อย จุฬาฯ ซอย 20) laid
out and spaced better, with several photos to swipe through sideways.

## Decisions (grilled 2026-10-04)

- **Q1 Photos:** from Wikimedia Commons, several per Place. They are for the presentation: they
  may be illustrations, not of that very Place (their alt text says so, as now).
- **Q2 Every Place** with more than one photo gets the strip, not only Everyday Food.
- **Q3 The strip's look is picked from a prototype** (Q9).
- **Q4 Layout and spacing:** fixed directly, no prototype. From the current card: uneven gaps
  between the head, the price and the sections; "อาหาร…" sits on its own; the yellow price label is
  heavy; section headings are small and faint; an empty Notes section leaves a blank.
- **Q5 Finding photos:** the owner allows `commons.wikimedia.org` and `upload.wikimedia.org` in the
  environment's network access; every file is then checked to exist before it goes in.
- **Q6 How many:** 4–5 per Everyday Food Place (signature dishes, the shop), 2–3 elsewhere
  (the way in, inside).
- **Q7 Credit:** one line under the strip, linking the photo on screen to its Commons page.
- **Q8 No full-screen viewer:** swiping in the card is all.
- **Q9 Prototype:** three variants on the real card, switched with `?variant=`, the strip at the
  top of the card in each: A full width with dots; B about 85% wide so the next photo peeks, with a
  1/5 counter; C a row of small square photos.
