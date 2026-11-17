import { NextRequest, NextResponse } from 'next/server'
import { CreateOrderInput, Order, AddOnItem } from '@/types/order'
import { saveOrder } from '@/lib/storage'
import { sendTelegramNotification, sendGoogleSheetWebhook } from '@/lib/webhook'

const PRODUCT_CATALOG = {
  standard: {
    name: 'BỘ KHÔNG LAZE (Bản Nhựa ABS - Chuẩn Bi 8mm)',
    price: 250000,
  },
  laser_pro: {
    name: 'BỘ CÓ LAZE XỊN CHỈNH TÂM (Bản Nhựa ABS - Chuẩn Bi 8mm)',
    price: 400000,
  },
}

const ADDON_CATALOG = {
  extra_band: {
    name: 'Bộ dây thun trợ lực cao cấp',
    price: 50000,
  },
  extra_magazine: {
    name: 'Ray tiếp bi tự động 10 viên (8mm)',
    price: 50000,
  },
  extra_ammo: {
    name: 'Túi bi thép 8mm tập luyện',
    price: 10000,
  },
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderInput = await req.json()

    // 1. Validation
    if (!body.customerName || body.customerName.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập họ và tên người nhận.' },
        { status: 400 }
      )
    }

    const cleanPhone = (body.phone || '').replace(/\D/g, '')
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập số điện thoại hợp lệ (10 số).' },
        { status: 400 }
      )
    }

    if (!body.address || body.address.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập địa chỉ nhận hàng chi tiết.' },
        { status: 400 }
      )
    }

    const mainProdConfig = PRODUCT_CATALOG[body.mainProduct] || PRODUCT_CATALOG.laser_pro

    // 2. Parse add-ons
    const addOns: AddOnItem[] = []
    let addOnsTotal = 0

    if (body.addOns && Array.isArray(body.addOns)) {
      for (const item of body.addOns) {
        if (item.quantity > 0 && ADDON_CATALOG[item.id]) {
          const addonInfo = ADDON_CATALOG[item.id]
          addOns.push({
            id: item.id,
            name: addonInfo.name,
            price: addonInfo.price,
            quantity: item.quantity,
          })
          addOnsTotal += addonInfo.price * item.quantity
        }
      }
    }

    const totalAmount = mainProdConfig.price + addOnsTotal

    // 3. Create Order object
    const newOrder: Order = {
      id: `NLT-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customerName: body.customerName.trim(),
      phone: cleanPhone,
      address: body.address.trim(),
      mainProduct: body.mainProduct,
      mainProductName: mainProdConfig.name,
      mainPrice: mainProdConfig.price,
      addOns,
      shippingFee: 0, // Bao ship toàn quốc
      totalAmount,
      status: 'new',
      note: body.note ? body.note.trim() : undefined,
    }

    // 4. Save Order
    await saveOrder(newOrder)

    // 5. Trigger Webhooks asynchronously without blocking response
    sendTelegramNotification(newOrder).catch(err => console.error('Telegram notification failed:', err))
    sendGoogleSheetWebhook(newOrder).catch(err => console.error('Google Sheet sync failed:', err))

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
