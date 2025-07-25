// app/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
		<div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-0 relative">
			<div className="sticky top-0 z-10 bg-white/30 backdrop-blur-lg shadow-lg rounded-b-3xl px-6 py-4 mb-2 flex items-center justify-between transition-all duration-500">
				<h1 className="text-3xl font-extrabold text-yellow-900 drop-shadow-lg tracking-wide animate-fade-in">
					POS System
				</h1>
				<span className="hidden sm:inline-block text-lg font-bold text-yellow-700 bg-yellow-100 px-4 py-2 rounded-xl shadow animate-slide-in">
					Nama Express
				</span>
			</div>
			<div className="flex-1 overflow-y-auto px-2 pb-36 sm:pb-4">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
					{products.map((product) => (
						<div
							key={product.id}
							className="relative p-4 rounded-3xl shadow-xl cursor-pointer bg-white/40 backdrop-blur-lg border border-yellow-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
							onClick={() => addItem(product)}
							onContextMenu={(e) => {
								e.preventDefault();
								clearItem(product.id);
							}}
						>
							<div className="flex flex-col items-center justify-center">
								{/* Product Icon */}
								<span className="text-4xl mb-2 animate-pop">
									{getProductIcon(product.name)}
								</span>
								{/* Product Name */}
								<p
									className="text-lg font-bold text-yellow-900 group-hover:text-yellow-700 transition-colors duration-300 animate-fade-in"
									style={{
										fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
										letterSpacing: "1px",
									}}
								>
									{product.name}
								</p>
								{/* Product Price */}
								<p
									className="text-sm text-yellow-700 mt-2 font-semibold animate-fade-in"
									style={{
										fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
									}}
								>
									₦{product.price}
								</p>
							</div>
							{selected[product.id] && (
								<span className="absolute top-3 right-3 bg-yellow-600 text-white text-sm w-7 h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-yellow-300 animate-pop">
									{selected[product.id].quantity}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 bg-gradient-to-t from-yellow-200/70 via-yellow-100/60 to-transparent backdrop-blur-lg sm:static sm:px-0 sm:pb-0 sm:bg-transparent">
				<button
					className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg border-0 transition-all duration-300 hover:scale-105 hover:bg-yellow-700 animate-bounce"
					onClick={() =>
						router.push(
							"/checkout?data=" +
								encodeURIComponent(JSON.stringify(selected))
						)
					}
				>
					Checkout
				</button>
			</div>
			{/* Animations */}
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

// Add this helper function above your export default function:
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