import Link from "next/link";

// Three lines, one per category, meeting at Chula. Drawn, not a real map.
export function LineMap() {
  return (
    <svg className="line-map" viewBox="0 0 340 160" role="group" aria-label="แผนผัง: สามสาย การเดินทาง ของกิน อยู่คนเดียว มาบรรจบกันที่จุฬาฯ">
      <path d="M8 28 H116 Q148 28 158 58 L168 80" className="lm-line lm-transport" />
      <path d="M332 36 H228 Q198 36 186 66 L174 84" className="lm-line lm-food" />
      <path d="M36 150 H116 Q148 150 158 118 L168 92" className="lm-line lm-living" />
      <circle cx="170" cy="86" r="17" className="lm-hub" />
      <text x="196" y="116" className="lm-hub-label">
        จุฬาฯ
      </text>
      <Link href="/transport">
        <circle cx="60" cy="28" r="6" className="lm-stop lm-transport" />
        <text x="10" y="17" className="lm-label lm-transport">
          การเดินทาง
        </text>
      </Link>
      <Link href="/food">
        <circle cx="280" cy="36" r="6" className="lm-stop lm-food" />
        <text x="286" y="25" className="lm-label lm-food">
          ของกิน
        </text>
      </Link>
      <Link href="/living">
        <circle cx="88" cy="150" r="6" className="lm-stop lm-living" />
        <text x="36" y="140" className="lm-label lm-living">
          อยู่คนเดียว
        </text>
      </Link>
    </svg>
  );
}
