import Projects from "@/Components/sections/projects";
import { Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of innovative web applications including CappyChat (AI chat platform), Bashio (AI CLI tool), Quoridor Online (multiplayer board game), ResuMate (AI resume builder), CappyUI, SkillCompass, SmartBite, and more. Built with Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "Snigdha Kathram Projects",
    "Web Development Projects",
    "Next.js Projects",
    "React Projects",
    "Portfolio Projects",
    "CappyChat",
    "Bashio",
    "Quoridor Online",
    "ResuMate",
    "CappyUI",
    "Full Stack Projects",
  ],
  openGraph: {
    title: "Projects - Snigdha Kathram Portfolio",
    description:
      "Explore innovative web applications and projects built with Next.js, React, TypeScript, and modern web technologies.",
    url: "https://vrandagarg.in/projects",
    siteName: "Snigdha Kathram - Portfolio",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
        width: 2160,
        height: 1215,
        alt: "Snigdha Kathram - Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Snigdha Kathram Portfolio",
    description:
      "Explore innovative web applications and projects built with modern web technologies.",
    creator: "@vrandaagarg",
    images: ["https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png"],
  },
  alternates: {
    canonical: "https://vrandagarg.in/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto flex flex-col items-center justify-center  px-4 md:px-0">
      <div className="w-full pt-16 border-l border-r border-neutral-200 relative ">


        <Projects />

        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
      </div>
    </main>
  );
}
