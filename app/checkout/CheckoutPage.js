"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-50 to-white p-0 relative overflow-hidden">
      <div className="sticky top-0 z-10 bg-white/40 backdrop-blur-lg shadow-lg rounded-b-3xl px-6 py-4 mb-2 flex items-center justify-between transition-all duration-500">
        <h1 className="text-3xl font-extrabold text-yellow-800 drop-shadow-lg tracking-wide animate-fade-in">
          Checkout
        </h1>
        <span className="hidden sm:inline-block text-lg font-bold text-yellow-700 bg-yellow-50 px-4 py-2 rounded-xl shadow animate-slide-in">
          Nama Express
        </span>
      </div>
      {/* Back Button */}
      <button
        className="absolute top-6 left-4 z-[101] bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full shadow hover:bg-yellow-300 transition-all duration-200 flex items-center gap-2"
        onClick={() =>
          router.push(
            "/?data=" + encodeURIComponent(JSON.stringify(order))
          )
        }
      >
        <span className="text-lg">←</span>
        <span className="text-sm font-semibold">Back</span>
      </button>
      <div className="flex-1 overflow-y-auto px-2 pb-32">
        {Object.values(order).length === 0 ? (
          <div className="text-center text-yellow-700 mt-16 text-lg animate-fade-in">
            No items in order.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.values(order).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl shadow bg-white/50 backdrop-blur-lg border border-yellow-100 animate-fade-in"
              >
                <span className="text-3xl mr-4 animate-pop">
                  {getProductIcon(item.name)}
                </span>
                <div className="flex-1">
                  <p
                    className="font-bold text-yellow-900 text-lg"
                    style={{
                      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-sm text-yellow-700 font-semibold"
                    style={{
                      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
                    }}
                  >
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
      <div className="fixed bottom-0 left-0 w-full z-[100] px-0 pb-0 bg-white/70 backdrop-blur-lg border-t border-yellow-100">
        <div className="flex flex-col px-4 pt-2">
          <div className="text-xl font-bold text-yellow-900 mb-2">
            Total: ₦{total.toLocaleString()}
          </div>
          <div className="flex gap-2">
            <button
              className="flex-[2] bg-yellow-300 text-yellow-900 py-5 rounded-none text-xl font-bold shadow-lg border-0 transition-all duration-300 hover:bg-yellow-400 hover:text-yellow-900 animate-bounce"
              onClick={confirmAndPrint}
              disabled={Object.values(order).length === 0}
            >
              Confirm & Print
            </button>
            <button
              className="flex-1 bg-yellow-200 text-yellow-900 py-5 rounded-none text-lg font-semibold shadow border-0 transition-all duration-200 hover:bg-yellow-300 flex items-center justify-center gap-2"
              onClick={() =>
                router.push(
                  "/?data=" + encodeURIComponent(JSON.stringify(order))
                )
              }
              disabled={Object.values(order).length === 0}
            >
              <span className="text-lg">←</span>
              <span className="text-sm font-semibold">Back</span>
            </button>
          </div>
        </div>
      </div>
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
          0%,
          100% {
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