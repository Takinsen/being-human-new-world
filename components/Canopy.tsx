// A canopy of rain-tree crowns across the top of the page, light falling through it (docs/adr/0007).
// Decoration only. The darker leaves are on top and no light falls behind the wordmark,
// so its text keeps 4.5:1.
export function Canopy() {
  return (
    <div className="canopy" aria-hidden="true">
      <svg viewBox="0 0 400 120" preserveAspectRatio="none">
        <g className="canopy-leaves">
          <path
            d="M0 0H400V70C385 92 360 96 344 82C330 104 298 106 284 86C268 108 232 104 222 84C206 102 176 100 166 80C150 100 118 98 108 78C92 96 62 94 54 74C40 90 14 88 0 72Z"
            fill="var(--leaf)"
          />
          <path
            d="M0 0H400V48C380 66 352 64 340 52C322 70 292 68 282 54C262 72 232 68 222 54C204 70 174 66 164 52C146 68 116 66 106 52C88 66 58 64 50 50C34 62 12 60 0 50Z"
            fill="var(--leaf-dark)"
          />
        </g>
        <g fill="var(--sun)" opacity="0.55">
          <circle cx="200" cy="30" r="3" />
          <circle cx="150" cy="20" r="2" />
          <circle cx="248" cy="34" r="3.5" />
          <circle cx="330" cy="18" r="2.5" />
          <circle cx="300" cy="40" r="1.8" />
        </g>
      </svg>
    </div>
  );
}
