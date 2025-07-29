"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const products = [
	{ id: 1, name: "FRIED CHICKEN", price: 3000 },
	{ id: 6, name: "FRIED CHICKEN 2", price: 5500 },
	{ id: 2, name: "PEPPER CHICKEN", price: 5000 },
	{ id: 3, name: "RAM SUYA", price: 2500 },
	{ id: 4, name: "CHINESE SUYA", price: 1750 },
	{ id: 5, name: "TOZO AND KIDNEY", price: 1500 },
	{ id: 7, name: "CHICKEN SHAWARMA", price: 4000 },
	{ id: 8, name: "ARAB SHAWARMA", price: 6250 },
	{ id: 9, name: "FRIED RICE", price: 2000 },
	{ id: 10, name: "NAMA JOLLOF", price: 1500 },
	{ id: 11, name: "FRENCH FRIES", price: 1700 },
	{ id: 12, name: "SWEET POTATO", price: 1250 },
	{ id: 13, name: "DODO", price: 1000 },
	{ id: 14, name: "DOYA", price: 2000 },
	{ id: 15, name: "CUP CAKES", price: 2500 },
	{ id: 16, name: "APPLE PIE", price: 2500 },
	{ id: 17, name: "ICE CREAM", price: 1500 },
	{ id: 18, name: "YOGHURT", price: 1000 },
];

export default function POSClient() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selected, setSelected] = useState({});

	useEffect(() => {
		const rawData = searchParams.get("data");
		if (rawData) {
			try {
				const parsed = JSON.parse(rawData);
				if (parsed && typeof parsed === "object") {
					setSelected(parsed);
				}
			} catch (e) {}
		}
	}, [searchParams]);

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

// bg-gradient-to-br from-yellow-100 via-yellow-50 to-white

	return (
		<div className="h-screen w-full flex flex-col bg-black  p-0 relative overflow-hidden">
			<div className="sticky top-0 z-10 bg-white/40 backdrop-blur-lg shadow-lg rounded-b-3xl px-6 py-4 mb-2 flex items-center justify-between transition-all duration-500">
				<h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide animate-fade-in">
					POS System
				</h1>
				<span className="hidden sm:inline-block text-lg font-bold text-yellow-700 bg-yellow-50 px-4 py-2 rounded-xl shadow animate-slide-in">
					Nama Express
				</span>
			</div>
			<div className="flex-1 overflow-y-auto px-2 pb-32">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
					{products.map((product) => (
						<div
							key={product.id}
							// bg-white/40 backdrop-blur-lg border border-yellow-200
							className="relative p-4 rounded-3xl shadow-xl cursor-pointer bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
							onClick={() => addItem(product)}
							onContextMenu={(e) => {
								e.preventDefault();
								clearItem(product.id);
							}}
						>
							<div className="flex flex-col items-center justify-center">
								<span className="text-4xl mb-2 animate-pop">
									{getProductIcon(product.name)}
								</span>
								<p
									className="text-lg font-bold text-black group-hover:text-yellow-700 transition-colors duration-300 animate-fade-in"
									style={{
										fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
										letterSpacing: "1px",
									}}
								>
									{product.name}
								</p>
								<p
									className="text-sm text-black mt-2 font-semibold animate-fade-in"
									style={{
										fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
									}}
								>
									₦{product.price}
								</p>
							</div>
							{selected[product.id] && (
								<span className="absolute top-3 right-3 bg-black text-yellow-600 text-sm w-7 h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-yellow-300 animate-pop">
									{selected[product.id].quantity}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="fixed bottom-0 left-0 w-full z-[100] px-0 pb-0 bg-white/70 backdrop-blur-lg border-t border-yellow-100">
				<div className="flex gap-2 px-4 py-2">
					<button
						className={`flex-1 bg-yellow-300 text-yellow-900 py-5 rounded-none text-xl font-bold shadow-lg border-0 transition-all duration-300 hover:bg-yellow-400 hover:text-yellow-900 animate-bounce ${
							Object.keys(selected).length === 0
								? "opacity-50 cursor-not-allowed"
								: ""
						}`}
						onClick={() =>
							router.push(
								"/checkout?data=" +
									encodeURIComponent(JSON.stringify(selected))
							)
						}
						disabled={Object.keys(selected).length === 0}
					>
						Checkout
					</button>
					<button
						className={`flex-1 bg-black text-red-700 py-5 rounded-none text-xl font-bold shadow-lg border-0 transition-all duration-300 hover:bg-red-200 hover:text-red-900 ${
							Object.keys(selected).length === 0
								? "opacity-50 cursor-not-allowed"
								: ""
						}`}
						onClick={() => setSelected({})}
						disabled={Object.keys(selected).length === 0}
					>
						Clear All
					</button>
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
