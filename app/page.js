// app/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  { id: 1, name: "Jollof Rice", price: 1500 },
  { id: 2, name: "Suya", price: 1000 },
  { id: 3, name: "Beans", price: 1200 },
  { id: 4, name: "Bread", price: 500 },
  { id: 5, name: "Amala", price: 1000 },
];

export default function POSPage() {
  const [selected, setSelected] = useState({});
  const router = useRouter();

  const addItem = (product) => {
    setSelected((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: prev[product.id]?.quantity + 1 || 1,
      },
    }));
  };

  const clearItem = (id) => {
    setSelected((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">POS System</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1 overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => addItem(product)}
            onContextMenu={(e) => {
              e.preventDefault();
              clearItem(product.id);
            }}
          >
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">₦{product.price}</p>
            {selected[product.id] && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">
                {selected[product.id].quantity}
              </span>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-green-700 text-white py-3 rounded text-xl"
        onClick={() => router.push("/checkout?data=" + encodeURIComponent(JSON.stringify(selected)))}
      >
        Checkout
      </button>
    </div>
  );
}