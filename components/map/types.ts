import type { Place, Senior } from "@/content/types";

/** A Place with its station code and recommending Senior, as shown on the map page */
export type MapStop = { place: Place; code: string; senior?: Senior };
