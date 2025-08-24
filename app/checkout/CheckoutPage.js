// app/checkout/CheckoutPage.js

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [showPreview, setShowPreview] = useState(false);

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

  // Only open modal, no backend or print logic
  const confirmAndPrint = () => {
    setShowPreview(true);
  };

  const backToPOS = () =>
    router.push("/?data=" + encodeURIComponent(JSON.stringify(order)));

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-50 to-white relative overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-lg shadow-lg rounded-b-3xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-yellow-800 drop-shadow-lg tracking-wide animate-fade-in">
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
                className="flex items-center justify-between p-4 rounded-2xl shadow bg-white/60 backdrop-blur-lg border border-yellow-100 animate-fade-in"
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
      <div className="fixed bottom-0 left-0 w-full z-10 px-4 pb-4 bg-gradient-to-t from-yellow-100/80 via-yellow-50/60 to-transparent backdrop-blur-lg border-t border-yellow-100">
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

      {/* Print Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-white w-[340px] max-w-full rounded-lg shadow-lg p-4 flex flex-col items-center print:w-full print:shadow-none print:rounded-none"
            style={{ width: "80mm" }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 object-contain mb-1"
              />
              <div className="text-center text-xs font-bold text-yellow-800">
                123 Nama Express Street, Lagos, Nigeria
              </div>
            </div>
            <hr className="my-2 border-dashed border-yellow-200" />
            {/* Items */}
            <div className="w-full">
              {Object.values(order).map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-1">
                  <span>
                    {getProductIcon(item.name)} {item.name} x{item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <hr className="my-2 border-dashed border-yellow-200" />
            {/* Total */}
            <div className="flex justify-between font-bold text-base mb-2 w-full text-yellow-900">
              <span>Total</span>
              <span>₦{Number(total).toLocaleString()}</span>
            </div>
            <hr className="my-2 border-dashed border-yellow-200" />
            {/* Footer */}
            <div className="text-center text-xs mt-4 mb-2 text-yellow-700">
              Thank you for your patronage!
            </div>
            {/* Modal Close Button */}
            <button
              className="mt-4 bg-yellow-400 text-yellow-900 font-bold py-3 px-8 rounded shadow-lg text-lg hover:bg-yellow-500 transition"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes pop {
          0% { transform: scale(0.7);}
          60% { transform: scale(1.2);}
          100% { transform: scale(1);}
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-5px);}
        }
        .animate-fade-in { animation: fade-in 0.7s ease;}
        .animate-slide-in { animation: slide-in 0.7s ease;}
        .animate-pop { animation: pop 0.4s;}
        .animate-bounce { animation: bounce 1.2s infinite;}
      `}</style>
    </div>
  );
}
