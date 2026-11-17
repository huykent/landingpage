export default function CommitmentsSection() {
  const commitments = [
    {
      icon: '🎯',
      title: 'ĐƯỢC BẮN THỬ TEST HÀNG',
      desc: 'Shipper giao đến, bạn được mở hộp, lắp thử và test cơ chế tiếp bi trực tiếp, bắn thử ưng ý mới thanh toán tiền!',
    },
    {
      icon: '📦',
      title: 'KHÔNG ƯNG HOÀN 0 ĐỒNG',
      desc: 'Nếu sản phẩm không đúng như video/hình ảnh quảng cáo, bạn có quyền từ chối nhận, không mất dù chỉ 1 đồng phí ship!',
    },
    {
      icon: '🚚',
      title: 'BAO SHIP TOÀN QUỐC',
      desc: 'Giao hàng tận nhà khắp 63 tỉnh thành, đóng gói hộp xốp chống va đập kín đáo, lịch sự.',
    },
    {
      icon: '🔄',
      title: 'BẢO HÀNH 1 ĐỔI 1 (12 THÁNG)',
      desc: 'Cam kết chất liệu nhôm đúc CNC nguyên khối siêu bền, bảo hành 1 đổi 1 trong 12 tháng nếu có lỗi từ nhà sản xuất.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-paper">
      <div className="site-container">
        {/* Big Legal & Peace of Mind Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-green-950/80 via-surface to-green-950/80 border border-green-600/70 text-center shadow-2xl">
          <div className="text-xl sm:text-2xl mb-1">⚖️ 🛡️ 🎯</div>
          <h3 className="text-sm sm:text-base md:text-lg font-black text-green-300 uppercase tracking-wide">
            Sản Phẩm Hoàn Toàn Hợp Pháp – Anh Em An Tâm Mua Hàng
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl mx-auto leading-relaxed">
            Sản phẩm được định danh là <strong className="text-ink">dụng cụ thể thao kỹ năng, rèn luyện sự tập trung ngoài trời và đồ sưu tầm cơ khí</strong>. Sử dụng giải trí lành mạnh, an toàn và luôn thượng tôn pháp luật!
          </p>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Chính Sách Bán Hàng Số 1
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            4 Cam Kết Vàng Đập Tan Mọi Nghi Ngờ
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Mua 1 lần dùng cả 10 năm – 100% bảo vệ quyền lợi của anh em trước khi xuống tiền!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {commitments.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface border border-keyline text-center flex flex-col items-center hover:border-accent/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-paper border border-keyline flex items-center justify-center text-2xl mb-3 shadow-inner">
                {c.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-ink uppercase tracking-wide">
                {c.title}
              </h3>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
