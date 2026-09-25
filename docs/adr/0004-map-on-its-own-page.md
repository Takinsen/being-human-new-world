# The map gets its own page

Status: accepted (2026-09-25). Supersedes 0002.

The map embedded at the top of each category page didn't work: a short strip of map pushed the know-how down, and it only ever showed one line at a time. The map moves to its own full-screen page (`/map`).

- On a wide screen, a floating sidebar holds line filters, the list of Places grouped by line, and the selected Place's know-how.
- On a phone, the filters float over the top of the map and a bottom sheet holds the list and the selected Place.
- Category pages drop the map. Each has a "ดูบนแผนที่" link to `/map?line=<id>`, and each Place links to `/map?place=<id>`.

What stays from 0002: the map is still an index into Local Know-how, not a directory. Selecting a pin shows the Place's price, know-how and cautions, links back to its category page, and links out to Google Maps for directions. There is still no routing, search or reviews. Leaflet with OpenStreetMap tiles stays.
