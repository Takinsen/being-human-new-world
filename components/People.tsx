// Where the site is about people (docs/adr/0007): the Feed, the Seniors page, a finished first week.
// Each place has its own three, so nobody turns into a sticker seen everywhere.
const sets = {
  feed: ["p1", "p2", "p3"],
  seniors: ["s1", "s2", "s3"],
  cheer: ["c1", "c2", "c3"],
} as const;

/** People from Open Peeps (CC0, opeeps.fun), drawn to SVG files in public/people */
export function Peeps({ className, set = "feed" }: { className?: string; set?: keyof typeof sets }) {
  return (
    <div className={className ? `peeps ${className}` : "peeps"} aria-hidden="true">
      {sets[set].map((p) => (
        <img key={p} src={`/people/${p}.svg`} alt="" />
      ))}
    </div>
  );
}
