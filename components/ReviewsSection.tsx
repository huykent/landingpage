export default function ReviewsSection() {
  const reviews = [
    {
      name: 'Anh Hoàng Long',
      location: 'Đồng Nai',
      product: 'Đã mua: Bộ Có Laze Xịn 400k',
      comment:
        'Cơ chế tiếp bi tự động nhạy thật sự, kéo phát là bi tự đẩy lên khớp giữ, không cần mất công móc túi từng viên. Bản Laze chỉnh được tâm chuẩn đét, test bia lon 15m trúng liên tục. Cho shipper đợi kiểm & test hàng đàng hoàng mới trả tiền, uy tín!',
      rating: 5,
    },
    {
      name: 'Bác Thanh Tùng',
      location: 'Hà Nội',
      product: 'Đã mua: Bộ Không Laze 250k + 2 Bịch Bi 8mm',
      comment:
        'Thân nhựa ABS kỹ thuật chịu lực cầm rất đầm tay, dày dặn và chắc chắn chứ không hề ọp ẹp. Cơ cấu lò xo đẩy bi thép 8mm êm ru, kéo thả liên hoàn không bị kẹt. Giá 250k bao ship thì quá hời.',
      rating: 5,
    },
    {
      name: 'Anh Minh Đức',
      location: 'Đà Nẵng',
      product: 'Đã mua: Bộ Có Laze Xịn 400k',
      comment:
        'Lúc đầu sợ giao hàng trên mạng không đúng mẫu, mà shop cho đồng kiểm bóc hộp test thử cơ chế tiếp bi luôn nên rất yên tâm. Đèn laze có ốc chỉnh tâm lên xuống trái phải rất dễ dùng.',
      rating: 5,
    },
    {
      name: 'Bạn Quốc Việt',
      location: 'Bình Dương',
      product: 'Đã mua: Bộ Có Laze Xịn + 1 Ray Bi 10 Viên',
      comment:
        'Giao hàng nhanh, đóng gói hộp xốp cẩn thận. Mình lấy thêm 1 ray tiếp bi phụ 10 viên với 2 bộ dây dự phòng là chơi cả năm không lo thiếu phụ kiện. Anh em đam mê dã ngoại nên múc nhé!',
      rating: 5,
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-b border-keyline bg-surface/20">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Phản Hồi Thực Tế
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-ink uppercase mt-1">
            Đánh Giá Từ Anh Em Đam Mê Kỹ Năng
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Hơn 2.500+ khách hàng trên toàn quốc đã tin tưởng và trải nghiệm Trạc Liên Thanh Nhựa ABS.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-paper border border-keyline hover:border-accent/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-ink text-sm sm:text-base">
                    {r.name} <span className="text-xs text-ink-muted font-normal">({r.location})</span>
                  </div>
                  <div className="flex text-yellow-400 text-xs tracking-wider">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>

                <div className="inline-block px-2 py-0.5 rounded bg-surface border border-keyline text-[11px] font-medium text-accent mb-3">
                  ✓ {r.product}
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-keyline/60 flex items-center gap-1.5 text-[11px] text-green-400 font-semibold">
                <span>✓ Đã xác thực đồng kiểm và thanh toán COD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
