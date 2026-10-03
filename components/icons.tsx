import {
  Basket,
  BowlFood,
  Bus,
  CreditCard,
  Drop,
  FirstAidKit,
  ForkKnife,
  HandHeart,
  Key,
  Motorcycle,
  Taxi,
  Train,
  Trash,
  WashingMachine,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { Brand, CategoryId, IconKey } from "@/content/types";
import { logoFor } from "@/lib/brands";

const icons: Record<IconKey, Icon> = {
  train: Train,
  bus: Bus,
  motorcycle: Motorcycle,
  taxi: Taxi,
  card: CreditCard,
  food: BowlFood,
  cutlery: ForkKnife,
  laundry: WashingMachine,
  water: Drop,
  trash: Trash,
  sick: FirstAidKit,
  basket: Basket,
  key: Key,
  care: HandHeart,
};

// A Place without its own icon shows its category's, on the map too: each of these
// (bar "care", which has no Places) needs a pin icon in app/globals.css.
const categoryIcons: Record<CategoryId, IconKey> = {
  transport: "train",
  food: "food",
  health: "sick",
  household: "basket",
  adjusting: "care",
};

export function IconFor({ name }: { name: IconKey }) {
  const Component = icons[name];
  return <Component weight="bold" aria-hidden="true" size="1em" />;
}

export function CategoryIcon({ id }: { id: CategoryId }) {
  return <IconFor name={categoryIcons[id]} />;
}

/** A Place's own icon if it has one (a hospital's first-aid kit), else its category's */
export function placeIconKey(place: { category: CategoryId; icon?: IconKey }): IconKey {
  return place.icon ?? categoryIcons[place.category];
}

export function PlaceIcon({ place }: { place: { category: CategoryId; icon?: IconKey; brand?: Brand } }) {
  return <BrandLogo brand={place.brand} fallback={<IconFor name={placeIconKey(place)} />} />;
}

/** A station's or Guide's operator logo, unaltered, when logos are on (lib/brands.ts); else `fallback`.
 * Its box sets the size and the logo keeps its own shape inside it. Wherever it shows, the name
 * beside it already says "BTS" or "MRT", so it is decorative (alt=""). */
export function BrandLogo({ brand, fallback }: { brand?: Brand; fallback: ReactNode }) {
  const logo = logoFor(brand);
  if (!logo) return <>{fallback}</>;
  return <img className="brand-logo" src={logo.src} alt="" />;
}
