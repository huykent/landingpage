# Tiến độ Dự án Landing Page (TODO.md)

## 📌 Thông tin dự án
- **Dự án:** Landing Page (chủ đề: Ná cao su / Thể thao - dã ngoại)
- **Khởi tạo:** 2026-11-18
- **Trạng thái hiện tại:** Khởi tạo dự án & làm rõ yêu cầu (Brainstorming & Pre-flight)

---

## 📋 Danh sách công việc (Checklist)

### Giai đoạn 1: Khám phá & Định hình (Brainstorming & Hallmark)
- [x] Khởi tạo git repository (`git init`)
- [x] Khảo sát tài nguyên hiện có trong thư mục `ná cao su` (video, hình ảnh mẫu)
- [x] Phân tích tài liệu yêu cầu: `skill_t_o_landing_page_b_n_n_cao_su_ch_y_facebook_ads.md`
- [x] Xác định nguyên tắc an toàn Facebook Ads (né từ khóa vũ khí/săn bắn)
- [x] Mở rộng phạm vi: Hệ thống quản lý đơn hàng cho Sales + Triển khai Vercel + Domain `nalienthanh.store`
- [x] Tích hợp Meta Pixel (Facebook Pixel) chuẩn sự kiện: PageView, ViewContent, InitiateCheckout, Purchase/Lead
- [ ] Soạn thảo và lưu trữ tài liệu spec chuẩn tại `docs/superpowers/specs/2026-11-18-landing-page-sales-hub-design.md`
- [ ] Trình tài liệu spec để khách hàng review trước khi lập implementation plan

### Giai đoạn 2: Lập kế hoạch chi tiết (Writing Plans)
- [x] Lập kế hoạch thực thi từng bước nhỏ (Atomic steps) cho Landing page, API xử lý đơn, Trang Admin sales và Cấu hình Vercel
- [x] Soạn thảo file plan chi tiết tại `docs/superpowers/plans/2026-11-18-landing-page-sales-hub.md`
- [ ] Bắt đầu thực thi Task 1: Khởi tạo Project & Thiết lập Thư mục Assets & CSS Tokens

### Giai đoạn 3: Hiện thực hóa mã nguồn (Implementation)
- [x] Task 1: Thiết lập kiến trúc dự án (Next.js / Vercel-ready stack, tối ưu theo Ponytail & Hallmark, đẩy lên github `huykent/landingpage`)
- [x] Task 2: Data Models, Persistence & API Đặt Hàng (`/api/orders`) kèm Webhook tức thì (Telegram / Google Sheets)
- [x] Task 3: Tích hợp Meta Pixel Component hỗ trợ dynamic Pixel ID qua Environment Variable (`NEXT_PUBLIC_FB_PIXEL_ID`) và tự động bắn sự kiện chuẩn: `PageView`, `ViewContent`, `InitiateCheckout`, `Lead` & `Purchase`
- [x] Task 4: Xây dựng Frontend Landing Page 8 sections chuẩn Mobile-First (ảnh, video, form, sticky CTA, addons mua kèm)
- [x] Task 5: Xây dựng Giao diện Quản lý Đơn hàng cho Đội ngũ Sales (`/admin`):
  - Đăng nhập bảo mật (mã PIN/Passcode)
  - Bảng danh sách đơn hàng real-time
  - Phân loại trạng thái: Đơn mới, Đã gọi chốt, Đã gửi bưu điện, Đơn hủy
  - Ghi chú cuộc gọi của telesale
  - Xuất dữ liệu Excel/CSV để bàn giao bưu cục (GHTK, Viettel Post...)
- [x] Task 6: Thiết lập cấu hình Vercel (`vercel.json`), hướng dẫn trỏ domain `nalienthanh.store` và tài liệu hướng dẫn vận hành

