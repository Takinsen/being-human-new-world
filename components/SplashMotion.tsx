"use client";

import { useEffect, useRef, useState } from "react";
import { Canopy } from "./Canopy";
import { LeafMark } from "./PageHead";

// The motion of the splash (see Splash.tsx). Every motion is a Web Animation on transform,
// opacity or the stem's dash, so a tap or key just finishes it. Timing is concept A's prototype.

declare global {
  interface Window {
    __splash?: number | boolean;
    __splashLive?: boolean;
    __splashRm?: () => void;
  }
}

/** Past this, the page has been waiting too long already: skip the splash (globals.css bails too) */
const LATE_MS = 2000;
const FONT_WAIT_MS = 300;

// Leaflets in LeafMark's order: where each unfolds from, which way, and which pair it is (low first)
const LEAFLETS = [
  { o: "12px 9px", r: 0, p: 2 },
  { o: "12px 12px", r: 40, p: 1 },
  { o: "12px 12px", r: -40, p: 1 },
  { o: "12px 18px", r: 40, p: 0 },
  { o: "12px 18px", r: -40, p: 0 },
];

const LIFT = "cubic-bezier(0.7, 0, 0.18, 1)";
const OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

export function SplashMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.__splash || getComputedStyle(root).display === "none" || performance.now() > LATE_MS) {
      window.__splashRm?.();
      setDone(true);
      return;
    }
    window.__splashLive = true;
    window.__splashRm?.();
    root.classList.add("is-held");

    let anims: Animation[] = [];
    let page: Animation[] = [];
    let over = false;
    let melting: ReturnType<typeof setTimeout> | undefined;
    let replace: ReturnType<typeof setTimeout> | undefined;
    const A = (el: Element, keyframes: Keyframe[] | PropertyIndexedKeyframes, opts: KeyframeAnimationOptions) => {
      const a = el.animate(keyframes, { fill: "both", easing: "linear", ...opts });
      anims.push(a);
      return a;
    };
    const stop = () => {
      over = true;
      clearTimeout(melting);
      clearTimeout(replace);
      removeEventListener("pointerdown", skip, true);
      removeEventListener("keydown", skip, true);
      removeEventListener("wheel", skip, true);
    };
    // Gone at once, not back to its first frame for a moment while React takes it out
    const end = () => {
      if (over) return;
      stop();
      root.style.display = "none";
      anims.forEach((a) => a.cancel());
      anims = [];
      setDone(true);
    };
    function skip() {
      page.forEach((a) => a.cancel());
      end();
    }
    addEventListener("pointerdown", skip, true);
    addEventListener("keydown", skip, true);
    addEventListener("wheel", skip, { capture: true, passive: true });

    const play = () => {
      if (over) return;
      const sheet = root.querySelector<HTMLElement>(".splash-sheet")!;
      const edge = root.querySelector<HTMLElement>(".splash-edge")!;
      const mark = root.querySelector<HTMLElement>(".splash-mark")!;
      const leaf = mark.querySelector("svg")!;
      const t0 = Number(document.timeline.currentTime) || 0;
      /** A delay on the motion's own clock, for animations added after it started */
      const at = (ms: number) => ms - ((Number(document.timeline.currentTime) || 0) - t0);

      // The leaf's own parts: the stem draws, each leaflet unfolds in a group of its own
      const stem = leaf.querySelector("path")!;
      const leaflets = Array.from(leaf.querySelectorAll("ellipse")).map((e, i) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        e.replaceWith(g);
        g.append(e);
        g.style.transformBox = "view-box";
        g.style.transformOrigin = LEAFLETS[i]?.o ?? "12px 12px";
        return g;
      });

      // 1. The stem draws upward
      A(stem, { strokeDashoffset: [19, 0] }, { duration: 440, easing: "cubic-bezier(0.45, 0, 0.2, 1)" });
      // 2. Leaflets bud out pair by pair as the stem passes them, unfolding away from it
      leaflets.forEach((g, i) => {
        const { r, p } = LEAFLETS[i] ?? { r: 0, p: 0 };
        A(
          g,
          [
            { opacity: 0, transform: `rotate(${r}deg) scale(0.2)` },
            { opacity: 1, offset: 0.45 },
            { opacity: 1, transform: "none" },
          ],
          { delay: 120 + p * 115, duration: 440, easing: "cubic-bezier(0.25, 1.15, 0.5, 1)" },
        );
      });
      // 3. The name rises in beside the leaf
      A(mark.querySelector(".splash-name")!, [
        { opacity: 0, transform: "translateY(7px)" },
        { opacity: 1, transform: "none" },
      ], { delay: 440, duration: 420, easing: OUT });
      // 4. The green lifts into the canopy; the mark rides up with it to the wordmark's place
      const glide = A(mark, [{ transform: "none" }, { transform: "none" }], { delay: 850, duration: 520, easing: LIFT });
      const rise = A(sheet, [{ transform: "none" }, { transform: "none" }], { delay: 870, duration: 500, easing: LIFT });
      // 5. Then it melts into the same leaves, letting the light through
      A(root, { opacity: [1, 0] }, { delay: 1340, duration: 160, easing: "ease-out" });

      // Where it lands: the page's own canopy and the wordmark in its shade. Measured again
      // just before the lift, as the map can still change its layout once it has hydrated.
      const place = () => {
        const W = root.clientWidth;
        const H = root.clientHeight;
        const canopy = document.querySelector("#main .canopy");
        const c = canopy?.getBoundingClientRect();
        const landing = !!c && c.height > 0 && c.bottom > 0 && c.top < H / 2;
        const wordmark = Array.from(document.querySelectorAll<HTMLElement>("#main .wordmark")).find((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.top >= -1 && r.bottom <= H / 2 && (el.checkVisibility?.() ?? true);
        });
        if (landing && c) {
          Object.assign(edge.style, { left: `${c.left}px`, width: `${c.width}px`, height: `${c.height}px` });
        }
        const lift = landing && c ? H - c.top : H + edge.offsetHeight;
        if (wordmark) {
          const w = wordmark.getBoundingClientRect();
          const l = wordmark.querySelector(".wordmark-leaf")?.getBoundingClientRect() ?? w;
          Object.assign(mark.style, {
            left: `${l.left}px`,
            top: `${w.top}px`,
            minHeight: `${w.height}px`,
            fontSize: getComputedStyle(wordmark).fontSize,
          });
        }
        // It starts large in the middle, the same size whatever size it lands at
        const size = parseFloat(getComputedStyle(mark).fontSize) || 16;
        const k = Math.min(56, Math.max(36, W * 0.107)) / size;
        const dx = (W - mark.offsetWidth * k) / 2 - mark.offsetLeft;
        const dy = H * 0.46 - (mark.offsetHeight * k) / 2 - mark.offsetTop;
        (glide.effect as KeyframeEffect).setKeyframes([
          { transform: `translate(${dx}px, ${dy}px) scale(${k})` },
          { transform: wordmark ? "none" : `translateY(${-lift}px)` },
        ]);
        (rise.effect as KeyframeEffect).setKeyframes({ transform: ["none", `translateY(${-lift}px)`] });
        return landing ? canopy : null;
      };
      place();
      root.classList.add("is-playing");
      replace = setTimeout(() => {
        if (over) return;
        const canopy = place();
        // The light spots come through the leaves as the green melts
        canopy?.querySelectorAll("circle").forEach((dot, i) => {
          page.push(dot.animate([{ opacity: 0 }, { opacity: 1 }], {
            delay: at(1360 + (i % 5) * 70),
            duration: 360,
            easing: OUT,
            fill: "backwards",
          }));
        });
      }, 780);
      // Once it starts to melt it no longer covers the page, so taps go through to it
      melting = setTimeout(() => root.classList.add("is-melting"), 1340);

      Promise.all(anims.map((a) => a.finished)).then(end, () => {});
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, FONT_WAIT_MS))]).then(play);

    // Only on unmount (and React's dev double run, which mounts it again)
    return () => {
      stop();
      page.forEach((a) => a.cancel());
      anims.forEach((a) => a.cancel());
    };
  }, []);

  if (done) return null;
  return (
    <div id="splash" className="splash" aria-hidden="true" ref={ref} suppressHydrationWarning>
      <div className="splash-sheet">
        <div className="splash-edge">
          <Canopy />
        </div>
      </div>
      <div className="splash-mark">
        <LeafMark />
        <span className="splash-name">ตั้งหลัก</span>
      </div>
    </div>
  );
}
