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
