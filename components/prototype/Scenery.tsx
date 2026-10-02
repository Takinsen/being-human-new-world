// PROTOTYPE (look-and-feel), throwaway. Decoration only, hidden from screen readers.
// Both looks' pictures are in the page; CSS shows the one for html[data-look].

/** B: a canopy of rain-tree crowns across the top, light falling through it */
function Canopy() {
  return (
    <svg className="scenery-canopy" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 0H400V70C385 92 360 96 344 82C330 104 298 106 284 86C268 108 232 104 222 84C206 102 176 100 166 80C150 100 118 98 108 78C92 96 62 94 54 74C40 90 14 88 0 72Z"
        fill="var(--leaf-dark)"
      />
      <path
        d="M0 0H400V48C380 66 352 64 340 52C322 70 292 68 282 54C262 72 232 68 222 54C204 70 174 66 164 52C146 68 116 66 106 52C88 66 58 64 50 50C34 62 12 60 0 50Z"
        fill="var(--leaf)"
      />
      <g fill="var(--sun)" opacity="0.55">
        <circle cx="70" cy="30" r="3" />
        <circle cx="150" cy="20" r="2" />
        <circle cx="248" cy="34" r="3.5" />
        <circle cx="330" cy="18" r="2.5" />
        <circle cx="300" cy="40" r="1.8" />
      </g>
    </svg>
  );
}

/** B: dappled light on the ground under the canopy */
function Dapple() {
  return (
    <svg className="scenery-dapple" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <g fill="var(--sun)" opacity="0.35">
        <ellipse cx="60" cy="20" rx="26" ry="7" />
        <ellipse cx="190" cy="38" rx="34" ry="8" />
        <ellipse cx="320" cy="16" rx="22" ry="6" />
      </g>
    </svg>
  );
}

/** A: the three lines, thin, curving off the edge: what's left of the transit map */
function Trace() {
  return (
    <svg className="scenery-trace" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" strokeWidth="4" strokeLinecap="round">
        <path d="M-10 70C120 70 160 20 300 18S420 10 420 10" stroke="var(--transport)" />
        <path d="M-10 76C130 76 170 32 310 30S420 26 420 26" stroke="var(--food)" />
        <path d="M-10 82C140 82 180 44 320 42S420 42 420 42" stroke="var(--living)" />
      </g>
      <circle cx="300" cy="18" r="7" fill="var(--paper)" stroke="var(--transport)" strokeWidth="4" />
    </svg>
  );
}

export function Scenery({ where }: { where: "head" | "map" }) {
  return (
    <div className={`scenery scenery-${where}`} aria-hidden="true">
      <div className="look-b-only">
        <Canopy />
      </div>
      <div className="look-a-only">{where === "head" && <Trace />}</div>
    </div>
  );
}

/** People from Open Peeps (CC0, opeeps.fun), rendered to SVG */
export function Peeps({ className }: { className?: string }) {
  return (
    <div className={`peeps ${className ?? ""}`} aria-hidden="true">
      <img src="/prototype/p1.svg" alt="" />
      <img src="/prototype/p2.svg" alt="" />
      <img src="/prototype/p3.svg" alt="" />
    </div>
  );
}
