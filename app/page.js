// pages/index.js
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

export default function Home() {
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
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
  };

  return (
    <div className="w-screen h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1 overflow-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow cursor-pointer relative"
            onClick={() => addItem(product)}
            onContextMenu={(e) => {
              e.preventDefault();
              clearItem(product.id);
            }}
          >
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">
              ₦{product.price.toLocaleString()}
            </p>
            {selected[product.id] && (
              <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {selected[product.id].quantity}
              </span>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-green-600 text-white p-4 rounded text-xl"
        onClick={() => router.push("/checkout?data=" + encodeURIComponent(JSON.stringify(selected)))}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
