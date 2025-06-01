import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Konnectly",
  description: "Connect and collaborate with professionals worldwide",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
          <Toaster position="bottom-left" />

          <header className="border-b border-gray-800 sticky top-0 bg-gray-900 z-50">
            <Header />
          </header>

          <div className="bg-gray-900 flex-1 w-full">
            <main className="max-w-6xl mx-auto">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
