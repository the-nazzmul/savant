import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/tanstack-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savant",
  description: "Your AI-powered research assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TanstackProvider>
            {/* <Navbar /> */}
            {children}
            <Toaster />
          </TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
