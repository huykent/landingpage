'use client'

import { useState } from 'react'
import Image from 'next/image'
import { trackInitiateCheckout } from '@/lib/pixel'

export default function HeroSection({
  onSelectProduct,
}: {
  onSelectProduct?: (product: 'standard' | 'laser_pro') => void
}) {
  const [activeTab, setActiveTab] = useState<'laser_pro' | 'standard'>('laser_pro')

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
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-keyline overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-keyline text-xs font-semibold text-accent uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            Cơ Khí Chính Xác • Tiếp Bi Tự Động Thế Hệ Mới
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink uppercase leading-tight">
            Trạc Liên Thanh CNC
            <span className="block text-accent mt-1">Tiếp Bi Tự Động Siêu Nhanh</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed">
            Thân hợp kim nguyên khối đầm tay, băng chứa bi tự động đẩy lên sau mỗi lần kéo – loại bỏ hoàn toàn thao tác tra từng viên thủ công. Giải pháp rèn luyện kỹ năng tập trung và độ chính xác đỉnh cao.
          </p>
        </div>

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto mb-8 text-center text-xs sm:text-sm">
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-ink">Băng Bi Tự Động</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Tiếp đạn liên tục</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-accent">Laze Chỉnh Tâm</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Căn điểm siêu chuẩn</div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-surface border border-keyline">
            <div className="font-bold text-ink">Bao Ship COD</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Test hàng nhận trả</div>
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
              className={`py-2 px-3 rounded-lg transition-colors ${
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
              className={`py-2 px-3 rounded-lg transition-colors ${
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
            {/* Price Tag Overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-paper/95 backdrop-blur border border-keyline text-center shadow-lg">
              <div className="text-xs uppercase font-semibold text-ink-muted">
                {activeTab === 'laser_pro' ? 'Bản Laze Xịn (Chỉnh Được Tâm)' : 'Bản Cơ Bản (Không Laze)'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-accent mt-0.5">
                {activeTab === 'laser_pro' ? '400.000đ' : '250.000đ'}
              </div>
              <div className="text-[11px] text-green-400 font-medium">
                ✅ Bao Ship Toàn Quốc • Được Test Hàng Khi Nhận
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="mt-5">
            <a
              href="#order-form"
              onClick={handleCtaClick}
              className="block w-full py-3.5 px-6 rounded-xl font-bold text-center text-white bg-accent hover:bg-accent-hover text-base sm:text-lg shadow-lg shadow-accent/30 transition-all uppercase tracking-wide"
            >
              👉 Nhận Ưu Đãi & Đặt Hàng Ngay
            </a>
            <p className="text-center text-[12px] text-ink-muted mt-2">
              (Kiểm tra đúng hàng, test cơ chế nạp bi hài lòng mới thanh toán)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
