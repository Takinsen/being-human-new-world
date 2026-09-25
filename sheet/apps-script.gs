// ตั้งหลัก: Google Sheet as the site's store (docs/adr/0005).
// Paste into the Sheet's Extensions → Apps Script, then Deploy → New deployment
// → Web app, Execute as "Me", Who has access "Anyone". Put the /exec URL in
// SHEET_API_URL. Tabs and their header rows are created on the first write.

const TABS = {
  prices: ["timestamp", "placeId", "min", "max", "per", "by"],
  notes: ["timestamp", "placeId", "seniorId", "note", "homeTaste"],
  seniors: ["timestamp", "id", "name", "hometown", "region", "about", "story", "quote"],
  guides: ["timestamp", "guideId", "by"],
};

function sheetFor(name) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(name);
  if (!sheet) {
    sheet = book.insertSheet(name);
    sheet.appendRow(TABS[name]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

// GET: every tab as a list of row objects, oldest first.
function doGet() {
  const out = {};
  Object.keys(TABS).forEach((name) => {
    const [header, ...rows] = sheetFor(name).getDataRange().getDisplayValues();
    out[name] = rows.map((row) => Object.fromEntries(header.map((key, i) => [key, row[i]])));
  });
  return json(out);
}

// POST {"tab": "prices", "row": {...}}: appends one row in header order.
function doPost(e) {
  const { tab, row } = JSON.parse(e.postData.contents);
  if (!TABS[tab]) return json({ ok: false, error: "unknown tab" });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = sheetFor(tab);
    const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = { ...row, timestamp: new Date().toISOString() };
    // Leading ' keeps Sheets from turning "2026-09" or "40" into dates and numbers.
    sheet.appendRow(header.map((key) => (values[key] == null ? "" : "'" + String(values[key]))));
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}
