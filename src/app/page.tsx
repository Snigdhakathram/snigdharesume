import HeroSection from "@/Components/sections/heroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vranda Garg - Full Stack Developer | Portfolio",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and React. Frontend Developer at Kakiyo OÜ. Expert in building scalable web applications, AI-powered platforms, and real-time systems. Creator of CappyChat, Quoridor Online, ResuMate, and more.",
  alternates: {
    canonical: "https://vrandagarg.in",
  },
};

export default function Home() {
  return (
    <main className="flex justify-center px-6">
      <div className="w-full max-w-4xl">
        <HeroSection />
      </div>
    </main>
  );
}
