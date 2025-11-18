"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FolderOpen, Mail, Moon, Sun } from "lucide-react";
import Magnetic from "../ui/Magnetic";

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

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Contact", href: "/#contact", icon: Mail },
  ];

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="backdrop-blur-md bg-neutral-100/60 border border-neutral-300/30 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        {navItems.map((item) => (
          <Magnetic key={item.name}>
            <Link
              href={item.href}
              className="p-3 rounded-full hover:bg-neutral-200/50 transition-colors block group relative"
              aria-label={item.name}
            >
              <item.icon className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-neutral-100 px-2 py-1 rounded-md shadow-sm pointer-events-none">
                {item.name}
              </span>
            </Link>
          </Magnetic>
        ))}

        <div className="w-px h-6 bg-neutral-300/50 mx-1" />

        <Magnetic>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-neutral-200/50 transition-colors group relative"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors" />
            )}
          </button>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
