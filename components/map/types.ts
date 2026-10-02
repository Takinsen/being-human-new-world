import type { Note, Place } from "@/content/types";

/** A Place with its Notes (newest first) and the Guides that go with it, as shown on the map */
export type MapStop = {
  place: Place;
  notes: Note[];
  guides: { id: string; title: string }[];
  /** Who vouched for this Place as Home Taste; none means it is the team's pick */
  homeTasteBy?: string;
};
