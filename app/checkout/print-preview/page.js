// app/checkout/print-preview/page.js
import { Suspense } from "react";
import PrintPreviewClient from "./PrintPreviewClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      <PrintPreviewClient />
    </Suspense>
  );
}
