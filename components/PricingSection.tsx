'use client'

import { trackInitiateCheckout } from '@/lib/pixel'

interface PricingSectionProps {
  selectedProduct: 'standard' | 'laser_pro'
  onSelectProduct: (product: 'standard' | 'laser_pro') => void
}

export default function PricingSection({
  selectedProduct,
  onSelectProduct,
}: PricingSectionProps) {
  const handleSelect = (prod: 'standard' | 'laser_pro') => {
    onSelectProduct(prod)
    trackInitiateCheckout(
      prod === 'laser_pro' ? 'BỘ CÓ LAZE XỊN' : 'BỘ KHÔNG LAZE',
      prod === 'laser_pro' ? 400000 : 250000
    )
    const formEl = document.getElementById('order-form')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-12 sm:py-16 border-b border-keyline">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Bảng Giá Ưu Đãi Hôm Nay
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            Chọn Phiên Bản Trạc Liên Thanh Phù Hợp
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Ưu đãi đặc quyền: <strong className="text-green-400">Bao ship toàn quốc</strong>, mở hộp kiểm hàng và test cơ chế tiếp bi hài lòng mới thanh toán!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Card 1: BỘ KHÔNG LAZE */}
          <div
            onClick={() => handleSelect('standard')}
            className={`cursor-pointer rounded-2xl p-6 transition-all border ${
              selectedProduct === 'standard'
                ? 'bg-surface border-accent shadow-xl shadow-accent/15 ring-2 ring-accent'
                : 'bg-paper border-keyline hover:border-keyline-bright'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-ink-muted">Bản Tiêu Chuẩn</span>
                <h3 className="text-xl font-black text-ink mt-0.5">BỘ KHÔNG LAZE</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-ink">250.000đ</span>
                <div className="text-[11px] text-green-400 font-semibold">Bao ship COD</div>
              </div>
            </div>

            <p className="text-xs text-ink-muted mb-5 leading-relaxed">
              Trọn bộ trạc liên thanh cơ khí CNC thế hệ mới, phù hợp tập luyện kỹ năng ngắm bắn cơ bản ngoài trời.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-ink mb-6 border-t border-b border-keyline py-4">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Thân Trạc Liên Thanh hợp kim CNC nguyên khối</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Băng tiếp bi tự động (chứa 15-20 viên)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Bộ dây thun cao cấp đàn hồi cao</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Túi bi thép tập luyện chuyên dụng</span>
              </li>
              <li className="flex items-center gap-2 text-green-400 font-medium">
                <span>✓</span>
                <span>Được kiểm hàng & test hàng trước khi trả tiền</span>
              </li>
            </ul>

            <button
              type="button"
              className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-colors ${
                selectedProduct === 'standard'
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'bg-surface-elevated text-ink hover:bg-keyline'
              }`}
            >
              {selectedProduct === 'standard' ? '✓ Đang Chọn Gói Này' : 'Chọn Gói 250K'}
            </button>
          </div>

          {/* Card 2: BỘ CÓ LAZE XỊN */}
          <div
            onClick={() => handleSelect('laser_pro')}
            className={`cursor-pointer rounded-2xl p-6 transition-all border relative overflow-hidden ${
              selectedProduct === 'laser_pro'
                ? 'bg-surface border-accent shadow-2xl shadow-accent/25 ring-2 ring-accent'
                : 'bg-paper border-accent/40 hover:border-accent'
            }`}
          >
            <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              ⭐ Bán Chạy Nhất
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-accent">Bản Nâng Cấp Pro</span>
                <h3 className="text-xl font-black text-ink mt-0.5">BỘ CÓ LAZE XỊN</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-accent">400.000đ</span>
                <div className="text-[11px] text-green-400 font-semibold">Bao ship COD</div>
              </div>
            </div>

            <p className="text-xs text-ink-muted mb-5 leading-relaxed">
              Trang bị thêm <strong className="text-ink">Đèn Laze Xịn chỉnh được tâm</strong> cự ly xa gần, ngắm bia mục tiêu cực chuẩn cả ngày lẫn đêm.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-ink mb-6 border-t border-b border-keyline py-4">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Thân Trạc Liên Thanh hợp kim CNC nguyên khối</span>
              </li>
              <li className="flex items-center gap-2 font-bold text-accent">
                <span>✓</span>
                <span>1 ĐÈN LAZE XỊN (Có núm xoay chỉnh tâm chính xác)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Băng tiếp bi tự động (chứa 15-20 viên)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Bộ dây thun cao cấp đàn hồi cao</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Túi bi thép tập luyện chuyên dụng</span>
              </li>
              <li className="flex items-center gap-2 text-green-400 font-medium">
                <span>✓</span>
                <span>Được kiểm hàng & test hàng trước khi trả tiền</span>
              </li>
            </ul>

            <button
              type="button"
              className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-colors ${
                selectedProduct === 'laser_pro'
                  ? 'bg-accent text-white shadow-lg shadow-accent/40'
                  : 'bg-accent/80 text-white hover:bg-accent'
              }`}
            >
              {selectedProduct === 'laser_pro' ? '✓ Đang Chọn Gói Này' : 'Chọn Gói Có Laze 400K'}
            </button>
          </div>
        </div>

        {/* Phụ Kiện Mua Kèm Banner */}
        <div className="max-w-3xl mx-auto mt-8 p-4 rounded-xl bg-surface border border-keyline">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-accent">Phụ Kiện Bán Kèm Giá Gốc</span>
              <div className="text-sm font-semibold text-ink mt-0.5">
                Dây thun: <strong>50k/bộ</strong> • Băng bi tự động: <strong>50k/bộ</strong> • Túi bi thép: <strong>10k/bịch</strong>
              </div>
            </div>
            <a
              href="#order-form"
              className="shrink-0 px-4 py-2 rounded-lg bg-surface-elevated hover:bg-keyline border border-keyline text-xs font-bold text-ink transition-colors"
            >
              Chọn Phụ Kiện Trong Form ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
