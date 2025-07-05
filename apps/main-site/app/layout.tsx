import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@repo/ui";
import { AuthProvider } from '../contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "South Pole - Leading Climate Solutions",
  description: "South Pole develops climate action solutions for businesses, governments and organizations around the world.",
  keywords: "climate solutions, carbon credits, renewable energy, sustainability, net zero",
  openGraph: {
    title: "South Pole - Leading Climate Solutions",
    description: "South Pole develops climate action solutions for businesses, governments and organizations around the world.",
    url: "https://www.southpole.com",
    siteName: "South Pole",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-dark`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen pt-24 md:pt-28 lg:pt-32">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
