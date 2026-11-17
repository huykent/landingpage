import { NextRequest, NextResponse } from 'next/server'
import { checkAdminRequest } from '@/lib/admin-auth'
import { getOrders, getStorageBackend } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!checkAdminRequest(req)) {
    return NextResponse.json(
      { success: false, message: 'Mã PIN quản trị không chính xác.' },
      { status: 401 }
    )
  }

  try {
    const orders = await getOrders()
    return NextResponse.json({
      success: true,
      storageBackend: getStorageBackend(),
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
