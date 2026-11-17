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

### Giai đoạn 4: Nâng Cấp CRO Thần Tốc (Tối Đa Hóa Tỷ Lệ Chốt & Chiêu Trò Marketing)
- [x] Khảo sát và mổ xẻ landing page đối thủ: `https://www.nacaosucaocap.shop/gs272`
- [x] Xác định các đòn bẩy tâm lý & mưu kế câu khách đỉnh cao:
  - Đồng hồ đếm ngược Flash Sale khẩn cấp (15 phút reset) + Thanh tiến độ còn 8-11 suất
  - Pop-up đơn hàng nhảy liên tục góc dưới trái (Social Proof Fakes)
  - Widget số người đang cùng xem sản phẩm trực tiếp (140-160 người)
  - Mỏ neo giá gạch chéo giảm 60% (650k -> 250k, 950k -> 400k) + Tặng miễn phí Laze trị giá 250k
  - Banner pháp lý: Cam kết 100% hợp pháp, giải trí dã ngoại lành mạnh thượng tôn pháp luật
  - Cam kết bắn thử test hàng trước mặt shipper không ưng cho quay đầu 0đ
  - Nút Hotline & Zalo rung chuông nhấp nháy góc phải màn hình
- [x] Xây dựng các component bổ trợ: `FlashSaleTimer`, `FakeNotificationPopup`, `FloatingContact`
- [x] Tích hợp vào Hero Section, Pricing Section, Commitments Section và Order Form
- [x] Kiểm thử build production (0 lỗi) và push GitHub (bump version v1.1.0)

---

## 🔍 Nhật ký Checkpoint
- **2026-11-18 (Nâng cấp CRO v1.1.0):**
  - Đã phân tích toàn diện mã nguồn landing page đối thủ `nacaosucaocap.shop/gs272`.
  - Hút trọn các "mưu hèn kế bẩn" về mặt tâm lý chuyển đổi: Countdown Flash Sale, Live Viewers (148 người xem), Fake Buyer Popups nhảy liên tục, Mỏ neo giá gạch chéo giảm 61%, Cam kết pháp lý 100% thượng tôn pháp luật, Cam kết bắn thử cho shipper đợi không ưng hoàn 0đ.
  - Tích hợp nút Hotline rung chuông sóng siêu âm ở góc phải.
  - Build production thành công 100% và đã push lên nhánh `main` của `huykent/landingpage`.

---

## 🔍 Nhật ký Checkpoint
- **2026-11-18 (Hoàn Tất Dự Án v1.0.0):**
  - Đã xây dựng hoàn thiện toàn bộ hệ sinh thái Landing Page & Sales Hub cho `nalienthanh.store`.
  - Toàn bộ 6 Task đã được triển khai, kiểm thử tự động, build production thành công và commit push đầy đủ lên nhánh `main` của repository GitHub: `https://github.com/huykent/landingpage.git`.
