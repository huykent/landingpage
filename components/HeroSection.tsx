'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { trackInitiateCheckout } from '@/lib/pixel'
import FlashSaleTimer from '@/components/FlashSaleTimer'

export default function HeroSection({
  onSelectProduct,
}: {
  onSelectProduct?: (product: 'standard' | 'laser_pro') => void
}) {
  const [activeTab, setActiveTab] = useState<'laser_pro' | 'standard'>('laser_pro')
  const [viewingCount, setViewingCount] = useState(148)

  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(prev => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleCtaClick = () => {
    trackInitiateCheckout(
      activeTab === 'laser_pro' ? 'BỘ CÓ LAZE XỊN' : 'BỘ KHÔNG LAZE',
      activeTab === 'laser_pro' ? 400000 : 250000
    )
    if (onSelectProduct) {
      onSelectProduct(activeTab)
    }
  }

  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-keyline overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        {/* Top Legal & Live Viewers Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/70 border border-green-700/80 text-[11px] font-bold text-green-300">
            <span>🛡️</span>
            <span>100% HỢP PHÁP • AN TÂM SƯU TẦM & THỂ THAO</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-keyline text-[11px] font-semibold text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span>🔥 <strong className="text-ink">{viewingCount}</strong> người đang cùng xem</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink uppercase leading-tight">
            Trạc Liên Thanh Tự Động
            <span className="block text-accent mt-1">Chuẩn Bi Thép 8mm – Lực Bắn Cực Chuẩn</span>
          </h1>
          <p className="mt-2.5 text-xs sm:text-base text-ink-muted leading-relaxed">
            Thân nhựa ABS kỹ thuật chịu lực cao cấp, đầm chắc tay. Băng nạp bi thông minh chuyên dụng cho <strong className="text-ink">bi thép 8mm</strong> đẩy liên tục sau mỗi lần kéo – tốc độ nhanh gấp 5 lần ná truyền thống.
          </p>
        </div>

        {/* Urgent Flash Sale Countdown */}
        <FlashSaleTimer />

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto mb-6 text-center text-xs sm:text-sm">
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-ink">Băng Bi 8mm Tự Động</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Chuẩn bi thép 8mm</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-accent">Laze Chỉnh Tâm</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Chuẩn cự ly 25-30m</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-green-400">Bắn Thử Khi Nhận</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Test bi 8mm trơn tru</div>
          </div>
        </div>

        {/* Product Visual Showcase with Switcher */}
        <div className="max-w-md mx-auto bg-surface rounded-2xl border border-keyline p-4 sm:p-5 shadow-2xl">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-paper rounded-xl border border-keyline mb-4 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('laser_pro')
                if (onSelectProduct) onSelectProduct('laser_pro')
              }}
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeTab === 'laser_pro'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              ⭐ BỘ CÓ LAZE (400K)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('standard')
                if (onSelectProduct) onSelectProduct('standard')
              }}
              className={`py-2 px-2.5 rounded-lg transition-colors ${
                activeTab === 'standard'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              BỘ KHÔNG LAZE (250K)
            </button>
          </div>

          {/* Product Image Frame */}
          <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full rounded-xl overflow-hidden bg-black/40 border border-keyline/60">
            <Image
              src={
                activeTab === 'laser_pro'
                  ? '/assets/trac-ban-laze.jpg'
                  : '/assets/trac-tieu-chuan.jpg'
              }
              alt={activeTab === 'laser_pro' ? 'Trạc Liên Thanh Bản Laze' : 'Trạc Liên Thanh Bản Tiêu Chuẩn'}
              fill
              priority
              className="object-contain"
            />
            {/* Price Tag Overlay with Strike Price & Savings */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-paper/95 backdrop-blur border border-keyline text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="text-xs text-ink-muted line-through">
                  Giá gốc: {activeTab === 'laser_pro' ? '950.000đ' : '650.000đ'}
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                  {activeTab === 'laser_pro' ? 'GIẢM 58%' : 'GIẢM 61%'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-accent">
                {activeTab === 'laser_pro' ? '400.000đ' : '250.000đ'}
              </div>
              <div className="text-[11px] text-green-400 font-semibold mt-0.5">
                ✅ Bao Ship Toàn Quốc • Bắn Thử Ưng Ý Mới Thanh Toán
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="mt-5">
            <a
              href="#order-form"
              onClick={handleCtaClick}
              className="block w-full py-3.5 px-6 rounded-xl font-black text-center text-white bg-accent hover:bg-accent-hover text-base sm:text-lg shadow-xl shadow-accent/40 transition-all uppercase tracking-wide animate-pulse"
            >
              👉 NHẬN ƯU ĐÃI & ĐẶT HÀNG NGAY
            </a>
            <p className="text-center text-[11px] text-ink-muted mt-2">
              (⚡ Chỉ còn <strong className="text-accent">11 bộ</strong> giá Flash Sale trong hôm nay)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
