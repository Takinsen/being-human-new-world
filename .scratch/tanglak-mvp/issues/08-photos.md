# Replace hotlinked photos with the team's own

Status: ready-for-human
Blocked by: 04

Place and Guide photos are hotlinked from Wikimedia Commons by file name (`photo.file` in `content/places.ts` and `content/guides.ts`). They were picked from search results without being viewed, so:

1. Open the deployed site and check every photo loads and shows the right thing. Remove any that don't.
2. While walking the area for the price check, take your own photos (landscape, 16:9 crops well).
3. Put them in `public/photos/` and switch the Photo component to serve local files; team photos need no per-photo credit.

Places with no photo yet: ตลาดสามย่าน, ซูเปอร์มาร์เก็ต สามย่านมิตรทาวน์.
