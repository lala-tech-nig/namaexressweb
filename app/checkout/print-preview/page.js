// app/checkout/print-preview/page.js
'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function PrintPreviewContent() {
  const searchParams = useSearchParams()
  const items = JSON.parse(searchParams.get('items') || '[]')
  const total = searchParams.get('total') || 0

  useEffect(() => {
    // Trigger Android print popup after a short delay
    const timer = setTimeout(() => {
      window.print()
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-4 text-center">
      {/* Logo */}
      <div className="mb-4">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="mx-auto w-20 h-20"
        />
      </div>

      {/* Items List */}
      <h2 className="text-lg font-bold mb-2">Receipt</h2>
      <div className="text-left mb-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₦{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="font-bold text-lg mb-4">
        Total: ₦{total}
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm italic">
        Thanks for patronizing us!
      </div>
    </div>
  )
}

export default function PrintPreview() {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      <PrintPreviewContent />
    </Suspense>
  )
}
