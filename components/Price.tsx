import type { Price as PriceData } from "@/content/types";
import { checkedBy, thaiMonthYear } from "@/lib/format";

// A price is shown as a number only with a Price Check (docs/adr/0001).
// `short` drops "ยังไม่มีใครไปดูราคาจริง" from view where the price is a glance, not a decision
// (a Guide's facts); screen readers still hear it. A Place card always shows it in full.
export function Price({ price, short }: { price: PriceData; short?: boolean }) {
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
        {price.checked.how === "web"
          ? <>
              ข้อมูลจากเว็บ {thaiMonthYear(price.checked.on)}
              <span className={short ? "visually-hidden" : undefined}> ยังไม่มีใครไปดูราคาจริง</span>
            </>
          : `ตรวจ ${thaiMonthYear(price.checked.on)} โดย${checkedBy(price.checked)}`}
      </span>
    </p>
  );
}
