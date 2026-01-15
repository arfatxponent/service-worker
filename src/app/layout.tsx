import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegistrar";
import GlobalOnlineStatus from "@/components/GlobalOnlineStatus";
import { WebVitals } from "@/components/web-vitals";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Arfatur Rahman",
    absolute: "Arfatur Rahman",
  },
  description: "An apps that belongs to Arfatur Rahman",
  manifest: "./manifest.ts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        <ServiceWorkerRegister />
        <GlobalOnlineStatus />
        <Header />
        {children}
      </body>
    </html>
  );
}
