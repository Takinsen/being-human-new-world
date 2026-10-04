Status: done

# Map polish: shop logos, a roomier Place card, chip-row fades, a swipe that follows the finger

The user asked (2026-10-04) for logos on Health and Household Places, more reading room on a Place's card (the price and นำทาง bar covered it), chip rows that fade on both sides instead of cutting off on the left, and tab swipes without the delay.

Found first (Chromium, 390×844): the bar took 85px of the card's 331px; the map's chip row is inset 10px, so it cuts off hard on the left and only fades on the right; a swipe moved nothing until the finger lifted, then slid ~90–370ms later; `/notes` reads its query on the server, so it could never be prefetched and every swipe to it waited on the server.

## Decisions (grilling, 2026-10-04; the owner took every recommendation)

- **Q1 Which Places get a logo:** the chains with a shop sign: Big C Food Place, both Lotus's go fresh, Daiso, MR.DIY, Otteri, Magnano, and B&W Drugs only if it has a real logo. Never the Red Cross (Chula Hospital, protected by law), the Phra Kieo (CU Health Service, Chuan Chom: `.scratch/logos/research.md`), or the BMA's emblem (Public Health Centre 5). Water dispensers have no brand. Food has no chains.
- **Q2 Files:** the owner sends them, as with CU POP BUS (this session can't reach the brands' sites or Commons). The code is ready first: a brand with no file yet shows the Place's icon.
- **Q3 Look:** like a station: the logo, contained, on the white disc ringed in the category colour, on the pin, the list row and the card's head.
- **Q4 Notice and switch:** one generic notice for every logo, and one switch, `NEXT_PUBLIC_LOGOS=off`, turns them all off.
- **Q5 Price and นำทาง:** the price moves under the summary in the card's head (it scrolls with the card); นำทาง moves into the sheet's top bar beside "← ดูที่อื่น" (on wide screens, beside the card's "ดูที่อื่น"). No bar stuck to the bottom.
- **Q6 Sheet height:** opening a card raises the sheet to ~70% of the map; the list stays at half. Full screen stays one tap away.
- **Q7 Chip rows:** fade only on a side with more to scroll, and run to the screen's edges. All three rows (the map, the Feed, the Guides list).
- **Q8 Swipe:** the page follows the finger while dragging; let go far or fast enough and it carries on out as the next tab slides in, otherwise it springs back. `/notes` with no query is a static page, so it is prefetched in full; a query (`?line`, `?place`, `?posted`) is rewritten to a server-rendered copy, so links and no-JS work as before.

## Logos

The owner sent all seven (2026-10-04): Big C Foodplace, Lotus's go fresh, Daiso, MR.DIY, Otteri, Magnano, B&W Drugs. Originals are `*-original.*` here; `public/logos/` has copies scaled to 256px at most, nothing else changed.

## Done (2026-10-04)

Checked on the production build in Chromium (390×844 with touch, and 1280×800): every swipe between the tabs slides from where the finger let go, with `/notes` already prefetched (no request to the server on the swipe); a short drag springs back; a drag past the last tab gives a little and springs back. A page dragged right used to widen the page and the browser dropped the slide: `main` clips sideways overflow now. Headless Chromium also took a sideways drag as its own swipe back; the tab pages turn that off (`overscroll-behavior-x`). `/notes`, `/notes?line=food`, `?place=` and `?posted=1` all render as before. Not checked: real phones, iOS Safari.
