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
import OrderForm from '@/components/OrderForm'
import Footer from '@/components/Footer'
import StickyFooter from '@/components/StickyFooter'
import OrderSuccessModal from '@/components/OrderSuccessModal'

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<'standard' | 'laser_pro'>('laser_pro')
  const [successOrder, setSuccessOrder] = useState<{
    id: string
    customerName: string
    phone: string
    totalAmount: number
    mainProductName: string
  } | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink pb-16 md:pb-0">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Hero Section (Section 1) */}
      <HeroSection onSelectProduct={setSelectedProduct} />

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
        onSuccess={order => setSuccessOrder(order)}
      />

      {/* 10. Footer */}
      <Footer />

      {/* 11. Sticky CTA Footer on Mobile */}
      <StickyFooter selectedProduct={selectedProduct} />

      {/* 12. Modal xác nhận thành công */}
      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
      />
    </div>
  )
}
