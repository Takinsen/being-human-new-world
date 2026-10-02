import type { Price as PriceData } from "@/content/types";
import { priceFigure, thaiMonthYear } from "@/lib/format";

// A price is shown as a number only with a Price Check, and says only when it was last
// updated, not who checked it or how (docs/adr/0001, amended 2026-10-02).
// `children` sits after the date, e.g. a Place card's way to report a price.
export function Price({ price, children }: { price: PriceData; children?: React.ReactNode }) {
  if (!price.checked) {
    return (
      <p className="price">
        <span className="price-pending">ยังไม่รู้ราคาจริง รอคนไปดู</span>
        {children && <small className="price-updated">{children}</small>}
      </p>
    );
  }
  return (
    <p className="price">
      <span className="visually-hidden">ราคาปกติ </span>
      <mark className="price-strip">{priceFigure(price)}</mark>
      <small className="price-updated">
        อัปเดตล่าสุด {thaiMonthYear(price.checked.on)}
        {children && <> {children}</>}
      </small>
    </p>
  );
}
