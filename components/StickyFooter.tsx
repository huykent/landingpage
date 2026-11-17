'use client'

import { PRODUCT_CATALOG } from '@/lib/catalog'

interface StickyFooterProps {
  selectedProduct: 'standard' | 'laser_pro'
  addOnsTotal?: number
  addOnsCount?: number
}

export default function StickyFooter({
  selectedProduct,
  addOnsTotal = 0,
  addOnsCount = 0,
}: StickyFooterProps) {
  const productInfo = PRODUCT_CATALOG[selectedProduct]
  const totalPrice = productInfo.price + addOnsTotal
  const name = productInfo.shortName

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
            {addOnsCount > 0 && (
              <span className="text-accent font-bold"> + {addOnsCount} phụ kiện</span>
            )}
          </div>
          <div className="text-lg font-black text-accent leading-tight tabular-nums">
            {totalPrice.toLocaleString('vi-VN')}đ
          </div>
          <div className="text-[10px] text-green-400 font-medium">Bao ship • Test hàng</div>
        </div>

        <button
          type="button"
          onClick={handleScrollToForm}
          className="py-2.5 px-5 rounded-xl font-black text-sm uppercase tracking-wide bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30 transition-colors shrink-0 animate-pulse"
        >
          ĐẶT HÀNG NGAY ➔
        </button>
      </div>
    </div>
  )
}
