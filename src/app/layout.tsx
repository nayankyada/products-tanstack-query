import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/context/QueryProvider";
import { Footer, Header } from "./(components)";
import ProductProvider from "@/context/ProductProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Listing using Tanstack Query",
  description: "Product Listing using Tanstack Query and Next.js",
};

/*
 * Root layout component
 * This component is used to display the header and footer
 * on every page
 * @param {React.ReactNode} children - The children to render
 * @returns {JSX.Element} - The root layout component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <QueryProvider>
            <main className="flex min-h-screen flex-col items-center justify-between w-full">
              <Header />
              {children}
              <Footer />
            </main>
          </QueryProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
