# Trạc Liên Thanh CNC - Landing Page & Sales Hub (nalienthanh.store)

Hệ thống Landing Page bán hàng chuyển đổi cao (CRO) chuyên dụng cho sản phẩm **Trạc Liên Thanh CNC**, tối ưu 100% Mobile-first, tuân thủ chính sách quảng cáo Facebook Ads và tích hợp sẵn trang Quản lý đơn hàng thời gian thực cho đội ngũ Sales.

---

## 🌟 Tính Năng Nổi Bật

### 1. Landing Page Bán Hàng (`/`)
- **8 Sections Chuẩn CRO:** Hero Section, So sánh điểm đau (Pain & Gain), Video cơ chế thực tế, Thông số kỹ thuật, Bảng giá ưu đãi, Đánh giá thực tế, Cam kết vàng, Form đặt hàng nhanh.
- **Tuân thủ chính sách FB Ads:** Né 100% các từ khóa vi phạm (vũ khí, súng, đạn, săn bắn...).
- **Bảng giá & Phụ kiện:**
  - Bộ Không Laze: **250.000đ** (Bao ship)
  - Bộ Có Laze Xịn Chỉnh Tâm: **400.000đ** (Bao ship)
  - Phụ kiện mua thêm: Dây 50k/bộ, Băng bi 50k/bộ, Bi 10k/bịch.
- **Quyền lợi khách hàng:** Được kiểm hàng • Được test hàng trước khi thanh toán • Bao ship toàn quốc.
- **Tối ưu Mobile:** Sticky bottom bar ghim giá và nút đặt hàng theo thao tác cuộn trang.

### 2. Tích Hợp Meta Pixel (Facebook Pixel)
- Tự động kích hoạt đầy đủ các sự kiện chuyển đổi:
  - `PageView`
  - `ViewContent`
  - `InitiateCheckout`
  - `Lead`
  - `Purchase` (gắn giá trị đơn hàng thực tế).

### 3. Sales Hub Quản Lý Đơn Hàng (`/admin`)
- Đăng nhập bảo vệ bằng mã PIN (`8888`).
- Bảng đơn hàng thời gian thực kèm các chỉ số KPI: Tổng đơn, Đơn mới cần gọi, Đã chốt, Doanh thu ước tính.
- **Nút gọi 1-chạm (`tel:`):** Telesale bấm vào số điện thoại là máy tự động quay số.
- Phân loại trạng thái: Mới nhận $\rightarrow$ Đang gọi $\rightarrow$ Đã chốt $\rightarrow$ Đã gửi COD $\rightarrow$ Hủy.
- Ghi chú cuộc gọi & Xuất file Excel/CSV tương thích font tiếng Việt.
- Hỗ trợ gửi thông báo tức thời qua **Telegram Bot** và **Google Sheets**.

---

## 🚀 Cài Đặt & Chạy Thử Nghiệm Tại Local

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường development
npm run dev

# Mở trình duyệt
# Trang bán hàng: http://localhost:3000
# Trang quản lý sales: http://localhost:3000/admin (PIN: 8888)
```

---

## 🌐 Triển Khai Vercel & Tên Miền `nalienthanh.store`

Xem hướng dẫn chi tiết tại:
👉 [docs/deployment-nalienthanh-store.md](docs/deployment-nalienthanh-store.md)

1. Import repository `huykent/landingpage` vào Vercel.
2. Thêm domain `nalienthanh.store` trong mục **Settings $\rightarrow$ Domains**.
3. Cấu hình 2 bản ghi DNS:
   - Record A: `@` $\rightarrow$ `76.76.21.21`
   - Record CNAME: `www` $\rightarrow$ `cname.vercel-dns.com`
