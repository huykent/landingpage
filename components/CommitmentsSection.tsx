import Image from 'next/image'

export default function CommitmentsSection() {
  const commitments = [
    {
      icon: '🎯',
      title: 'ĐƯỢC BẮN THỬ TEST HÀNG',
      desc: 'Shipper giao đến, bạn được mở hộp, lắp thử và test cơ chế tiếp bi 8mm trực tiếp, bắn thử ưng ý mới thanh toán tiền!',
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
      desc: 'Cam kết chất liệu nhựa ABS kỹ thuật chịu lực cao cấp siêu bền, bảo hành 1 đổi 1 trong 12 tháng nếu có lỗi từ nhà sản xuất.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-paper">
      <div className="site-container">
        {/* Big Legal & Peace of Mind Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-green-950/80 via-surface to-green-950/80 border border-green-600/70 text-center shadow-2xl">
          <div className="text-2xl sm:text-3xl mb-1">⚖️ 🛡️ 🎯</div>
          <h3 className="text-base sm:text-xl font-black text-green-300 uppercase tracking-wide">
            Sản Phẩm Hoàn Toàn Hợp Pháp – Anh Em An Tâm Mua Hàng
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted mt-2 max-w-2xl mx-auto leading-relaxed">
            Căn cứ theo quy định của pháp luật Việt Nam, <strong className="text-ink">ná cao su không phải là vũ khí thô sơ, cũng không phải là công cụ hỗ trợ</strong>. Sản phẩm được định danh là dụng cụ thể thao kỹ năng &amp; đồ chơi sưu tầm ngoài trời.
          </p>

          {/* Ảnh Dẫn Chứng Tư Vấn Luật Dân Luật */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="p-2 sm:p-3 rounded-2xl bg-paper border border-green-500/50 shadow-2xl overflow-hidden">
              <div className="text-[11px] font-bold text-green-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                <span>📄</span>
                <span>Văn Bản Trích Lục Tư Vấn Luật (DanLuat.vn)</span>
              </div>
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white">
                <Image
                  src="/assets/anh-luat.png"
                  alt="Văn bản tư vấn pháp luật ná cao su hoàn toàn hợp pháp"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[11px] text-ink-muted mt-2.5 italic">
                *Kết luận: Hành vi sở hữu và chơi ná cao su giải trí lành mạnh không gây thiệt hại cho người khác hoàn toàn không vi phạm pháp luật.
              </p>
            </div>
          </div>
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
