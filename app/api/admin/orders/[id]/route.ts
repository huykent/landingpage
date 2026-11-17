import { NextRequest, NextResponse } from 'next/server'
import { checkAdminRequest } from '@/lib/admin-auth'
import { isValidOrderStatus } from '@/lib/catalog'
import { updateOrder } from '@/lib/storage'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminRequest(req)) {
    return NextResponse.json(
      { success: false, message: 'Mã PIN quản trị không chính xác.' },
      { status: 401 }
    )
  }

  try {
    const id = params.id
    const body: { status?: unknown; note?: unknown } = await req.json()

    if (body.status !== undefined && !isValidOrderStatus(body.status)) {
      return NextResponse.json(
        { success: false, message: 'Trạng thái đơn hàng không hợp lệ.' },
        { status: 400 }
      )
    }

    const updated = await updateOrder(id, {
      ...(body.status !== undefined ? { status: body.status } : {}),
      ...(typeof body.note === 'string' ? { note: body.note.slice(0, 500) } : {}),
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
