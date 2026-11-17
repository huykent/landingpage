import test from 'node:test'
import assert from 'node:assert/strict'
import { getOrders, getStorageBackend, saveOrder, updateOrder } from '../lib/storage.ts'

const sampleOrder = {
  id: 'NLT-123456',
  createdAt: '2026-11-18T01:30:00.000Z',
  customerName: 'Nguyễn Văn Test',
  phone: '0987654321',
  address: 'Hà Nội',
  mainProduct: 'laser_pro',
  mainProductName: 'BỘ CÓ LAZE XỊN',
  mainPrice: 400000,
  addOns: [{ id: 'extra_band', name: 'Bộ dây thun', price: 50000, quantity: 2 }],
  shippingFee: 0,
  totalAmount: 500000,
  status: 'new',
  note: 'Giao giờ hành chính',
}

test('Google Sheets storage: create, list, update, and error handling', async () => {
  const prevUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const prevSecret = process.env.GOOGLE_SHEET_SECRET
  const originalFetch = global.fetch

  try {
    process.env.GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/fake/exec'
    process.env.GOOGLE_SHEET_SECRET = 'test-secret'

    assert.equal(getStorageBackend(), 'google_sheets')

    const calls = []
    global.fetch = async (url, init) => {
      const payload = JSON.parse(init.body)
      calls.push({ url, payload })

      if (payload.action === 'create') {
        return new Response(JSON.stringify({ success: true, order: payload.order }), { status: 200 })
      }
      if (payload.action === 'list') {
        return new Response(JSON.stringify({ success: true, orders: [sampleOrder] }), { status: 200 })
      }
      if (payload.action === 'update') {
        if (payload.id === 'MISSING') {
          return new Response(JSON.stringify({ success: false, message: 'Order not found' }), {
            status: 200,
          })
        }
        return new Response(
          JSON.stringify({
            success: true,
            order: { ...sampleOrder, ...payload.updates },
          }),
          { status: 200 }
        )
      }
      return new Response('invalid', { status: 500 })
    }

    const saved = await saveOrder(sampleOrder)
    assert.equal(saved.id, sampleOrder.id)

    const list = await getOrders()
    assert.equal(list.length, 1)
    assert.equal(list[0].phone, '0987654321')

    const updated = await updateOrder(sampleOrder.id, { status: 'confirmed', note: 'Đã gọi chốt' })
    assert.equal(updated?.status, 'confirmed')
    assert.equal(updated?.note, 'Đã gọi chốt')

    const missing = await updateOrder('MISSING', { status: 'cancelled' })
    assert.equal(missing, null)

    // Đảm bảo secret được gửi kèm ở mọi request
    assert.equal(calls.length, 4)
    for (const c of calls) {
      assert.equal(c.payload.secret, 'test-secret')
    }

    // Fail loudly khi Google Sheet trả lỗi thật
    global.fetch = async () =>
      new Response(JSON.stringify({ success: false, message: 'Unauthorized secret key' }), {
        status: 200,
      })
    await assert.rejects(() => saveOrder(sampleOrder), /Unauthorized secret key/)
  } finally {
    global.fetch = originalFetch
    if (prevUrl === undefined) delete process.env.GOOGLE_SHEET_WEBHOOK_URL
    else process.env.GOOGLE_SHEET_WEBHOOK_URL = prevUrl
    if (prevSecret === undefined) delete process.env.GOOGLE_SHEET_SECRET
    else process.env.GOOGLE_SHEET_SECRET = prevSecret
  }
})
