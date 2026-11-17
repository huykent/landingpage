# Hướng Dẫn Triển Khai Vercel & Cấu Hình Tên Miền `nalienthanh.store`

Tài liệu này hướng dẫn chi tiết từng bước đưa hệ thống Landing Page & Hub Quản lý Sales lên Vercel và trỏ tên miền chính thức `nalienthanh.store`.

---

## BƯỚC 1: Triển Khai Lên Vercel (1 Phút)

1. Truy cập vào [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub của bạn (`huykent`).
2. Bấm vào nút **"Add New..."** $\rightarrow$ chọn **"Project"**.
3. Tìm repository **`huykent/landingpage`** trong danh sách và bấm **"Import"**.
4. Tại mục **"Environment Variables"**, nhập các biến môi trường:
   - `NEXT_PUBLIC_FB_PIXEL_ID`: Mã Facebook Pixel của bạn (VD: `1234567890123456`).
   - `ADMIN_PIN`: Mã PIN bảo mật trang quản lý Sales (Thiết lập trong Vercel Environment Variables).
   - `TELEGRAM_BOT_TOKEN` *(Tùy chọn)*: Để nhận chuông báo đơn ngay về điện thoại.
   - `TELEGRAM_CHAT_ID` *(Tùy chọn)*: ID nhóm chat Telegram của đội Sales.
   - `GOOGLE_SHEET_WEBHOOK_URL`: Link Web App từ `scripts/google-apps-script.gs` để làm Database 2 chiều (lưu & đọc đơn trực tiếp trên Google Sheets).
   - `GOOGLE_SHEET_SECRET` *(Tùy chọn)*: Mã bí mật khớp `SECRET_KEY` trong Apps Script (nếu bỏ trống sẽ tự dùng `ADMIN_PIN`).
5. Bấm **"Deploy"**. Vercel sẽ tự động build và cấp phát link chạy thử nghiệm.

---

## BƯỚC 2: Cấu Hình Tên Miền `nalienthanh.store` Trên Vercel

1. Trong dự án trên Vercel, chọn tab **Settings** $\rightarrow$ chọn mục **Domains** ở menu bên trái.
2. Nhập tên miền: `nalienthanh.store` rồi bấm **"Add"**.
3. Vercel sẽ hỏi thêm phiên bản `www.nalienthanh.store`, chọn **"Add and redirect to nalienthanh.store"** (Khuyên dùng).

---

## BƯỚC 3: Cấu Hình Bản Ghi DNS Tại Nhà Cung Cấp Tên Miền

Đăng nhập vào trang quản trị nơi bạn đã mua tên miền `nalienthanh.store` (Inet, Tenten, PA Vietnam, Namecheap, GoDaddy, Hostinger...) và thêm 2 bản ghi sau vào mục **Quản lý DNS**:

| Loại bản ghi (Type) | Tên / Host | Giá trị (Value / Points to) | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | 3600 (hoặc tự động) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 (hoặc tự động) |

> 💡 **Lưu ý:**
> - Sau khi lưu bản ghi DNS, Vercel sẽ tự động xác minh và kích hoạt chứng chỉ bảo mật **SSL (HTTPS)** miễn phí trọn đời trong vòng từ 2 đến 10 phút.
> - Khi trạng thái trên Vercel chuyển sang màu xanh lá **"Valid Configuration"**, tên miền `https://nalienthanh.store` đã sẵn sàng hoạt động!

---

## BƯỚC 4: Hướng Dẫn Đội Ngũ Sales Sử Dụng

1. **Truy cập:** Mở trình duyệt trên máy tính hoặc điện thoại và vào đường dẫn:
   👉 **`https://nalienthanh.store/admin`**
2. **Đăng nhập:** Nhập mã PIN quản trị đã cấu hình trong `ADMIN_PIN` trên Vercel.
3. **Gọi chốt đơn:**
   - Khi có khách mới, đơn sẽ hiển thị ở đầu danh sách với nhãn 🟡 **Mới Nhận**.
   - Nhân viên sales bấm trực tiếp vào nút màu xanh **"📞 [Số điện thoại]"**, máy sẽ tự động quay số để gọi cho khách ngay lập tức.
   - Sau khi gọi, chuyển trạng thái sang 🟢 **Đã Chốt Đơn** và gõ ghi chú (nếu có).
4. **Xuất file giao hàng:**
   - Bấm nút **"📊 Xuất Excel/CSV"** ở góc trên cùng để tải toàn bộ danh sách đơn hàng đã chốt, import trực tiếp lên app Viettel Post, GHTK...
