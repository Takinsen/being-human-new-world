Status: needs-triage

# Desk research: Household (งานบ้าน) Place candidates around Chula

Researched 2026-10-03 for the Household category (laundry, drinking water, rubbish, everyday supplies). Today there is only one Household Place (`samyan-mitrtown-supermarket`).

## How this was researched, and how far to trust it

- **WebFetch was blocked on every site tried.** The proxy refused Google Maps, Wongnai, Lemon8, Openrice, Longdo Map, Samyan Mitrtown, Siam Paragon, Otteri, Salehere, SoiDB, Getoccupi, LaundryAtlas and Wikipedia, and thailandlaundry.com would not resolve. **Every fact below comes from WebSearch result snippets**, which are the search tool's own summaries of the pages. Each URL is the page the snippet came from, but no page was opened. Before anything ships, open the URL or check on the spot.
- **Coordinates.** "GMaps" means the lat/lng was read from the `!3d…!4d…` part of a Google Maps place URL in the search results. "Plus code" means it was decoded from an Open Location Code given in a listing. "Wikipedia" means the coordinates were quoted in a snippet. "Same building" reuses a pin already in `content/places.ts`. **"Estimate"** means the team should place the pin on the spot.
- **Prices.** Each price below has a source and a date. If no date is shown, the snippet did not give one. Per CONTEXT.md, a price without a Price Check is never shown as a number.

---

## 1. Laundry (ซักผ้า)

### 1.1 Otteri ไอแอมปาร์ค (Otteri wash & dry I'm Park Chula). The strongest candidate
- **What it's for:** ร้านซักผ้าหยอดเหรียญ 24 ชม. มีเครื่องอบ ใกล้อุทยาน 100 ปี
- **Where:** I'm Park Chula, 353 ซอยจุฬาฯ 9. I'm Park sits next to the Chula Centenary Park (อุทยาน 100 ปี), and Zy Walk is right next to it.
- **lat/lng:** 13.74003, 100.52530 (GMaps place URL).
  - One listing (intravel.net) gives I'm Park as 13.73495, 100.52466. That is about 600 m south, which doesn't fit "next to the Centenary Park" (Wikipedia gives the park as 13.73942, 100.52417). **Use the GMaps pin.**
- **Hours:** 24 hours (GMaps snippet).
- **Price:**
  - From 15 Jan 2024 (all branches nationwide), the 9, 10 and 28 kg washers still **start at 40 baht**. The 13/14/17/18 kg washers went up about 10 baht; for example, a 14 kg cold wash went from 50 to 60 baht. Sources: Matichon, Prachachat and PPTV, Dec 2023.
  - Dryer **40 baht**, from GMaps review snippets with no date.
  - The existing `coin-laundry` guide's 40 baht (checked 2024-01) is consistent with this.
- **Know-how:**
  - It uses Otteri coins. A changer takes 20/50/100-baht notes and 1/2/5/10-baht coins, and the shop sells detergent and softener (GMaps snippet).
  - A wash takes about 30 minutes. Reviewers say they wait upstairs at the cafés and eateries.
  - Lotus's go fresh is in the same building.
- **Caution:** The "wash after midnight, 10 baht off" promo ran 1 May 2023 to 30 Apr 2025 (Salehere) and **has ended**. Whatever promo runs now is unconfirmed, so don't publish a night discount.
- Sources:
  - https://www.google.com/maps/place/Otteri/@13.7315435,100.5037609,14.44z/data=!4m10!1m2!2m1!1zb3R0ZXJpIOC5g-C4geC4peC5ieC4ieC4seC4mQ!3m6!1s0x30e29903e266b39d:0xa5dff2c6a67aa9b3!8m2!3d13.7400345!4d100.5252956!15sChxvdHRlcmkg4LmD4LiB4Lil4LmJ4LiJ4Lix4LiZIgOQAQGSAQ9sYXVuZHJ5X3NlcnZpY2XgAQA!16s/g/11fmxqvss5
  - https://www.matichon.co.th/social/news_4313315
  - https://www.prachachat.net/hilight-prachachat/news-1452049
  - https://salehere.co.th/otteri-wash-and-dry/promotions/after-midnight-discount-10-baht
  - https://loco24park.com/car-parking/im-park-chula-car-parking/ and https://www.wongnai.com/reviews/db1b8c17b6e44c01adc1079f13d72734 (I'm Park location: snippets say it is next to the Centenary Park)
  - https://intravel.net/bangkok/shopping/im-park-chula (gave the conflicting lat/lng)
  - https://en.wikipedia.org/wiki/Chulalongkorn_University_Centenary_Park

