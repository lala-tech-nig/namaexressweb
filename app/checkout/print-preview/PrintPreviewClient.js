"use client";

import { useSearchParams } from "next/navigation";

export default function PrintPreviewClient() {
  const searchParams = useSearchParams();
  const items = JSON.parse(searchParams.get("items") || "[]");
  const total = searchParams.get("total") || "0";

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" className="mx-auto w-16 h-16" />
        <h2 className="text-lg font-bold">Receipt</h2>
      </div>
      <ul className="mb-4">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.quantity} = ₦{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <div className="font-bold text-right">Total: ₦{total}</div>
      <div className="text-center mt-6">Thanks for patronizing us!</div>
    </div>
  );
}
