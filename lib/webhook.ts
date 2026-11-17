import { Order } from '@/types/order'

export async function sendTelegramNotification(order: Order): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return false
  }

  const addOnsText = order.addOns && order.addOns.length > 0
    ? order.addOns.map(item => `  + ${item.name} x${item.quantity}: ${(item.price * item.quantity).toLocaleString('vi-VN')}đ`).join('\n')
    : '  Không có'

  const message = `🎯 *ĐƠN HÀNG MỚI - NALIENTHANH.STORE*
━━━━━━━━━━━━━━━━━━
🆔 *Mã đơn:* #${order.id}
⏰ *Thời gian:* ${new Date(order.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
👤 *Khách hàng:* ${order.customerName}
📞 *Số điện thoại:* [${order.phone}](tel:${order.phone})
📍 *Địa chỉ:* ${order.address}

📦 *Sản phẩm chính:*
${order.mainProductName} (${order.mainPrice.toLocaleString('vi-VN')}đ)

➕ *Phụ kiện mua thêm:*
${addOnsText}

💰 *TỔNG THANH TOÁN:* *${order.totalAmount.toLocaleString('vi-VN')}đ* (Bao ship COD)
📝 *Ghi chú:* ${order.note || 'Không có'}
━━━━━━━━━━━━━━━━━━
👉 _Vào trang quản trị để gọi chốt đơn ngay!_`

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
    return res.ok
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
    return false
  }
}

export async function sendGoogleSheetWebhook(order: Order): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    return false
  }

  try {
    const addOnsSummary = order.addOns && order.addOns.length > 0
      ? order.addOns.map(i => `${i.name} (x${i.quantity})`).join(', ')
      : 'Không'

    const payload = {
      id: order.id,
      createdAt: order.createdAt,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      mainProduct: order.mainProductName,
      mainPrice: order.mainPrice,
      addOns: addOnsSummary,
      totalAmount: order.totalAmount,
      status: order.status,
      note: order.note || '',
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch (error) {
    console.error('Error sending Google Sheet webhook:', error)
    return false
  }
}
