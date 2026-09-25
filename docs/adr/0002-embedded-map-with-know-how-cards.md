# Embedded map with pins, know-how on the cards

Status: superseded by 0004 (2026-09-25)

Each category page embeds a map with a pin for every Place. The team chose this over "cards only, with an Open in Google Maps button", even though it risks the site reading as another Google Maps. One interviewee (บอส) asked directly for something that shows "จุดต่างๆ ชัดเจนขึ้น", so a map earns its place.

To keep the product about "how" rather than "where", the map is only an index: a pin opens the Place's know-how card (normal price, cautions, recommending Senior), and each card still links out to Google Maps for directions. We don't build routing, search or reviews.

The map uses Leaflet with OpenStreetMap tiles: no API key, no billing account, and it works on Vercel's free tier.

## Consequences

- Every Place needs coordinates, which the team must check along with prices.
- Map tiles need network access, so the map area shows a plain fallback while loading and the cards remain usable without it.
