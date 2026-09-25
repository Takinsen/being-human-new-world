import type { Place } from "@/content/types";

/** A Place with its station code, as shown on the map page */
export type MapStop = { place: Place; code: string };
