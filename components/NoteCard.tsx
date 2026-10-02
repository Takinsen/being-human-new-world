import Link from "next/link";
import { categories } from "@/content/categories";
import type { Note } from "@/content/types";
import { thaiDate } from "@/lib/format";
import { timeAgo } from "./prototype/timeAgo";

/** One Note: the words, then its category, who wrote it and where they're from. */
export function NoteCard({ note, placeName, compact, fresh }: { note: Note; placeName?: string; compact?: boolean; fresh?: boolean }) {
  const className = ["note", compact && "is-compact", fresh && "is-fresh"].filter(Boolean).join(" ");
  const category = categories.find((c) => c.id === note.category)?.name;
  const name = note.seniorId ? <Link href={`/seniors#${note.seniorId}`}>{note.name}</Link> : <b>{note.name}</b>;
  return (
    <article className={className} data-line={note.category}>
      {/* PROTOTYPE: today's card (?note=O) */}
      <div className="p-note-old">
        <p className="note-text">{note.text}</p>
        <footer className="note-by">
          {/* The category in words too, so the colour of the bar isn't the only cue */}
          <span className="note-cat">เรื่อง{category}</span> จาก
          {name}
          <span> บ้านอยู่{note.hometown}</span>
          {note.on && <small className="note-date">{thaiDate(note.on)}</small>}
        </footer>
        {placeName && note.placeId && (
          <Link href={`/?place=${note.placeId}`} className="note-place">
            ที่{placeName}
          </Link>
        )}
      </div>

      {/* PROTOTYPE: the category small on top, the words, then "name • province" with the time at the right (?note=A1) */}
      <div className="p-note-new">
        <p className="pn-tag">
          <span className="pn-cat">{category}</span>
        </p>
        <p className="note-text">{note.text}</p>
        <footer className="pn-by">
          <span className="pn-sign">
            <span className="pn-name">{name}</span>
            <span className="pn-sep" aria-hidden="true">•</span>
            <span className="pn-home">
              <span className="visually-hidden">บ้านอยู่</span>
              {note.hometown}
            </span>
          </span>
          {note.on && (
            <time className="pn-ago" dateTime={note.on} title={thaiDate(note.on)}>
              {timeAgo(note.on)}
            </time>
          )}
        </footer>
      </div>
    </article>
  );
}
