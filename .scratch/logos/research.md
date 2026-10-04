Status: needs-triage

# Research: โลโก้แบรนด์ขนส่ง (BTS, MRT, Rabbit, CU Pop Bus, BMTA) สำหรับ "ตั้งหลัก"

วันที่ค้นคว้า: 2026-10-02 · ขอบเขต: map pin ของสถานี, Place card, Guide header

## ข้อจำกัดของการค้นคว้าครั้งนี้ (อ่านก่อน)

- Network egress ของ session นี้ **บล็อก** เว็บต้นทางทั้งหมดที่ต้องการ: `www.bts.co.th`, `www.btsgroup.co.th`, `www.mrta.co.th`, `metro.bemplc.co.th`, `www.rabbit.co.th`, `www.rabbitholdings.co.th`, `www.bmta.co.th`, `www.chula.ac.th`, `commons.wikimedia.org`, `upload.wikimedia.org`, `*.wikipedia.org`, `www.wikidata.org` (ทั้ง curl และ WebFetch ได้ 403 `connect_rejected` / `EGRESS_BLOCKED`) ทำได้แค่ WebSearch (ดู snippet ของผลค้นหา) กับ GitHub
- ดังนั้นข้อมูลใบอนุญาตบน Commons ด้านล่าง **มาจาก snippet ของผลค้นหา ไม่ได้เปิดหน้าไฟล์เอง** ต้องมีคนเปิดลิงก์ยืนยันอีกครั้งก่อนเผยแพร่ (ใช้เวลาไม่กี่นาที)
- ไฟล์ SVG ที่ดาวน์โหลดได้ มาจาก **สำเนาไฟล์ Commons ที่อยู่ใน repo GitHub ของบุคคลที่สาม** (`CazadorHT/realestate-crm`, path `public/images/transit/`) ไม่ใช่จากแหล่งต้นทางโดยตรง ขนาดและมิติตรงกับที่ผลค้นหารายงานไว้สำหรับไฟล์ Commons (ดูแต่ละหัวข้อ) แต่ควรดาวน์โหลดซ้ำจาก Commons บนเครื่องที่ network เปิด แล้ว diff ดูก่อนนำเข้า repo
- ไม่พบ brand guideline / press kit สาธารณะของ BTS, MRT/BEM หรือ Rabbit ในผลค้นหา (เปิดเว็บไซต์ของพวกเขาเองไม่ได้ จึงยืนยันไม่ได้ว่า "ไม่มีจริง")

## 1. BTS Skytrain

- **เจ้าของ:** Bangkok Mass Transit System PCL (BTSC) เป็นผู้ให้บริการ BTS Skytrain; หน้า Commons ระบุว่าไฟล์นี้เป็นโลโก้ของ "Bangkok Mass Transit System Public Company Limited (BTS), operator of Bangkok Skytrain" — https://commons.wikimedia.org/wiki/File:BTS-Logo.svg (ผ่าน snippet ของผลค้นหา)
- **ไฟล์หลัก:** `File:BTS-Logo.svg` (202 × 242 px, ~8 KB) — "imported from German Wikipedia" และ "vectorized after a model found on www.bts.co.th" โดย User:Hdamm — https://commons.wikimedia.org/wiki/File:BTS-Logo.svg, https://en.m.wikipedia.org/wiki/File:BTS-Logo.svg
  - **นี่คือ vector ที่วาดตามแบบ (redraw) ไม่ใช่ไฟล์ทางการจาก BTSC**
  - มีรุ่นแยกตามสายด้วย: `BTS-Logo_Light_Green.svg` (สายสุขุมวิท), `BTS-Logo_Dark_Green.svg` (สายสีลม), `BTS-Logo_Gold.svg` — https://commons.wikimedia.org/wiki/File:BTS-Logo_Light_Green.svg, https://commons.wikimedia.org/wiki/File:BTS-Logo_Dark_Green.svg, https://commons.wikimedia.org/wiki/File:BTS-Logo_Gold.svg
  - BTS สยาม เป็นสถานีร่วมของทั้งสองสาย ส่วน BTS สนามกีฬาแห่งชาติอยู่บนสายสีลม (Silom Line สายสีเขียวเข้ม วิ่ง Bang Wa – National Stadium) — https://thailand.go.th/issue-focus-detail/001_01_097
