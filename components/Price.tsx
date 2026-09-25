import type { Price as PriceData } from "@/content/types";
import { checkedBy, thaiMonthYear } from "@/lib/format";

// A price is shown as a number only with a Price Check (docs/adr/0001).
export function Price({ price }: { price: PriceData }) {
  if (!price.checked) {
    return <p className="price-pending">ราคาปกติ: รอทีมตรวจราคา</p>;
  }
  const range = price.min === price.max ? `${price.min}` : `${price.min}–${price.max}`;
  return (
    <p className="price">
      <span className="visually-hidden">ราคาปกติ </span>
      <mark className="price-strip">
        {range} บาท <small>{price.per}</small>
      </mark>
      <span className="price-check">
        ตรวจ {thaiMonthYear(price.checked.on)} โดย{checkedBy(price.checked)}
      </span>
    </p>
  );
}
