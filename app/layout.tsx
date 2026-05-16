import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Next Digi Home",
  description: "Premium digital products engineered for modern businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col bg-[#0f0f12] text-[#fafafa] selection:bg-[#00d4aa] selection:text-[#0f0f12]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}