import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenText, ChatCenteredText, CheckCircle, PencilSimpleLine, Phone } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { CategoryIcon } from "@/components/icons";
import { NoteCard } from "@/components/NoteCard";
import { PageHead } from "@/components/PageHead";
import { PostedStatus } from "@/components/PostedStatus";
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
  const activeName = categories.find((c) => c.id === active)?.name;
  const placeName = (id?: string) => content.places.find((p) => p.id === id)?.name;

  return (
    <>
      <PageHead
        title={place ? `โน้ตที่${place.name}` : activeName ? `โน้ต · ${activeName}` : "โน้ต"}
        lede={place ? undefined : activeName ? `${notes.length} โน้ตเรื่อง${activeName}` : "เรื่องสั้นๆ ที่คนแถวนี้อยากบอกคนมาใหม่"}
        back={
          place && (
            <Link href={`/?place=${place.id}`} className="back-link">
              <ArrowLeft weight="bold" aria-hidden="true" /> กลับไปที่แผนที่
            </Link>
          )
        }
        action={
          <Link href={place ? `/notes/new?place=${place.id}` : "/notes/new"} className="action is-primary head-action">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ต
          </Link>
        }
      />
      <div className="inner">
        {place ? (
          <p className="feed-scope">
            <Link href="/notes" className="related-link">
              ดูโน้ตจากทุกที่ <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </p>
        ) : (
          <nav className="line-filters feed-filters" aria-label="กรองตามหมวด">
            <Link href="/notes" className="line-chip" data-line="general" aria-current={!active ? "page" : undefined}>
              <ChatCenteredText weight="bold" aria-hidden="true" />
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
        {posted && (
          // The redirect after posting lands here (#fresh), right above the new Note.
          <PostedStatus className="form-status feed-posted" id="fresh">
            <CheckCircle weight="fill" aria-hidden="true" /> โน้ตของคุณขึ้นแล้ว อยู่ข้างล่างนี้
          </PostedStatus>
        )}
        <div className="feed">
          {notes.length === 0 && <p className="status-note">ยังไม่มีโน้ตตรงนี้ เขียนโน้ตแรกได้เลย</p>}
          {notes.map((n, i) => (
            <NoteCard key={n.id} note={n} placeName={place ? undefined : placeName(n.placeId)} fresh={Boolean(posted) && i === 0} />
          ))}
        </div>
        <ul className="feed-more">
          <li>
            <Link href="/seniors">
              <BookOpenText weight="bold" aria-hidden="true" />
              <span>อ่านเรื่องปีแรกของรุ่นพี่</span>
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href="/seniors#help">
              <Phone weight="bold" aria-hidden="true" />
              <span>เหงาหรือเครียด คุยกับคนได้</span>
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
