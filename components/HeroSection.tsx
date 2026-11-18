'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PRODUCT_CATALOG } from '@/lib/catalog'
import { trackInitiateCheckout } from '@/lib/pixel'
import FlashSaleTimer from '@/components/FlashSaleTimer'

type ProductKey = 'laser_pro' | 'standard'

const HERO_VARIANTS: ReadonlyArray<{
  key: ProductKey
  title: string
  badge: string
  discount: string
  image: string
  alt: string
  highlight: string
  specLine: string
  recommended: boolean
}> = [
  {
    key: 'laser_pro',
    title: 'BỘ CÓ LAZE XỊN',
    badge: '85% Khách Chọn',
    discount: 'GIẢM 58%',
    image: '/assets/trac-ban-laze.jpg',
    alt: 'Trạc Liên Thanh Nhựa ABS Bản Có Laze Chỉnh Tâm',
    highlight: 'Tặng Laze vi chỉnh tâm xa gần',
    specLine: 'Nhựa ABS • Ray 10 viên 8mm',
    recommended: true,
  },
  {
    key: 'standard',
    title: 'BỘ KHÔNG LAZE',
    badge: 'Bản Tiêu Chuẩn',
    discount: 'GIẢM 61%',
    image: '/assets/trac-tieu-chuan.jpg',
    alt: 'Trạc Liên Thanh Nhựa ABS Bản Không Laze',
    highlight: 'Gọn nhẹ, dễ thao tác mỗi ngày',
    specLine: 'Nhựa ABS • Ray 10 viên 8mm',
    recommended: false,
  },
]

export default function HeroSection({
  selectedProduct = 'laser_pro',
  onSelectProduct,
}: {
  selectedProduct?: ProductKey
  onSelectProduct?: (product: ProductKey) => void
}) {
  const [viewingCount, setViewingCount] = useState(148)

  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(prev => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const activeInfo = PRODUCT_CATALOG[selectedProduct]

  const handleSelect = (key: ProductKey, scrollToOrder = false) => {
    if (onSelectProduct) {
      onSelectProduct(key)
    }
    if (scrollToOrder) {
      const info = PRODUCT_CATALOG[key]
      trackInitiateCheckout(info.shortName, info.price)
      const el = document.getElementById('order-form')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-keyline overflow-x-clip">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        {/* Top Legal & Live Viewers Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/70 border border-green-700/80 text-[11px] font-bold text-green-300">
            <span>100% Hợp pháp • An tâm sưu tầm &amp; thể thao</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-keyline text-[11px] font-semibold text-ink-muted">
            <strong className="text-ink tabular-nums">{viewingCount}</strong>
            <span>người đang cùng xem</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink uppercase leading-tight break-words min-w-0">
            Trạc Liên Thanh Tự Động
            <span className="block text-accent mt-1">Chuẩn Bi Thép 8mm – Căn Tâm Cực Chuẩn</span>
          </h1>
          <p className="mt-2.5 text-xs sm:text-base text-ink-muted leading-relaxed">
            Dụng cụ thể thao kỹ năng ngoài trời thân nhựa ABS kỹ thuật chịu lực, đầm chắc tay. Ray nạp bi tự động 10 viên chuyên dụng cho <strong className="text-ink">bi thép 8mm</strong> đẩy liên tục sau mỗi lần kéo – tốc độ nhanh gấp 5 lần loại truyền thống.
          </p>
        </div>

        {/* Urgent Flash Sale Countdown */}
        <FlashSaleTimer />

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-6 text-center text-xs sm:text-sm">
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-ink">Ray Bi 10 Viên</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Tự động • Bi thép 8mm</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-accent">Laze Chỉnh Tâm</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Chuẩn cự ly 25-30m</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-green-400">Test Hàng Khi Nhận</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Test bi 8mm trơn tru</div>
          </div>
        </div>

        {/* Side-by-Side 2 Product Versions Selector */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="text-xs sm:text-sm font-bold text-ink">
              Chọn nhanh 1 trong 2 phiên bản dưới đây:
            </h2>
            <span className="text-[11px] font-semibold text-green-400">
              Bao ship toàn quốc
            </span>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2.5 sm:gap-5">
            {HERO_VARIANTS.map(variant => {
              const info = PRODUCT_CATALOG[variant.key]
              const isSelected = selectedProduct === variant.key

              return (
                <div
                  key={variant.key}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(variant.key, false)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelect(variant.key, false)
                    }
                  }}
                  className={`cursor-pointer rounded-2xl border p-2.5 sm:p-4 flex flex-col justify-between transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isSelected
                      ? 'bg-surface border-accent ring-2 ring-accent shadow-2xl shadow-accent/20'
                      : 'bg-surface/70 border-keyline hover:border-keyline-bright'
                  }`}
                >
                  <div>
                    {/* Top row: Badge + Selected check */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span
                        className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md truncate ${
                          variant.recommended
                            ? 'bg-accent/20 text-accent border border-accent/40'
                            : 'bg-paper text-ink-muted border border-keyline'
                        }`}
                      >
                        {variant.badge}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 border ${
                          isSelected
                            ? 'bg-accent border-accent text-white'
                            : 'bg-paper border-keyline text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/50 border border-keyline/60 mb-2.5 sm:mb-3">
                      <Image
                        src={variant.image}
                        alt={variant.alt}
                        fill
                        priority
                        sizes="(max-width: 640px) 46vw, 340px"
                        className="object-contain"
                      />
                      <span className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-950/90 text-red-200 border border-red-700">
                        {variant.discount}
                      </span>
                    </div>

                    {/* Title & Short Differentiator */}
                    <h3 className="text-xs sm:text-base font-black text-ink leading-snug">
                      {variant.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs font-semibold mt-0.5 leading-snug ${
                        variant.recommended ? 'text-accent' : 'text-ink-muted'
                      }`}
                    >
                      {variant.highlight}
                    </p>
                    <p className="text-[10px] sm:text-xs text-ink-muted mt-0.5">
                      {variant.specLine}
                    </p>
                  </div>

                  {/* Price & Quick Order Button */}
                  <div className="mt-3 pt-2.5 border-t border-keyline">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-base sm:text-2xl font-black text-accent tabular-nums">
                        {info.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-[10px] sm:text-xs text-ink-muted line-through tabular-nums">
                        {info.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation()
                        handleSelect(variant.key, true)
                      }}
                      className={`mt-2.5 w-full py-2 sm:py-2.5 px-2.5 rounded-xl text-[11px] sm:text-sm font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isSelected
                          ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30'
                          : 'bg-paper hover:bg-surface-elevated text-ink border border-keyline'
                      }`}
                    >
                      {isSelected ? 'Đặt bản này ngay' : `Chọn bản ${info.price / 1000}K`}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Primary CTA Bar synced with currently chosen version */}
          <div className="mt-5 max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => handleSelect(selectedProduct, true)}
              className="block w-full py-3.5 px-5 rounded-xl font-black text-center text-white bg-accent hover:bg-accent-hover text-sm sm:text-lg shadow-xl shadow-accent/35 transition-colors uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Đặt ngay: {activeInfo.shortName} — {activeInfo.price.toLocaleString('vi-VN')}đ
            </button>
            <p className="text-center text-[11px] sm:text-xs text-green-400 font-semibold mt-2">
              Bao ship toàn quốc • Mở hộp kiểm tra &amp; test cơ chế tiếp bi 8mm ưng ý mới thanh toán
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
