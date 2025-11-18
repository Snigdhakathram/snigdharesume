"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Home, FolderOpen, Mail, Moon, Sun } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({

    transition: isSelected
      ? { type: "spring" as const, bounce: 0, duration: 0.5, stiffness: 300, damping: 30 }
      : { type: "spring" as const, bounce: 0, duration: 0.35, stiffness: 400, damping: 35 },
  }),
};

const spanVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0, duration: 0.5, stiffness: 300, damping: 30 }
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { type: "spring" as const, bounce: 0, duration: 0.35, stiffness: 400, damping: 35 }
  },
};

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const outsideClickRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(outsideClickRef as React.RefObject<HTMLDivElement>, () => {
    setSelected(null);
  });

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
      className="fixed top-6  left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        ref={outsideClickRef}
        className="flex p-2 flex-wrap items-center gap-3 rounded-full border border-neutral-400/40 bg-linear-to-tl from-neutral-50/70 via-neutral-100/60 to-neutral-50/70 py-1.5 shadow-[0_4px_16px_rgba(var(--glow-color),0.08)] backdrop-blur-xl"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === index}
            >
              <Link
                href={item.href}
                onClick={() => setSelected(index)}
                className={cn(
                  "relative flex items-center rounded-full px-3 py-2.5 my-0.5 text-sm font-medium transition-colors duration-200",
                  selected === index
                    ? "bg-neutral-800 text-background "
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-foreground"
                )}
                aria-label={item.name}
              >
                <Icon size={20} className="shrink-0" />

                <AnimatePresence initial={false}>
                  {selected === index && (
                    <motion.div variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit" className="flex items-center gap-2">
                      <motion.div

                        className="w-.5  "
                      />
                      <motion.span

                        className="overflow-hidden whitespace-nowrap"
                      >

                        {item.name}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}

        <div className="mx-0.5 h-6 w-px bg-neutral-300/60" />

        <motion.button
          variants={buttonVariants}
          initial={false}
          animate="animate"
          custom={false}
          onClick={toggleTheme}
          className="relative mr-2 flex items-center rounded-full px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-foreground"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <Moon size={20} className="shrink-0" />
          ) : (
            <Sun size={20} className="shrink-0" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}
