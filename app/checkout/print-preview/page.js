"use client";

import { useSearchParams } from "next/navigation";

export default function PrintPreviewPage() {
  const searchParams = useSearchParams();
  const items = JSON.parse(searchParams.get("items") || "[]");
  const total = searchParams.get("total") || 0;

  return (
    <div className="p-4 text-center">
      <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-24" />
      <h1 className="text-lg font-bold mb-4">Receipt</h1>

      <ul className="text-left mb-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>₦{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-bold text-lg mb-6">Total: ₦{total}</h2>

      <p className="mt-6 italic">Thanks for patronizing us 🙏</p>
    </div>
  );
}
