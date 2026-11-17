export interface SocialProofBuyer {
  name: string
  city: string
  product: string
}

const PRODUCT_VARIANTS = [
  'Bộ Có Laze Chỉnh Tâm 400K',
  'Bộ Có Laze Chỉnh Tâm + 2 Túi Bi 8mm',
  'Bộ Có Laze Chỉnh Tâm + 1 Bộ Dây Thun',
  'Bộ Có Laze Chỉnh Tâm + 1 Ray Bi 10 Viên',
  'Bộ Có Laze Chỉnh Tâm + 2 Bộ Dây + 3 Túi Bi',
  'Bộ Có Laze Chỉnh Tâm + 3 Túi Bi Thép 8mm',
  'Bộ Không Laze 250K',
  'Bộ Không Laze 250K + 2 Túi Bi 8mm',
  'Bộ Không Laze 250K + 1 Bộ Dây Thun',
  'Bộ Có Laze Chỉnh Tâm + 1 Ray Bi + 2 Túi Bi',
] as const

// 100 khách hàng Việt Nam hoàn toàn độc nhất (3 miền + dân tộc thiểu số chuẩn vùng miền)
const RAW_BUYERS: ReadonlyArray<readonly [string, string]> = [
  // Miền Bắc (Phổ thông)
  ['Nguyễn Văn Mạnh', 'Hà Nội'],
  ['Trần Đức Thắng', 'Hà Nội'],
  ['Phạm Quang Huy', 'Hải Phòng'],
  ['Lê Minh Tuấn', 'Hải Phòng'],
  ['Vũ Hoàng Nam', 'Quảng Ninh'],
  ['Đỗ Văn Hùng', 'Bắc Ninh'],
  ['Bùi Tiến Dũng', 'Bắc Giang'],
  ['Hoàng Quốc Cường', 'Hải Dương'],
  ['Ngô Đình Long', 'Hưng Yên'],
  ['Đinh Công Thành', 'Thái Bình'],
  ['Dương Văn Hiếu', 'Nam Định'],
  ['Nguyễn Trung Kiên', 'Ninh Bình'],
  ['Tạ Minh Đức', 'Vĩnh Phúc'],
  ['Chu Văn Hải', 'Phú Thọ'],
  ['Phan Trọng Nghĩa', 'Thái Nguyên'],
  ['Đặng Xuân Trường', 'Hà Nam'],
  ['Lương Văn Tùng', 'Thanh Hóa'],
  ['Trịnh Ngọc Sơn', 'Thanh Hóa'],
  ['Nguyễn Sỹ Hoàng', 'Nghệ An'],
  ['Trần Văn Lợi', 'Nghệ An'],
  ['Lê Đình Chiến', 'Hà Tĩnh'],
  ['Võ Thanh Bình', 'Quảng Bình'],
  ['Nguyễn Văn Hòa', 'Quảng Trị'],
  ['Hồ Quang Minh', 'Thừa Thiên Huế'],

  // Miền Trung & Tây Nguyên (Phổ thông)
  ['Phạm Duy Khánh', 'Đà Nẵng'],
  ['Lê Quốc Bảo', 'Đà Nẵng'],
  ['Huỳnh Tấn Phát', 'Quảng Nam'],
  ['Trương Công Hậu', 'Quảng Ngãi'],
  ['Võ Minh Trí', 'Bình Định'],
  ['Nguyễn Hữu Phước', 'Phú Yên'],
  ['Trần Ngọc Thiện', 'Khánh Hòa'],
  ['Lê Thanh Sang', 'Ninh Thuận'],
  ['Phan Văn Toàn', 'Bình Thuận'],
  ['Đoàn Văn Khải', 'Gia Lai'],
  ['Nguyễn Quốc Việt', 'Đắk Lắk'],
  ['Trần Thanh Lâm', 'Đắk Nông'],
  ['Phạm Văn Đạt', 'Lâm Đồng'],
  ['Vũ Đình Phong', 'Kon Tum'],

  // Miền Nam & Tây Nam Bộ (Phổ thông)
  ['Nguyễn Tấn Tài', 'TP. Hồ Chí Minh'],
  ['Trần Hoàng Phúc', 'TP. Hồ Chí Minh'],
  ['Lê Hữu Nghĩa', 'TP. Hồ Chí Minh'],
  ['Phạm Quốc Anh', 'Bình Dương'],
  ['Huỳnh Minh Khôi', 'Bình Dương'],
  ['Võ Hoàng Long', 'Đồng Nai'],
  ['Đặng Văn Hậu', 'Đồng Nai'],
  ['Nguyễn Nhật Tân', 'Bà Rịa - Vũng Tàu'],
  ['Trần Minh Nhựt', 'Tây Ninh'],
  ['Lê Văn Thiện', 'Bình Phước'],
  ['Nguyễn Thanh Tuấn', 'Long An'],
  ['Phạm Hoài Nam', 'Tiền Giang'],
  ['Trần Hữu Lộc', 'Bến Tre'],
  ['Huỳnh Văn Đệ', 'Vĩnh Long'],
  ['Võ Quốc Thịnh', 'Đồng Tháp'],
  ['Lê Thành Nhân', 'An Giang'],
  ['Nguyễn Minh Vương', 'Kiên Giang'],
  ['Trần Trọng Tín', 'Cần Thơ'],
  ['Đỗ Thanh Tùng', 'Cần Thơ'],
  ['Phan Tấn Đạt', 'Hậu Giang'],
  ['Ngô Văn Luân', 'Sóc Trăng'],
  ['Lý Minh Hải', 'Bạc Liêu'],
  ['Trương Văn Khanh', 'Cà Mau'],
  ['Đoàn Quốc Hưng', 'Trà Vinh'],

  // Các dân tộc thiểu số Việt Nam (Thái, H'Mông, Tày, Nùng, Dao, Mường, Ê Đê, Gia Rai, Ba Na, K'Ho, Khmer, Chăm, Sán Dìu, Hoa)
  ['Lò Văn Tiến', 'Sơn La'],
  ['Quàng Văn Dũng', 'Sơn La'],
  ['Lường Văn Quyết', 'Điện Biên'],
  ['Cà Văn Hùng', 'Điện Biên'],
  ['Giàng A Páo', 'Lào Cai'],
  ['Sùng A Chư', 'Lào Cai'],
  ['Vàng A Sình', 'Lai Châu'],
  ['Hầu A Lử', 'Hà Giang'],
  ['Thào A Pao', 'Yên Bái'],
  ['Mùa A Của', 'Yên Bái'],
  ['Nông Văn Bắc', 'Cao Bằng'],
  ['Bế Văn Toàn', 'Cao Bằng'],
  ['Hoàng Văn Páo', 'Lạng Sơn'],
  ['Vi Văn Thắng', 'Lạng Sơn'],
  ['Ma Văn Quân', 'Tuyên Quang'],
  ['La Văn Định', 'Bắc Kạn'],
  ['Triệu Văn Chòi', 'Quảng Ninh'],
  ['Chảo A Lìn', 'Lai Châu'],
  ['Phàn Văn Lợi', 'Hà Giang'],
  ['Bùi Văn Khuyên', 'Hòa Bình'],
  ['Quách Công Minh', 'Hòa Bình'],
  ['Đinh Công Ước', 'Hòa Bình'],
  ['Lang Văn Bình', 'Nghệ An'],
  ['Lô Văn Tâm', 'Nghệ An'],
  ['Y Khôi Niê', 'Đắk Lắk'],
  ['Y Blưk Mlô', 'Đắk Lắk'],
  ['Y Tuấn Êban', 'Đắk Lắk'],
  ['Rơ Châm Hùng', 'Gia Lai'],
  ['Ksor Thành', 'Gia Lai'],
  ['A Đinh', 'Kon Tum'],
  ['K\'Long', 'Lâm Đồng'],
  ['K\'Bình', 'Lâm Đồng'],
  ['Thạch Hoàng Nam', 'Trà Vinh'],
  ['Sơn Ngọc Thanh', 'Sóc Trăng'],
  ['Danh Minh Khang', 'Kiên Giang'],
  ['Châu Văn Sóc', 'An Giang'],
  ['Đàng Năng Tuấn', 'Ninh Thuận'],
  ['Tăng Chí Vỹ', 'TP. Hồ Chí Minh'],
]

