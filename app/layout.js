import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// app/layout.js

export const metadata = {
  title: "POS Sales App",
  description: "A simple POS sales system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen overflow-hidden">{children}</body>
    </html>
  );
}