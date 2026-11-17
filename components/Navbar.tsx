export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-keyline">
      <div className="site-container flex items-center justify-between h-14">
        <a href="#" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
          <span className="font-extrabold tracking-tight text-lg text-ink">
            NALIENTHANH<span className="text-accent">.STORE</span>
          </span>
        </a>
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-surface border border-keyline text-ink-muted">
            🚚 Bao Ship Toàn Quốc
          </span>
          <a
            href="#order-form"
            className="px-3.5 py-1.5 rounded font-semibold bg-accent hover:bg-accent-hover text-white transition-colors"
          >
            ĐẶT HÀNG
          </a>
        </div>
      </div>
    </header>
  )
}
