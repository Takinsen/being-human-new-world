import { guides as baseGuides } from "@/content/guides";
import { places as basePlaces } from "@/content/places";
import { seniors as baseSeniors } from "@/content/seniors";
import type { CategoryId, Guide, Place, Region, Senior } from "@/content/types";
import { readSheet, type SheetRows } from "./sheet";

// content/*.ts is the starting point; rows people add on /contribute are laid
// over it, the newest row winning (docs/adr/0005).

export type Content = {
  places: Place[];
  seniors: Senior[];
  guides: Guide[];
};

const regions: Region[] = ["เหนือ", "อีสาน", "กลาง", "ใต้", "ตะวันออก", "ตะวันตก"];

export function isRegion(value: string): value is Region {
  return (regions as string[]).includes(value);
}

export async function getContent(): Promise<Content> {
  return merge(await readSheet());
}

function merge(rows: SheetRows): Content {
  const seniors = baseSeniors.map((s) => ({ ...s }));
  for (const row of rows.seniors) {
    if (!row.id || !row.name) continue;
    const story = row.story.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    const next: Senior = {
      id: row.id,
      name: row.name.trim(),
      hometown: row.hometown.trim(),
      region: isRegion(row.region) ? row.region : "กลาง",
      about: row.about.trim() || undefined,
      story,
      quote: row.quote.trim() || story[0] || "",
      // Written by the Senior themselves, so there is nothing left to approve.
      approved: true,
    };
    const i = seniors.findIndex((s) => s.id === row.id);
    if (i >= 0) seniors[i] = next;
    else seniors.push(next);
  }

  const places = basePlaces.map((p) => ({ ...p }));
  const place = (id: string) => places.find((p) => p.id === id);

  for (const row of rows.prices) {
    const p = place(row.placeId);
    const min = Number(row.min);
    const max = Number(row.max || row.min);
    if (!p || !Number.isFinite(min) || !Number.isFinite(max) || !row.by.trim()) continue;
    p.price = {
      min: Math.min(min, max),
      max: Math.max(min, max),
      per: row.per.trim() || p.price?.per || "",
      checked: { on: row.timestamp.slice(0, 7), by: row.by.trim() },
    };
  }

  for (const row of rows.notes) {
    const p = place(row.placeId);
    const senior = seniors.find((s) => s.id === row.seniorId);
    if (!p || !senior || !row.note.trim()) continue;
    p.senior = { id: senior.id, note: row.note.trim() };
    if (row.homeTaste === "yes") p.homeTaste = senior.region;
  }

  const guides = baseGuides.map((g) =>
    rows.guides.some((row) => row.guideId === g.id) ? { ...g, checked: true } : g,
  );

  return { places, seniors, guides };
}

export function placesIn(content: Content, category: CategoryId): Place[] {
  return content.places.filter((p) => p.category === category);
}

export function guidesIn(content: Content, category: CategoryId): Guide[] {
  return content.guides.filter((g) => g.category === category);
}

export function seniorFor(content: Content, place: Place): Senior | undefined {
  return place.senior && content.seniors.find((s) => s.id === place.senior?.id);
}
