import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { DOMAIN } from "@/constants/enums";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Blush Drive",
    default: "Blush Drive | Premium Car Rental",
  },
  description:
    "Elevating your journey with premium vehicles and unparalleled service.",
  icons: {
    icon: [
      {
        url: "/images/car-key.png",
        type: "image/png",
      },
    ],
  },
  metadataBase: new URL(DOMAIN),
  openGraph: {
    title: {
      template: "%s | Blush Drive",
      default: "Blush Drive | Premium Car Rental",
    },
    description:
      "Elevating your journey with premium vehicles and unparalleled service.",
    url: DOMAIN,
    siteName: "Blush Drive",
    locale: "en_US",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable, "font-sans")}>
      <body>
        <ClerkProvider
          appearance={{
            elements: {
              rootBox: "element-center w-full h-[calc(100dvh-128px)]",
            },
            variables: {
              colorPrimary: "#f43f5e",
            },
          }}
        >
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
