import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layouts/Footer";
import MainLayout from "./MainLayout";
import Header from "@/components/layouts/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/lib/cart/CartContext";
import { getContact } from "@/lib/data";
import { organizationGraph, rootMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = rootMetadata();

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { offices } = await getContact();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#10243E]">
        <JsonLd data={organizationGraph(offices[0])} />
        <CartProvider>
          <Header />
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
