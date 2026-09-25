import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ตั้งหลัก",
  description: "บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก วิธีใช้ชีวิตแถวจุฬาฯ ที่แผนที่ไม่ได้บอก จากรุ่นพี่ที่เคยมาใหม่เหมือนกัน",
};

export const viewport: Viewport = { themeColor: "#F4F6FA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;700&family=Mali:wght@400;500&display=swap"
        />
      </head>
      <body>
        <header className="site-header">
          <Link href="/" className="wordmark">
            ตั้งหลัก
          </Link>
          <nav aria-label="หมวด">
            <Link href="/transport">เดินทาง</Link>
            <Link href="/food">ของกิน</Link>
            <Link href="/living">อยู่คนเดียว</Link>
            <Link href="/seniors">รุ่นพี่</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>ข้อมูลแถวจุฬาฯ เขียนโดยทีมตั้งหลักและรุ่นพี่ที่เคยมาใหม่เหมือนกัน</p>
        </footer>
      </body>
    </html>
  );
}
