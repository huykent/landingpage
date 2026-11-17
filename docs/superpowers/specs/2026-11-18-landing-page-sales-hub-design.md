# Bản Thiết Kế Hệ Thống: Landing Page Bán Trạc Liên Thanh & Hub Quản Lý Đơn Hàng Cho Sales

- **Tên dự án:** Landing Page Trạc Liên Thanh & Sales Hub
- **Tên miền mục tiêu:** `nalienthanh.com`
- **Nền tảng triển khai:** Vercel Apps
- **Ngày lập:** 2026-11-18
- **Tác giả:** Đội ngũ phát triển (Tuân thủ tiêu chuẩn Hallmark & Ponytail)

---

## 1. Mục tiêu & Phạm vi Dự án

1. **Landing Page Chuyển đổi cao (CRO):**
   - Tối ưu hiển thị hoàn hảo trên thiết bị di động (Mobile-first, chiếm 95%+ traffic từ Facebook Ads).
   - Cấu trúc 8 Sections theo chuẩn tài liệu `skill_t_o_landing_page_b_n_n_cao_su_ch_y_facebook_ads.md`.
   - **Tuân thủ 100% chính sách Facebook Ads:** Loại bỏ hoàn toàn các từ khóa nhạy cảm bị Facebook cấm (*vũ khí, súng, đạn, sát thương, săn bắn*), định vị sản phẩm là *dụng cụ cơ khí thể thao kỹ năng, rèn luyện sự tập trung ngoài trời*.
2. **Theo dõi Chuyển đổi Quảng cáo (Meta / Facebook Pixel):**
   - Hỗ trợ gắn mã Pixel dễ dàng qua biến môi trường hoặc cấu hình trực tiếp (`NEXT_PUBLIC_FB_PIXEL_ID`).
   - Tự động kích hoạt đầy đủ các sự kiện tiêu chuẩn: `PageView`, `ViewContent`, `InitiateCheckout`, `Lead`, `Purchase` (kèm giá trị đơn hàng thực tế).
3. **Trung tâm Quản lý Đơn hàng cho Đội ngũ Sales (`/admin`):**
   - Giao diện trực quan bảo mật bằng mã PIN dành riêng cho nhân viên telesale.
   - Nút bấm gọi điện thoại 1-chạm (`tel:`) ngay trên di động.
   - Cập nhật trạng thái đơn hàng thời gian thực: *Mới nhận*, *Đang liên hệ*, *Đã chốt*, *Đã gửi bưu điện (COD)*, *Hủy đơn*.
   - Ghi chú cuộc gọi của telesale.
   - Xuất dữ liệu Excel/CSV để bàn giao bưu cục vận chuyển (GHTK, Viettel Post...).
4. **Cơ chế Báo đơn Tức thời & Chống mất dữ liệu:**
   - Tự động gửi thông báo đơn mới tức thì về **Telegram Bot** của nhóm chat Sales để bấm gọi chốt đơn trong 30 giây.
   - Tích hợp Webhook đồng bộ tự động một dòng vào **Google Sheets** để lưu trữ vĩnh viễn và theo dõi doanh thu.
5. **Triển khai Vercel & Tên miền `nalienthanh.com`:**
   - Xây dựng trên nền tảng Next.js (App Router) tối ưu gốc cho Vercel.
   - Cấu hình sẵn `vercel.json` và hướng dẫn thiết lập bản ghi DNS A/CNAME.

---

## 2. Tiêu chuẩn Thiết kế Giao diện (Hallmark Standards)

Trang web được thiết kế theo phong cách **Tactical Mechanical / Dark Precision**:
- **Bảng màu (Tokens declared at `:root`):**
  - Nền chính (Paper): `#080b10` (Đen sâu kim loại)
  - Khối bề mặt (Surface): `#111622` (Xám than chì công nghiệp)
  - Vạch viền kỹ thuật (Keylines): `#1f293d`
  - Màu điểm nhấn chính (Accent): `#ef4444` (Đỏ laser công nghệ)
  - Màu hỗ trợ (Secondary Accent): `#f97316` (Cam cảnh báo cơ khí)
  - Màu chữ (Ink): `#f3f4f6` (Trắng bạc tương phản cao), chữ phụ `#9ca3af`
- **Typography:**
  - Font tiêu đề & hiển thị kỹ thuật: Font không chân hiện đại, sắc sảo (Inter / Geist / Chakra Petch cho các chỉ số).
- **Nguyên tắc Hallmark Floor:**
  - Tuyệt đối không dùng `transition: all`.
  - Không animate `width`, `height`, `top`, `left`.
  - Thiết lập `overflow-x: clip` trên `html` và `body`.
  - Tất cả nút bấm và form input có `:focus-visible` xuất hiện tức thì.
  - Hỗ trợ `prefers-reduced-motion: reduce`.
  - Loại bỏ hoàn toàn AI slop: không dùng card lồng card, không eyebrow rập khuôn, không dùng emoji thay icon kỹ thuật.

