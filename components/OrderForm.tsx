'use client'

import { useEffect, useMemo, useState } from 'react'
import { trackLead, trackPurchase } from '@/lib/pixel'
import {
  ADDON_CATALOG,
  PRODUCT_CATALOG,
  calculateAddOnsTotal,
} from '@/lib/catalog'
import FlashSaleTimer from '@/components/FlashSaleTimer'

export interface AddOnsState {
  band: number
  magazine: number
  ammo: number
}

// Tuple format from /data/vn-addresses.json: [provinceName, [[districtName, [wardName, ...]], ...]]
type DistrictTuple = [string, string[]]
type ProvinceTuple = [string, DistrictTuple[]]

interface OrderFormProps {
  selectedProduct: 'standard' | 'laser_pro'
  onSelectProduct: (product: 'standard' | 'laser_pro') => void
  addOns: AddOnsState
  onChangeAddOns: (next: AddOnsState) => void
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
  addOns,
  onChangeAddOns,
  onSuccess,
}: OrderFormProps) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')

  // 3-level Vietnam legacy address (63 provinces -> districts -> wards)
  const [provinces, setProvinces] = useState<ProvinceTuple[]>([])
  const [addressLoadFailed, setAddressLoadFailed] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [streetAddress, setStreetAddress] = useState('')

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let active = true
    fetch('/data/vn-addresses.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json() as Promise<ProvinceTuple[]>
      })
      .then(data => {
        if (active && Array.isArray(data) && data.length > 0) {
          setProvinces(data)
        }
      })
      .catch(() => {
        if (active) setAddressLoadFailed(true)
      })
    return () => {
      active = false
    }
  }, [])

  const districts = useMemo(() => {
    if (!selectedProvince) return []
    const found = provinces.find(p => p[0] === selectedProvince)
    return found ? found[1] : []
  }, [provinces, selectedProvince])

  const wards = useMemo(() => {
    if (!selectedDistrict) return []
    const found = districts.find(d => d[0] === selectedDistrict)
    return found ? found[1] : []
  }, [districts, selectedDistrict])

  const extraBandQty = addOns.band
  const extraMagazineQty = addOns.magazine
  const extraAmmoQty = addOns.ammo

  const setExtraBandQty = (qty: number) =>
    onChangeAddOns({ ...addOns, band: Math.max(0, Math.min(99, qty)) })
  const setExtraMagazineQty = (qty: number) =>
    onChangeAddOns({ ...addOns, magazine: Math.max(0, Math.min(99, qty)) })
  const setExtraAmmoQty = (qty: number) =>
    onChangeAddOns({ ...addOns, ammo: Math.max(0, Math.min(99, qty)) })

  const productInfo = PRODUCT_CATALOG[selectedProduct]
  const basePrice = productInfo.price
  const addOnsTotal = calculateAddOnsTotal(addOns)
  const totalAmount = basePrice + addOnsTotal
  const savings = productInfo.originalPrice - basePrice

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
    setSelectedDistrict('')
    setSelectedWard('')
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    setSelectedWard('')
  }

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

    let fullAddress = ''
    if (provinces.length > 0 && !addressLoadFailed) {
      if (!selectedProvince) {
        setErrorMessage('Vui lòng chọn Tỉnh / Thành phố nhận hàng.')
        return
      }
      if (!selectedDistrict) {
        setErrorMessage('Vui lòng chọn Quận / Huyện nhận hàng.')
        return
      }
      if (wards.length > 0 && !selectedWard) {
        setErrorMessage('Vui lòng chọn Phường / Xã nhận hàng.')
        return
      }
      if (!streetAddress.trim() || streetAddress.trim().length < 2) {
        setErrorMessage('Vui lòng nhập số nhà, tên đường hoặc thôn/xóm để shipper giao tận nơi.')
        return
      }
      fullAddress = [streetAddress.trim(), selectedWard, selectedDistrict, selectedProvince]
        .filter(Boolean)
        .join(', ')
    } else {
      if (!streetAddress.trim() || streetAddress.trim().length < 5) {
        setErrorMessage('Vui lòng nhập địa chỉ nhận hàng chi tiết để shipper giao tận nơi.')
        return
      }
      fullAddress = streetAddress.trim()
    }

    setLoading(true)

    const addOnsPayload = []
    if (extraBandQty > 0) {
      addOnsPayload.push({ id: 'extra_band' as const, quantity: extraBandQty })
    }
    if (extraMagazineQty > 0) {
      addOnsPayload.push({ id: 'extra_magazine' as const, quantity: extraMagazineQty })
    }
    if (extraAmmoQty > 0) {
      addOnsPayload.push({ id: 'extra_ammo' as const, quantity: extraAmmoQty })
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone: cleanPhone,
          address: fullAddress,
          mainProduct: selectedProduct,
          addOns: addOnsPayload,
          note,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success && data.order) {
        trackLead(totalAmount)
        trackPurchase(
          data.order.id,
          totalAmount,
          selectedProduct === 'laser_pro' ? 'BỘ CÓ LAZE XỊN' : 'BỘ KHÔNG LAZE'
        )

        // Reset form and add-ons after confirmed order to prevent duplicate submissions
        setCustomerName('')
        setPhone('')
        setSelectedProvince('')
        setSelectedDistrict('')
        setSelectedWard('')
        setStreetAddress('')
        setNote('')
        onChangeAddOns({ band: 0, magazine: 0, ammo: 0 })

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
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              ⚡ Đăng Ký Nhận Ưu Đãi Flash Sale
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
              Điền Thông Tin Nhận Hàng Tận Nơi
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              Chỉ mất 30 giây • Không cần cọc trước • Được bắn thử test cơ chế tiếp bi trước khi thanh toán!
            </p>
          </div>

          {/* Compact Timer inside Form */}
          <div className="mb-5">
            <FlashSaleTimer compact={true} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-7 rounded-2xl bg-surface border border-keyline shadow-2xl space-y-6"
          >
            {/* Step 1: Chọn sản phẩm chính */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-bold uppercase text-ink-muted">
                  1. Chọn Phiên Bản Sản Phẩm:
                </label>
                <span className="text-[11px] text-green-400 font-bold">
                  Tiết kiệm đến {savings.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProduct('laser_pro')}
                  className={`p-3.5 rounded-xl border text-left transition-colors relative ${
                    selectedProduct === 'laser_pro'
                      ? 'bg-paper border-accent shadow-lg shadow-accent/20 ring-2 ring-accent'
                      : 'bg-paper/50 border-keyline hover:border-keyline-bright'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-accent">85% Anh Em Chọn ⭐</span>
                    <span className="text-[10px] text-ink-muted line-through">950k</span>
                  </div>
                  <div className="font-extrabold text-sm text-ink mt-0.5">BỘ CÓ LAZE XỊN</div>
                  <div className="text-[11px] text-ink-muted">Tặng kèm Laze chỉnh tâm</div>
                  <div className="text-base font-black text-accent mt-2">
                    {PRODUCT_CATALOG.laser_pro.price.toLocaleString('vi-VN')}đ
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProduct('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    selectedProduct === 'standard'
                      ? 'bg-paper border-accent shadow-lg shadow-accent/20 ring-2 ring-accent'
                      : 'bg-paper/50 border-keyline hover:border-keyline-bright'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-ink-muted">Bản Tiêu Chuẩn</span>
                    <span className="text-[10px] text-ink-muted line-through">650k</span>
                  </div>
                  <div className="font-extrabold text-sm text-ink mt-0.5">BỘ KHÔNG LAZE</div>
                  <div className="text-[11px] text-ink-muted">Nhựa ABS chịu lực • Ray 10 viên</div>
                  <div className="text-base font-black text-ink mt-2">
                    {PRODUCT_CATALOG.standard.price.toLocaleString('vi-VN')}đ
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Chọn phụ kiện mua thêm */}
            <div className="pt-2 border-t border-keyline">
              <label className="block text-xs font-bold uppercase text-ink-muted mb-2">
                2. Mua Thêm Phụ Kiện Với Giá Gốc Cực Hời:
              </label>

              <div className="space-y-2.5">
                {/* Dây thun 50k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Bộ Dây Thun Cao Cấp Siêu Bền</div>
                    <div className="text-[11px] text-accent font-semibold">
                      +{ADDON_CATALOG.extra_band.price.toLocaleString('vi-VN')}đ / bộ
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraBandQty(extraBandQty - 1)}
                      aria-label="Giảm số lượng dây thun"
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink tabular-nums">
                      {extraBandQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExtraBandQty(extraBandQty + 1)}
                      aria-label="Tăng số lượng dây thun"
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Ray bi 50k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">
                      Ray Tiếp Bi Tự Động 10 Viên (8mm)
                    </div>
                    <div className="text-[11px] text-accent font-semibold">
                      +{ADDON_CATALOG.extra_magazine.price.toLocaleString('vi-VN')}đ / bộ
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraMagazineQty(extraMagazineQty - 1)}
                      aria-label="Giảm số lượng ray bi"
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink tabular-nums">
                      {extraMagazineQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExtraMagazineQty(extraMagazineQty + 1)}
                      aria-label="Tăng số lượng ray bi"
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bi 10k */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-keyline">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-ink">Túi Bi Thép 8mm Tập Luyện</div>
                    <div className="text-[11px] text-accent font-semibold">
                      +{ADDON_CATALOG.extra_ammo.price.toLocaleString('vi-VN')}đ / bịch
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraAmmoQty(extraAmmoQty - 1)}
                      aria-label="Giảm số lượng túi bi"
                      className="w-7 h-7 rounded bg-surface border border-keyline text-ink font-bold hover:bg-keyline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink tabular-nums">
                      {extraAmmoQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExtraAmmoQty(extraAmmoQty + 1)}
                      aria-label="Tăng số lượng túi bi"
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
                3. Thông Tin Nhận Hàng (Không Cần Trả Trước):
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

              {/* Địa chỉ 3 cấp Việt Nam (63 Tỉnh/TP cũ) */}
              {!addressLoadFailed ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <select
                      required
                      aria-label="Chọn Tỉnh hoặc Thành phố"
                      value={selectedProvince}
                      onChange={e => handleProvinceChange(e.target.value)}
                      disabled={provinces.length === 0}
                      className="w-full px-3.5 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink focus:border-accent transition-colors disabled:opacity-50"
                    >
                      <option value="">
                        {provinces.length === 0 ? 'Đang tải Tỉnh/TP...' : 'Tỉnh / Thành phố *'}
                      </option>
                      {provinces.map(p => (
                        <option key={p[0]} value={p[0]}>
                          {p[0]}
                        </option>
                      ))}
                    </select>

                    <select
                      required
                      aria-label="Chọn Quận hoặc Huyện"
                      value={selectedDistrict}
                      onChange={e => handleDistrictChange(e.target.value)}
                      disabled={!selectedProvince}
                      className="w-full px-3.5 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink focus:border-accent transition-colors disabled:opacity-50"
                    >
                      <option value="">Quận / Huyện *</option>
                      {districts.map(d => (
                        <option key={d[0]} value={d[0]}>
                          {d[0]}
                        </option>
                      ))}
                    </select>

                    <select
                      required={wards.length > 0}
                      aria-label="Chọn Phường hoặc Xã"
                      value={selectedWard}
                      onChange={e => setSelectedWard(e.target.value)}
                      disabled={!selectedDistrict || wards.length === 0}
                      className="w-full px-3.5 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink focus:border-accent transition-colors disabled:opacity-50"
                    >
                      <option value="">Phường / Xã *</option>
                      {wards.map(w => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên đường / thôn, xóm cụ thể *"
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink placeholder:text-ink-muted focus:border-accent transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Địa chỉ nhận hàng (Số nhà, đường/thôn, xã/phường, quận/huyện, tỉnh/TP) *"
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-sm text-ink placeholder:text-ink-muted focus:border-accent transition-colors resize-none"
                  />
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Ghi chú thêm (VD: Giao sau 17h, gọi trước khi giao...)"
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
                  {productInfo.shortName} ({basePrice.toLocaleString('vi-VN')}đ)
                </span>
              </div>
              {addOnsTotal > 0 && (
                <div className="flex justify-between text-ink-muted">
                  <span>Phụ kiện mua thêm:</span>
                  <span className="font-semibold text-accent">
                    +{addOnsTotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}
              <div className="flex justify-between text-ink-muted">
                <span>Cước vận chuyển:</span>
                <span className="font-bold text-green-400">0đ (MIỄN PHÍ TOÀN QUỐC)</span>
              </div>
              <div className="pt-2 border-t border-keyline flex justify-between items-center text-base sm:text-lg font-black text-ink">
                <span>TỔNG THANH TOÁN (COD):</span>
                <span className="text-accent text-xl sm:text-2xl tabular-nums">
                  {totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="text-[11px] text-green-400 font-bold text-center pt-1 flex items-center justify-center gap-1">
                <span>✓</span>
                <span>Bắn thử test cơ chế tiếp bi trực tiếp mới trả tiền cho shipper!</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-black text-white bg-accent hover:bg-accent-hover text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-accent/40 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 animate-pulse"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
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
