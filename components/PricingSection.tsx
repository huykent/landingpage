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
    <section id="pricing" className="py-12 sm:py-16 border-b border-keyline bg-surface/30">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-xs font-black text-accent uppercase tracking-wider mb-2">
            🔥 BẢNG GIÁ XẢ KHO - GIẢM ĐẾN 61%
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase">
            Chọn Phiên Bản Trạc Liên Thanh (Bản Nhựa ABS)
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Đã có <strong className="text-accent font-bold">15.420+ anh em</strong> đặt mua. <strong className="text-green-400">Bao ship toàn quốc</strong>, bóc hộp kiểm tra và test trực tiếp cơ chế tiếp <strong className="text-ink">bi thép 8mm</strong> ưng ý mới thanh toán!
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
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-ink-muted">Bản Tiêu Chuẩn (Bản Nhựa)</span>
                <h3 className="text-xl font-black text-ink mt-0.5">BỘ KHÔNG LAZE</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-ink-muted line-through">650.000đ</div>
                <span className="text-2xl font-black text-ink">250.000đ</span>
              </div>
            </div>

            <div className="text-[11px] text-green-400 font-semibold mb-4 flex items-center justify-between">
              <span>✅ Bao ship COD toàn quốc</span>
              <span className="text-red-400 font-bold">Chỉ còn 7 bộ</span>
            </div>

            <p className="text-xs text-ink-muted mb-5 leading-relaxed">
              Trọn bộ thân trạc nhựa ABS chịu lực cao cấp, tiếp bi thép 8mm tự động nhạy bén, đầm tay.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-ink mb-6 border-t border-b border-keyline py-4">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Thân Trạc Liên Thanh nhựa ABS kỹ thuật chịu lực</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Ray tiếp bi tự động 10 viên (chuẩn bi thép 8mm)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Bộ dây thun trợ lực độ đàn hồi cao</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Túi bi thép 8mm tập luyện chuyên dụng</span>
              </li>
              <li className="flex items-center gap-2 text-green-400 font-bold">
                <span>✓</span>
                <span>Mở hộp kiểm tra &amp; test cơ chế tiếp bi 8mm ưng ý mới trả tiền</span>
              </li>
            </ul>

            <button
              type="button"
              className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-colors ${
                selectedProduct === 'standard'
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'bg-surface-elevated text-ink hover:bg-keyline'
              }`}
            >
              {selectedProduct === 'standard' ? '✓ Đang Chọn Gói 250K' : 'Chọn Bản Không Laze 250K'}
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
            <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg shadow-md">
              ⭐ 85% Khách Chọn
            </div>

            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-accent">Bản Nhựa Full Box</span>
                <h3 className="text-xl font-black text-ink mt-0.5">BỘ CÓ LAZE XỊN</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-ink-muted line-through">950.000đ</div>
                <span className="text-2xl font-black text-accent">400.000đ</span>
              </div>
            </div>

            <div className="text-[11px] text-green-400 font-semibold mb-4 flex items-center justify-between">
              <span>✅ Bao ship COD toàn quốc</span>
              <span className="text-accent font-bold animate-pulse">Chỉ còn 4 bộ giá 400k</span>
            </div>

            <div className="p-2.5 rounded-lg bg-accent/15 border border-accent/40 text-xs font-bold text-accent mb-4">
              🎁 TẶNG MIỄN PHÍ: 1 Đèn Laze Xịn Chỉnh Tâm (Trị giá 250.000đ)
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-ink mb-6 border-t border-b border-keyline py-4">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Thân Trạc Liên Thanh nhựa ABS kỹ thuật chịu lực</span>
              </li>
              <li className="flex items-center gap-2 font-black text-accent">
                <span>✓</span>
                <span>1 ĐÈN LAZE XỊN (Có núm vi chỉnh tâm chuẩn 25-30m)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Ray tiếp bi tự động 10 viên (chuẩn bi thép 8mm)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Bộ dây thun trợ lực độ đàn hồi cao</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>1 Túi bi thép 8mm tập luyện chuyên dụng</span>
              </li>
              <li className="flex items-center gap-2 text-green-400 font-bold">
                <span>✓</span>
                <span>Mở hộp kiểm tra &amp; test cơ chế tiếp bi 8mm ưng ý mới trả tiền</span>
              </li>
            </ul>

            <button
              type="button"
              className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-colors ${
                selectedProduct === 'laser_pro'
                  ? 'bg-accent text-white shadow-xl shadow-accent/40 animate-pulse'
                  : 'bg-accent text-white hover:bg-accent-hover'
              }`}
            >
              {selectedProduct === 'laser_pro' ? '✓ Đang Chọn Gói Có Laze 400K' : 'Chọn Bản Có Laze Xịn 400K'}
            </button>
          </div>
        </div>

        {/* Phụ Kiện Mua Kèm Banner */}
        <div className="max-w-3xl mx-auto mt-8 p-4 rounded-xl bg-surface border border-keyline">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-accent">Phụ Kiện Bán Kèm Giá Gốc</span>
              <div className="text-sm font-semibold text-ink mt-0.5">
                Dây thun: <strong>50k/bộ</strong> • Ray bi tự động 10 viên (8mm): <strong>50k/bộ</strong> • Túi bi thép 8mm: <strong>10k/bịch</strong>
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
