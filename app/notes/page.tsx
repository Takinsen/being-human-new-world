import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, PencilSimpleLine, Phone } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { CategoryIcon } from "@/components/icons";
import { NoteCard } from "@/components/NoteCard";
import { PageHead } from "@/components/PageHead";
import { getContent, isCategory } from "@/lib/content";

export const metadata: Metadata = { title: "โน้ต | ตั้งหลัก" };

type Props = { searchParams: Promise<{ line?: string; place?: string; posted?: string }> };

// The Feed: every Note, newest first, filterable by category (CONTEXT.md).
export default async function NotesPage({ searchParams }: Props) {
  const { line, place: placeId, posted } = await searchParams;
  const content = await getContent();
  const place = placeId ? content.places.find((p) => p.id === placeId) : undefined;
  const active = line && isCategory(line) ? line : undefined;
  const notes = content.notes.filter((n) => (place ? n.placeId === place.id : !active || n.category === active));
  const placeName = (id?: string) => content.places.find((p) => p.id === id)?.name;

  return (
    <>
      <PageHead title="โน้ต" lede="เรื่องสั้นๆ ที่คนแถวนี้อยากบอกคนมาใหม่">
        <div className="head-actions">
          <Link href={place ? `/notes/new?place=${place.id}` : "/notes/new"} className="action is-primary">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ต
          </Link>
          <Link href="/seniors" className="related-link">
            อ่านเรื่องปีแรกของรุ่นพี่ <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
          <Link href="/seniors#help" className="related-link">
            <Phone weight="bold" aria-hidden="true" /> เหงาหรือเครียด คุยกับคนได้
          </Link>
        </div>
      </PageHead>
      <div className="inner">
        {posted && (
          <p className="form-status feed-posted" role="status">
            <CheckCircle weight="fill" aria-hidden="true" /> โน้ตของคุณขึ้นแล้ว อยู่บนสุด
          </p>
        )}
        {place ? (
          <div className="feed-scope">
            <p>โน้ตที่{place.name}</p>
            <p className="feed-scope-links">
              <Link href={`/?place=${place.id}`} className="related-link">
                <ArrowLeft weight="bold" aria-hidden="true" /> กลับไปที่แผนที่
              </Link>
              <Link href="/notes" className="related-link">
                โน้ตจากทุกที่
              </Link>
            </p>
          </div>
        ) : (
          <nav className="line-filters feed-filters" aria-label="กรองตามหมวด">
            <Link href="/notes" className="line-chip" data-line="general" aria-current={!active ? "page" : undefined}>
              ทั้งหมด
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/notes?line=${c.id}`}
                className="line-chip"
                data-line={c.id}
                aria-current={active === c.id ? "page" : undefined}
              >
                <CategoryIcon id={c.id} />
                {c.name}
              </Link>
            ))}
          </nav>
        )}
        <div className="feed">
          {notes.length === 0 && <p className="status-note">ยังไม่มีโน้ตตรงนี้ เขียนโน้ตแรกได้เลย</p>}
          {notes.map((n, i) => (
            <NoteCard key={n.id} note={n} placeName={place ? undefined : placeName(n.placeId)} fresh={Boolean(posted) && i === 0} />
          ))}
        </div>
      </div>
    </>
  );
}
