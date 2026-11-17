'use client'

import { useState } from 'react'
import { trackLead, trackPurchase } from '@/lib/pixel'

interface OrderFormProps {
  selectedProduct: 'standard' | 'laser_pro'
  onSelectProduct: (product: 'standard' | 'laser_pro') => void
  onSuccess: (orderData: {
    id: string
    customerName: string
    phone: string
    totalAmount: number
    mainProductName: string
  }) => void
}

export default function OrderForm({
  selectedProduct,
  onSelectProduct,
  onSuccess,
}: OrderFormProps) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')

  // Add-ons quantities
  const [extraBandQty, setExtraBandQty] = useState(0)
  const [extraMagazineQty, setExtraMagazineQty] = useState(0)
  const [extraAmmoQty, setExtraAmmoQty] = useState(0)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const basePrice = selectedProduct === 'laser_pro' ? 400000 : 250000
  const addOnsTotal =
    extraBandQty * 50000 + extraMagazineQty * 50000 + extraAmmoQty * 10000
  const totalAmount = basePrice + addOnsTotal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!customerName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên người nhận.')
      return
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setErrorMessage('Vui lòng nhập số điện thoại hợp lệ (10 số).')
      return
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage('Vui lòng nhập địa chỉ nhận hàng chi tiết để shipper giao tận nơi.')
      return
    }

    setLoading(true)

    const addOns = []
    if (extraBandQty > 0) {
      addOns.push({ id: 'extra_band' as const, quantity: extraBandQty })
    }
    if (extraMagazineQty > 0) {
      addOns.push({ id: 'extra_magazine' as const, quantity: extraMagazineQty })
    }
    if (extraAmmoQty > 0) {
      addOns.push({ id: 'extra_ammo' as const, quantity: extraAmmoQty })
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone: cleanPhone,
          address,
          mainProduct: selectedProduct,
          addOns,
          note,
        }),
      })

      const data = await res.json()

      if (data.success && data.order) {
        // Track Pixel conversion events
        trackLead(totalAmount)
        trackPurchase(
          data.order.id,
          totalAmount,
          selectedProduct === 'laser_pro' ? 'BỘ CÓ LAZE XỊN' : 'BỘ KHÔNG LAZE'
        )

        onSuccess(data.order)
      } else {
        setErrorMessage(data.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.')
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('Mạng không ổn định hoặc có lỗi xảy ra. Vui lòng bấm thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="order-form" className="py-12 sm:py-16 border-b border-keyline bg-paper relative">
      <div className="site-container">
        <div className="max-w-xl mx-auto">
          {/* Header Card */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Đặt Hàng Nhanh
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
              Điền Thông Tin Nhận Hàng Tận Nơi
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              Chỉ mất 30 giây • Không cần thanh toán trước • Kiểm tra và test hàng trước khi thanh toán
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-7 rounded-2xl bg-surface border border-keyline shadow-2xl space-y-6"
          >
            {/* Step 1: Chọn sản phẩm chính */}
            <div>
              <label className="block text-xs font-bold uppercase text-ink-muted mb-2.5">
                1. Chọn Phiên Bản Sản Phẩm:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProduct('laser_pro')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    selectedProduct === 'laser_pro'
                      ? 'bg-paper border-accent shadow-lg shadow-accent/20 ring-2 ring-accent'
                      : 'bg-paper/50 border-keyline hover:border-keyline-bright'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase text-accent">Khuyên Dùng ⭐</div>
                  <div className="font-extrabold text-sm text-ink mt-0.5">BỘ CÓ LAZE XỊN</div>
                  <div className="text-xs text-ink-muted">Chỉnh được tâm xa gần</div>
                  <div className="text-base font-black text-accent mt-2">400.000đ</div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProduct('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedProduct === 'standard'
                      ? 'bg-paper border-accent shadow-lg shadow-accent/20 ring-2 ring-accent'
                      : 'bg-paper/50 border-keyline hover:border-keyline-bright'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase text-ink-muted">Bản Cơ Bản</div>
                  <div className="font-extrabold text-sm text-ink mt-0.5">BỘ KHÔNG LAZE</div>
                  <div className="text-xs text-ink-muted">Tự động tiếp bi CNC</div>
                  <div className="text-base font-black text-ink mt-2">250.000đ</div>
                </button>
              </div>
            </div>

            {/* Step 2: Chọn phụ kiện mua thêm */}
            <div className="pt-2 border-t border-keyline">
              <label className="block text-xs font-bold uppercase text-ink-muted mb-2">
                2. Phụ Kiện Mua Thêm Kèm Đơn (Giá Gốc):
              </label>

              <div className="space-y-2.5">
                {/* Dây thun 50k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Bộ Dây Thun Cao Cấp</div>
                    <div className="text-[11px] text-accent font-semibold">+50.000đ / bộ</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraBandQty(Math.max(0, extraBandQty - 1))}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink">{extraBandQty}</span>
                    <button
                      type="button"
                      onClick={() => setExtraBandQty(extraBandQty + 1)}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Băng bi 50k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Băng Tiếp Bi Tự Động Dự Phòng</div>
                    <div className="text-[11px] text-accent font-semibold">+50.000đ / bộ</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraMagazineQty(Math.max(0, extraMagazineQty - 1))}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink">{extraMagazineQty}</span>
                    <button
                      type="button"
                      onClick={() => setExtraMagazineQty(extraMagazineQty + 1)}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bi 10k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Túi Bi Thép Tập Luyện</div>
                    <div className="text-[11px] text-accent font-semibold">+10.000đ / bịch</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraAmmoQty(Math.max(0, extraAmmoQty - 1))}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink">{extraAmmoQty}</span>
                    <button
                      type="button"
                      onClick={() => setExtraAmmoQty(extraAmmoQty + 1)}
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Thông tin giao hàng */}
            <div className="pt-2 border-t border-keyline space-y-3.5">
              <label className="block text-xs font-bold uppercase text-ink-muted">
                3. Thông Tin Người Nhận:
              </label>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên người nhận *"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink placeholder:text-ink-muted focus:border-accent transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại nhận hàng *"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink placeholder:text-ink-muted focus:border-accent transition-colors"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={2}
                  placeholder="Địa chỉ nhận hàng (Số nhà, đường/thôn, xã/phường, quận/huyện, tỉnh/TP) *"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink placeholder:text-ink-muted focus:border-accent transition-colors resize-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Ghi chú thêm (VD: Giao giờ hành chính, gọi trước khi đến...)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-paper border border-keyline text-xs text-ink placeholder:text-ink-muted focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200">
                ⚠ {errorMessage}
              </div>
            )}

            {/* Bill Summary */}
            <div className="p-4 rounded-xl bg-paper border border-keyline space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Gói sản phẩm:</span>
                <span className="font-semibold text-ink">
                  {selectedProduct === 'laser_pro' ? 'Bản Laze Xịn' : 'Bản Không Laze'} ({basePrice.toLocaleString('vi-VN')}đ)
                </span>
              </div>
              {addOnsTotal > 0 && (
                <div className="flex justify-between text-ink-muted">
                  <span>Phụ kiện mua thêm:</span>
                  <span className="font-semibold text-accent">+{addOnsTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between text-ink-muted">
                <span>Cước vận chuyển:</span>
                <span className="font-semibold text-green-400">0đ (MIỄN PHÍ TOÀN QUỐC)</span>
              </div>
              <div className="pt-2 border-t border-keyline flex justify-between items-center text-base sm:text-lg font-black text-ink">
                <span>TỔNG THANH TOÁN:</span>
                <span className="text-accent text-xl sm:text-2xl">{totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="text-[11px] text-green-400 font-medium text-center pt-1">
                ✅ Đồng kiểm và test hàng trước khi thanh toán COD
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-black text-white bg-accent hover:bg-accent-hover text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-accent/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>ĐANG XỬ LÝ ĐƠN HÀNG...</span>
                </>
              ) : (
                <span>XÁC NHẬN ĐẶT HÀNG NGAY ➔</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
