import { NextRequest, NextResponse } from 'next/server'
import { getOrders } from '@/lib/storage'

function checkAdminAuth(req: NextRequest): boolean {
  const adminPin = process.env.ADMIN_PIN
  if (!adminPin) return false
  const headerPin = req.headers.get('x-admin-pin')
  const queryPin = req.nextUrl.searchParams.get('pin')
  return headerPin === adminPin || queryPin === adminPin
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, message: 'Mã PIN quản trị không chính xác.' },
      { status: 401 }
    )
  }

  try {
    const orders = await getOrders()
    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (err) {
    console.error('Error fetching admin orders:', err)
    return NextResponse.json(
      { success: false, message: 'Lỗi tải danh sách đơn hàng.' },
      { status: 500 }
    )
  }
}
