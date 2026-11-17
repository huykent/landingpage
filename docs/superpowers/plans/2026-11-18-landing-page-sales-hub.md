# Kế Hoạch Thực Thi: Landing Page Trạc Liên Thanh & Hub Quản Lý Đơn Hàng Cho Sales (nalienthanh.store)

> **Dành cho kỹ sư thực thi:** TUÂN THỦ NGUYÊN TẮC: Thực hiện từng task độc lập, kiểm tra và test chạy pass sau mỗi task trước khi commit. Sử dụng checkbox (`- [ ]`) để cập nhật tiến độ.

**Mục tiêu:** Xây dựng trọn vẹn Landing Page bán Trạc Liên Thanh chuyển đổi cao (chuẩn Mobile-first, né từ khóa cấm Facebook Ads, gắn Meta Pixel theo dõi phễu) và Trang Quản trị Đơn hàng (`/admin`) cho đội ngũ Sales, tối ưu sẵn sàng chạy trên Vercel và gắn tên miền `nalienthanh.store`.

**Kiến trúc:** 
- Frontend: Next.js 14/15 App Router + Tailwind CSS + Thiết kế Dark Tactical chuẩn Hallmark Floor (tokenized, không AI slop).
- Backend & API: Vercel Serverless API Routes (`/api/orders`, `/api/admin/orders`, `/api/admin/export`).
- Data & Sync: Lưu trữ đơn bền vững + Webhook tức thời đến Telegram Bot & Google Sheets.

**Tech Stack:** Next.js (App Router), React, TypeScript/JavaScript, Tailwind CSS, Meta Pixel SDK, Lucide Icons (hoặc SVG tối ưu theo Ponytail).

## Ràng Buộc Toàn Cục (Global Constraints)
- **Tên miền:** `nalienthanh.store`
- **Chính sách FB Ads:** Tuyệt đối không dùng các từ *súng, đạn, sát thương, vũ khí, săn bắn*. Dùng: *Trạc liên thanh cơ khí CNC, bi thép tập luyện, rèn luyện kỹ năng tập trung*.
- **Chuẩn Hallmark:** Tokens CSS tại `:root`, không `transition: all`, không animate `width/height/top/left`, `overflow-x: clip`, `:focus-visible` trên mọi nút và input, hỗ trợ `prefers-reduced-motion`.
- **Tối ưu Mobile:** 95% khách hàng đến từ smartphone, mọi nút bấm tối thiểu 44x44px, sticky bottom bar hiển thị giá và nút chốt đơn.
- **Version Bump:** Tăng version trong `version.json` / `package.json` trước mỗi commit.

---

### Task 1: Khởi tạo Project & Thiết lập Thư mục Assets & CSS Tokens

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Copy: `ná cao su/*` $\rightarrow$ `public/assets/`

**Giao diện & Dữ liệu:**
- Chuẩn bị sẵn hình ảnh sản phẩm bản thường, bản laze và video clip thực tế trong thư mục `public/assets/`.
- Cấu hình CSS Design Tokens: `--paper: #080b10`, `--surface: #111622`, `--keyline: #1f293d`, `--accent: #ef4444`, `--accent-hover: #dc2626`, `--ink: #f3f4f6`, `--ink-muted: #9ca3af`.

- [ ] **Bước 1: Thiết lập cấu hình package.json và cài đặt dependencies**
  Tạo `package.json` với Next.js, React, Tailwind CSS và các công cụ hỗ trợ cần thiết:
  ```json
  {
    "name": "nalienthanh-store",
    "version": "0.2.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "next": "^14.2.15",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "@types/node": "^20.14.0",
      "@types/react": "^18.3.3",
      "@types/react-dom": "^18.3.0",
      "autoprefixer": "^10.4.19",
      "postcss": "^8.4.38",
      "tailwindcss": "^3.4.3",
      "typescript": "^5.4.5"
    }
  }
  ```

- [ ] **Bước 2: Cài đặt dependencies qua npm**
  Chạy lệnh: `npm install`
  Kiểm tra: Exit code 0, tạo thành công `package-lock.json` và thư mục `node_modules`.

- [ ] **Bước 3: Chuẩn hóa thư mục assets**
  Copy và đổi tên thân thiện web:
  - `ná cao su/1794932628817_..._fdc2909f21aee8d4ef4ad00058df7d60.jpg` $\rightarrow$ `public/assets/trac-tieu-chuan.jpg`
  - `ná cao su/1794932628843_..._fe5170751bcd7fdcee0ee32266d64624.jpg` $\rightarrow$ `public/assets/trac-ban-laze.jpg`
  - `ná cao su/1794932613466_...mp4` $\rightarrow$ `public/assets/demo-ban-lien-thanh.mp4`

- [ ] **Bước 4: Cấu hình Tailwind & Hallmark CSS Tokens**
  Tạo `tailwind.config.js`, `postcss.config.js`, `next.config.js`, và `app/globals.css` với các token Hallmark.

