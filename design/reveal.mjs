// Renders the Product Reveal slide (.scratch/product-reveal/spec.md) to design/reveal.png.
// Needs the app running and, once: npm i --no-save playwright qrcode
//   node design/reveal.mjs                         (app at http://localhost:3000)
//   node design/reveal.mjs http://localhost:3100   (another address)
//   node design/reveal.mjs --no-shots              (keep the screens in design/reveal/)
// The link lives in reveal.html only (#link); the QR is made from it.
import { chromium } from "playwright";
import QRCode from "qrcode";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000";
const dir = new URL("./reveal/", import.meta.url);
// CHROMIUM: a browser of your own; HTTPS_PROXY: a proxy Chromium should go through too
const browser = await chromium.launch({
  ...(process.env.CHROMIUM && { executablePath: process.env.CHROMIUM }),
  ...(process.env.HTTPS_PROXY && { proxy: { server: process.env.HTTPS_PROXY, bypass: new URL(base).hostname } }),
});

if (!args.includes("--no-shots")) {
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  // No splash, no welcome, the first two checklist items done
  await phone.addInitScript(() => {
    sessionStorage.setItem("tl-splash", "1");
    localStorage.setItem("tanglak:welcome-dismissed", "1");
    localStorage.setItem("tanglak:checklist:v1", JSON.stringify(["to-chula", "rabbit"]));
  });
  // The map asks {a,b,c}.tile.openstreetmap.org; a network that allows only the plain host
  // (as in the cloud sandbox) still gets the tiles from there
  await phone.route(/^https:\/\/[abc]\.tile\.openstreetmap\.org\//, (route) =>
    route.continue({ url: route.request().url().replace(/\/\/[abc]\./, "//") }),
  );
  const page = await phone.newPage();
  const shots = { notes: "/notes", map: "/?place=somtam-chula-20", checklist: "/checklist" };
  for (const [name, path] of Object.entries(shots)) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: new URL(`${name}.png`, dir).pathname });
  }
  await phone.close();
}

const html = new URL("./reveal.html", import.meta.url);
const link = readFileSync(html, "utf8").match(/id="link"[^>]*>([^<]+)</)[1].trim();
const qr = await QRCode.toString(`https://${link}`, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#1d2733", light: "#0000" } });
writeFileSync(new URL("qr.svg", dir), qr);

const slide = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
await slide.goto(html.href, { waitUntil: "networkidle" });
await slide.evaluate(() => document.fonts.ready);
await slide.screenshot({ path: new URL("./reveal.png", import.meta.url).pathname });
await browser.close();
console.log(`wrote design/reveal.png (QR → https://${link})`);