### Giai đoạn 4: Kiểm thử & Hoàn thiện (Verification & Delivery)
- [x] Kiểm thử luồng đặt hàng từ khách -> API -> Lưu trữ -> Hiển thị trên Admin Sales
- [x] Kiểm tra responsive, cross-device và tiêu chuẩn Hallmark (Tokens, No AI slop)
- [x] Đã build thành công bản production (`npm run build` - 0 lỗi)
- [x] Bump version dự án lên `v1.0.0`
- [x] Đã push toàn bộ mã nguồn lên GitHub: `https://github.com/huykent/landingpage.git`
### Giai đoạn 4: Nâng Cấp CRO Thần Tốc (Tối Đa Hóa Tỷ Lệ Chốt & Chiêu Trò Marketing)
- [x] Khảo sát và mổ xẻ landing page đối thủ: `https://www.nacaosucaocap.shop/gs272`
- [x] Xác định các đòn bẩy tâm lý & mưu kế câu khách đỉnh cao
- [x] Xây dựng các component bổ trợ: `FlashSaleTimer`, `FakeNotificationPopup`, `FloatingContact`
- [x] Tích hợp vào Hero Section, Pricing Section, Commitments Section và Order Form
- [x] Cập nhật thông số chuẩn xác theo ghi chú của chủ shop: **Bản Nhựa ABS Kỹ Thuật Siêu Bền** & **Chuẩn Bi Thép 8mm (8 Ly)**
- [x] Deploy live lên Vercel và trỏ chính thức vào domain `https://nalienthanh.store` (v1.2.0)

---

## 🔍 Nhật ký Checkpoint
- **2026-11-19 (Tối Ưu Sự Kiện Purchase Cho Meta Pixel - v1.5.3):**
  - Đổi script khởi tạo `MetaPixel` từ `next/script` sang thẻ `<script>` chuẩn để mã Pixel tải ngay lập tức từ byte HTML đầu tiên, không bị trễ hay chặn bởi hydration.
  - Bổ sung đầy đủ tham số chuẩn quốc tế cho sự kiện `Purchase`: `value` (tổng tiền COD bao gồm sản phẩm + phụ kiện), `currency: 'VND'`, `content_name`, `content_type: 'product'`, `num_items` (tổng số lượng hàng), `order_id` và `{ eventID: order_id }` để hỗ trợ deduplication và tối ưu thuật toán máy học Meta Ads (ROAS).
- **2026-11-18 (Gắn Meta Pixel Production - v1.5.2):**
  - Thiết lập biến môi trường `NEXT_PUBLIC_FB_PIXEL_ID=1147992784253037` trên Vercel Production để tự động kích hoạt `MetaPixel` (`PageView`, `InitiateCheckout`, `Lead`, `Purchase` kèm giá trị đơn hàng thực tế) trên `https://nalienthanh.store`.
- **2026-11-18 (Hiển Thị Song Song 2 Phiên Bản Tại Hero - v1.5.1):**
  - Thiết kế lại khu vực chọn sản phẩm trong `components/HeroSection.tsx` từ dạng 1 ảnh chuyển tab sang **2 thẻ sản phẩm hiển thị song song (Bộ Có Laze Xịn 400K & Bộ Không Laze 250K)** trên cả mobile lẫn desktop (`grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`), kèm ảnh thật, điểm khác biệt, giá gốc/giá sale và nút đặt nhanh trực tiếp trên từng bản.
  - Đồng bộ 2 chiều `selectedProduct` từ `app/page.tsx` xuống `HeroSection`, `PricingSection`, `OrderForm` và `StickyFooter`.
- **2026-11-18 (100 Khách Nảy Đơn Tự Nhiên Không Lặp + Chuẩn Hóa Ngôn Ngữ Facebook Ads - v1.5.0):**
  - Tạo danh sách 100 họ tên người Việt độc nhất kèm tỉnh/TP đúng vùng miền (gồm cả các họ dân tộc thiểu số như Thái, H'Mông, Tày, Nùng, Dao, Mường, Ê Đê, Gia Rai, K'Ho, Khmer, Chăm...) trong `lib/social-proof.ts`.
  - Nâng cấp `components/FakeNotificationPopup.tsx`: xáo trộn Fisher-Yates lưu vị trí vào `localStorage` để không lặp lại 1 người suốt 100 lượt (kể cả F5); nhảy đơn theo đợt tự nhiên (1 đơn, 2 đơn hoặc 3 đơn liên tiếp rồi nghỉ ngẫu nhiên).
  - Tối ưu 100% ngôn ngữ chạy Facebook Ads trên toàn trang (`app/layout.tsx`, `HeroSection`, `PainGainSection`, `PricingSection`, `ReviewsSection`, `CommitmentsSection`, `OrderForm`): loại sạch 100% từ khóa nhạy cảm (`vũ khí`, `công cụ hỗ trợ`, `bắn`, `đạn`, `súng`, `ná cao su`, `thiệt hại`), thay bằng ngôn ngữ thể thao kỹ năng & trải nghiệm test hàng tự nhiên.
  - Bổ sung unit test xác minh đúng 100 khách hàng độc nhất & shuffle không lặp (9/9 PASS).
