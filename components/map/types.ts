import type { Note, Place } from "@/content/types";

/** A Place with its station code and its Notes (newest first), as shown on the map */
export type MapStop = { place: Place; code: string; notes: Note[] };
