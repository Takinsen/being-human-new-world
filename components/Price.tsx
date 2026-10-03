import type { Price as PriceData } from "@/content/types";
import { priceFigure, thaiMonthYear } from "@/lib/format";
import { keepPhrases } from "@/lib/thaiBreaks";

// A price is shown as a number only with a Price Check, and says only when it was last
// updated, not who checked it or how (docs/adr/0001, amended 2026-10-02).
// `children` sits after the date, e.g. a Place card's way to report a price.
export function Price({ price, children }: { price: PriceData; children?: React.ReactNode }) {
  return (
    <p className="price">
      <PriceFigure price={price} />
      {price.checked ? (
        <small className="price-updated">
          <PriceUpdated on={price.checked.on} />
          {children && <> {children}</>}
        </small>
      ) : (
        children && <small className="price-ask">{children}</small>
      )}
    </p>
  );
}

/** The figure alone on platform yellow, or that nobody has checked it yet; a Guide's facts use it too */
export function PriceFigure({ price }: { price: PriceData }) {
  if (!price.checked) return <span className="price-pending">{keepPhrases("ยังไม่รู้ราคา")}</span>;
  return (
    <>
      <span className="visually-hidden">ราคาปกติ </span>
      <mark className="price-strip">{priceFigure(price)}</mark>
    </>
  );
}

/** "อัปเดตล่าสุด ก.ย. 69": when, never who or how */
export function PriceUpdated({ on }: { on: string }) {
  return <>อัปเดตล่าสุด {thaiMonthYear(on)}</>;
}