- **สี (อ่านจาก SVG ที่ดาวน์โหลด):** `#005b96` (น้ำเงิน), `#c81518` (แดง), `#212320` (เกือบดำ) — ค่าจากไฟล์ redraw ไม่ใช่ค่าที่ BTSC ประกาศ
- **ใบอนุญาตบน Commons:** ยืนยันจาก snippet ไม่ได้สำหรับไฟล์ `BTS-Logo.svg` โดยตรง ผลค้นหาไม่แสดง licence template ของไฟล์นี้ — https://en.m.wikipedia.org/wiki/File:BTS-Logo.svg. ส่วนไฟล์โลโก้ BTS อีกไฟล์ใน en.wikipedia (`File:BTSbangkok.svg`, จาก http://www.bts.co.th) ถูกระบุว่า "ineligible for copyright… public domain in the United States" แต่ "**believed to be non-free or possibly non-free in its home country, Thailand**" — https://en.wikipedia.org/wiki/File:BTSbangkok.svg. → ให้ถือว่า **ไทยอาจมีลิขสิทธิ์ + เป็นเครื่องหมายการค้า**
- **กฎการใช้แบรนด์ที่เผยแพร่:** ไม่พบ (เข้า bts.co.th ไม่ได้)
- **หมายเหตุ:** อย่าสับสนกับ `File:BTS_logo.svg` ซึ่งเป็นโลโก้วง K-pop BTS — https://commons.wikimedia.org/wiki/File:BTS_logo.svg

## 2. MRT (กรุงเทพฯ) — ควรใช้โลโก้ไหน

- **โครงสร้าง:** MRTA (การรถไฟฟ้าขนส่งมวลชนแห่งประเทศไทย, รฟม.) เป็นเจ้าของระบบ ส่วน BEM (Bangkok Expressway and Metro PCL) เป็นผู้เดินรถสายสีน้ำเงิน; MRTA กับ BEM ลงนามสัญญาสัมปทานสายสีน้ำเงินทั้งสายเมื่อ 31 มี.ค. 2017 — https://www.mrta.co.th/en/chaloem-ratchamongkhon-line, https://en.wikipedia.org/wiki/Blue_Line_(Bangkok). BEM เกิดจากการควบรวม BECL + BMCL เมื่อ 30 ธ.ค. 2015 — https://en.wikipedia.org/wiki/Bangkok_Expressway_and_Metro
- **มีโลโก้อยู่ 3 ตัวที่ต่างกัน:**
  1. **โลโก้ "MRT" ของระบบรถไฟฟ้า** (รูปโดมสีน้ำเงินกับตัว M สีขาว) — `File:MRT_(Bangkok)_logo.svg` อธิบายว่าเป็น "Logo of the Bangkok Metro (MRT)" และถูกใช้ในบทความของสถานีต่าง ๆ รวมถึง Sam Yan — https://commons.wikimedia.org/wiki/File:MRT_(Bangkok)_logo.svg, https://en.wikipedia.org/wiki/Sam_Yan_MRT_station. Commons มีหมวด "Bangkok Metro logos" (24 ไฟล์) ซึ่งรวมรุ่นสีตามสาย (ส้ม/ชมพู/ม่วง/เหลือง) และรุ่นที่มีชื่อ (`MRT_(Bangkok)_logo_with_name.svg`, `..._logo-white_with_name.svg`) — https://commons.wikimedia.org/wiki/Category:Bangkok_Metro_logos, https://commons.wikimedia.org/wiki/File:MRT_(Bangkok)_logo_with_name.svg
  2. **ตราของ รฟม. (MRTA)** — ตราองค์กร กำหนดโดยประกาศกระทรวงลงวันที่ 25 ก.พ. 2002 (ตาม snippet) — https://th.m.wikipedia.org/wiki/ไฟล์:Emblem_of_the_Mass_Rapid_Transit_Authority_of_Thailand-TH.svg, https://commons.wikimedia.org/wiki/File:Emblem_of_the_Mass_Rapid_Transit_Authority_of_Thailand-EN.svg
  3. **โลโก้บริษัท BEM** — `File:Logo-bem.svg` (สร้าง 30 เม.ย. 2020, source คือเว็บไซต์ BEM) — https://commons.wikimedia.org/wiki/File:Logo-bem.svg
