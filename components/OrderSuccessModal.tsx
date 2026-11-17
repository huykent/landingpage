'use client'

interface OrderSuccessModalProps {
  order: {
    id: string
    customerName: string
    phone: string
    totalAmount: number
    mainProductName: string
  } | null
  onClose: () => void
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-surface border border-keyline p-6 text-center shadow-2xl relative">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-950/90 border border-green-500 text-green-400 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-green-950">
          ✓
        </div>

        <h3 className="text-xl font-black text-ink uppercase">
          Đặt Hàng Thành Công!
        </h3>
        <p className="text-xs text-ink-muted mt-1">
          Cảm ơn bạn đã lựa chọn Trạc Liên Thanh CNC tại nalienthanh.store
        </p>

        {/* Order Details Card */}
        <div className="my-5 p-4 rounded-xl bg-paper border border-keyline text-left space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-ink-muted">Mã đơn hàng:</span>
            <span className="font-mono font-bold text-accent">#{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Người nhận:</span>
            <span className="font-semibold text-ink">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Số điện thoại:</span>
            <span className="font-semibold text-ink">{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Sản phẩm:</span>
            <span className="font-semibold text-ink">{order.mainProductName}</span>
          </div>
          <div className="pt-2 border-t border-keyline flex justify-between items-center text-sm sm:text-base font-bold">
            <span className="text-ink">Tổng tiền COD:</span>
            <span className="text-accent text-lg">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-green-950/40 border border-green-800/60 text-xs text-green-300 mb-5">
          🔔 Nhân viên tư vấn sẽ liên hệ với bạn trong ít phút để xác nhận và gửi hàng nhanh nhất. Bạn được <strong>kiểm tra và test cơ chế tiếp bi</strong> trước khi thanh toán!
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide bg-accent hover:bg-accent-hover text-white transition-colors"
        >
          Hoàn Tất & Đóng
        </button>
      </div>
    </div>
  )
}
