'use client'

import { useEffect, useState, useMemo } from 'react'
import { Order, OrderStatus } from '@/types/order'

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: '🟡 Mới Nhận',
    bg: 'bg-yellow-950/60',
    text: 'text-yellow-300',
    border: 'border-yellow-700',
  },
  contacting: {
    label: '🔵 Đang Liên Hệ',
    bg: 'bg-blue-950/60',
    text: 'text-blue-300',
    border: 'border-blue-700',
  },
  confirmed: {
    label: '🟢 Đã Chốt Đơn',
    bg: 'bg-green-950/60',
    text: 'text-green-300',
    border: 'border-green-700',
  },
  shipping: {
    label: '🚚 Đã Gửi COD',
    bg: 'bg-purple-950/60',
    text: 'text-purple-300',
    border: 'border-purple-700',
  },
  cancelled: {
    label: '🔴 Đơn Hủy',
    bg: 'bg-red-950/60',
    text: 'text-red-400',
    border: 'border-red-800',
  },
}

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [inputPin, setInputPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all')

  // Editing notes
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [noteValue, setNoteValue] = useState('')

  // Load PIN from sessionStorage on mount
  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin_pin')
    if (savedPin) {
      setPin(savedPin)
      fetchOrders(savedPin)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    if (!inputPin.trim()) {
      setAuthError('Vui lòng nhập mã PIN quản trị.')
      return
    }
    fetchOrders(inputPin.trim())
  }

  const fetchOrders = async (currentPin: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'x-admin-pin': currentPin },
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsAuthenticated(true)
        setPin(currentPin)
        sessionStorage.setItem('admin_pin', currentPin)
        setOrders(data.orders || [])
      } else {
        setAuthError(data.message || 'Mã PIN không đúng.')
      }
    } catch (err) {
      console.error(err)
      setAuthError('Không thể kết nối đến máy chủ.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (data.success && data.order) {
        setOrders(prev => prev.map(o => (o.id === orderId ? data.order : o)))
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleSaveNote = async (orderId: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ note: noteValue }),
      })
      const data = await res.json()
      if (data.success && data.order) {
        setOrders(prev => prev.map(o => (o.id === orderId ? data.order : o)))
        setEditingNoteId(null)
      }
    } catch (err) {
      console.error('Failed to save note:', err)
    }
  }

  const handleExportCsv = () => {
    window.open(`/api/admin/export?pin=${encodeURIComponent(pin)}`, '_blank')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pin')
    setIsAuthenticated(false)
    setPin('')
    setInputPin('')
    setOrders([])
  }

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus = statusFilter === 'all' || o.status === statusFilter
      const query = searchTerm.toLowerCase().trim()
      const matchSearch =
        !query ||
        o.customerName.toLowerCase().includes(query) ||
        o.phone.includes(query) ||
        o.id.toLowerCase().includes(query) ||
        o.address.toLowerCase().includes(query)
      return matchStatus && matchSearch
    })
  }, [orders, statusFilter, searchTerm])

  // KPIs
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const newOrders = orders.filter(o => o.status === 'new').length
    const confirmedOrders = orders.filter(o => o.status === 'confirmed').length
    const estimatedRevenue = orders
      .filter(o => o.status === 'confirmed' || o.status === 'shipping')
      .reduce((sum, o) => sum + o.totalAmount, 0)
    return { totalOrders, newOrders, confirmedOrders, estimatedRevenue }
  }, [orders])

  // If not authenticated, show PIN gate
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-paper text-ink">
        <div className="w-full max-w-sm p-6 sm:p-8 rounded-2xl bg-surface border border-keyline shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-paper border border-keyline text-accent flex items-center justify-center text-2xl mx-auto mb-4 font-black">
            🔒
          </div>
          <h1 className="text-xl font-black text-ink uppercase">
            Sales Hub Quản Trị
          </h1>
          <p className="text-xs text-ink-muted mt-1 mb-6">
            Hệ thống quản lý đơn hàng nalienthanh.store
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                autoFocus
                placeholder="Nhập mã PIN quản trị..."
                value={inputPin}
                onChange={e => setInputPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-paper border border-keyline text-center text-base tracking-widest text-ink placeholder:text-ink-muted focus:border-accent font-mono transition-colors"
              />
              <div className="text-[11px] text-ink-muted mt-1.5">
                (Mã PIN quản trị viên: <code className="text-accent font-bold">linhkiu33</code>)
              </div>
            </div>

            {authError && (
              <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-800 text-xs text-red-200">
                ⚠ {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide bg-accent hover:bg-accent-hover text-white transition-colors disabled:opacity-60"
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-keyline">
        <div className="site-container flex flex-wrap items-center justify-between gap-3 h-auto sm:h-16 py-3 sm:py-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-ink">
              NALIENTHANH<span className="text-accent">.SALES</span>
            </span>
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-paper border border-keyline text-ink-muted">
              Live Hub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchOrders(pin)}
              className="px-3 py-1.5 rounded-lg bg-paper border border-keyline hover:border-accent text-xs font-semibold text-ink flex items-center gap-1.5 transition-colors"
            >
              <span>🔄</span>
              <span>Làm Mới</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3 py-1.5 rounded-lg bg-green-950 border border-green-700 hover:bg-green-900 text-xs font-semibold text-green-300 flex items-center gap-1.5 transition-colors"
            >
              <span>📊</span>
              <span>Xuất Excel/CSV</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-paper border border-keyline hover:border-red-600 text-xs text-ink-muted hover:text-red-400 transition-colors"
            >
              Thoát
            </button>
          </div>
        </div>
      </header>

      <div className="site-container py-6 space-y-6">
        {/* KPI Dashboard Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-surface border border-keyline">
            <span className="text-xs text-ink-muted font-medium">Tổng Đơn Hàng</span>
            <div className="text-2xl font-black text-ink mt-1">{stats.totalOrders}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-yellow-800/60 relative overflow-hidden">
            <span className="text-xs text-yellow-400 font-semibold">🟡 Đơn Mới Cần Gọi</span>
            <div className="text-2xl font-black text-yellow-300 mt-1">{stats.newOrders}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-green-800/60">
            <span className="text-xs text-green-400 font-semibold">🟢 Đã Chốt Thành Công</span>
            <div className="text-2xl font-black text-green-300 mt-1">{stats.confirmedOrders}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-accent/40">
            <span className="text-xs text-accent font-semibold">💰 Doanh Thu Ước Tính</span>
            <div className="text-2xl font-black text-ink mt-1">
              {stats.estimatedRevenue.toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-surface border border-keyline flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'all'
                  ? 'bg-accent text-white font-bold'
                  : 'bg-paper text-ink-muted hover:text-ink border border-keyline'
              }`}
            >
              Tất Cả ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('new')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'new'
                  ? 'bg-yellow-600 text-white font-bold'
                  : 'bg-paper text-yellow-400 hover:text-yellow-300 border border-keyline'
              }`}
            >
              Mới ({orders.filter(o => o.status === 'new').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('contacting')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'contacting'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-paper text-blue-400 hover:text-blue-300 border border-keyline'
              }`}
            >
              Đang Gọi ({orders.filter(o => o.status === 'contacting').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'confirmed'
                  ? 'bg-green-600 text-white font-bold'
                  : 'bg-paper text-green-400 hover:text-green-300 border border-keyline'
              }`}
            >
              Đã Chốt ({orders.filter(o => o.status === 'confirmed').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('shipping')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'shipping'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-paper text-purple-400 hover:text-purple-300 border border-keyline'
              }`}
            >
              Gửi COD ({orders.filter(o => o.status === 'shipping').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('cancelled')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'cancelled'
                  ? 'bg-red-700 text-white font-bold'
                  : 'bg-paper text-red-400 hover:text-red-300 border border-keyline'
              }`}
            >
              Hủy ({orders.filter(o => o.status === 'cancelled').length})
            </button>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="🔍 Tìm SĐT, tên khách, mã đơn..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-lg bg-paper border border-keyline text-xs text-ink placeholder:text-ink-muted focus:border-accent"
            />
          </div>
        </div>

        {/* Orders Table & Mobile Cards */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface border border-keyline text-ink-muted text-sm">
            Không tìm thấy đơn hàng nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map(order => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.new
              const isEditing = editingNoteId === order.id

              return (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-surface border border-keyline hover:border-keyline-bright transition-colors shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Left: Customer & Product Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-accent text-xs">
                          #{order.id}
                        </span>
                        <span className="text-[11px] text-ink-muted">
                          {new Date(order.createdAt).toLocaleString('vi-VN', {
                            timeZone: 'Asia/Ho_Chi_Minh',
                          })}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <div className="font-black text-base text-ink">
                          {order.customerName}
                        </div>
                        {/* 1-Click Call Button */}
                        <a
                          href={`tel:${order.phone}`}
                          className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-green-950 transition-colors"
                        >
                          <span>📞</span>
                          <span>{order.phone}</span>
                        </a>
                      </div>

                      <div className="text-xs text-ink-muted leading-relaxed">
                        📍 <strong>Địa chỉ:</strong> {order.address}
                      </div>

                      <div className="text-xs text-ink pt-1">
                        📦 <strong>Sản phẩm:</strong>{' '}
                        <span className="font-bold text-accent">{order.mainProductName}</span>
                        {order.addOns && order.addOns.length > 0 && (
                          <span className="text-ink-muted ml-1">
                            + {order.addOns.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                          </span>
                        )}
                      </div>

                      {/* Note Display/Edit */}
                      <div className="pt-2 text-xs">
                        {isEditing ? (
                          <div className="flex items-center gap-2 max-w-md">
                            <input
                              type="text"
                              value={noteValue}
                              onChange={e => setNoteValue(e.target.value)}
                              placeholder="Nhập ghi chú telesale..."
                              className="px-2.5 py-1 rounded bg-paper border border-keyline text-xs text-ink w-full focus:border-accent"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNote(order.id)}
                              className="px-2.5 py-1 rounded bg-accent text-white text-xs font-bold"
                            >
                              Lưu
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNoteId(null)}
                              className="px-2 py-1 text-ink-muted text-xs hover:text-ink"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-ink-muted">
                              📝 Ghi chú:{' '}
                              <span className="text-ink font-medium">
                                {order.note || 'Chưa có ghi chú'}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingNoteId(order.id)
                                setNoteValue(order.note || '')
                              }}
                              className="text-[11px] text-accent hover:underline font-semibold"
                            >
                              [Sửa]
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Total Amount & Status Dropdown */}
                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-keyline pt-3 md:pt-0 gap-3 shrink-0">
                      <div className="text-left md:text-right">
                        <div className="text-[11px] text-ink-muted">Tổng tiền COD</div>
                        <div className="text-xl font-black text-accent">
                          {order.totalAmount.toLocaleString('vi-VN')}đ
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-ink-muted hidden md:inline">
                          Trạng thái:
                        </span>
                        <select
                          value={order.status}
                          onChange={e =>
                            handleUpdateStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-paper border border-keyline text-xs font-bold text-ink focus:border-accent cursor-pointer"
                        >
                          <option value="new">🟡 Mới Nhận</option>
                          <option value="contacting">🔵 Đang Liên Hệ</option>
                          <option value="confirmed">🟢 Đã Chốt Đơn</option>
                          <option value="shipping">🚚 Đã Gửi COD</option>
                          <option value="cancelled">🔴 Đơn Hủy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