### 1.2 U laundry@CU, in U-Center (ยูเซ็นเตอร์), ซอยจุฬาฯ 42
- **What it's for:** ร้านซักอบหยอดเหรียญใต้หอ U-Center ฝั่งคณะนิติฯ ใกล้สามย่าน
- **Where:** 198 ซอยจุฬาฯ 42. U-Center is a small student mall with dorms, opposite the entrance to Chamchuri 9, with a 7-Eleven and banks. Yathar lists "U laundry@CU" at this address, and a directory lists a "24 hours coin laundry" at the same number.
- **lat/lng:** 13.73504, 100.52698 (search snippet for U Center 1, apparently Google/Waze data). The laundry's exact spot inside the building is unknown.
- **Hours:** 24 hours, per a directory flagged "accuracy score below 50, data may be outdated". **Check on the spot.**
- **Price:** not found. The U laundry app takes bookings and payment through an in-app wallet.
- **Caution:** The listing quality is low. Confirm that the shop exists and is open before adding it.
- Sources:
  - https://yathar.com/shop/13424
  - https://www.waze.com/live-map/directions/th/krung-thep-maha-nakhon/u-center-1?to=place.ChIJIaEFhCqZ4jARuAopFuQfbS0
  - https://play.google.com/store/apps/details?id=com.ulaundry.app&hl=en_US

### 1.3 Trendy Wash สาขาสามย่าน, ซอยจุฬาฯ 48
- **What it's for:** ร้านสะดวกซัก 24 ชม. เครื่อง LG จ่ายผ่านแอปได้
- **Where:** 116 ซอยจุฬาฯ 48, according to LaundryAtlas. The same address is also listed as a generic "ซักผ้าหยอดเหรียญ" rated 3/5, and Trendy Wash's own site also has an "Ideo Q Chula-Samyan" branch page.
- **lat/lng:** **not found.** Going by the soi numbers, it is probably between Chula soi 42 and Rama IV. Place the pin on the spot.
- **Hours:** 24/7 (LaundryAtlas, and Trendy Wash says all its branches are 24 hours).
- **Price:** not confirmed. A Lemon8 post covers 14/18 kg prices, but the snippet didn't carry the numbers.
- **Caution:** It isn't clear whether "สาขาสามย่าน" (soi 48) and "Ideo Q Chula-Samyan" (on Rama IV, Bang Rak side) are the same shop or two different ones.
- Sources:
  - https://laundryatlas.com/th/bangkok/siam/siam-27
  - https://trendywash.co/branche/ideo-samyan/
  - https://trendywash.co/branches/
  - https://www.lemon8-app.com/@ffai.ifaii/7291297004813042178?region=th

### 1.4 Wash Hub, ถนนบรรทัดทอง
- **What it's for:** ร้านซักอบหยอดเหรียญริมถนนบรรทัดทอง
- **Where:** Plus code PGQC+FM2, Banthat Thong Rd (LaundryAtlas). Wash Hub has other Bangkok branches; its Facebook pages are WashHubLaundromat and WashHubCoinLaundry.
- **lat/lng:** 13.73864, 100.52164, decoded from the plus code PGQC+FM2 with Bangkok as the reference area. That puts it on Banthat Thong at about the Chula soi 20 latitude, which is plausible.
- **Hours / price:** not found. Rated 3.1/5.
- Sources:
  - https://laundryatlas.com/th/bangkok/siam/wash-hub-siam
  - https://www.facebook.com/WashHubLaundromat/

