// app/checkout/CheckoutPage.js

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function getProductIcon(name) {
  if (name.includes("CHICKEN")) return "🍗";
  if (name.includes("SUYA")) return "🥩";
  if (name.includes("SHAWARMA")) return "🌯";
  if (name.includes("RICE")) return "🍚";
  if (name.includes("JOLLOF")) return "🍛";
  if (name.includes("FRIES")) return "🍟";
  if (name.includes("POTATO")) return "🥔";
  if (name.includes("DODO")) return "🍌";
  if (name.includes("DOYA")) return "🥔";
  if (name.includes("CAKES")) return "🧁";
  if (name.includes("PIE")) return "🥧";
  if (name.includes("ICE CREAM")) return "🍦";
  if (name.includes("YOGHURT")) return "🥛";
  return "🍽️";
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const rawData = searchParams.get("data");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed && typeof parsed === "object") {
          setOrder(parsed);
        }
      } catch (err) {
        console.warn("Invalid order data in URL.");
      }
    }
  }, [searchParams]);

  const total = Object.values(order).reduce((sum, item) => {
    const price = item?.price || 0;
    const qty = item?.quantity || 0;
    return sum + price * qty;
  }, 0);

  const confirmAndPrint = async () => {
    try {
      await axios.post("http://localhost:3001/print-order", {
        items: Object.values(order),
        total,
        timestamp: new Date().toISOString(),
      });

      alert("✅ Order printed and saved!");
      await new Promise((res) => setTimeout(res, 1000)); // optional delay
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to print or save the order.");
    }
  };

  const backToPOS = () =>
    router.push("/?data=" + encodeURIComponent(JSON.stringify(order)));

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-50 to-white relative overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/40 backdrop-blur-lg shadow-lg rounded-b-3xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-yellow-800 drop-shadow tracking-wide animate-fade-in">
          Checkout
        </h1>
        <span className="hidden sm:inline-block text-lg font-bold text-yellow-700 bg-yellow-50 px-4 py-2 rounded-xl shadow animate-slide-in">
          Nama Express
        </span>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto px-2 pb-32">
        {Object.values(order).length === 0 ? (
          <div className="text-center text-yellow-700 mt-16 text-lg animate-fade-in">
            No items in order.
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {Object.values(order).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl shadow bg-white/50 backdrop-blur border border-yellow-100 animate-fade-in"
              >
                <span className="text-3xl mr-4 animate-pop">
                  {getProductIcon(item.name)}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-yellow-900 text-lg tracking-wide">
                    {item.name}
                  </p>
                  <p className="text-sm text-yellow-700 font-semibold">
                    ₦{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-yellow-800 text-lg">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full z-10 px-4 pb-4 bg-white/70 backdrop-blur-lg border-t border-yellow-100">
        <div className="text-xl font-bold text-yellow-900 mb-2">
          Total: ₦{total.toLocaleString()}
        </div>
        <div className="flex gap-2">
          <button
            className="flex-[2] bg-yellow-300 text-yellow-900 py-5 text-xl font-bold shadow-lg transition hover:bg-yellow-400 animate-bounce disabled:opacity-40"
            onClick={confirmAndPrint}
            disabled={Object.keys(order).length === 0}
          >
            Confirm & Print
          </button>
          <button
            className="flex-1 bg-yellow-200 text-yellow-900 py-5 text-lg font-semibold shadow transition hover:bg-yellow-300 flex items-center justify-center gap-2"
            onClick={backToPOS}
            disabled={Object.keys(order).length === 0}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0.7);
          }
          60% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease;
        }
        .animate-slide-in {
          animation: slide-in 0.7s ease;
        }
        .animate-pop {
          animation: pop 0.4s;
        }
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
      `}</style>
    </div>
  );
}
