import type { Metadata, Viewport } from 'next'
import './globals.css'
import MetaPixel from '@/components/MetaPixel'

export const metadata: Metadata = {
  title: 'Trạc Liên Thanh Tự Động Tiếp Bi – Chuẩn Bi Thép 8mm Siêu Bền | nalienthanh.store',
  description: 'Trạc liên thanh nhựa ABS kỹ thuật cao cấp chịu lực, tự động tiếp bi thép 8mm sau mỗi lần kéo, báng cầm công thái học đầm tay. Bao ship toàn quốc, được kiểm hàng và test hàng trước khi thanh toán.',
  keywords: 'trạc liên thanh, dụng cụ thể thao kỹ năng ngoài trời, trạc liên thanh bản laze chỉnh tâm, bi thép 8mm tập luyện, giải trí dã ngoại, nalienthanh.store',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080b10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased bg-paper text-ink selection:bg-accent selection:text-white">
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
