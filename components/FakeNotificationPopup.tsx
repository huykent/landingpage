'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SOCIAL_PROOF_BUYERS,
  SocialProofBuyer,
  pickNextBatchSize,
  pickRelativeTime,
  shuffleIndices,
} from '@/lib/social-proof'

const STORAGE_KEY = 'nlt_sp_queue_v1'

interface ActiveToast {
  key: string
  buyer: SocialProofBuyer
  timeLabel: string
}

interface StoredQueue {
  order: number[]
  cursor: number
}

function loadOrCreateQueue(): StoredQueue {
  const total = SOCIAL_PROOF_BUYERS.length
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredQueue
      if (
        Array.isArray(parsed.order) &&
        parsed.order.length === total &&
        typeof parsed.cursor === 'number' &&
        parsed.cursor >= 0 &&
        parsed.cursor <= total
      ) {
        return parsed
      }
    }
  } catch {
    // Ignore storage access errors (private mode, etc.)
  }
  return { order: shuffleIndices(total), cursor: 0 }
}

function saveQueue(queue: StoredQueue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
  } catch {
    // Ignore storage quota errors
  }
}

function randomBetween(minMs: number, maxMs: number): number {
  return Math.floor(minMs + Math.random() * (maxMs - minMs))
}

export default function FakeNotificationPopup() {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const [dismissed, setDismissed] = useState(false)
  const queueRef = useRef<StoredQueue | null>(null)

  useEffect(() => {
    if (dismissed) return

    const timers = new Set<ReturnType<typeof setTimeout>>()
    let cancelled = false

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id)
        if (!cancelled) fn()
      }, ms)
      timers.add(id)
      return id
    }

    const pullNextBuyer = (): SocialProofBuyer => {
      if (!queueRef.current) {
        queueRef.current = loadOrCreateQueue()
      }
      const q = queueRef.current
      const total = SOCIAL_PROOF_BUYERS.length

      if (q.cursor >= total) {
        const lastShown = q.order[total - 1]
        const nextOrder = shuffleIndices(total)
        // Tránh trùng người đầu vòng mới với người cuối vòng trước
        if (nextOrder[0] === lastShown && total > 1) {
          const swapIdx = 1 + Math.floor(Math.random() * (total - 1))
          const tmp = nextOrder[0]
          nextOrder[0] = nextOrder[swapIdx]
          nextOrder[swapIdx] = tmp
        }
        q.order = nextOrder
        q.cursor = 0
      }

      const buyerIdx = q.order[q.cursor]
      q.cursor += 1
      saveQueue(q)
      return SOCIAL_PROOF_BUYERS[buyerIdx]
    }

    const pushToast = (isBurstFollowUp: boolean) => {
      const buyer = pullNextBuyer()
      const key = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const toast: ActiveToast = {
        key,
        buyer,
        timeLabel: pickRelativeTime(isBurstFollowUp),
      }

      // Giữ tối đa 2 thẻ xếp chồng cùng lúc để không che màn hình điện thoại
      setToasts(prev => [...prev.slice(-1), toast])

      schedule(() => {
        setToasts(prev => prev.filter(item => item.key !== key))
      }, randomBetween(4600, 6200))
    }

    const runWave = (isFirstWave: boolean) => {
      const batchSize = isFirstWave ? 1 : pickNextBatchSize()
      let offset = 0

      for (let i = 0; i < batchSize; i++) {
        if (i > 0) {
          offset += randomBetween(1600, 2900)
        }
        const isFollowUp = i > 0
        schedule(() => pushToast(isFollowUp), offset)
      }

      // Nghỉ ngẫu nhiên giữa các đợt (8s - 16s sau khi kết thúc đợt hiện tại)
      const nextWaveDelay = offset + randomBetween(8500, 16500)
      schedule(() => runWave(false), nextWaveDelay)
    }

    // Đợt đầu tiên xuất hiện sau 2.5 - 4 giây khi khách vừa vào trang
    schedule(() => runWave(true), randomBetween(2500, 4000))

    return () => {
      cancelled = true
      timers.forEach(id => clearTimeout(id))
      timers.clear()
    }
  }, [dismissed])

  if (dismissed || toasts.length === 0) return null

  return (
    <div className="fixed bottom-20 md:bottom-5 left-3 sm:left-4 z-40 flex flex-col gap-2 max-w-[325px] pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.key}
          className="pointer-events-auto bg-surface/95 backdrop-blur border border-keyline-bright p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3 animate-slide-up"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-950 border border-green-600 text-green-400 flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-inner">
            ✓
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between gap-2 text-[11px] text-ink-muted">
              <span className="font-bold text-ink truncate">
                {toast.buyer.name} ({toast.buyer.city})
              </span>
              <span className="text-[10px] text-accent shrink-0">{toast.timeLabel}</span>
            </div>
            <div className="text-xs font-bold text-accent truncate mt-0.5">
              Đã mua {toast.buyer.product}
            </div>
            <div className="text-[10px] text-green-400 flex items-center gap-1 font-medium mt-0.5">
              <span>●</span> <span>Đặt hàng thành công • Bao ship toàn quốc</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setDismissed(true)
              setToasts([])
            }}
            className="text-ink-muted hover:text-ink text-xs p-1 shrink-0"
            aria-label="Tắt thông báo đơn hàng"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
