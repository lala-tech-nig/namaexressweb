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

  // ✅ Opens print preview page
  const confirmAndPrint = () => {
    router.push(
      `/checkout/print-preview?data=${encodeURIComponent(
        JSON.stringify(order)
      )}&total=${encodeURIComponent(total)}`
    );
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
    </div>
  );
}