- [ ] **Bước 5: Kiểm tra build cơ bản**
  Chạy: `npm run build` hoặc tạo layout tối thiểu và xác minh không có lỗi cú pháp.

- [ ] **Bước 6: Commit Task 1**
  Tăng version lên `v0.2.0` và commit: `git add . && git commit -m "feat: scaffold project with nextjs, assets and hallmark tokens (bump v0.2.0)"`

---

### Task 2: Data Models, Persistence & API Đặt Hàng (`/api/orders`)

**Files:**
- Create: `types/order.ts`
- Create: `lib/storage.ts`
- Create: `lib/webhook.ts`
- Create: `app/api/orders/route.ts`

**Giao diện & Dữ liệu:**
- Kiểu dữ liệu `Order`:
  ```typescript
  export interface Order {
    id: string;
    createdAt: string;
    customerName: string;
    phone: string;
    address: string;
    comboId: 'standard' | 'laser' | 'premium';
    comboName: string;
    price: number;
    shippingFee: number;
    totalAmount: number;
    status: 'new' | 'contacting' | 'confirmed' | 'shipping' | 'cancelled';
    note?: string;
  }
  ```

- [ ] **Bước 1: Viết định nghĩa types (`types/order.ts`)**
- [ ] **Bước 2: Viết module lưu trữ dữ liệu `lib/storage.ts`**
  Hỗ trợ lưu trữ file JSON bền vững tại local/serverless kèm bộ nhớ in-memory fallback và hỗ trợ kết nối database URL nếu có.
- [ ] **Bước 3: Viết module webhook `lib/webhook.ts`**
  Gửi thông báo Telegram Bot tức thì khi có đơn mới & post dữ liệu sang Google Sheets Webhook nếu được cấu hình.
- [ ] **Bước 4: Viết API endpoint `app/api/orders/route.ts`**
  Tiếp nhận POST request, validate số điện thoại (10 chữ số), tạo mã đơn, lưu trữ và gửi webhook thông báo.
- [ ] **Bước 5: Kiểm tra tự động API endpoint**
  Gửi test request POST với curl hoặc script node để xác minh đơn hàng được lưu và trả về mã đơn thành công.
- [ ] **Bước 6: Commit Task 2**
  Tăng version lên `v0.3.0` và commit: `git add . && git commit -m "feat: implement order data models, storage and api route (bump v0.3.0)"`

---

### Task 3: Meta Pixel Component & Conversion Tracking

**Files:**
- Create: `lib/pixel.ts`
- Create: `components/MetaPixel.tsx`

**Giao diện & Dữ liệu:**
- Các hàm kích hoạt sự kiện:
  - `fbq('track', 'PageView')`
  - `fbq('track', 'ViewContent', { content_name, content_category, value })`
  - `fbq('track', 'InitiateCheckout', { content_name, value, currency: 'VND' })`
  - `fbq('track', 'Lead', { content_name, value, currency: 'VND' })`
  - `fbq('track', 'Purchase', { content_name, value, currency: 'VND' })`

- [ ] **Bước 1: Tạo `lib/pixel.ts`**
  Khai báo TypeScript helper kiểm tra `window.fbq` an toàn (tránh lỗi SSR).
- [ ] **Bước 2: Tạo `components/MetaPixel.tsx`**
  Nhúng script chuẩn của Facebook Pixel đọc từ `NEXT_PUBLIC_FB_PIXEL_ID` hoặc placeholder cấu hình sẵn.
- [ ] **Bước 3: Tích hợp vào `app/layout.tsx`**
- [ ] **Bước 4: Kiểm thử pixel**
  Kiểm tra trang load không văng lỗi khi chưa có ID hoặc khi gắn ID mẫu.
- [ ] **Bước 5: Commit Task 3**
  Tăng version lên `v0.4.0` và commit: `git add . && git commit -m "feat: implement meta pixel tracking for ads conversion (bump v0.4.0)"`

---

### Task 4: Xây dựng Giao Diện Landing Page Chuyển Đổi Cao (8 Sections)

**Files:**
- Create: `components/HeroSection.tsx`
- Create: `components/PainGainSection.tsx`
- Create: `components/SpecsSection.tsx`
- Create: `components/VideoShowcase.tsx`
- Create: `components/PricingSection.tsx`
- Create: `components/ReviewsSection.tsx`
- Create: `components/CommitmentsSection.tsx`
- Create: `components/OrderForm.tsx`
- Create: `components/StickyFooter.tsx`
- Create: `components/OrderSuccessModal.tsx`
- Modify: `app/page.tsx`

**Giao diện & Dữ liệu:**
- 8 Sections được xây dựng theo đúng tiêu chuẩn Mobile-First và Dark Tactical của Hallmark.
- Đồng bộ mượt mà: Chọn gói ở Pricing Section $\rightarrow$ Form tự động nhảy theo gói đó $\rightarrow$ Sticky footer hiển thị đúng giá tiền.
- Bắn sự kiện Pixel tại các nút CTA và khi hoàn tất form.