- **2026-11-18 (Audit Hardening + Dropdown Địa Chỉ 63 Tỉnh Thành Cũ VN - v1.4.0):**
  - **Địa chỉ dạng Dropdown 3 cấp Việt Nam cũ (63 Tỉnh/TP $\rightarrow$ 696 Quận/Huyện $\rightarrow$ 10.035 Phường/Xã):** Tạo bộ dữ liệu tĩnh gọn `public/data/vn-addresses.json` (210KB, lazy-load + CDN cache), tích hợp 3 dropdown chọn liên cấp + ô số nhà/đường/thôn trong `components/OrderForm.tsx` (kèm fallback nhập tay nếu lỗi mạng).
  - **Khắc phục toàn bộ 13 mục Ponytail Audit:**
    - Xóa lỗ hổng lộ PIN trên URL khi xuất CSV (`app/admin/page.tsx` dùng `fetch` + header `x-admin-pin`, xóa `queryPin` ở server, gom xác thực timing-safe vào `lib/admin-auth.ts`).
    - Chống trùng mã đơn bằng `generateOrderId()` (timestamp base36 + 6 ký tự hex ngẫu nhiên từ Web Crypto).
    - Chống Excel CSV Formula Injection (`sanitizeCsvCell`) và validate chặt số lượng phụ kiện (`1..99` số nguyên), `mainProduct`, và `status` hợp lệ.
    - Chờ `await sendTelegramNotification` (timeout 5s) + escape ký tự Markdown Telegram (`_`, `*`, `` ` ``, `[`).
    - Sửa `verifySecret` trong `scripts/google-apps-script.gs` sang fail-closed.
    - Hiển thị thông báo lỗi trên `/admin` khi `PATCH`/export thất bại; reset sạch form & phụ kiện sau khi khách đặt hàng thành công.
    - Gom bảng giá dùng chung vào `lib/catalog.ts`; xóa dead code (`sendGoogleSheetWebhook`, `trackPageView`, `trackViewContent`), sanitize `FB_PIXEL_ID`, sửa copy còn sót `"CNC"`/`"Băng bi"`, thêm `preload="metadata"` cho video, sửa nút đóng `✕` tắt hẳn popup và dọn thư mục media trùng lặp `ná cao su/` (-6.7 MB).
  - Thêm bộ unit test mới `tests/order-and-security.test.mjs` — tổng 8/8 tests PASS và `npm run build` 0 lỗi.
- **2026-11-18 (Google Sheets 2-Way Database - v1.3.0):**
  - Tạo Google Apps Script chuẩn 2 chiều tại `scripts/google-apps-script.gs` hỗ trợ `list`, `create`, `update`, khóa `LockService` chống xung đột ghi đồng thời, bảo mật bằng `SECRET_KEY`, tự động tạo header và giữ nguyên số `0` đầu số điện thoại.
  - Nâng cấp `lib/storage.ts` dùng trực tiếp Google Sheets (`GOOGLE_SHEET_WEBHOOK_URL`) làm Database chính để đọc/ghi/cập nhật đơn hàng bền vững trên Vercel Serverless (không mất đơn khi redeploy/cold start).
  - Loại bỏ gọi trùng `sendGoogleSheetWebhook` ở `app/api/orders/route.ts`, thêm `force-dynamic` cho API `/admin` & `/export`, và hiển thị badge trạng thái kết nối `Google Sheets DB` trên giao diện `/admin`.
  - Bổ sung unit test `tests/storage.test.mjs` (`node --test`) — 100% pass.
- **2026-11-18 (Thiết lập quy trình Auto-Deploy Vercel - v1.2.5):**
  - Tạo file quy tắc dự án `AGENTS.md` ghi nhận bắt buộc: sau mỗi lần hoàn tất công việc sẽ tự động build, bump version, push GitHub và chạy `npx --yes vercel deploy --prod --yes` lên `https://nalienthanh.store`.
- **2026-11-18 (Fix Real-time Dynamic Price on Sticky Footer & Ray 10 viên - v1.2.4):**
  - **Sửa lỗi nhảy giá Sticky Footer:** Nâng `addOns` state lên cấp `app/page.tsx` để đồng bộ real-time giữa `OrderForm` và `StickyFooter`. Khi khách chọn thêm phụ kiện (dây 50k, ray bi 50k, túi bi 10k), giá và số lượng phụ kiện hiển thị dưới góc trái sẽ tự động cộng dồn tức thì.
  - **Chuẩn hóa thông số Ray Tiếp Bi:** Cập nhật đồng bộ toàn bộ landing page và hệ thống đơn hàng thành **Ray tiếp bi tự động 10 viên (chuẩn bi thép 8mm)** (thay cho thông số 15-20 viên trước đó).
  - Đã xác thực build production Next.js 14 thành công (`npm run build`).
  - Đã bump version lên `v1.2.4` và chuẩn bị deploy live lên Vercel Production `nalienthanh.store`.
- **2026-11-18 (Security Hardening Admin PIN - v1.2.3):**
  - Đã xóa hoàn toàn thông báo hiển thị mã PIN trên giao diện `/admin`.
  - Đã xóa sạch mật khẩu hardcode khỏi source code công khai và đưa vào Vercel Secret Environment Variable (`ADMIN_PIN`).
  - Đã đẩy bản cập nhật lên GitHub và triển khai trực tiếp lên Vercel Production.
- **2026-11-18 (Add Official Legal Proof Image - v1.2.2):**
  - Đã tải ảnh trích lục văn bản tư vấn pháp luật từ Dân Luật (`anh-luat.png`) vào `public/assets/anh-luat.png`.
  - Đã tích hợp hiển thị trang trọng ngay trong phần Bảo chứng pháp lý của `CommitmentsSection.tsx`.
  - Đã đẩy bản cập nhật lên GitHub và triển khai live trên Vercel `https://nalienthanh.store`.
- **2026-11-18 (Update Admin PIN - v1.2.1):**
  - Đã thiết lập mã PIN trang Quản trị Sales `/admin` vào Vercel Secret Env.
- **2026-11-18 (Live Production & Chuẩn hóa thông số v1.2.0):**
  - Website đã chính thức **LIVE** trên Vercel tại: **`https://nalienthanh.store`** và **`https://www.nalienthanh.store`**.
  - Đã cập nhật 100% copy và mô tả sản phẩm: **Bản Nhựa ABS Kỹ Thuật Cao Cấp** (chịu lực, đầm tay, chống nứt vỡ) và **Chuẩn Bi Thép 8mm (8 Ly)**.
  - Đầy đủ đòn bẩy tâm lý: Countdown Flash Sale, Live Viewers (148 người xem), Fake Buyer Popups nhảy liên tục, Mỏ neo giá gạch chéo giảm 61%, Cam kết pháp lý 100% thượng tôn pháp luật, Cam kết bắn thử cho shipper đợi không ưng hoàn 0đ.
  - Đã push bản hoàn thiện v1.2.0 lên GitHub và deploy trực tiếp lên Vercel Production.

---

## 🔍 Nhật ký Checkpoint
- **2026-11-18 (Hoàn Tất Dự Án v1.0.0):**
  - Đã xây dựng hoàn thiện toàn bộ hệ sinh thái Landing Page & Sales Hub cho `nalienthanh.store`.
  - Toàn bộ 6 Task đã được triển khai, kiểm thử tự động, build production thành công và commit push đầy đủ lên nhánh `main` của repository GitHub: `https://github.com/huykent/landingpage.git`.
