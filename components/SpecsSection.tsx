export default function SpecsSection() {
  const specs = [
    {
      title: 'Chất Liệu Khung Thân',
      value: 'Hợp Kim Nhôm CNC Nguyên Khối',
      desc: 'Cắt gọt độ chuẩn xác milimet, anode hóa bề mặt chống rỉ sét mồ hôi tay.',
    },
    {
      title: 'Cơ Chế Băng Bi',
      value: 'Hộp Chứa Tiếp Bi Tự Động (15-20 Viên)',
      desc: 'Lò xo đàn hồi bền bỉ, đẩy từng viên bi thép vào đúng rãnh sẵn sàng sau mỗi lần kéo.',
    },
    {
      title: 'Hệ Thống Ngắm',
      value: 'Ray 20mm + Đèn Laze Vi Chỉnh Tâm',
      desc: 'Hỗ trợ núm xoay chỉnh lệch tâm cự ly xa gần, ngắm bia lon bia siêu chuẩn.',
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
    {
      title: 'Quy Chuẩn Thể Thao',
      value: 'Dụng Cụ Thể Thao & Rèn Luyện Kỹ Năng',
      desc: 'Chuyên dụng bắn bia tập trung, rèn luyện phản xạ và độ chính xác mục tiêu.',
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
            Đỉnh Cao Gia Công Cơ Khí Chính Xác
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Mọi chi tiết đều được tối ưu hóa để mang lại cảm giác đầm tay, bền bỉ và độ chuẩn xác cao nhất.
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
