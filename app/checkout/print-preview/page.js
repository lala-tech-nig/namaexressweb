// 'use client';

// import PrintPreviewClient from "./PrintPreviewClient";

// export default function PrintPreviewPage() {
//   return <PrintPreviewClient />;
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PrintPreview() {
  const searchParams = useSearchParams();

  const items = JSON.parse(searchParams.get("items") || "[]");
  const total = searchParams.get("total") || 0;

  useEffect(() => {
    // Trigger print after small delay
    const timer = setTimeout(() => {
      window.print();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2 style={{ textAlign: "center" }}>🍴 My Restaurant</h2>
      <hr />
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.name} x {item.qty} - ₦{item.price * item.qty}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Total: ₦{total}</h3>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        ✅ Thanks for patronizing us!
      </p>
    </div>
  );
}
