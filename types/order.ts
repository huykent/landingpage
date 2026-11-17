export interface AddOnItem {
  id: 'extra_band' | 'extra_magazine' | 'extra_ammo'
  name: string
  price: number
  quantity: number
}

export type OrderStatus = 'new' | 'contacting' | 'confirmed' | 'shipping' | 'cancelled'

export interface Order {
  id: string
  createdAt: string
  customerName: string
  phone: string
  address: string
  mainProduct: 'standard' | 'laser_pro'
  mainProductName: string
  mainPrice: number
  addOns: AddOnItem[]
  shippingFee: number
  totalAmount: number
  status: OrderStatus
  note?: string
}

export interface CreateOrderInput {
  customerName: string
  phone: string
  address: string
  mainProduct: 'standard' | 'laser_pro'
  addOns?: Array<{
    id: 'extra_band' | 'extra_magazine' | 'extra_ammo'
    quantity: number
  }>
  note?: string
}
