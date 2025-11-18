import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/Components/ui/Background";
import Navbar from "@/Components/layout/navbar";
import Footer from "@/Components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vranda Garg - Portfolio",
  description: "Full Stack Developer | Frontend Expert | Website Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <Background />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
