'use client'

import { useEffect, useState } from 'react'

const RECENT_BUYERS = [
  { name: 'Anh Nam', city: 'Hà Nội', product: 'BỘ CÓ LAZE XỊN CHỈNH TÂM', time: '2 phút trước' },
  { name: 'Anh Hoàng Long', city: 'Đồng Nai', product: 'BỘ CÓ LAZE + 2 TÚI BI', time: '4 phút trước' },
  { name: 'Anh Tuấn', city: 'Bình Dương', product: 'BỘ KHÔNG LAZE 250K', time: '6 phút trước' },
  { name: 'Bác Thanh Tùng', city: 'Hải Phòng', product: 'BỘ CÓ LAZE XỊN + 1 BĂNG BI', time: '1 phút trước' },
  { name: 'Anh Quốc Việt', city: 'TP. Hồ Chí Minh', product: 'BỘ CÓ LAZE XỊN CHỈNH TÂM', time: '3 phút trước' },
  { name: 'Anh Minh Đức', city: 'Đà Nẵng', product: 'BỘ CÓ LAZE + 2 BỘ DÂY', time: '5 phút trước' },
  { name: 'Anh Văn Hùng', city: 'Bắc Ninh', product: 'BỘ KHÔNG LAZE 250K', time: '7 phút trước' },
  { name: 'Anh Trọng Nghĩa', city: 'Cần Thơ', product: 'BỘ CÓ LAZE XỊN CHỈNH TÂM', time: '2 phút trước' },
]

export default function FakeNotificationPopup() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show first popup after 2.5s
    const initialTimer = setTimeout(() => {
      setVisible(true)
    }, 2500)

    // Interval to hide & show next
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % RECENT_BUYERS.length)
        setVisible(true)
      }, 1500)
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const buyer = RECENT_BUYERS[currentIdx]

  if (!visible) return null

  return (
    <div className="fixed bottom-20 md:bottom-5 left-4 z-40 max-w-[320px] bg-surface/95 backdrop-blur border border-keyline-bright p-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
      <div className="w-10 h-10 rounded-full bg-green-950 border border-green-600 text-green-400 flex items-center justify-center font-bold text-base shrink-0 shadow-inner">
        ✓
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between text-[11px] text-ink-muted">
          <span className="font-bold text-ink truncate">{buyer.name} ({buyer.city})</span>
          <span className="text-[10px] text-accent shrink-0">{buyer.time}</span>
        </div>
        <div className="text-xs font-bold text-accent truncate mt-0.5">
          {buyer.product}
        </div>
        <div className="text-[10px] text-green-400 flex items-center gap-1 font-medium mt-0.5">
          <span>●</span> <span>Đã xác nhận đặt hàng thành công</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="text-ink-muted hover:text-ink text-xs p-1"
        aria-label="Đóng thông báo"
      >
        ✕
      </button>
    </div>
  )
}
