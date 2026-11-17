'use client'

export default function FloatingContact() {
  const handleScrollToForm = () => {
    const el = document.getElementById('order-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* Quick Order Floating Button */}
      <button
        type="button"
        onClick={handleScrollToForm}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-accent/50 transition-transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="hidden sm:inline">⚡ Nhận Ưu Đãi 60%</span>
        <span className="sm:hidden">⚡ Đặt Nhanh</span>
      </button>

      {/* Floating Call Phone Icon with Ripple */}
      <a
        href="#order-form"
        onClick={handleScrollToForm}
        aria-label="Gọi tư vấn đặt hàng"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center text-xl sm:text-2xl shadow-2xl shadow-green-950 transition-transform hover:scale-110 active:scale-95 relative"
      >
        {/* Ripple rings */}
        <span className="absolute -inset-1 rounded-full border-2 border-green-500 animate-ping opacity-60"></span>
        <span>📞</span>
      </a>
    </div>
  )
}