export const SOCIAL_PROOF_BUYERS: ReadonlyArray<SocialProofBuyer> = RAW_BUYERS.map(
  ([name, city], idx) => ({
    name,
    city,
    // Phân bổ tự nhiên: ~70% bản Có Laze (kèm phụ kiện), ~30% bản Không Laze
    product: PRODUCT_VARIANTS[(idx * 7 + 3) % PRODUCT_VARIANTS.length],
  })
)

const RECENT_TIMES = [
  'vừa xong',
  '12 giây trước',
  '28 giây trước',
  '45 giây trước',
  '1 phút trước',
  '2 phút trước',
  '3 phút trước',
] as const

export function pickRelativeTime(isBurstFollowUp: boolean, rand = Math.random): string {
  if (isBurstFollowUp) {
    return rand() < 0.65 ? 'vừa xong' : '12 giây trước'
  }
  return RECENT_TIMES[Math.floor(rand() * RECENT_TIMES.length)]
}

export function shuffleIndices(length: number, rand = Math.random): number[] {
  const arr = Array.from({ length }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

// Nhịp thật ngoài đời: ~50% nhảy 1 đơn, ~32% nhảy 2 đơn liên tiếp, ~18% nhảy 3 đơn liên tiếp
export function pickNextBatchSize(rand = Math.random): 1 | 2 | 3 {
  const r = rand()
  if (r < 0.5) return 1
  if (r < 0.82) return 2
  return 3
}
