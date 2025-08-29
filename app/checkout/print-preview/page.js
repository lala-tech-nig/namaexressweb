// app/checkout/print-preview/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PrintPreview() {
  const searchParams = useSearchParams();

  const items = JSON.parse(searchParams.get("items") || "[]");
  const total = searchParams.get("total") || 0;

  useEffect(() => {
    // Trigger print after page loads
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto w-20 mb-2" />
        <h2 className="font-bold text-lg">Receipt</h2>
      </div>

      <div className="mt-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between border-b py-1">
            <span>{item.name}</span>
            <span>{item.price} x {item.qty}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between font-bold">
        <span>Total</span>
        <span>{total}</span>
      </div>

      <p className="mt-6 text-center italic text-sm">Thanks for patronizing us!</p>
    </div>
  );
}