---

## 3. Cấu trúc Nội dung Chi tiết (8 Sections)

### Section 1: Hero Section (Gây chú ý trong 3 giây)
- **Top Badge:** `CƠ KHÍ CHÍNH XÁC • BĂNG BI TIẾP ĐẠN TỰ ĐỘNG THẾ HỆ MỚI`
- **Headline:** **TRẠC LIÊN THANH THẾ HỆ MỚI – CƠ KHÍ CHÍNH XÁC, TIẾP BI TỰ ĐỘNG SIÊU NHANH**
- **Sub-headline:** Thân hợp kim nguyên khối đầm tay, băng chứa bi tự động đẩy lên sau mỗi lần kéo – loại bỏ hoàn toàn thao tác nạp từng viên thủ công. Giải pháp rèn luyện kỹ năng tập trung đỉnh cao.
- **Media Showcase:** Trưng bày hình ảnh thực tế sắc nét + nhúng clip thao tác nạp bi mượt mà.
- **Badge cam kết:** *Bao ship toàn quốc • Đồng kiểm khi nhận hàng (COD)*.
- **CTA:** Nút `NHẬN ƯU ĐÃI NGAY` kích hoạt cuộn mượt xuống Form Đặt Hàng.

### Section 2: Điểm Đau & Giải Pháp (Pain vs Gain)
So sánh đối xứng trực quan:
- ❌ **Trạc truyền thống:** Nạp từng viên lóng ngóng mất nhịp; cấn đau ngón tay; bi rơi vãi khi di chuyển; trạc thô sơ dễ lệch hướng.
- ✅ **Trạc Liên Thanh CNC:** Cơ chế băng đẩy bi tự động trơn tru; giữ nhịp ngắm liên tục; báng cầm công thái học chống trượt; tích hợp rãnh gắn đèn Laze hỗ trợ định vị mục tiêu.

### Section 3: Thông Số Kỹ Thuật & Chi Tiết Cơ Khí
- **Chất liệu:** Hợp kim nguyên khối cắt CNC độ chính xác cao, xử lý anodized chống ăn mòn và mồ hôi tay.
- **Hộp tiếp bi tự động:** Băng chứa 15–20 viên bi thép tập luyện tiêu chuẩn.
- **Ray gắn phụ kiện:** Rãnh cơ khí tiêu chuẩn gắn đèn Laze định vị hoặc thước ngắm quang học.
- **Tay cầm Ergonomic:** Báng cầm uốn theo lòng bàn tay, hỗ trợ trợ lực ngón trỏ và ngón cái.

### Section 4: Trải Nghiệm Thực Tế & Video Clip
- Trình phát video chuyên nghiệp hiển thị video `1794932613466_...mp4` sắc nét, tải nhanh.
- Mô tả chi tiết từng phụ kiện đi kèm trong kiện hàng.

### Section 5: Bảng Giá & Chọn Combo (Chiến lược Mỏ Neo Giá)
Tích hợp giao diện chọn gói tương tác (Interactive Package Selector), tự động đồng bộ giá vào Form:
1. **Gói 1: Bản Tiêu Chuẩn – 250.000đ**
   - 1 Thân Trạc Liên Thanh CNC
   - 1 Băng tiếp bi tự động
   - 1 Túi bi thép tập luyện
   - *Miễn phí vận chuyển toàn quốc*
2. **Gói 2: Bản Laze (Bán chạy nhất ⭐ - Khuyên dùng) – 400.000đ**
   - 1 Thân Trạc Liên Thanh CNC
   - **1 Đèn Laze ngắm chuyên dụng gắn ray**
   - 1 Băng tiếp bi tự động
   - 1 Túi bi thép tập luyện
   - *Miễn phí vận chuyển toàn quốc*
3. **Gói 3: Combo Cao Cấp (Siêu Tiết Kiệm) – 490.000đ**
   - 1 Thân Trạc Bản Laze đầy đủ
   - **Tặng thêm 2 bộ dây siêu đàn hồi + 2 Túi bi thép tập luyện**
   - Hộp bảo quản chuyên dụng
   - *Miễn phí vận chuyển toàn quốc*

### Section 6: Đánh Giá Khách Hàng (Social Proof)
- 4 đánh giá chân thực từ khách hàng chơi thể thao dã ngoại (độ hoàn thiện cơ khí, cảm giác cầm đầm tay, nạp bi êm, giao hàng nhanh cho xem hàng).

