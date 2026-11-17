export default function SpecsSection() {
  const specs = [
    {
      title: 'Chất Liệu Khung Thân',
      value: 'Nhựa ABS Kỹ Thuật Cao Cấp',
      desc: 'Chất liệu nhựa chịu lực siêu bền, chống va đập, đầm tay, cầm êm ái không mỏi khi chơi lâu.',
    },
    {
      title: 'Quy Cách Bi Sử Dụng',
      value: 'Chuẩn Bi Thép 8mm (8 Ly)',
      desc: 'Ray nạp tối ưu cho dòng bi thép 8mm tiêu chuẩn, tiếp bi trơn tru chính xác tuyệt đối.',
    },
    {
      title: 'Ray Bi Tự Động',
      value: 'Ray Tiếp Bi Tự Động 10 Viên (8mm)',
      desc: 'Lò xo đàn hồi bền bỉ, chứa sẵn 10 viên bi thép 8mm, tự động đẩy từng viên vào đúng rãnh sau mỗi lần kéo.',
    },
    {
      title: 'Hệ Thống Ngắm',
      value: 'Ray 20mm + Đèn Laze Vi Chỉnh Tâm',
      desc: 'Hỗ trợ núm xoay chỉnh lệch tâm cự ly xa gần, ngắm bia lon bia siêu chuẩn 25-30m.',
    },
    {
      title: 'Thiết Kế Báng Cầm',
      value: 'Ergonomic Công Thái Học Chống Trượt',
      desc: 'Đầm chắc tay, gờ trợ lực ngón tay hạn chế mỏi khi chơi dã ngoại thời gian dài.',
    },
    {
      title: 'Kẹp Dây Thông Minh',
      value: 'Tháo Lắp Nhanh Trong 5 Giây',
      desc: 'Không cần kìm hay ốc vít phức tạp, thay dây mới dễ dàng mọi lúc mọi nơi.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-surface/30">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Thông Số Kỹ Thuật
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            Thiết Kế Đột Phá – Bền Bỉ &amp; Chuẩn Xác
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Khung nhựa ABS chịu lực cao cấp kết hợp ray tiếp bi thép 8mm tự động 10 viên mượt mà.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-paper border border-keyline hover:border-accent/40 transition-colors"
            >
              <span className="text-[11px] font-bold uppercase text-accent tracking-wider">
                {item.title}
              </span>
              <div className="text-base font-bold text-ink mt-1">
                {item.value}
              </div>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
