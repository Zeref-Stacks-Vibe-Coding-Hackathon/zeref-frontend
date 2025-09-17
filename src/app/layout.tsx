import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { copy } from "@/lib/copy";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: copy.site.title,
  description: copy.site.subtitle,
  keywords: ["DeFi", "Cross-Chain", "Yield", "Automated", "Looping", "Stacks", "STX"],
  authors: [{ name: "Zeref Team" }],
  openGraph: {
    title: copy.site.title,
    description: copy.site.subtitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.site.title,
    description: copy.site.subtitle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} font-inter antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
