import type { Price as PriceData } from "@/content/types";
import { checkedBy, thaiMonthYear } from "@/lib/format";

// A price is shown as a number only with a Price Check (docs/adr/0001).
export function Price({ price }: { price: PriceData }) {
  if (!price.checked) {
    return <p className="price price-pending">ราคาปกติ: รอตรวจราคาหน้าร้าน</p>;
  }
  const range = price.min === price.max ? `${price.min}` : `${price.min}–${price.max}`;
  return (
    <p className="price">
      <span className="price-label">ราคาปกติ </span>
      <mark className="price-range">
        {range} บาท {price.per}
      </mark>
      <span className="price-check">
        ตรวจ {thaiMonthYear(price.checked.on)} โดย{checkedBy(price.checked)}
      </span>
    </p>
  );
}
