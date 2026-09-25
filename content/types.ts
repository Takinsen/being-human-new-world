// Content model. Terms follow CONTEXT.md.

export type CategoryId = "transport" | "food" | "living";

export type Region = "เหนือ" | "อีสาน" | "กลาง" | "ใต้" | "ตะวันออก" | "ตะวันตก";

/** Who confirmed a price on the spot, and when. See docs/adr/0001. */
export type PriceCheck = {
  /** "YYYY-MM" */
  on: string;
  /** Senior id, or a team member's display name */
  by: string;
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
  | "sick";

export type Place = {
  id: string;
  name: string;
  category: CategoryId;
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

export type Guide = {
  id: string;
  category: CategoryId;
  title: string;
  icon: IconKey;
  intro?: string;
  photo?: Photo;
  /** "options" lists alternatives to choose from; default is ordered steps */
  kind?: "steps" | "options";
  steps: string[];
  /** A follow-up link shown after the steps */
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
};