- **ข้อสรุป:** สำหรับหมุด MRT สามย่าน ให้ใช้ **โลโก้ MRT (ข้อ 1)** เพราะเป็นเครื่องหมายของ *บริการ* ที่ Wikipedia ใช้ประจำหน้าสถานี (ตรงกับป้ายที่ผู้โดยสารเห็น) ส่วนตรา MRTA และโลโก้ BEM เป็นตราของ*องค์กร* ไม่ใช่ตัวระบุบริการ (หมายเหตุ: ไม่ได้ยืนยันจากภาพถ่ายป้ายสถานี เพราะ network บล็อก ควรตรวจภาพจริงก่อน)
- **สี:** `#1e4f6f` (น้ำเงินเข้ม) + ขาว — อ่านจาก SVG (550 bytes, 256 × 222.6) ซึ่งตรงกับ snippet ของ Commons ที่ว่า "256 × 223 pixels… 550 bytes", อัปโหลด 28 มิ.ย. 2009 — https://commons.wikimedia.org/wiki/File:MRT_(Bangkok)_logo.svg
- **ใบอนุญาตบน Commons:** "consists only of simple geometric shapes or text… does not meet the threshold of originality… therefore in the public domain" (PD-textlogo) + "may be protected as a trademark… you have to ensure that you have the legal right to use it" ({{trademarked}}) — https://commons.wikimedia.org/wiki/File:MRT_(Bangkok)_logo.svg (ผ่าน snippet)
- **กฎการใช้แบรนด์ที่เผยแพร่:** ไม่พบ CI manual ของ รฟม. หรือ BEM ในผลค้นหา

## 3. Rabbit card

