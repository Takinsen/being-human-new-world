import {
  BowlFood,
  Bus,
  CreditCard,
  Drop,
  FirstAidKit,
  ForkKnife,
  Motorcycle,
  Taxi,
  Train,
  Trash,
  WashingMachine,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { CategoryId, IconKey } from "@/content/types";

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
};

const categoryIcons: Record<CategoryId, IconKey> = {
  transport: "train",
  food: "food",
  living: "laundry",
};

export function IconFor({ name }: { name: IconKey }) {
  const Component = icons[name];
  return <Component weight="bold" aria-hidden="true" size="1em" />;
}

export function CategoryIcon({ id }: { id: CategoryId }) {
  return <IconFor name={categoryIcons[id]} />;
}
