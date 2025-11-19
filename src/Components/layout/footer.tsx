"use client";

import Link from "next/link";
import { socialLinks } from "@/data/social";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8  border-t border-neutral-200/50">
      <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-neutral-500">
          © {currentYear} Vranda Garg. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-foreground transition-colors"
                aria-label={link.title}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
