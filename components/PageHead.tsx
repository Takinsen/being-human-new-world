import Link from "next/link";

/** Top of every page but the map: the wordmark, then the page's own heading. */
export function PageHead({
  title,
  lede,
  back,
  children,
}: {
  title: React.ReactNode;
  lede?: string;
  /** A link back up, shown above the title */
  back?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head inner">
      <Wordmark />
      {back}
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </header>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="wordmark">
      <span className="wordmark-lines" aria-hidden="true">
        <i data-line="transport" />
        <i data-line="food" />
        <i data-line="living" />
      </span>
      ตั้งหลัก
    </Link>
  );
}
