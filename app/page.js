// app/page.js
import { Suspense } from "react";
import POSClient from "./POSClient";

export default function POSPageWrapper() {
	return (
		<Suspense fallback={<div>Loading POS...</div>}>
			<POSClient />
		</Suspense>
	);
}
