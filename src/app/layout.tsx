import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Blush Drive | Premium Car Rental",
  description:
    "Elevating your journey with premium vehicles and unparalleled service.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable, "font-sans")}>
      <body className="flex flex-col">
        <Header />
        <Toaster />
        <main className="min-h-[calc(100vh-72px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
