import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@repo/ui";
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "碳智METHAS - 专业的碳中和解决方案提供商",
  description: "碳智METHAS为企业、政府和组织提供全方位的碳中和解决方案，助力实现可持续发展目标。",
  keywords: "碳中和, 碳资产管理, 碳交易, 可持续发展, 零碳转型, ESG, 碳市场",
  openGraph: {
    title: "碳智METHAS - 专业的碳中和解决方案提供商",
    description: "碳智METHAS为企业、政府和组织提供全方位的碳中和解决方案，助力实现可持续发展目标。",
    url: "https://www.methas.cn",
    siteName: "碳智METHAS",
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
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen pt-24 md:pt-28 lg:pt-32">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