### 1.5 Quik Laundry, ซอยจุฬาฯ 12
- **What it's for:** ร้านซักผ้าหยอดเหรียญ 24 ชม. ฝั่งบรรทัดทองตอนบน
- **Where:** 987 ซอยจุฬาฯ 12 (directory snippets). One snippet names "Mind Laundry" at the same address, so the shop may have been renamed, or the two names may be mixed up.
- **lat/lng:** **not found.** Estimate: Chula soi 12 is between soi 5 (near the Centenary Park) and soi 20, but this is unverified.
- **Hours:** 24/7. The Facebook page mentions coin changers and detergent vending.
- **Price:** not found.
- Sources:
  - https://www.facebook.com/quiklaundromat/
  - https://thailandlaundry.com/city/bangkok-laundries.en.html (did not resolve; seen only in a snippet)

### 1.6 Fabliss, Block 28. Premium wash, iron and dry clean (not coin-operated)
- **What it's for:** ร้านซักรีด/ซักแห้งแบบมีพนักงาน ไว้ส่งสูท ชุดนิสิตตัวดี
- **Where:** a branch at Block 28 จุฬาฯ (search snippet). **lat/lng not found.**
- **Price / hours:** not found. Contact +66 88 619 6618.
- **Note:** This is a higher-end service, not a cheap one. Treat it as an option, not a default.
- Sources:
  - https://www.facebook.com/Fabliss.laundry/
  - https://www.fablisslaundry.com/

### 1.7 Laundry inside the university dorms (หอใน). Not a pin, but useful know-how
- CU I-House (เรือนวิรัชมิตร) lists a coin-operated wash and dry room.
- A Lemon8 review of the Phudtan building (ตึกพุดตาน, หอในจุฬาฯ) says there are 2 washers and 2 dryers per floor, and a wash costs **20 baht**. The post is from about 2025 and its exact date is unknown.
- Sources:
  - https://www.sa.chula.ac.th/cu-i-house/
  - https://www.lemon8-app.com/@jeesr_r/7515502868716290567?region=th

### Gap: wash-and-fold (ซักอบพับ) by the kilo
- **No Chula-area shop with a per-kg price was found.**
- The only figures are Bangkok-wide: local shopfront wash-and-fold at 60–90 baht/kg, and pickup services at about 100 baht/kg plus a fee. These come from laundry-service-bangkok.com, a commercial pickup service, so they are biased and undated (2026 page).
- A Thai snippet gives an average of 70–150 baht/kg, but its source isn't clear.
- None of these should be shown as a number. This needs an on-the-spot Price Check (Banthat Thong and Chula soi 20s–40s shophouses).
- Sources:
  - https://www.laundry-service-bangkok.com/pricing
  - https://metamorphosis.waddat.com/laundry-tips-for-tourists-bangkok

---

## 2. Drinking water (น้ำดื่ม)