- [ ] **Bước 1: Xây dựng HeroSection & VideoShowcase**
  Headline giật tít, sub-headline, media gallery (ảnh + video phát mượt), nút CTA nổi bật.
- [ ] **Bước 2: Xây dựng PainGainSection & SpecsSection**
  Bảng so sánh 2 cột trực quan (Ná truyền thống vs Trạc Liên Thanh CNC) & thông số chi tiết cơ khí.
- [ ] **Bước 3: Xây dựng PricingSection (3 gói combo)**
  Gói Tiêu Chuẩn (250k), Bản Laze (400k), Combo Siêu Tiết Kiệm (490k). Tương tác click chọn gói có viền highlight đỏ rực.
- [ ] **Bước 4: Xây dựng ReviewsSection & CommitmentsSection**
  Feedback khách hàng thực tế và các cam kết (Đồng kiểm COD, bảo hành 7 ngày, miễn phí ship).
- [ ] **Bước 5: Xây dựng OrderForm, StickyFooter & OrderSuccessModal**
  Form đặt hàng thông minh, validate số điện thoại, nút submit có loading spinner, sticky footer ghim đáy màn hình mobile, popup chúc mừng sau khi đặt.
- [ ] **Bước 6: Ghép nối hoàn chỉnh vào `app/page.tsx` và kiểm tra trên mobile viewport (375px / 390px / 412px)**
- [ ] **Bước 7: Commit Task 4**
  Tăng version lên `v0.5.0` và commit: `git add . && git commit -m "feat: build complete 8-section mobile-first landing page (bump v0.5.0)"`

---

### Task 5: Xây dựng Hub Quản Trị Đơn Hàng Cho Đội Ngũ Sales (`/admin`)

**Files:**
- Create: `app/api/admin/orders/route.ts`
- Create: `app/api/admin/orders/[id]/route.ts`
- Create: `app/api/admin/export/route.ts`
- Create: `app/admin/page.tsx`

**Giao diện & Dữ liệu:**
- Trang `/admin` bảo vệ bằng mã PIN (`ADMIN_PIN`, mặc định `8888`).
- Bảng hiển thị đơn hàng: Thời gian, Khách hàng, SĐT (link `tel:` gọi 1-chạm), Địa chỉ, Gói hàng, Doanh thu, Trạng thái (Dropdown), Ghi chú cuộc gọi (Input nhanh).
- Thống kê tóm tắt: Tổng đơn hôm nay, Doanh thu ước tính, Tỷ lệ chốt.
- Nút Xuất file CSV/Excel cho bưu tá vận chuyển.

- [ ] **Bước 1: Viết các API routes quản trị (`/api/admin/orders` và `/api/admin/export`)**
  Xác thực mã PIN qua request header / cookie, hỗ trợ cập nhật trạng thái đơn và xuất CSV tiếng Việt có dấu (UTF-8 BOM).
- [ ] **Bước 2: Xây dựng giao diện trang `/admin/page.tsx`**
  Gồm màn hình nhập PIN bảo mật và màn hình Dashboard quản lý đơn hàng.
- [ ] **Bước 3: Kiểm thử toàn diện luồng Sales**
  Đặt thử 1 đơn trên Landing page $\rightarrow$ Đơn lập tức xuất hiện trên `/admin` $\rightarrow$ Bấm đổi trạng thái sang "Đã chốt" $\rightarrow$ Thử tính năng xuất file CSV.
- [ ] **Bước 4: Commit Task 5**
  Tăng version lên `v0.6.0` và commit: `git add . && git commit -m "feat: implement sales admin dashboard with 1-click call and csv export (bump v0.6.0)"`

---

### Task 6: Cấu hình Vercel, Hướng dẫn Domain `nalienthanh.store` & Nghiệm Thu

**Files:**
- Create: `vercel.json`
- Create: `.env.example`
- Create: `README.md`
- Create: `docs/deployment-nalienthanh-store.md`

- [ ] **Bước 1: Cấu hình `vercel.json`**
  Thiết lập cache-control cho static assets và headers bảo mật.
- [ ] **Bước 2: Tạo `.env.example`**
  Gồm `NEXT_PUBLIC_FB_PIXEL_ID`, `ADMIN_PIN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_SHEET_WEBHOOK_URL`.
- [ ] **Bước 3: Soạn thảo hướng dẫn cấu hình DNS tên miền `nalienthanh.store`**
  Chi tiết từng bước trỏ bản ghi A (`76.76.21.21`) và CNAME (`cname.vercel-dns.com`) trên các nhà cung cấp tên miền phổ biến (Inet, Tenten, PA Vietnam, Namecheap, Cloudflare).
- [ ] **Bước 4: Chạy kiểm tra build production (`npm run build`)**
  Đảm bảo 100% build thành công không lỗi TypeScript hay Tailwind.
- [ ] **Bước 5: Commit & Bump Version lên v1.0.0**
  Commit hoàn thiện: `git add . && git commit -m "feat: complete production ready landing page and sales hub (bump v1.0.0)"`
