'use client'

import { useEffect, useState } from 'react'

export default function FlashSaleTimer({ compact = false }: { compact?: boolean }) {
  const [secondsLeft, setSecondsLeft] = useState(894) // ~14m 54s
  const [soldCount, setSoldCount] = useState(89)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 10 ? prev - 1 : 895))
    }, 1000)

    const buyerTimer = setInterval(() => {
      setSoldCount(prev => (prev < 96 ? prev + 1 : 89))
    }, 45000)

    return () => {
      clearInterval(timer)
      clearInterval(buyerTimer)
    }
  }, [])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span className="font-bold text-red-400 uppercase tracking-wide">
            Flash Sale Kết Thúc Sau:
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono font-bold text-ink">
          <span className="px-2 py-0.5 rounded bg-surface border border-keyline text-accent">00</span>
          <span>:</span>
          <span className="px-2 py-0.5 rounded bg-surface border border-keyline text-accent">{formatNumber(minutes)}</span>
          <span>:</span>
          <span className="px-2 py-0.5 rounded bg-surface border border-keyline text-accent">{formatNumber(seconds)}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-accent/40 shadow-xl max-w-xl mx-auto my-6 text-center relative overflow-hidden">
      <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-accent tracking-wider mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
        <span>ƯU ĐÃI FLASH SALE GIẢM 60% SẮP KẾT THÚC</span>
      </div>

      <div className="flex items-center justify-center gap-2 font-mono font-black text-ink my-3">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl px-3 py-1.5 rounded-xl bg-paper border border-keyline text-accent shadow-inner">
            00
          </span>
          <span className="text-[10px] text-ink-muted mt-1 uppercase">Giờ</span>
        </div>
        <span className="text-xl font-bold text-accent mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl px-3 py-1.5 rounded-xl bg-paper border border-keyline text-accent shadow-inner">
            {formatNumber(minutes)}
          </span>
          <span className="text-[10px] text-ink-muted mt-1 uppercase">Phút</span>
        </div>
        <span className="text-xl font-bold text-accent mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl px-3 py-1.5 rounded-xl bg-paper border border-keyline text-accent shadow-inner">
            {formatNumber(seconds)}
          </span>
          <span className="text-[10px] text-ink-muted mt-1 uppercase">Giây</span>
        </div>
      </div>

      {/* Stock Progress Bar */}
      <div className="space-y-1.5 max-w-md mx-auto pt-1">
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-ink-muted">Đã bán: <strong className="text-accent">{soldCount}/100 bộ</strong></span>
          <span className="text-green-400">Chỉ còn {100 - soldCount} suất ưu đãi!</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-paper border border-keyline overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-accent transition-all duration-500"
            style={{ width: `${soldCount}%` }}
          />
        </div>
      </div>
    </div>
  )
}
