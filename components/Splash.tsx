import { SplashMotion } from "./SplashMotion";

// The splash on a session's first page load (docs/adr/0007): the leaf draws itself on the
// dark leaves, the name rises in, then the green lifts into the canopy of the page beneath.
// The page renders under it from the start. This script runs before the overlay is parsed,
// so a later load in the same session, reduced motion, or storage that throws never paints it.
// A tap or key before the motion takes over hides it too.
const decide = `(function(){var s=0;try{s=!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("tl-splash");if(s)sessionStorage.setItem("tl-splash","1")}catch(e){s=0}
function off(){if(window.__splashLive)return;var t=document.createElement("style");t.textContent="#splash{display:none}";document.head.appendChild(t);window.__splash=0;rm()}
function rm(){removeEventListener("pointerdown",off,true);removeEventListener("keydown",off,true)}
window.__splash=s;window.__splashRm=rm;if(!s)off();else{addEventListener("pointerdown",off,true);addEventListener("keydown",off,true)}})()`;

export function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: decide }} />
      <noscript>
        <style>{"#splash{display:none}"}</style>
      </noscript>
      <SplashMotion />
    </>
  );
}
