import type { Note, Place } from "@/content/types";

/** A Place with its Notes (newest first), as shown on the map */
export type MapStop = { place: Place; notes: Note[] };
