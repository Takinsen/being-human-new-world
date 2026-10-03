import { NavLink } from "./NavLink";
import { Canopy } from "./Canopy";
import { keepPhrases } from "@/lib/thaiBreaks";

/** Top of every page but the map: the wordmark, then the page's own heading. */
export function PageHead({
  title,
  lede,
  back,
  children,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** A link back up, shown above the title */
  back?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head inner">
      <Canopy />
      <Wordmark />
      {back}
      {/* Plain strings keep their phrases whole here; a node passed in does its own */}
      <h1>{typeof title === "string" ? keepPhrases(title) : title}</h1>
      {lede && <p className="lede">{typeof lede === "string" ? keepPhrases(lede) : lede}</p>}
      {children}
    </header>
  );
}

export function Wordmark() {
  return (
    <NavLink href="/" className="wordmark">
      <LeafMark />
      ตั้งหลัก
    </NavLink>
  );
}

/* A rain tree's leaf: leaflets in pairs along a stem, in the text's colour */
export function LeafMark() {
  return (
    <svg className="wordmark-leaf" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 23V5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="12" cy="5" rx="2.4" ry="4" />
      <ellipse cx="8" cy="11" rx="2.2" ry="3.8" transform="rotate(-55 8 11)" />
      <ellipse cx="16" cy="11" rx="2.2" ry="3.8" transform="rotate(55 16 11)" />
      <ellipse cx="8.4" cy="17" rx="2" ry="3.4" transform="rotate(-60 8.4 17)" />
      <ellipse cx="15.6" cy="17" rx="2" ry="3.4" transform="rotate(60 15.6 17)" />
    </svg>
  );
}
