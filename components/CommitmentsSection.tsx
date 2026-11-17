export default function CommitmentsSection() {
  const commitments = [
    {
      icon: '📦',
      title: 'ĐƯỢC KIỂM HÀNG',
      desc: 'Mở kiện hàng kiểm tra tận mắt thân trạc, băng bi, đèn laze và quà tặng trước khi nhận.',
    },
    {
      icon: '🎯',
      title: 'ĐƯỢC TEST HÀNG',
      desc: 'Thử cơ chế tiếp bi tự động, bật đèn laze kiểm tra độ sáng và chỉnh tâm hài lòng mới thanh toán tiền.',
    },
    {
      icon: '🚚',
      title: 'BAO SHIP TOÀN QUỐC',
      desc: 'Giao hàng tận tay mọi miền Tổ quốc hoàn toàn miễn phí, không phát sinh bất kỳ phụ phí nào.',
    },
    {
      icon: '🔄',
      title: 'BẢO HÀNH 1 ĐỔI 1 (7 NGÀY)',
      desc: 'Đổi mới ngay lập tức nếu phát hiện bất kỳ lỗi gia công cơ khí hoặc linh kiện do nhà sản xuất.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-paper">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Cam Kết Vàng Từ Cửa Hàng
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            An Tâm Tuyệt Đối Khi Đặt Hàng
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Chính sách bán hàng minh bạch, bảo vệ 100% quyền lợi của khách hàng trên toàn quốc.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {commitments.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface border border-keyline text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-paper border border-keyline flex items-center justify-center text-2xl mb-3 shadow-inner">
                {c.icon}
              </div>
              <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">
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