### Section 7: Cam Kết Vàng (Risk Reversal)
- 📦 **Đồng kiểm khi nhận (COD):** Mở hộp kiểm tra sản phẩm đúng mô tả mới thanh toán.
- 🔄 **Bảo hành 1 đổi 1 trong 7 ngày:** Nếu phát hiện lỗi gia công từ nhà sản xuất.
- 🚚 **Giao hàng hỏa tốc:** Miễn phí giao hàng trên toàn quốc.

### Section 8: Form Đặt Hàng Nhanh & Sticky Mobile Bar
- **Form đặt hàng:**
  - Trường nhập: Họ và tên, Số điện thoại, Địa chỉ nhận hàng, Ghi chú giao hàng.
  - Tùy chọn gói Combo: Bấm chuyển đổi tức thì, hiển thị rõ số tiền thanh toán.
  - Nút bấm `XÁC NHẬN ĐẶT HÀNG NGAY`.
- **Sticky Bar (Mobile Footer):**
  - Cố định ở đáy màn hình điện thoại khi khách cuộn trang.
  - Hiển thị giá gói đang chọn + nút `ĐẶT HÀNG NGAY` cuộn thẳng về Form.
- **Modal Xác Nhận:**
  - Popup chúc mừng hiển thị mã đơn hàng, tóm tắt thông tin và số hotline/Zalo hỗ trợ.

---

## 4. Tích Hợp Meta Pixel (Facebook Pixel)

- **Cấu hình:** Đọc từ biến môi trường `NEXT_PUBLIC_FB_PIXEL_ID` (có thể cấu hình trên Vercel Dashboard hoặc file `.env`).
- **Sự kiện theo dõi chuẩn:**
  1. `PageView`: Kích hoạt khi khách vào trang.
  2. `ViewContent`: Kích hoạt khi khách xem đến phần video clip hoặc thông số sản phẩm.
  3. `InitiateCheckout`: Kích hoạt khi khách chọn gói combo hoặc click nút đặt hàng.
  4. `Lead` & `Purchase`: Kích hoạt ngay khi Form gửi thành công (kèm thuộc tính `value: [Giá tiền]`, `currency: 'VND'`, `content_name: [Tên gói]`).

---

## 5. Kiến Trúc Backend & Trang Quản Trị Sales (`/admin`)

- **Đường dẫn quản trị:** `/admin`
- **Xác thực:** Nhập mã PIN quản trị (Mặc định hoặc cấu hình qua `ADMIN_PIN`).
- **API Endpoints:**
  - `POST /api/orders`: Tiếp nhận đơn từ landing page, ghi vào CSDL, bắn thông báo Telegram và đẩy vào Google Sheets.
  - `GET /api/admin/orders`: Lấy danh sách đơn hàng (hỗ trợ lọc theo trạng thái, tìm kiếm SĐT/Tên).
  - `PATCH /api/admin/orders/[id]`: Cập nhật trạng thái đơn (Mới, Đang liên hệ, Đã chốt, Đã gửi COD, Hủy) và cập nhật ghi chú telesale.
  - `GET /api/admin/export`: Xuất dữ liệu đơn hàng ra file CSV tương thích Excel.
- **Cơ chế lưu trữ:**
  - Sử dụng SQLite / Serverless Database bền vững hoặc file lưu trữ cục bộ khi phát triển, hỗ trợ biến môi trường Database URL (Vercel Postgres/Supabase/Turso) khi triển khai production.
  - Fallback tích hợp Webhook Google Sheets & Telegram Bot để không bao giờ bị mất đơn hàng dù có sự cố hạ tầng.

---

## 6. Hướng Dẫn Cấu Hình Vercel & Tên Miền `nalienthanh.com`

1. **Deploy lên Vercel:**
   - Đẩy mã nguồn lên GitHub/GitLab.
   - Nhập repository vào Vercel (chọn Framework Preset: Next.js).
   - Điền các biến môi trường cần thiết:
     - `NEXT_PUBLIC_FB_PIXEL_ID`: Mã Facebook Pixel của bạn.
     - `ADMIN_PIN`: Mã PIN đăng nhập trang quản trị sales (VD: `8888` hoặc tùy chọn).
     - `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` *(Tùy chọn)*: Để nhận báo đơn ngay về Telegram.
     - `GOOGLE_SHEET_WEBHOOK_URL` *(Tùy chọn)*: Để đồng bộ tự động vào Google Sheets.
2. **Cấu hình Tên miền `nalienthanh.com`:**
   - Trong Vercel Project: Vào **Settings $\rightarrow$ Domains**, nhập `nalienthanh.com` và `www.nalienthanh.com`.
   - Tại trang quản lý DNS của nhà cung cấp tên miền:
     - Thêm bản ghi **A**: Host `@` trỏ đến `76.76.21.21`
     - Thêm bản ghi **CNAME**: Host `www` trỏ đến `cname.vercel-dns.com`
   - Vercel sẽ tự động xác minh và kích hoạt chứng chỉ SSL HTTPS trong vòng vài phút.
