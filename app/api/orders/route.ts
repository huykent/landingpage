import { NextRequest, NextResponse } from 'next/server'
import { CreateOrderInput } from '@/types/order'
import { buildOrderFromInput } from '@/lib/catalog'
import { saveOrder } from '@/lib/storage'
import { sendTelegramNotification } from '@/lib/webhook'

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderInput = await req.json()
    const parsed = buildOrderFromInput(body)

    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      )
    }

    const newOrder = parsed.order

    // 1. Lưu đơn (Google Sheets DB khi đã cấu hình GOOGLE_SHEET_WEBHOOK_URL)
    await saveOrder(newOrder)

    // 2. Chờ gửi Telegram (timeout 5s) để Vercel serverless không đóng băng trước khi gửi xong
    try {
      await sendTelegramNotification(newOrder)
    } catch (err) {
      console.error('Telegram notification failed:', err)
    }

    return NextResponse.json({
      success: true,
      message: 'Đặt hàng thành công!',
      order: {
        id: newOrder.id,
        customerName: newOrder.customerName,
        phone: newOrder.phone,
        totalAmount: newOrder.totalAmount,
        mainProductName: newOrder.mainProductName,
      },
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Đã có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
