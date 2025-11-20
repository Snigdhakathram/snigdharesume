import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Background from "@/Components/ui/Background";
import Navbar from "@/Components/layout/navbar";
import Footer from "@/Components/layout/footer";
import ThemeProvider from "@/Components/layout/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased flex flex-col min-h-screen relative font-sans`}
      >
        <ThemeProvider>
          <Background />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
