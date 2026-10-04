# Product Reveal slide

Status: done

One 16:9 slide for the class presentation, the moment the audience first sees ตั้งหลัก.

## Decisions (grilled 2026-10-04)

- **Q1 Deliverable:** a PNG at 3840×2160, made from `design/reveal.html` (edit it, then render again).
- **Q2 Still, not video.** A video can come later from the still once it's settled.
- **Q3 Three phones:** left the Feed (the Seniors' faces, names, hometowns), centre the map with a
  Place card open, right the Starter Checklist. The centre one is in front and largest.
- **Q4 Real screens** from the app at 390×844 with real content, in a plain phone frame with no brand.
- **Q5 Background:** the canopy's dark green with light falling through, as on the splash.
- **Q6 Text:** the wordmark, the tagline (Q10), a QR and the link.
  Thai only, no captions under the phones.
- **Q7 Link:** `starter.tanakrit.dev`.
- **Q8 Centre card:** ส้มตำเจ๊อ้อย จุฬาฯ ซอย 20 (a Home Taste Place, อีสาน).
- **Q9 Checklist:** the first two items ticked.
- **Q10 Tagline:** "มาใหม่แถวจุฬาฯ? Starter Pack อยู่นี่แล้ว", replacing "บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก".
- **Q11 Everywhere:** the site's description, README and CONTEXT.md take the new tagline too, so the
  slide and a shared link say the same thing.

## Done

- `design/reveal.html` is the slide; `design/reveal.mjs` takes the three screens from the running
  app (`design/reveal/`), makes `design/reveal/qr.svg` from the link in `#link`, and renders
  `design/reveal.png`. How to run it is at the top of the script.
- The first render came from a cloud sandbox whose network policy blocks the map tiles
  (`tile.openstreetmap.org`), so the map behind the card is grey. Run the script where the tiles
  load to get the real map.
- The card says no one has written about the place yet: none of the seed Notes is pinned to a Place.
