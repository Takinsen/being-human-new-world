// PROTOTYPE (readable-pages): how long ago, counted back all the way (grilling Q8, answer A).
export function timeAgo(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, (now - then) / 1000);
  const min = s / 60, hr = min / 60, day = hr / 24;
  if (min < 1) return "เมื่อกี้";
  if (hr < 1) return `${Math.floor(min)} นาทีที่แล้ว`;
  if (day < 1) return `${Math.floor(hr)} ชั่วโมงที่แล้ว`;
  if (day < 2) return "เมื่อวาน";
  if (day < 7) return `${Math.floor(day)} วันที่แล้ว`;
  if (day < 30) return `${Math.floor(day / 7)} สัปดาห์ที่แล้ว`;
  if (day < 365) return `${Math.floor(day / 30)} เดือนที่แล้ว`;
  const years = Math.floor(day / 365);
  return years === 1 ? "ปีที่แล้ว" : `${years} ปีที่แล้ว`;
}
