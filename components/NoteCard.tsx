import Link from "next/link";
import type { Note } from "@/content/types";
import { thaiDate } from "@/lib/format";

/** One Note: the words, then who wrote it and where they're from. */
export function NoteCard({ note, placeName, compact, fresh }: { note: Note; placeName?: string; compact?: boolean; fresh?: boolean }) {
  const className = ["note", compact && "is-compact", fresh && "is-fresh"].filter(Boolean).join(" ");
  return (
    <article className={className} data-line={note.category}>
      <p className="note-text">{note.text}</p>
      <footer className="note-by">
        {note.seniorId ? <Link href={`/seniors#${note.seniorId}`}>{note.name}</Link> : <b>{note.name}</b>}
        <span> บ้านอยู่{note.hometown}</span>
        {note.on && <span> · {thaiDate(note.on)}</span>}
      </footer>
      {placeName && note.placeId && (
        <Link href={`/?place=${note.placeId}`} className="note-place">
          @ {placeName}
        </Link>
      )}
    </article>
  );
}
