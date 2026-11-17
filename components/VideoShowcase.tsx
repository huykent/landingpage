'use client'

import { useRef, useState } from 'react'

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTogglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section className="py-12 sm:py-16 border-b border-keyline">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Video Trải Nghiệm Thực Tế
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            Xem Trực Tiếp Cơ Chế Tiếp Bi Liên Hoàn
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Clip quay thực tế 100% không qua cắt ghép kỹ xảo – Cơ chế đẩy bi thép mượt mà, sẵn sàng chỉ trong 0.5 giây!
          </p>
        </div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-keyline bg-black shadow-2xl aspect-[9/16]">
            <video
              ref={videoRef}
              src="/assets/demo-ban-lien-thanh.mp4"
              playsInline
              loop
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label="Phát video demo"
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-surface border border-keyline text-center">
            <p className="text-xs sm:text-sm font-semibold text-ink">
              💡 <span className="text-accent">Mẹo:</span> Bạn hoàn toàn được <span className="text-green-400">kiểm hàng và test cơ chế tiếp bi</span> như trong video trước khi thanh toán tiền!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
