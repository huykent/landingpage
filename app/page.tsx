'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PainGainSection from '@/components/PainGainSection'
import VideoShowcase from '@/components/VideoShowcase'
import SpecsSection from '@/components/SpecsSection'
import PricingSection from '@/components/PricingSection'
import ReviewsSection from '@/components/ReviewsSection'
import CommitmentsSection from '@/components/CommitmentsSection'
import OrderForm, { AddOnsState } from '@/components/OrderForm'
import Footer from '@/components/Footer'
import StickyFooter from '@/components/StickyFooter'
import OrderSuccessModal from '@/components/OrderSuccessModal'
import FakeNotificationPopup from '@/components/FakeNotificationPopup'
import FloatingContact from '@/components/FloatingContact'
import { calculateAddOnsTotal } from '@/lib/catalog'

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<'standard' | 'laser_pro'>('laser_pro')
  const [addOns, setAddOns] = useState<AddOnsState>({ band: 0, magazine: 0, ammo: 0 })
  const [successOrder, setSuccessOrder] = useState<{
    id: string
    customerName: string
    phone: string
    totalAmount: number
    mainProductName: string
  } | null>(null)

  const addOnsTotal = calculateAddOnsTotal(addOns)
  const addOnsCount = addOns.band + addOns.magazine + addOns.ammo

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink pb-20 md:pb-0 relative">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Hero Section (Section 1) */}
      <HeroSection
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      {/* 3. Pain vs Gain (Section 2) */}
      <PainGainSection />

      {/* 4. Real Experience & Video (Section 3) */}
      <VideoShowcase />

      {/* 5. Technical Specifications (Section 4) */}
      <SpecsSection />

      {/* 6. Pricing & Add-on Showcase (Section 5) */}
      <PricingSection
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      {/* 7. Customer Reviews & Social Proof (Section 6) */}
      <ReviewsSection />

      {/* 8. Commitments & Guarantees (Section 7) */}
      <CommitmentsSection />

      {/* 9. Order Form & Fast Checkout (Section 8) */}
      <OrderForm
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
        addOns={addOns}
        onChangeAddOns={setAddOns}
        onSuccess={order => setSuccessOrder(order)}
      />

      {/* 10. Footer */}
      <Footer />

      {/* 11. Sticky CTA Footer on Mobile */}
      <StickyFooter
        selectedProduct={selectedProduct}
        addOnsTotal={addOnsTotal}
        addOnsCount={addOnsCount}
      />

      {/* 12. Modal xác nhận thành công */}
      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
      />

      {/* 13. Pop-up Đơn Hàng Mới Nhảy Liên Tục (Social Proof) */}
      <FakeNotificationPopup />

      {/* 14. Nút Hotline & Zalo Rung Lắc Cấp Tốc */}
      <FloatingContact />
    </div>
  )
}
