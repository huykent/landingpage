import { NextRequest, NextResponse } from 'next/server'
import { updateOrder } from '@/lib/storage'
import { OrderStatus } from '@/types/order'

function checkAdminAuth(req: NextRequest): boolean {
  const adminPin = process.env.ADMIN_PIN
  if (!adminPin) return false
  const headerPin = req.headers.get('x-admin-pin')
  return headerPin === adminPin
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, message: 'Mã PIN quản trị không chính xác.' },
      { status: 401 }
    )
  }

  try {
    const id = params.id
    const body: { status?: OrderStatus; note?: string } = await req.json()

    const updated = await updateOrder(id, {
      ...(body.status ? { status: body.status } : {}),
      ...(typeof body.note === 'string' ? { note: body.note } : {}),
    })

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy đơn hàng cần cập nhật.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật đơn hàng thành công!',
      order: updated,
    })
  } catch (err) {
    console.error('Error updating order:', err)
    return NextResponse.json(
      { success: false, message: 'Lỗi cập nhật đơn hàng.' },
      { status: 500 }
    )
  }
}
