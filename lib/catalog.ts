import type { AddOnItem, CreateOrderInput, Order, OrderStatus } from '@/types/order'

export const PRODUCT_CATALOG = {
  standard: {
    shortName: 'Bản Không Laze',
    name: 'BỘ KHÔNG LAZE (Bản Nhựa ABS - Chuẩn Bi 8mm)',
    price: 250000,
    originalPrice: 650000,
  },
  laser_pro: {
    shortName: 'Bản Laze Xịn',
    name: 'BỘ CÓ LAZE XỊN CHỈNH TÂM (Bản Nhựa ABS - Chuẩn Bi 8mm)',
    price: 400000,
    originalPrice: 950000,
  },
} as const

export const ADDON_CATALOG = {
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
} as const

export const VALID_ORDER_STATUSES: readonly OrderStatus[] = [
  'new',
  'contacting',
  'confirmed',
  'shipping',
  'cancelled',
]

export function isValidOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && VALID_ORDER_STATUSES.includes(value as OrderStatus)
}

export function calculateAddOnsTotal(counts: {
  band: number
  magazine: number
  ammo: number
}): number {
  return (
    counts.band * ADDON_CATALOG.extra_band.price +
    counts.magazine * ADDON_CATALOG.extra_magazine.price +
    counts.ammo * ADDON_CATALOG.extra_ammo.price
  )
}

export function generateOrderId(): string {
  const bytes = new Uint8Array(3)
  globalThis.crypto.getRandomValues(bytes)
  const rand = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
  const ts = Date.now().toString(36).toUpperCase().slice(-4)
  return `NLT-${ts}${rand}`
}

export function buildOrderFromInput(
  body: CreateOrderInput
): { order: Order } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Dữ liệu đơn hàng không hợp lệ.' }
  }

  const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : ''
  if (!customerName) {
    return { error: 'Vui lòng nhập họ và tên người nhận.' }
  }

  const cleanPhone = (typeof body.phone === 'string' ? body.phone : '').replace(/\D/g, '')
  if (cleanPhone.length < 9 || cleanPhone.length > 11) {
    return { error: 'Vui lòng nhập số điện thoại hợp lệ (10 số).' }
  }

  const address = typeof body.address === 'string' ? body.address.trim() : ''
  if (address.length < 5) {
    return { error: 'Vui lòng chọn đầy đủ địa chỉ nhận hàng.' }
  }

  const mainProductKey: 'standard' | 'laser_pro' =
    body.mainProduct === 'standard' ? 'standard' : 'laser_pro'
  const mainProdConfig = PRODUCT_CATALOG[mainProductKey]

  const addOns: AddOnItem[] = []
  let addOnsTotal = 0

  if (Array.isArray(body.addOns)) {
    for (const item of body.addOns) {
      if (!item || !(item.id in ADDON_CATALOG)) continue
      const qty = Number(item.quantity)
      if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
        return { error: 'Số lượng phụ kiện phải là số nguyên từ 1 đến 99.' }
      }
      const addonInfo = ADDON_CATALOG[item.id]
      addOns.push({
        id: item.id,
        name: addonInfo.name,
        price: addonInfo.price,
        quantity: qty,
      })
      addOnsTotal += addonInfo.price * qty
    }
  }

  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) : undefined

  return {
    order: {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customerName: customerName.slice(0, 120),
      phone: cleanPhone,
      address: address.slice(0, 300),
      mainProduct: mainProductKey,
      mainProductName: mainProdConfig.name,
      mainPrice: mainProdConfig.price,
      addOns,
      shippingFee: 0,
      totalAmount: mainProdConfig.price + addOnsTotal,
      status: 'new',
      note: note || undefined,
    },
  }
}

export function sanitizeCsvCell(value: string | number | undefined | null): string {
  const str = String(value ?? '')
  // Prevent Excel CSV formula injection when cells start with =, +, -, @, tab, or CR
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str
  return `"${safe.replace(/"/g, '""')}"`
}
