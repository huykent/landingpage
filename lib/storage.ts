import fs from 'fs'
import path from 'path'
import { Order, OrderStatus } from '@/types/order'

const DATA_DIR = path.join(process.cwd(), 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// In-memory fallback for environments with read-only/ephemeral filesystem
let inMemoryOrders: Order[] = []

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
  try {
    ensureDataFile()
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      const parsed = JSON.parse(content) as Order[]
      // Merge with in-memory if needed
      const merged = [...parsed]
      for (const memOrder of inMemoryOrders) {
        if (!merged.some(o => o.id === memOrder.id)) {
          merged.unshift(memOrder)
        }
      }
      return merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  } catch (err) {
    console.warn('Reading orders from disk failed, fallback to in-memory:', err)
  }
  return inMemoryOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function saveOrder(order: Order): Promise<Order> {
  // Always update in-memory
  inMemoryOrders.unshift(order)

  try {
    ensureDataFile()
    let currentOrders: Order[] = []
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      currentOrders = JSON.parse(content)
    }
    currentOrders.unshift(order)
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(currentOrders, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Writing order to disk failed, saved in-memory:', err)
  }

  return order
}

export async function updateOrder(
  id: string,
  updates: Partial<Pick<Order, 'status' | 'note'>>
): Promise<Order | null> {
  let updatedOrder: Order | null = null

  // Update in-memory
  const memIndex = inMemoryOrders.findIndex(o => o.id === id)
  if (memIndex !== -1) {
    inMemoryOrders[memIndex] = { ...inMemoryOrders[memIndex], ...updates }
    updatedOrder = inMemoryOrders[memIndex]
  }

  try {
    ensureDataFile()
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8')
      const currentOrders: Order[] = JSON.parse(content)
      const diskIndex = currentOrders.findIndex(o => o.id === id)
      if (diskIndex !== -1) {
        currentOrders[diskIndex] = { ...currentOrders[diskIndex], ...updates }
        updatedOrder = currentOrders[diskIndex]
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(currentOrders, null, 2), 'utf-8')
      }
    }
  } catch (err) {
    console.warn('Updating order on disk failed, updated in-memory:', err)
  }

  return updatedOrder
}
