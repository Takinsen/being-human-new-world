import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/content/categories";
import { CategoryIcon } from "./icons";

// On its own page the stops are in-page anchors, so plain links keep :target working.
function Stops({ category, samePage }: { category: Category; samePage?: boolean }) {
  return (
    <ol className="band-stops">
      {category.stops.map((s) => (
        <li key={s.label}>
          {samePage ? <a href={s.href.slice(s.href.indexOf("#"))}>{s.label}</a> : <Link href={s.href}>{s.label}</Link>}
        </li>
      ))}
    </ol>
  );
}

/** Home: a full-width band per category, showing what's on its line. */
export function CategoryBand({ category }: { category: Category }) {
  return (
    <section className="band" data-line={category.id}>
      <Link href={`/${category.id}`} className="band-head">
        <span className="band-icon">
          <CategoryIcon id={category.id} />
        </span>
        <h2>{category.name}</h2>
        <ArrowRight weight="bold" aria-hidden="true" className="band-go" />
      </Link>
      <Stops category={category} />
    </section>
  );
}

/** Category page: the same band, as the page heading. */
export function CategoryHead({ category }: { category: Category }) {
  return (
    <header className="band band-page" data-line={category.id}>
      <Link href="/" className="crumb">
        <ArrowLeft weight="bold" aria-hidden="true" /> หน้าแรก
      </Link>
      <h1>
        <CategoryIcon id={category.id} /> {category.name}
      </h1>
      <p>{category.blurb}</p>
      <Stops category={category} samePage />
    </header>
  );
}
