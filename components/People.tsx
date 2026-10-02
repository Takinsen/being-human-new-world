// Where the site is about people (docs/adr/0007): the Feed, the Seniors page, a finished first week.
/** People from Open Peeps (CC0, opeeps.fun), drawn to SVG files in public/people */
export function Peeps({ className }: { className?: string }) {
  return (
    <div className={className ? `peeps ${className}` : "peeps"} aria-hidden="true">
      <img src="/people/p1.svg" alt="" />
      <img src="/people/p2.svg" alt="" />
      <img src="/people/p3.svg" alt="" />
    </div>
  );
}
