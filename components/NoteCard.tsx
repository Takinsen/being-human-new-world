import { NavLink } from "./NavLink";
import { categories } from "@/content/categories";
import type { Note } from "@/content/types";
import { TimeAgo } from "./TimeAgo";

/**
 * One Note (docs/adr/0007, amended 2026-10-02): its category small on top, the words, then
 * the signature on one line, "name • province", with how long ago at the right.
 * On a Place card (`compact`) the category is left out.
 */
export function NoteCard({ note, compact, fresh }: { note: Note; compact?: boolean; fresh?: boolean }) {
  const className = ["note", compact && "is-compact", fresh && "is-fresh"].filter(Boolean).join(" ");
  return (
    <article className={className} data-line={note.category}>
      {!compact && (
        // The category in words too, so the colour of the leaf isn't the only cue
        <p className="note-cat">{categories.find((c) => c.id === note.category)?.name}</p>
      )}
      <p className="note-text">{note.text}</p>
      <footer className="note-by">
        <span className="note-sign">
          <span className="note-name">
            {note.seniorId ? <NavLink href={`/seniors#${note.seniorId}`}>{note.name}</NavLink> : <b>{note.name}</b>}
          </span>
          <span aria-hidden="true">•</span>
          <span className="note-home">
            <span className="visually-hidden">บ้านอยู่</span>
            {note.hometown}
          </span>
        </span>
        {note.on && <TimeAgo iso={note.on} className="note-ago" />}
      </footer>
    </article>
  );
}
