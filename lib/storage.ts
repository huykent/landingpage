import fs from 'fs'
import path from 'path'
import type { Order } from '@/types/order'

const DATA_DIR = path.join(process.cwd(), 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// In-memory fallback for local dev when GOOGLE_SHEET_WEBHOOK_URL is not configured
let inMemoryOrders: Order[] = []

export type StorageBackend = 'google_sheets' | 'local_fallback'

export function getStorageBackend(): StorageBackend {
  return process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim() ? 'google_sheets' : 'local_fallback'
}

function getSheetConfig(): { url: string; secret: string } | null {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim()
  if (!url) return null
  const secret = (process.env.GOOGLE_SHEET_SECRET || process.env.ADMIN_PIN || '').trim()
  return { url, secret }
}

async function callGoogleSheet<T>(
  action: 'list' | 'create' | 'update',
  body: Record<string, unknown> = {}
): Promise<T> {
  const config = getSheetConfig()
  if (!config) {
    throw new Error('GOOGLE_SHEET_WEBHOOK_URL chưa được cấu hình.')
  }

  const res = await fetch(config.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      action,
      secret: config.secret,
      ...body,
    }),
  })

  const rawText = await res.text()
  let data: { success?: boolean; message?: string } & T
  try {
    data = JSON.parse(rawText)
  } catch {
    throw new Error(
      `Google Sheet trả về phản hồi không hợp lệ (HTTP ${res.status}). Kiểm tra lại quyền truy cập "Anyone" của Web App.`
    )
  }

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Lỗi đồng bộ Google Sheet (HTTP ${res.status}).`)
  }

  return data
}

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (err) {
    console.warn('Could not ensure data directory/file on disk, using memory fallback:', err)
  }
}

export async function getOrders(): Promise<Order[]> {
  if (getStorageBackend() === 'google_sheets') {
    const data = await callGoogleSheet<{ orders?: Order[] }>('list')
    const orders = Array.isArray(data.orders) ? data.orders : []
    return orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  try {
    ensureDataFile()
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      const parsed = JSON.parse(content) as Order[]
      const merged = [...parsed]
      for (const memOrder of inMemoryOrders) {
        if (!merged.some(o => o.id === memOrder.id)) {
          merged.unshift(memOrder)
        }
      }
      return merged.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }
  } catch (err) {
    console.warn('Reading orders from disk failed, fallback to in-memory:', err)
  }
  return [...inMemoryOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function saveOrder(order: Order): Promise<Order> {
  if (getStorageBackend() === 'google_sheets') {
    const data = await callGoogleSheet<{ order?: Order }>('create', { order })
    return data.order || order
  }

  inMemoryOrders = [order, ...inMemoryOrders]

  try {
    ensureDataFile()
    let currentOrders: Order[] = []
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      currentOrders = JSON.parse(content)
    }
    const nextOrders = [order, ...currentOrders]
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(nextOrders, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Writing order to disk failed, saved in-memory:', err)
  }

  return order
}

export async function updateOrder(
  id: string,
  updates: Partial<Pick<Order, 'status' | 'note'>>
): Promise<Order | null> {
  if (getStorageBackend() === 'google_sheets') {
    try {
      const data = await callGoogleSheet<{ order?: Order }>('update', { id, updates })
      return data.order || null
    } catch (err) {
      if (err instanceof Error && err.message.toLowerCase().includes('not found')) {
        return null
      }
      throw err
    }
  }

  let updatedOrder: Order | null = null

  inMemoryOrders = inMemoryOrders.map(o => {
    if (o.id === id) {
      updatedOrder = { ...o, ...updates }
      return updatedOrder
    }
    return o
  })

  try {
    ensureDataFile()
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      const currentOrders = JSON.parse(content) as Order[]
      const nextOrders = currentOrders.map(o => {
        if (o.id === id) {
          updatedOrder = { ...o, ...updates }
          return updatedOrder
        }
        return o
      })
      if (updatedOrder) {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(nextOrders, null, 2), 'utf-8')
      }
    }
  } catch (err) {
    console.warn('Updating order on disk failed, updated in-memory:', err)
  }

  return updatedOrder
}
