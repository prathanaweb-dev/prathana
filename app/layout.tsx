import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prarthana Foundation Solapur — Transparent Humanitarian Aid",
  description:
    "Prarthana Foundation is a grassroots collective in Solapur providing nutrition, education kits, and mobile healthcare to children and families in need. Every donation is transparently tracked and publicly verified.",
  keywords: [
    "NGO Solapur",
    "Prarthana Foundation",
    "Donate India",
    "Child Education",
    "Food Drive Maharashtra",
    "Transparent Charity",
  ],
  authors: [{ name: "Prarthana Foundation Solapur" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
