"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrintPreview() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const rawData = searchParams.get("data");
    const rawTotal = searchParams.get("total");

    if (rawData) {
      try {
        setOrder(JSON.parse(rawData));
      } catch (e) {
        console.warn("Invalid order data");
      }
    }
    if (rawTotal) setTotal(Number(rawTotal));

    // ✅ trigger Android print after 3 seconds
    const timer = setTimeout(() => {
      window.print();
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white text-black text-center">
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/logo.png"
          alt="Nama Express Logo"
          className="mx-auto w-24 h-24 object-contain"
        />
        <h1 className="text-xl font-bold mt-2">Nama Express</h1>
      </div>

      {/* Order Items */}
      <div className="text-left space-y-2 border-t border-b py-4">
        {Object.values(order).map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-lg font-bold mt-4">
        Total: ₦{total.toLocaleString()}
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-700">
        ⭐ Thanks for patronizing us! ⭐
      </div>
    </div>
  );
}
