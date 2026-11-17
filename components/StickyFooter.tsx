'use client'

interface StickyFooterProps {
  selectedProduct: 'standard' | 'laser_pro'
}

export default function StickyFooter({ selectedProduct }: StickyFooterProps) {
  const price = selectedProduct === 'laser_pro' ? 400000 : 250000
  const name = selectedProduct === 'laser_pro' ? 'Bản Laze Xịn' : 'Bản Không Laze'

  const handleScrollToForm = () => {
    const el = document.getElementById('order-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur border-t border-keyline px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <div className="text-[11px] font-semibold text-ink-muted leading-tight">
            Đang chọn: <span className="text-ink">{name}</span>
          </div>
          <div className="text-lg font-black text-accent leading-tight">
            {price.toLocaleString('vi-VN')}đ
          </div>
          <div className="text-[10px] text-green-400 font-medium">Bao ship • Test hàng</div>
        </div>

        <button
          type="button"
          onClick={handleScrollToForm}
          className="py-2.5 px-5 rounded-xl font-black text-sm uppercase tracking-wide bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30 transition-all shrink-0 animate-pulse"
        >
          ĐẶT HÀNG NGAY ➔
        </button>
      </div>
    </div>
  )
}