- **เจ้าของ:** บัตร Rabbit ออกและจำหน่ายโดย Bangkok Smartcard System Co., Ltd. (BSS) เปิดตัว พ.ค. 2012 ใช้กับ BTS, MRT สายสีเหลือง, MRT สายสีชมพู, BRT — https://en.wikipedia.org/wiki/Rabbit_Card, https://www.btsgroup.co.th/en/update/news-event/106/introducing-the-new-rabbit-smartcard
- **ไฟล์ vector:** **ไม่พบบน Commons** (ผลค้นหา "Rabbit-Logo.svg" เป็นของ Rabbit Telecom ในอังกฤษ ไม่ใช่ของเรา — https://en.wikipedia.org/wiki/File:Rabbit-Logo.svg) ที่มี asset คือ Brandfetch ซึ่งเป็น aggregator ไม่ใช่แหล่งทางการ — https://brandfetch.com/rabbit.co.th. ไม่พบสำเนาใน GitHub
- **สี:** บทความของบุคคลที่สามอธิบายว่า "the distinctive orange Rabbit logo" — https://www.yodpimanriverwalk.com/rabbit-card-bangkok-explained/ (เป็นแหล่งรอง ไม่ใช่ค่าสีทางการ)
- **ข้อกำหนด:** T&C ของ Rabbit Holdings (เครือเดียวกัน) ระบุว่าลิขสิทธิ์/IP ทั้งหมดในเนื้อหาของเว็บไซต์เป็นของ Rabbit Holdings PCL และ "All trademarks displayed on the site are owned and used under license by Rabbit Holdings" — https://www.rabbitholdings.co.th/en/terms-and-conditions (ผ่าน snippet) → **ห้ามดึงไฟล์จากเว็บไซต์ไปใช้เอง**
- **สถานะ:** โลโก้กระต่ายเป็นภาพประกอบ (มีความคิดสร้างสรรค์มากกว่า text logo) จึงน่าจะ**มีลิขสิทธิ์**ด้วย ไม่ใช่แค่เครื่องหมายการค้า

## 4. CU Pop Bus / รถป๊อปจุฬาฯ

- **บริการ:** รถ shuttle ไฟฟ้า ฟรี จ.–ส. 07:00–19:00 ดูตำแหน่งรถได้ในแอป ViaBus — https://www.chula.ac.th/en/about/green-university/cu-shuttle-bus/, https://www.chula.ac.th/news/86321/. รถรุ่นใหม่เป็น EV สีชมพู (NEX/Golden Dragon) แทนรถเก่าสีขาว — https://www.dailynews.co.th/news/1438339/, https://www.bangkokbiznews.com/business/environment/1025184
- **โลโก้:** **ไม่พบโลโก้แยกที่เป็นทางการ** ในหน้าของจุฬาฯ หรือในข่าวที่ค้นเจอ; มีเพจ Facebook "CU POP BUS" (Official CU POP BUS Fan Page) — https://www.facebook.com/CUPOPBUS/ (เปิดดูรูปโปรไฟล์ไม่ได้ ยืนยันไม่ได้)
- **ห้ามใช้พระเกี้ยวแทน:** จุฬาฯ มี CU Brand Resources (Phra Kieo Logo, Chula Logo, CI Guidelines) และประกาศเรื่องตรา/สัญลักษณ์ของส่วนงาน พ.ศ. 2567 — https://www.chula.ac.th/en/about/symbols/identity/. พระเกี้ยวเป็นตราพระราชทาน — https://en.wikipedia.org/wiki/Phra_kiao. เว็บนี้ไม่ใช่ของมหาวิทยาลัย ไม่ควรใช้พระเกี้ยวเป็นไอคอนรถป๊อป (จะดูเหมือนมหาวิทยาลัยรับรอง)
- **ข้อแนะนำ:** ใช้**ไอคอนรถบัสทั่วไปของเราเอง + สีชมพู** พร้อมป้ายข้อความ "CU Pop Bus" แทน

## 5. (ทางเลือก) BMTA / ขสมก.

- มีบน Commons: `BMTA_Logo2014-en.svg` (โลโก้ 2014–ปัจจุบัน, 1200 × 1400, 30 KB), `BMTA_Logo1992-th.svg` (ใช้ 1992–2014), `BMTA_Eng_Logo.svg` — https://commons.wikimedia.org/wiki/File:BMTA_Logo2014-en.svg, https://commons.wikimedia.org/wiki/File:BMTA_Logo1992-th.svg, https://commons.wikimedia.org/wiki/File:BMTA_Eng_Logo.svg
- ใบอนุญาต/ที่มาของไฟล์: ยืนยันไม่ได้ (บล็อก) ไม่พบสำเนาใน GitHub — ดาวน์โหลดไม่ได้

## กฎหมาย: การใช้แบบ "nominative" ในไทย

- เครื่องหมายการค้าในไทยอยู่ภายใต้ พ.ร.บ.เครื่องหมายการค้า พ.ศ. 2534 — https://www.ipthailand.go.th/images/781/___.___1_1.pdf. ข้อยกเว้นแบบ fair use ที่เขียนไว้ในกฎหมายมีแค่มาตรา 47 (ใช้ชื่อตัวเอง/ชื่อสถานที่ประกอบธุรกิจโดยสุจริต หรือ "bona fide description of the character or quality of his goods") ไม่มีหลัก "nominative fair use" ชัดเจนแบบสหรัฐฯ — https://www.mondaq.com/guides/results/5/1210/all/thailand-trademarks
- โลโก้ในไทยฟ้องร้องได้ทั้งตาม พ.ร.บ.เครื่องหมายการค้า และ พ.ร.บ.ลิขสิทธิ์ — https://www.lawplusltd.com/2019/01/logo-can-protected-trademark-copyright-thailand/ → สถานะ "PD-textlogo" บน Commons (ซึ่งตัดสินตามกฎหมายสหรัฐฯ) **ไม่ได้รับประกัน**ว่าในไทยไม่มีลิขสิทธิ์ (ดูกรณี BTSbangkok.svg ข้างบน)
- หลัก nominative use ทั่วไป (สหรัฐฯ, ใช้เป็นแนวปฏิบัติที่ดี): (1) ระบุบริการไม่ได้ถ้าไม่ใช้เครื่องหมาย (2) ใช้เท่าที่จำเป็น (3) ไม่สื่อว่าได้รับการสนับสนุน/รับรอง — https://en.wikipedia.org/wiki/Nominative_use
- การใช้โลโก้บนหมุดสถานีเพื่อบอกว่า "นี่คือสถานี BTS" เป็นการใช้เพื่อระบุบริการ ไม่ได้ขายสินค้า/บริการแข่งขัน และเป็นโครงการนักศึกษาไม่แสวงหากำไร ความเสี่ยงจึงต่ำ แต่**ไม่เป็นศูนย์** และไม่มีการอนุญาตอย่างชัดแจ้งจากเจ้าของ

## Recommendation

**ไฟล์ที่ควรใช้**

| แบรนด์ | ใช้ไหม | ไฟล์ | หมายเหตุ |
|---|---|---|---|
| BTS | ใช้ | `BTS-Logo.svg` (Commons) — สำเนาใน scratchpad `bts-logo.commons-mirror.svg` | redraw, ไทยอาจ non-free |
| MRT | ใช้ | `MRT_(Bangkok)_logo.svg` (Commons) — สำเนา `mrt-bangkok-logo.commons-mirror.svg` | PD-textlogo + trademarked; ไม่ใช้ตรา รฟม./BEM |
| Rabbit | **ยังไม่ใช้** | — | ไม่มีไฟล์ที่ใบอนุญาตชัด; ใช้ข้อความ "Rabbit" + ไอคอนบัตรทั่วไป จนกว่าจะได้รับอนุญาต |
| CU Pop Bus | โลโก้จากเพจ CU POP BUS (เจ้าของเว็บส่งมา 2026-10-03) | `public/logos/cu-pop-bus.jpg` บนคู่มือรถป๊อป (.scratch/more-know-how) | ห้ามใช้พระเกี้ยว |
| BMTA | ทางเลือก | `BMTA_Logo2014-en.svg` (ยังไม่ได้ดาวน์โหลด) | ต้องยืนยันใบอนุญาตก่อน |

**ขนาด**
- map pin: 20–24 px (ในวงกลม marker ~32 px) — โลโก้ MRT อ่านออกที่ขนาดนี้ (โดม+M); โลโก้ BTS มีรายละเอียดเยอะกว่า ควรทดสอบที่ 20 px ก่อน
- Place card: 32–40 px; Guide header: 48–64 px
- ใช้ SVG ตรง ๆ, ห้ามเปลี่ยนสี/ยืด/ครอป/ใส่เงา, เว้นที่ว่างรอบโลโก้อย่างน้อย ~1/4 ของความสูง, พื้นหลังสีขาวในหมุด (dark mode: ใส่วงกลมขาวรองไว้ แทนการ invert สี)
- ลบ metadata ของ Inkscape ออกจาก BTS SVG (เช่นด้วย SVGO) ได้ แต่ห้ามแก้ path/สี

**ข้อความ attribution (แนะนำ ใส่ใน footer หรือหน้า "เกี่ยวกับ")**
> "BTS" และโลโก้ BTS เป็นเครื่องหมายการค้าของ บริษัท ระบบขนส่งมวลชนกรุงเทพ จำกัด (มหาชน); "MRT" และโลโก้ MRT เป็นเครื่องหมายของ การรถไฟฟ้าขนส่งมวลชนแห่งประเทศไทย ใช้เพื่อระบุบริการเท่านั้น เว็บไซต์นี้เป็นโครงการนักศึกษา ไม่แสวงหากำไร ไม่มีส่วนเกี่ยวข้องและไม่ได้รับการรับรองจากเจ้าของเครื่องหมายใด ๆ (ไฟล์โลโก้จาก Wikimedia Commons)

(ข้อความเจ้าของเครื่องหมาย MRT เป็นการอนุมานจากการที่ รฟม. เป็นเจ้าของระบบ ไม่ได้ยืนยันจากเอกสารจดทะเบียน ถ้าไม่แน่ใจให้เขียนกลาง ๆ ว่า "เป็นเครื่องหมายของเจ้าของที่เกี่ยวข้อง")

**ความเสี่ยง / สิ่งที่ต้องทำต่อ**
1. เปิดหน้า Commons ของ `BTS-Logo.svg` และ `MRT_(Bangkok)_logo.svg` ยืนยัน licence template แล้วดาวน์โหลดจาก upload.wikimedia.org บนเครื่องที่ network เปิด เทียบ sha256 กับสำเนาใน scratchpad
2. ตรวจภาพถ่ายป้ายสถานีสามย่าน/สยาม/สนามกีฬาฯ ปัจจุบัน ว่าโลโก้ตรงกับไฟล์ (โลโก้ BTS อาจมีการปรับรูปลักษณ์)
3. BTS: Wikipedia ระบุว่าอาจ non-free ในไทย — ถ้าอยากปลอดภัยที่สุด ส่งอีเมลขออนุญาต BTSC/รฟม. (โครงการนักศึกษามักได้รับอนุญาตง่าย) หรือมี fallback เป็นไอคอนรถไฟ + ข้อความ "BTS"
4. ถ้าเจ้าของขอให้เอาออก ให้เอาออกทันที — ออกแบบให้ swap โลโก้กลับเป็นไอคอนทั่วไปได้ด้วย config เดียว
5. ห้ามวางโลโก้ใกล้กับโลโก้ของ "ตั้งหลัก" ในลักษณะที่ดูเป็น partnership (เช่นแถว "ร่วมกับ")

## ไฟล์ที่ดาวน์โหลด (อยู่นอก repo)

`/tmp/claude-0/-home-user-being-human-new-world/e496bc1a-4965-5512-900e-626d12ecacad/scratchpad/logos/`
- `bts-logo.commons-mirror.svg` — SVG (Inkscape), 8,385 bytes, 201.76 × 241.63, sha256 `a6aafbe4…ff31` — จาก https://raw.githubusercontent.com/CazadorHT/realestate-crm/HEAD/public/images/transit/BTS-Logo.svg
- `mrt-bangkok-logo.commons-mirror.svg` — SVG, 550 bytes, 256 × 222.6, sha256 `90cc3151…8713` — จาก https://raw.githubusercontent.com/CazadorHT/realestate-crm/HEAD/public/images/transit/MRT_(Bangkok)_logo.svg

## Done (2026-10-02)

- `public/logos/bts.svg` and `public/logos/mrt.svg` are the two mirror files above, **byte for byte** (sha256 `a6aafbe487dbd267924f8af506fc9b1783192c38c8a5086f65f3e218ec76ff31` and `90cc3151dfa36b2d29bb7aee90d73cd96ec7c903bb69b4157bd1c7e359348713`). Inkscape metadata was left in: browsers scale both files fine without a `viewBox`.
- Shown on: the map pins of MRT สามย่าน, BTS สยาม and BTS สนามกีฬาแห่งชาติ (logo on the white disc, ringed in the transport colour), those Places' cards and list rows, and the Guides `rabbit` (BTS) and `mrt` (MRT), on `/guides` and on their own pages. Always on white, never recoloured. Rabbit keeps our own icon; no Phra Kiao anywhere. (2026-10-03: the owner supplied the CU POP BUS logo from its page; it now shows on the `pop-bus` Guide, see .scratch/more-know-how/spec.md Q7–Q8.)
- One switch turns them all off: `NEXT_PUBLIC_LOGOS=off` (named `NEXT_PUBLIC_TRANSIT_LOGOS` until shop logos joined, `.scratch/map-polish/`) at build time (`lib/brands.ts`). The footer line saying the marks are their owners' shows only while logos are on. The map page has no footer, so the line shows on every other page.
- **Before the pitch:** on a machine with an open network, download `File:BTS-Logo.svg` and `File:MRT_(Bangkok)_logo.svg` from upload.wikimedia.org, run `sha256sum` on them and on `public/logos/*.svg`, and check the hashes match. If they don't, diff the paths, and confirm the licence templates on both Commons pages (step 1 of the risks above).
