"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const rawData = searchParams.get("data");
    if (rawData) {
      setOrder(JSON.parse(rawData));
    }
  }, [searchParams]);

  const total = Object.values(order).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmAndPrint = async () => {
    try {
      await axios.post("http://localhost:3001/print-order", {
        items: Object.values(order),
        total,
        timestamp: new Date().toISOString(),
      });
      alert("Order printed and saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send order");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex-1 overflow-y-auto">
        {Object.values(order).map((item) => (
          <div key={item.id} className="border-b py-2 flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right text-xl font-bold">
        Total: ₦{total.toLocaleString()}
      </div>
      <button
        className="mt-4 bg-blue-600 text-white py-3 rounded text-xl"
        onClick={confirmAndPrint}
      >
        Confirm & Print
      </button>
    </div>
  );
}