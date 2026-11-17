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
- [ ] Lập kế hoạch thực thi từng bước nhỏ (Atomic steps) cho Landing page, API xử lý đơn, Trang Admin sales và Cấu hình Vercel
- [ ] Review và phê duyệt implementation plan

### Giai đoạn 3: Hiện thực hóa mã nguồn (Implementation)
- [ ] Thiết lập kiến trúc dự án (Next.js / Vercel-ready stack, tối ưu theo Ponytail & Hallmark)
- [ ] Xây dựng Frontend Landing Page 8 sections chuẩn Mobile-First (ảnh, video, form, sticky CTA)
- [ ] Tích hợp Meta Pixel Component hỗ trợ dynamic Pixel ID qua Environment Variable (`NEXT_PUBLIC_FB_PIXEL_ID`) và tự động bắn sự kiện chuẩn: `PageView`, `ViewContent`, `InitiateCheckout`, `Lead` & `Purchase`
- [ ] Xây dựng API tiếp nhận đơn hàng (`/api/orders`) hỗ trợ lưu trữ và webhook tức thì (Telegram / Google Sheets)
- [ ] Xây dựng Giao diện Quản lý Đơn hàng cho Đội ngũ Sales (`/admin`):
  - Đăng nhập bảo mật (mã PIN/Passcode)
  - Bảng danh sách đơn hàng real-time
  - Phân loại trạng thái: Đơn mới, Đã gọi chốt, Đã gửi bưu điện, Đơn hủy
  - Ghi chú cuộc gọi của telesale
  - Xuất dữ liệu Excel/CSV để bàn giao bưu cục (GHTK, Viettel Post...)
- [ ] Tích hợp assets (ảnh + video tối ưu nén tải nhanh)
- [ ] Thiết lập cấu hình Vercel (`vercel.json`, `next.config.js`, hướng dẫn trỏ domain `nalienthanh.store`)

### Giai đoạn 4: Kiểm thử & Hoàn thiện (Verification & Delivery)
- [ ] Kiểm thử luồng đặt hàng từ khách -> API -> Lưu trữ -> Hiển thị trên Admin Sales
- [ ] Kiểm tra responsive, cross-device và tiêu chuẩn Hallmark
- [ ] Bump version dự án
- [ ] Tạo commit và checkpoint hoàn tất

---

## 🔍 Nhật ký Checkpoint
- **2026-11-18 (Update Scope & Domain):**
  - Khách hàng xác nhận tên miền chính thức: `nalienthanh.store`.
  - Đã cập nhật toàn bộ tài liệu thiết kế và danh mục công việc theo domain `nalienthanh.store`.
  - Chuẩn bị chuyển sang bước lập Implementation Plan chi tiết theo quy trình Superpowers.
