export default function PainGainSection() {
  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-surface/40">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            So Sánh Trực Quan
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            Vì Sao Bạn Nên Nâng Cấp Lên Trạc Liên Thanh?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Giải quyết triệt để sự bất tiện của các mẫu ná truyền thống, nâng tầm trải nghiệm thể thao ngoài trời.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Cột Điểm Đau: Ná Truyền Thống */}
          <div className="p-5 sm:p-6 rounded-2xl bg-paper border border-red-950/60 shadow-inner">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-keyline">
              <span className="w-8 h-8 rounded-full bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">Ná Truyền Thống</h3>
                <span className="text-xs text-red-400 font-medium">Bất tiện & dễ mất nhịp</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-ink">Nạp bi lóng ngóng:</strong> Phải móc túi lấy từng viên, dễ rơi vãi khi di chuyển dã ngoại.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-ink">Cấn rát ngón tay:</strong> Cầm giữ viên bi lâu dễ tuột tay, chai sần ngón.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-ink">Ngắm bắn mò mẫm:</strong> Không có thước đo hay đèn định vị, bắn đêm gần như không thấy mục tiêu.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-ink">Độ bền kém:</strong> Gia công thô sơ, dễ cong vênh lệch góc ngắm sau thời gian ngắn.
                </span>
              </li>
            </ul>
          </div>

          {/* Cột Giải Pháp: Trạc Liên Thanh CNC */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-accent/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Đột phá 2026
            </div>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-keyline">
              <span className="w-8 h-8 rounded-full bg-green-950/80 border border-green-600 text-green-400 flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">Trạc Liên Thanh CNC</h3>
                <span className="text-xs text-green-400 font-medium">Tiếp bi tự động siêu nhanh</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-ink">
              <li className="flex items-start gap-2.5">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong className="text-accent">Băng tiếp bi tự động:</strong> Chứa sẵn 15-20 viên, đẩy bi lên ngay sau mỗi lần kéo, giữ trọn nhịp tập trung.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong className="text-accent">Báng cầm công thái học:</strong> Thiết kế uốn theo lòng bàn tay, trợ lực ngón cái chống trượt tối đa.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong className="text-accent">Đèn Laze Xịn chỉnh tâm:</strong> Núm xoay vi chỉnh cự ly xa gần, tự tin ngắm bắn trúng mục tiêu cả ngày lẫn đêm.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong className="text-accent">Hợp kim CNC nguyên khối:</strong> Đường nét cơ khí sắc bén, lớp phủ chống mồ hôi tay, bền bỉ qua năm tháng.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
