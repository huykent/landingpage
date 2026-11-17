export default function Footer() {
  return (
    <footer className="py-10 border-t border-keyline bg-paper text-ink-muted text-xs">
      <div className="site-container text-center space-y-3">
        <div className="font-extrabold text-base text-ink">
          NALIENTHANH<span className="text-accent">.STORE</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed">
          Chuyên cung cấp dụng cụ thể thao kỹ năng, rèn luyện sự tập trung và độ chính xác ngoài trời. Cam kết gia công cơ khí chính xác, bảo hành uy tín toàn quốc.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-ink pt-2">
          <span>📦 Kiểm tra hàng trước khi nhận</span>
          <span>🎯 Test nạp bi trơn tru mới thanh toán</span>
          <span>🚚 Miễn phí vận chuyển</span>
        </div>
        <div className="pt-4 border-t border-keyline/50 text-[11px] text-ink-subtle">
          © {new Date().getFullYear()} nalienthanh.store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
