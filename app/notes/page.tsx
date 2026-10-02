import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenText, ChatCenteredText, CheckCircle, PencilSimpleLine, Phone } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { ChipInView } from "@/components/ChipFocus";
import { CategoryIcon } from "@/components/icons";
import { NoteCard } from "@/components/NoteCard";
import { PageHead } from "@/components/PageHead";
import { Peeps } from "@/components/People";
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
  const writeHref = place ? `/notes/new?place=${place.id}` : active ? `/notes/new?line=${active}` : "/notes/new";
  // A space only before a name in Latin letters ("BTS สยาม"); Thai runs straight on
  const prompt = place ? `อยากบอกอะไรเกี่ยวกับ${/^[A-Za-z0-9]/.test(place.name) ? " " : ""}${place.name}…` : activeName ? `อยากบอกอะไรเรื่อง${activeName}…` : "อยากบอกอะไรคนมาใหม่…";
  const placeName = (id?: string) => content.places.find((p) => p.id === id)?.name;

  return (
    <>
      <PageHead
        title={place ? `โน้ตที่${place.name}` : activeName ? `โน้ตเรื่อง${activeName}` : "โน้ต"}
        lede={place ? undefined : activeName ? `มี ${notes.length} โน้ต` : "เรื่องสั้นๆ ที่คนแถวนี้อยากบอกคนมาใหม่"}
        back={
          place && (
            <Link href={`/?place=${place.id}`} className="back-link">
              <ArrowLeft weight="bold" aria-hidden="true" /> กลับไปที่แผนที่
            </Link>
          )
        }
      />
      {!place && <Peeps className="feed-peeps inner" />}
      <div className="inner">
        {place ? (
          <p className="feed-scope">
            <Link href="/notes" className="related-link">
              ดูโน้ตจากทุกที่
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
            <ChipInView key={active ?? "all"} />
          </nav>
        )}
        {/* The way to write sits where the Notes start, not as a button in the head (ADR 0006, amended) */}
        <Link href={writeHref} className="composer">
          <span className="composer-pen" aria-hidden="true">
            <PencilSimpleLine weight="bold" />
          </span>
          <span className="composer-prompt">{prompt}</span>
        </Link>
        {posted && (
          // The redirect after posting lands here (#fresh), right above the new Note.
          <PostedStatus className="form-status feed-posted" id="fresh">
            <CheckCircle weight="fill" aria-hidden="true" /> โน้ตขึ้นแล้ว อยู่ข้างล่างนี้ ขอบคุณที่เล่านะ
          </PostedStatus>
        )}
        <div className="feed">
          {notes.length === 0 && <p className="status-note">ยังไม่มีใครเขียนเลย เป็นคนแรกไหม</p>}
          {notes.map((n, i) => (
            <NoteCard key={n.id} note={n} placeName={place ? undefined : placeName(n.placeId)} fresh={Boolean(posted) && i === 0} />
          ))}
        </div>
        <ul className="feed-more">
          <li>
            <Link href="/seniors">
              <BookOpenText weight="bold" aria-hidden="true" />
              <span>อ่านเรื่องปีแรกของรุ่นพี่</span>
            </Link>
          </li>
          <li>
            <Link href="/seniors#help">
              <Phone weight="bold" aria-hidden="true" />
              <span>เหงาหรือเครียด คุยกับคนได้</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
