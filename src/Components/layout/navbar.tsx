"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FolderOpen, Mail, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleThemeInit = () => {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

      document.documentElement.setAttribute("data-theme", currentTheme);
      setTheme(currentTheme);
      setIsClient(true);
    };

    handleThemeInit();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!isClient) return null;

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="backdrop-blur-md bg-neutral-100/60 border border-neutral-300/30 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-neutral-500 transition-colors duration-200"
          >
            <Home size={20} />
          </Link>

          <Link
            href="/projects"
            className="hover:text-neutral-500 transition-colors duration-200"
          >
            <FolderOpen size={20} />
          </Link>

          <Link
            href="#contact"
            className="hover:text-neutral-500 transition-colors duration-200"
          >
            <Mail size={20} />
          </Link>

          <div className="h-5 w-px bg-neutral-400/50" />

          <button
            onClick={toggleTheme}
            className="hover:text-neutral-500 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
