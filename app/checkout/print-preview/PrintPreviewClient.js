"use client";

import { useSearchParams } from "next/navigation";

export default function PrintPreviewClient() {
  const searchParams = useSearchParams();
  const items = JSON.parse(searchParams.get("items") || "[]");
  const total = searchParams.get("total") || "0";

  return (
    <div className="p-6 text-center">
      <img src="/logo.png" alt="Logo" className="mx-auto w-24 mb-4" />
      <h1 className="text-lg font-bold mb-4">Receipt</h1>

      <div className="text-left mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>x{item.qty}</span>
            <span>₦{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-xl mt-4">Total: ₦{total}</h2>
      <p className="mt-6 italic">Thanks for patronizing us!</p>
    </div>
  );
}
