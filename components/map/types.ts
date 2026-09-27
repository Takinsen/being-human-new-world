import type { Note, Place } from "@/content/types";

/** A Place with its Notes (newest first) and the Guide that goes with it, as shown on the map */
export type MapStop = { place: Place; notes: Note[]; guide?: { id: string; title: string } };