### 2.1 Free water dispensers from PMCU, "Fresh is Free". The strongest find for this section
- **What it's for:** ตู้กดน้ำดื่มฟรี พกขวดไปเติมได้ทั้งวัน
- **Where:** PMCU (Chula's property office) has installed free water dispensers around Siam–Samyan, at three named points:
  - **อุทยาน 100 ปี จุฬาฯ (ลานข้างร้านชาตรามือ).** Centenary Park, by the Cha Tra Mue shop. lat/lng: **estimate** 13.7394, 100.5242. That is the park's centre from Wikipedia; the dispenser itself is by the Cha Tra Mue shop, so check exactly where.
  - **สามย่าน (ใต้อาคาร U-Center).** Under the U-Center building. lat/lng: 13.73504, 100.52698 (U-Center, see 1.2).
  - **สนามเทพหัสดิน.** Thephasadin Stadium, inside the National Stadium grounds. lat/lng: **estimate** around 13.746, 100.527. Not verified.
- **Date:** The PMCU news item number (33248) sits just below one about Chinese New Year 2569 (Feb 2026, no. 33275), so it probably dates from late 2025 or early 2026. The page itself wasn't seen.
- **Know-how:** Bring your own bottle. Each dispenser covers drinking water for a day, and a big refill still means buying packs.
- Source: https://pmcu.co.th/news/33248/

### 2.2 Water dispensers on campus (Chula Zero Waste)
- Chula Zero Waste has installed free dispensers on campus, including in the main canteens (7 canteens are named). The counts in snippets don't agree: 130+ dispensers, or 40+ new plus 30 old stainless ones.
- **No per-building list was found**, so this doesn't fit one pin. It might fit a Note or a Guide line instead: "ในจุฬาฯ มีตู้กดน้ำฟรี พกขวดไปเติม" (there are free water dispensers in Chula, bring a bottle).
- Sources:
  - https://mgronline.com/greeninnovation/detail/9610000053773
  - https://www.chula.ac.th/news/55338/

### 2.3 Coin water machines (ตู้น้ำหยอดเหรียญ). No concrete locations found
- The only hit near dorms is a hostel listing ("Banthat Thong Hostel", opposite Chula soi 28) that mentions a coin water machine **inside the building**. It is not public, so not a Place.
- The existing `drinking-water` guide line "9 ใน 10 ตู้ไม่มีใบอนุญาต" (9 in 10 machines have no licence) checks out:
  - The Foundation for Consumers (มูลนิธิเพื่อผู้บริโภค) and the Thailand Consumers Council (สภาองค์กรของผู้บริโภค) checked 1,530 machines in 33 districts, 15–31 Aug 2022.
  - 90% showed no licence, and 91% showed no water-quality report.
  - Sources: https://www.thecoverage.info/news/content/4029 and https://www.thaipbs.or.th/news/content/271950
- **Know-how worth adding:**
  - The BMA health department puts a sticker on the side of licensed machines. It shows the date the filter was changed and the date the water was tested.
  - Also check that the water's colour, smell and taste are normal (BMA/Matichon snippet; date of the sticker scheme unknown).
  - In Oct 2025 the BMA Council accepted a draft ordinance on coin water machines. Its current status is unknown.
  - Sources: https://www.matichon.co.th/local/quality-life/news_942747 and https://www.hfocus.org/content/2025/10/35611
- **Gap:** No public coin water machine or water shop (ร้านน้ำถัง ส่งถึงหอ, a shop that delivers big bottles to the dorm) was found near Banthat Thong or Chula soi. This needs an on-the-spot survey.

---

## 3. Supermarkets and everyday supplies (ของใช้เข้าห้อง)

### 3.1 Big C Food Place สามย่านมิตรทาวน์. This is the current Household Place; give it a name and hours
- **What it's for:** ซูเปอร์ฯ เปิด 24 ชม. ใกล้จุฬาฯ ที่สุด ซื้อน้ำแพ็ค ผงซักฟอก ของสดได้ตอนดึก
- **Where:** B1, room B1U001, Samyan Mitrtown. It is part of the mall's 24-hour zone, which also has a 7-Eleven, the 24-hour study space Samyan Co-Op, and fast food.
- **lat/lng:** same building as the existing pin, 13.7334, 100.5289.
- **Hours:** 24 hours (Wongnai, Mindtrip and Openrice snippets). The rest of the mall is 10:00–22:00.
- **Know-how:** About 50% of the floor is fresh food (Wongnai), so it carries less household stock than a Big C hypermarket.
- **Suggestion:** Rename the existing Place to "บิ๊กซี ฟู้ดเพลส สามย่านมิตรทาวน์" and put "เปิด 24 ชม." in the summary.
- Sources:
  - https://www.wongnai.com/restaurants/459102IA-big-c-foodplace-samyan-mitrtown
  - https://mindtrip.ai/attraction/bangkok-thailand/big-c-foodplace-samyan-mitrtown/at-2zalioLq
  - https://www.facebook.com/BigCSamyanMItrtown/
  - https://discoveringbangkok.com/samyan-mitrtown-an-urban-lifestyle-mall-with-a-24-hours-zone/

### 3.2 Lotus's go fresh จามจุรีสแควร์
- **What it's for:** ซูเปอร์ฯ ขนาดกลาง เดินจาก MRT สามย่านได้ไม่ต้องขึ้นมาข้างบน
- **Where:** Floor B, unit B07, Chamchuri Square. It connects to MRT Samyan underground.
- **lat/lng:** 13.73278, 100.53056 (Chamchuri Square, Wikipedia).
- **Hours:** 07:00–22:00 (Foursquare snippet) or 07:00–21:00 (Mindtrip snippet). **The sources conflict, so check.**
- **Know-how:** You can buy small bunches of vegetables by weight. Bring your own bag (Mindtrip snippet).
- Sources:
  - https://th.foursquare.com/v/lotuss-go-fresh-%E0%B9%82%E0%B8%A5%E0%B8%95%E0%B8%AA-%E0%B9%82%E0%B8%81-%E0%B9%80%E0%B8%9F%E0%B8%A3%E0%B8%8A/4ba85af7f964a520d7d739e3
  - https://mindtrip.ai/attraction/bangkok-thailand/lotuss-go-fresh-supermarket-charmchuri-square/at-axcFaIdA

### 3.3 Lotus's go fresh ไอแอมปาร์ค
- **What it's for:** ซูเปอร์ฯ เล็ก ฝั่งบรรทัดทอง ซักผ้าที่ Otteri แล้วแวะซื้อของได้เลย
- **Where:** I'm Park Chula, 353 Chula soi 9, next to Otteri.
- **lat/lng:** same building as Otteri, 13.7400, 100.5253 (estimate).
- **Hours:** 10:00–21:00 daily (search snippet; the Longdo Map page wasn't opened).
- Sources:
  - https://map.longdo.com/main/p/A10844932/info
  - https://wanderlog.com/place/details/9114540/jungle-cafe-lotuss-go-fresh-im-park

### 3.4 Daiso (ไดโซะ). Three branches nearby
- **What it's for:** ของใช้จุกจิกเข้าห้อง กล่อง ไม้แขวน ที่คว่ำจาน ส่วนใหญ่ราคาเดียว
- **Branches:**
  - Samyan Mitrtown **B1** (B1U016–017). A large shop in pink tones; a 2025 review says "some prices are a bit high, choose carefully".
  - Chamchuri Square **2nd floor** (tel. 02-160-5179). **Not confirmed open in 2025–2026.**
  - MBK Center **4th floor**.
- **lat/lng:** same buildings: Samyan Mitrtown 13.7334, 100.5289; Chamchuri 13.7328, 100.5306; MBK estimate 13.7446, 100.5300.
- **Price:** items "start at 60 baht" (several Lemon8 posts, 2023–2026). Not every item is 60.
- **Caution:** The Daiso at Siam Square One shows as **"Now Closed"** on Foursquare, so don't use it.
- Sources:
  - https://salehere.co.th/daiso/promotions/shopping-sep-2019
  - https://salehere.co.th/daiso/branches/chamchuri-square
  - https://ph.openrice.com/th/bangkok/r-daiso-%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-r1783340
  - https://foursquare.com/v/daiso-%E0%B9%84%E0%B8%94%E0%B9%82%E0%B8%8B/4b5aba3cf964a52045d228e3
  - https://www.lemon8-app.com/@time.to.journey/7308600364675121666?region=th

### 3.5 MR.DIY เอ็มบีเค. Home goods and basic hardware
- **What it's for:** ของใช้ในบ้าน เครื่องมือช่างพื้นฐาน ปลั๊กพ่วง หลอดไฟ ราคาถูก
- **Where:** MBK Center, **5th floor**, store no. 378 (MR.DIY Thailand store-openings page).
- **lat/lng:** **estimate** 13.7446, 100.5300 (MBK, next to BTS National Stadium).
- **Hours:** 10:00–19:00 per the store-opening announcement. That seems early for a mall, so **check it**.
- No MR.DIY was found at Samyan Mitrtown, Chamchuri Square or Siam.
- Sources:
  - https://www.mrdiy.co.th/en/updates/store-openings/1167/no-378-mbk-center
  - https://www.ryt9.com/s/prg/3268731

### 3.6 Tops เอ็มบีเค
- **What it's for:** ซูเปอร์ฯ ในมาบุญครอง ใกล้ฝั่งบรรทัดทองตอนบน/สนามกีฬา
- **Where:** MBK Center, G floor, zone B (MBK's own blog).
- **lat/lng:** estimate 13.7446, 100.5300.
- **Hours:** 10:00–22:00 (Wanderlog) or 08:00–20:00 (another snippet). **The sources conflict.**
- Sources:
  - https://www.mbk-center.co.th/blog/mbk-topsupermarket-review-2021/
  - https://wanderlog.com/place/details/604/tops-mbk-center

### 3.7 Gourmet Market สยามพารากอน. Low priority
- **What it's for:** ซูเปอร์ฯ ใหญ่ ของนำเข้าเยอะ แต่แพงกว่าที่อื่น
- **Where:** Siam Paragon GF. Hours 10:00–22:00.
- **lat/lng:** estimate 13.7462, 100.5348 (next to BTS Siam, 13.7456, 100.5347).
- **Note:** It is expensive for stocking a room. Only useful as "ถ้าหาอะไรที่อื่นไม่ได้" (if you can't find it anywhere else).
- Source: https://www.siamparagon.co.th/directory/shop/343

### Notes on others asked about
- **MaxValu.** Central Retail bought AEON Thailand, and MaxValu dropped its name after 30 Sep 2026; its stores become Tops. One snippet places a 24-hour MaxValu below Ideo Q Chula-Samyan on Rama IV, but another says the nearest MaxValu Tanjai is 1.3 km away. **Unconfirmed; skip it.**
  - Sources: https://www.nationthailand.com/business/corporate/40071498 and https://thethaiger.com/news/business/central-retail-snaps-up-30-maxvalu-branches
- **Watsons / Boots.** One snippet puts Boots on the 2nd floor of Samyan Mitrtown, and Watsons has a flagship at Siam Square. These are pharmacy and personal-care shops, a better fit for Health. Not pursued further.
- **Siam Square One.** No supermarket was confirmed there; snippets mix it up with Gourmet Market at Paragon.

---

## 4. Key cutting, shoe repair, clothes repair, tailors

### 4.1 แมกนาโน่ (Magnano) สามย่านมิตรทาวน์. Key cutting and watch repair
- **What it's for:** ปั๊มกุญแจห้อง กุญแจตู้ เปลี่ยนถ่านนาฬิกา
- **Where:** B1, in front of the lift on the NORTH side, before the toilets. Branch phone 085-234-1214.
- **lat/lng:** same building, 13.7334, 100.5289.
- **Hours:** daily 10:00–22:00 (Magnano site snippet). A Lemon8 post says 10:00–20:00. **The sources conflict.**
- **Know-how:** The Lemon8 post says that if a copied key doesn't work, they fix it or redo it for free.
- **Caution:** Ask the dorm before copying a room key; some don't allow it. This is general know-how, not from a source.
- Sources:
  - https://magnano.com/ourbranch/
  - https://salehere.co.th/magnano/branches/samyan-mitrtown
  - https://www.lemon8-app.com/@pinepine_u/7331006956314460674?region=us

### 4.2 Mister Minit, Siam Paragon. Shoe repair and key cutting
- Foursquare lists "Mister Mini service Shoes Repair & Key Cutting" at Siam Paragon.
- Floor, hours and price were not found. Whether it is still open in 2025–2026 is **uncertain**.
- Source: https://foursquare.com/v/mister-mini-service-shoes-repair--key-cutting/4ee7202b99119449037d6a6b

### 4.3 นพชูส์ (Nop Shoes). A long-standing Samyan shoemaker; repair not confirmed
- A family shoe shop that has "served Chula for 100 years" (VoiceTV). It makes and sells handmade leather shoes. **Whether it repairs shoes is not confirmed.**
- **Location is uncertain:** Yellowpages gives 1563 ซอยจุฬาฯ 15, while Khaosod (2019) reports it was brought into Samyan Mitrtown when the mall opened.
- **Gap:** no confirmed cheap street cobbler (ช่างซ่อมรองเท้า) was found near Chula.
- Sources:
  - https://www.voicetv.co.th/read/505660
  - https://www.khaosod.co.th/sentangsedtee/featured/article_127893
  - https://www.yellowpages.co.th/profile/นพชูส์-92rXR5lzx

### 4.4 Clothes repair and alterations (ร้านแก้ผ้า). Not found
- No alteration shop in Samyan, Banthat Thong or the Chula soi showed up in search. This needs an on-the-spot survey or a Note from a Senior.

### Gap: general hardware shop (ร้านฮาร์ดแวร์ / วัสดุ)
- Nothing local was found. Searches returned only online and wholesale sellers outside the area. MR.DIY at MBK (3.5) is the only confirmed option.

---

## 5. Probably not Household. Flagged separately

These are things a Newcomer needs, but they may belong in another category or need a new one. The team should decide.

### 5.1 Post and parcels (ไปรษณีย์ / ส่งพัสดุ)
- **ไปรษณีย์จุฬาลงกรณ์ (Chulalongkorn Post Office, postcode 10332).**
  - In the Chamchuri 9 building, ซอยจุฬาฯ 42 side.
  - Hours: Mon–Fri 08:30–17:00, Sat 08:30–12:00. Tel. 02-216-0232.
  - lat/lng: same building as the CU health service pin, 13.736, 100.5257 (estimate, since only the building is known).
  - Sources: https://www.odoojob.com/webboard/app.php/m_thaipost/detail/379 and https://www.noplink.com/postcode_p.php?p=10332
- **ร้านไปรษณีย์ รองเมือง 201 (Chamchuri Square).**
  - Room 230/1, 2nd floor.
  - Hours conflict: Mon–Fri 10:00–19:00 and Sat 10:00–14:00 (odoojob), or Mon–Fri 08:30–17:00 and Sat 08:30–12:00 (another snippet).
  - lat/lng: same building, 13.7328, 100.5306.
  - A Pantip thread says some "ร้านไปรษณีย์" counters near Chula are privately run and charge more. Treat that as a hint, not a fact.
  - Sources: https://www.odoojob.com/webboard/app.php/m_thaipost/detail/374, http://www.lunlaa.com/th/shop/16484/ and https://pantip.com/topic/34090878
- **ไปรษณีย์ สาขาจุฬาฯ ซอย 16, at Zy Walk.**
  - B09 (188/8). Zy Walk is the Chinese-style mall next to I'm Park.
  - Open **every day 09:00–18:00**, last dispatch 16:00. Tel. 063-098-1217.
  - lat/lng: **estimate** about 13.740, 100.525 (next to I'm Park).
  - Source: Pantip/Thailand Post snippets, https://pantip.com/topic/37404794
  - Zy Walk location: https://cheechongruay.smartsme.co.th/content/649/
- **เคาน์เตอร์ไปรษณีย์ สยามสแควร์วัน (Siam Square One post counter).**
  - Room TA LG 001–003. Open **every day 10:00–20:00**. Tel. 02-251-8162.
  - Source: https://www.kasettambon.com/webboard/app.php/m_thaipost/detail/1431
- **Kerry/KEX at Samyan Mitrtown's 24-hour zone.**
  - Listed in 2019-era mall guides. **Not confirmed in 2025–2026**, since KEX has changed a lot since then.
  - Source: https://discoveringbangkok.com/samyan-mitrtown-an-urban-lifestyle-mall-with-a-24-hours-zone/

### 5.2 University uniform shops (ร้านชุดนิสิต)
- **ร้านนิสิต (Samyan).** Near MRT Samyan exit 1; turn left after coming up.
  - Shirt about 350–400 baht, skirt about 950–1,000 baht. A Lemon8 post says about 10–15 minutes to get fitted. Dates are about 2023–2024 and not confirmed.
  - **มุมทอง** is another shop near Samyan, with a branch at MBK.
- This probably belongs under a first-week Checklist item, not Household.
- Sources:
  - https://www.lemon8-app.com/@cake43547/7345810559264391681?region=us
  - https://www.lemon8-app.com/pitchadailylife/7103059538131026434?region=us

### 5.3 Bulky rubbish (ขยะชิ้นใหญ่). Fits the existing `rubbish` guide, not a Place
- The BMA runs free "นัดทิ้ง นัดเก็บ ขยะชิ้นใหญ่" (scheduled bulky-waste pickup) on announced weekends across most districts, for mattresses, furniture and broken appliances. Rounds in 2026 included 18–19 Apr, 9–10 May, 16–17 May and 30–31 May.
- Put items out before 08:30; they are collected 09:00–12:00. Ask the district office to confirm the day.
- One snippet names a Pathum Wan drop point at the Charat Mueang community (ชุมชนจรัสเมือง), Rong Mueang.
- This could become a tip for moving out: "ย้ายออกแล้วมีที่นอนเก่า อย่าทิ้งข้างถนน รอรอบนัดเก็บของเขต" (moving out with an old mattress? Don't leave it on the street; wait for the district's pickup round).
- Sources:
  - https://www.thairath.co.th/news/local/bangkok/2927002
  - https://www.thairath.co.th/news/local/bangkok/2935940

---

## Summary for triage

| Candidate | Fit | Confidence | Pin | Price usable? |
|---|---|---|---|---|
| Otteri ไอแอมปาร์ค | Laundry | High | GMaps | 40 baht from (Jan 2024 news) |
| Big C Food Place สามย่านมิตรทาวน์ (rename existing) | Supplies | High | existing | no |
| PMCU free water dispensers (100-year park, U-Center, stadium) | Water | Medium-high | estimate / U-Center | free |
| Lotus's go fresh จามจุรีสแควร์ | Supplies | High | Wikipedia (building) | no |
| Daiso สามย่านมิตรทาวน์ B1 | Supplies | High | existing building | "from 60 baht" |
| Magnano สามย่านมิตรทาวน์ (keys) | Household? | Medium | existing building | no |
| U laundry@CU (U-Center) | Laundry | Low-medium | snippet | no |
| Trendy Wash จุฬาฯ 48 | Laundry | Medium | **missing** | no |
| Wash Hub บรรทัดทอง | Laundry | Medium | plus code | no |
| Lotus's go fresh ไอแอมปาร์ค | Supplies | Medium | same building as Otteri | no |
| MR.DIY / Tops / Daiso at MBK | Supplies | Medium | estimate | no |
| Post offices (CU, Chamchuri, Zy Walk, SSO) | Not Household | Medium | building / estimate | n/a |

**Biggest gaps:**
- No wash-and-fold per-kg price anywhere near Chula.
- No public coin water machine or water-delivery shop near the dorms.
- No hardware shop, alteration shop or street cobbler near Chula.
- No pins for Trendy Wash, Quik Laundry or Fabliss.
- Hours conflict for Lotus's Chamchuri, Tops MBK and Magnano.
- All of the above rests on search snippets, because no page could be opened.
