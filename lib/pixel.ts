declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: any
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''

// Helper to safely trigger fbq
export function fbq(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export function trackPageView() {
  fbq('track', 'PageView')
}

export function trackViewContent(contentName: string, value?: number) {
  fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: 'Dụng cụ thể thao dã ngoại',
    value: value || 250000,
    currency: 'VND',
  })
}

export function trackInitiateCheckout(productName: string, value: number) {
  fbq('track', 'InitiateCheckout', {
    content_name: productName,
    value,
    currency: 'VND',
  })
}

export function trackLead(value?: number) {
  fbq('track', 'Lead', {
    value: value || 250000,
    currency: 'VND',
  })
}

export function trackPurchase(orderId: string, value: number, productName: string) {
  fbq('track', 'Purchase', {
    content_name: productName,
    content_type: 'product',
    value,
    currency: 'VND',
    order_id: orderId,
  })
}
