import { guides as baseGuides } from "@/content/guides";
import { seedNotes } from "@/content/notes";
import { places as basePlaces } from "@/content/places";
import { seniors as baseSeniors } from "@/content/seniors";
import type { CategoryId, Guide, Note, Place, Region, Senior } from "@/content/types";
import { regionOf } from "./provinces";
import { readSheet, type SheetRows } from "./sheet";

// content/*.ts is the starting point; rows people add on the site are laid
// over it, the newest row winning (docs/adr/0005).

/** A Home Taste Place and who vouched for it; no one yet means a team pick. */
export type HomeTastePick = { place: Place; region: Region; by?: Note };

export type Content = {
  places: Place[];
  seniors: Senior[];
  guides: Guide[];
  /** Newest first; seed Notes last */
  notes: Note[];
  homeTaste: HomeTastePick[];
};

const regions: Region[] = ["เหนือ", "อีสาน", "กลาง", "ใต้", "ตะวันออก", "ตะวันตก"];
const categoryIds: CategoryId[] = ["transport", "food", "living"];

export function isRegion(value: string): value is Region {
  return (regions as string[]).includes(value);
}

export function isCategory(value: string): value is CategoryId {
  return (categoryIds as string[]).includes(value);
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

  const written: Note[] = [];
  rows.notes.forEach((row, i) => {
    const text = row.text?.trim();
    const name = row.name?.trim();
    const hometown = row.hometown?.trim();
    const p = row.placeId ? place(row.placeId) : undefined;
    const category = p?.category ?? (isCategory(row.category) ? row.category : undefined);
    if (!text || !name || !hometown || !category) return;
    const senior = seniors.find((s) => s.name === name && s.hometown === hometown);
    written.push({
      id: `sheet-${i}`,
      text,
      name,
      hometown,
      region: regionOf(hometown),
      category,
      placeId: p?.id,
      homeTaste: row.homeTaste === "yes" && p?.category === "food",
      seniorId: senior?.id,
      on: row.timestamp,
    });
  });
  const notes = [...written.reverse(), ...seedNotes];

  const guides = baseGuides.map((g) =>
    rows.guides.some((row) => row.guideId === g.id) ? { ...g, checked: true } : g,
  );

  // Home Taste: a Note from someone of that region vouches; otherwise the team's pick stands.
  const homeTaste: HomeTastePick[] = [];
  for (const region of regions) {
    const by = notes.find((n) => n.homeTaste && n.region === region && n.placeId);
    const vouched = by && place(by.placeId!);
    const teamPick = places.find((p) => p.homeTaste === region);
    if (vouched) homeTaste.push({ place: vouched, region, by });
    else if (teamPick) homeTaste.push({ place: teamPick, region });
  }

  return { places, seniors, guides, notes, homeTaste };
}

export function placesIn(content: Content, category: CategoryId): Place[] {
  return content.places.filter((p) => p.category === category);
}

export function guidesIn(content: Content, category: CategoryId): Guide[] {
  return content.guides.filter((g) => g.category === category);
}

export function notesOn(content: Content, placeId: string): Note[] {
  return content.notes.filter((n) => n.placeId === placeId);
}
