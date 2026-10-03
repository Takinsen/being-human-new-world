// Content model. Terms follow CONTEXT.md.

// Adjusting has Notes only, no Places or Guides (docs/adr/0008).
export type CategoryId = "transport" | "food" | "health" | "household" | "adjusting";

/** The categories a Place or Guide can belong to */
export type PlaceCategoryId = Exclude<CategoryId, "adjusting">;

export type Region = "เหนือ" | "อีสาน" | "กลาง" | "ใต้" | "ตะวันออก" | "ตะวันตก";

/** Who confirmed a price, how, and when. The site shows only when (docs/adr/0001). */
export type PriceCheck = {
  /** "YYYY-MM" */
  on: string;
  /** Senior id, or a team member's display name */
  by: string;
  /** "web": the team found the price online and nobody has confirmed it on the spot yet */
  how?: "spot" | "web";
};

export type Price = {
  min: number;
  max: number;
  /** What the price is for, e.g. "ต่อจาน", "ต่อเที่ยว" */
  per: string;
  /** Without a check, the price renders as "รอตรวจราคา" instead of a number. */
  checked?: PriceCheck;
};

/** A photo from Wikimedia Commons, by file name (without "File:"). */
export type Photo = {
  file: string;
  alt: string;
};

/** A transit operator whose logo we show to name a station; see lib/brands.ts */
export type Brand = "bts" | "mrt";

/** Icon keys map to Phosphor icons in components/icons.tsx. */
export type IconKey =
  | "train"
  | "bus"
  | "motorcycle"
  | "taxi"
  | "card"
  | "food"
  | "cutlery"
  | "laundry"
  | "water"
  | "trash"
  | "sick"
  | "basket"
  | "key"
  /** Adjusting's icon; it has no Places, so there is no map pin for it */
  | "care";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategoryId;
  lat: number;
  lng: number;
  /** One line: why a Newcomer would come here */
  summary: string;
  photo?: Photo;
  knowhow: string[];
  cautions?: string[];
  price?: Price;
  /** Set when the Place is Home Taste for a region */
  homeTaste?: Region;
  /** Stations: how to get into Chula from here, one line */
  toChula?: string;
  /** Ids of the Guides that go with this Place, the closest first */
  guides?: string[];
  /** Icon when there is no photo; defaults to the category's */
  icon?: IconKey;
  /** A station: show its operator's logo instead of the icon (lib/brands.ts) */
  brand?: Brand;
};

/** A short piece of Local Know-how anyone writes, signed with name and hometown. See CONTEXT.md. */
export type Note = {
  id: string;
  text: string;
  name: string;
  /** Province */
  hometown: string;
  region?: Region;
  category: CategoryId;
  placeId?: string;
  /** The writer says this Place tastes like home (food Places only) */
  homeTaste?: boolean;
  /** Set when the writer has a Senior Story */
  seniorId?: string;
  /** ISO timestamp; seed Notes have none */
  on?: string;
};

/** One thing to do in a Guide, written so a Newcomer can do it without asking anyone.
 * Read top to bottom: `when`, the `do` line, its `points`, a link, then `say`, `warn`, `tip`. */
export type GuideStep = {
  /** The situation this step or option is for, e.g. "ฉุกเฉิน"; shown above `do` */
  when?: string;
  /** The action, short and imperative: the step's heading, set bold in Mitr */
  do: string;
  /** How to do it, one short plain line each: where, what to press, what it costs */
  points?: string[];
  /** Words to say, when the step means talking to someone. Polite and gender-neutral
   * ("รบกวนขอ… หน่อย"), never "ค่ะ/ครับ" */
  say?: string;
  /** A real trap that costs money or safety, or emergency criteria: drawn as the page's one
   * callout, so keep it rare (a Guide has one at most) */
  warn?: string;
  /** A shortcut, or a small thing to watch for; a quiet sentence */
  tip?: string;
  /** A link out, e.g. walking directions; opens in a new tab */
  link?: { label: string; href: string };
  /** Anchor for an option, so `jumps` can point at it */
  id?: string;
  /** An emergency option: drawn in the caution colour so it can't be mistaken for a mild one */
  urgent?: boolean;
};

/** One row in a Guide's "need to know" box: a name and a short value, nothing under it (more goes in the steps).
 * A price goes in `price`, never typed into `value`, so its figure gets the platform yellow and its date (docs/adr/0001). */
export type GuideFact = {
  label: string;
} & ({ value: string; price?: never } | { price: Price; value?: never });

export type Guide = {
  id: string;
  category: PlaceCategoryId;
  title: string;
  /** On the Guides list (and the Guide's lede when it has no `intro`): what newcomers get wrong, in a person's words */
  summary: string;
  icon: IconKey;
  /** The Guide is about one operator's trains: its logo shows in the page head (lib/brands.ts) */
  brand?: Brand;
  /** The gist of the whole Guide, read first: the lede under the title (docs/adr/0007, amended 2026-10-02) */
  intro?: string;
  /** Not shown since docs/adr/0007 (Guides use illustration); kept for a Place card or a later look */
  photo?: Photo;
  /** Need to know at a glance: cost, hours, a number to call. A price goes in `price` (docs/adr/0001). */
  facts?: GuideFact[];
  /** What to have with you before the first step ("พกไปด้วย") */
  bring?: string[];
  /** "options" lists alternatives to choose from; default is ordered steps */
  kind?: "steps" | "options";
  /** Heading over the options, e.g. "เป็นแค่ไหน"; steps are always "ทำตามนี้" */
  choose?: string;
  /** Shortcuts above long options, to the step with that `id` (e.g. emergency first) */
  jumps?: { to: string; label: string }[];
  steps: GuideStep[];
  /** A follow-up link shown after the steps, under "อ่านต่อ" */
  related?: { label: string; href: string };
  /** false until the team has walked through the steps for real */
  checked: boolean;
};

export type Senior = {
  id: string;
  name: string;
  hometown: string;
  region: Region;
  /** e.g. "ปี 3 วิศวะ"; left out until the Senior confirms */
  about?: string;
  /** Senior Story, one paragraph per entry */
  story: string[];
  /** A line from the story that any Newcomer shares, wherever they came from; shown on the home page */
  quote: string;
  /** false until the Senior has read and approved their story */
  approved: boolean;
};

export type ChecklistItem = {
  id: string;
  title: string;
  href: string;
  /** Colours the stop with its category's line; none for general items */
  category?: CategoryId;
};

export type HelpLink = {
  name: string;
  what: string;
  contact?: string;
  href?: string;
  /** A website, shown as a link */
  web?: string;
};
