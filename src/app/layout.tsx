import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL!),
  title: "EzEz Link",
  description: "A super ez link shortener! Built in Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel='icon' sizes='32x32'  href="/favicon.svg"/>
      <meta name="theme-color" content="#ffffff"></meta>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
