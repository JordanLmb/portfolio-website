import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jordanlmb.com'),
  title: "Jordan Lambert | Computer Engineer & Full Stack Developer",
  description: "Portfolio of Jordan Lambert, a Computer Engineer specializing in Full Stack Development, DevOps, and AI. Based in Montreal.",
  openGraph: {
    title: "Jordan Lambert | Computer Engineer",
    description: "Explore the portfolio of Jordan Lambert, featuring projects in AI, Web Development, and Automation.",
    url: 'https://jordanlmb.com',
    siteName: 'Jordanlmb.com',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-black text-gray-900 dark:text-white`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
