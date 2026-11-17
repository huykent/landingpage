import { NextRequest, NextResponse } from 'next/server'
import { checkAdminRequest } from '@/lib/admin-auth'
import { sanitizeCsvCell } from '@/lib/catalog'
import { getOrders } from '@/lib/storage'

export const dynamic = 'force-dynamic'

const STATUS_TEXT: Record<string, string> = {
  new: 'Mới nhận',
  contacting: 'Đang liên hệ',
  confirmed: 'Đã chốt đơn',
  shipping: 'Đã gửi COD',
  cancelled: 'Đơn hủy',
}

export async function GET(req: NextRequest) {
  if (!checkAdminRequest(req)) {
    return NextResponse.json(
      { success: false, message: 'Mã PIN không chính xác.' },
      { status: 401 }
    )
  }

  try {
    const orders = await getOrders()

    const headers = [
      'Mã đơn',
      'Thời gian',
      'Khách hàng',
      'Số điện thoại',
      'Địa chỉ giao hàng',
      'Sản phẩm chính',
      'Phụ kiện mua thêm',
      'Phí vận chuyển',
      'Tổng tiền COD (VNĐ)',
      'Trạng thái',
      'Ghi chú telesale',
    ]

    const rows = orders.map(o => {
      const addOnsStr =
        o.addOns && o.addOns.length > 0
          ? o.addOns.map(i => `${i.name} (SL: ${i.quantity})`).join('; ')
          : 'Không'

      const dateStr = new Date(o.createdAt).toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
      })

      return [
        sanitizeCsvCell(o.id),
        sanitizeCsvCell(dateStr),
        sanitizeCsvCell(o.customerName),
        sanitizeCsvCell(o.phone),
        sanitizeCsvCell(o.address),
        sanitizeCsvCell(o.mainProductName),
        sanitizeCsvCell(addOnsStr),
        sanitizeCsvCell('0đ'),
        sanitizeCsvCell(o.totalAmount),
        sanitizeCsvCell(STATUS_TEXT[o.status] || o.status),
        sanitizeCsvCell(o.note || ''),
      ].join(',')
    })

    // UTF-8 BOM (\uFEFF) ensures Excel renders Vietnamese characters correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Don_Hang_Nalienthanh_${Date.now()}.csv"`,
      },
    })
  } catch (err) {
    console.error('Error exporting orders:', err)
    return NextResponse.json(
      { success: false, message: 'Lỗi xuất file CSV.' },
      { status: 500 }
    )
  }
}
