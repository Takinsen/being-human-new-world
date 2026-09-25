// Renders Phosphor icons to inline SVG for the static design board.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as P from "@phosphor-icons/react/dist/ssr";
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./board.src.html", import.meta.url), "utf8");
const out = src.replace(/\{\{(\w+)(?::(\w+))?\}\}/g, (_, name, weight = "bold") => {
  const Icon = P[name];
  if (!Icon) throw new Error(`No icon ${name}`);
  return renderToStaticMarkup(createElement(Icon, { weight, size: "1em", "aria-hidden": true }));
});
writeFileSync(new URL("./board.html", import.meta.url), out);
console.log("wrote design/board.html");
